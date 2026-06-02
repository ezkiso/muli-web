-- Crear tabla de tatuajes
CREATE TABLE IF NOT EXISTS tatuajes (
  id BIGSERIAL PRIMARY KEY,
  store_id TEXT NOT NULL,
  id_text TEXT UNIQUE, -- ID string para compatibilidad con TattooWork
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('realizados', 'diseños', 'flash')),
  style TEXT[] DEFAULT '{}',
  body_part TEXT,
  size TEXT CHECK (size IN ('pequeño', 'mediano', 'grande')),
  tags TEXT[] DEFAULT '{}',
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices
CREATE INDEX IF NOT EXISTS idx_tatuajes_store_id ON tatuajes(store_id);
CREATE INDEX IF NOT EXISTS idx_tatuajes_category ON tatuajes(category);
CREATE INDEX IF NOT EXISTS idx_tatuajes_available ON tatuajes(available);

-- Habilitar RLS
ALTER TABLE tatuajes ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura a todos
CREATE POLICY "Tatuajes son visibles para todos"
  ON tatuajes FOR SELECT
  USING (true);

-- Política para permitir insert solo a usuarios autenticados dueños de la tienda
CREATE POLICY "Solo dueños pueden insertar tatuajes"
  ON tatuajes FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM store_owners
      WHERE store_owners.user_id = auth.uid()
      AND store_owners.store_id = tatuajes.store_id
    )
  );

-- Política para permitir update solo a usuarios autenticados dueños de la tienda
CREATE POLICY "Solo dueños pueden actualizar tatuajes"
  ON tatuajes FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM store_owners
      WHERE store_owners.user_id = auth.uid()
      AND store_owners.store_id = tatuajes.store_id
    )
  );

-- Política para permitir delete solo a usuarios autenticados dueños de la tienda
CREATE POLICY "Solo dueños pueden eliminar tatuajes"
  ON tatuajes FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM store_owners
      WHERE store_owners.user_id = auth.uid()
      AND store_owners.store_id = tatuajes.store_id
    )
  );

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tatuajes_updated_at
  BEFORE UPDATE ON tatuajes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger para generar id_text automáticamente
CREATE OR REPLACE FUNCTION generate_tatuaje_id_text()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.id_text IS NULL OR NEW.id_text = '' THEN
    NEW.id_text = 't-' || LPAD(NEW.id::TEXT, 6, '0');
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER generate_tatuaje_id_text_trigger
  BEFORE INSERT ON tatuajes
  FOR EACH ROW
  EXECUTE FUNCTION generate_tatuaje_id_text();
