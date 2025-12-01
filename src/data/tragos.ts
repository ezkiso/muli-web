// src/data/tragos.ts
export interface Trago {
    id: number;
    slug: string;
    nombre: string;
    precio: number;
    descripcion: string;
    imagen: string;
    priority?: boolean;
    }

    export const tragosData: Trago[] = [
    {
        id: 1,
        slug: "botellon-exportacion-selecto-carmenere-15l",
        nombre: "Botellón Exportación Selecto Carmenere 1.5L",
        precio: 9000,
        descripcion: "Botellon de vino carmenere de 1.5 litros, ideal para compartir en reuniones y celebraciones.",
        imagen: "/fono-copete/exportacion.jpg",
        priority: true
    },
    {
        id: 2,
        slug: "pisco-alto-del-carmen-35-1l",
        nombre: "Pisco Alto del Carmen 35 grados 1 Litro",
        precio: 15000,
        descripcion: "Alto del Carmen Pisco 35° es un pisco de alta calidad, destilado cuidadosamente para ofrecer un sabor suave y equilibrado.",
        imagen: "/fono-copete/pisco-alto.jpeg",
        priority: true
    },
    {
        id: 3,
        slug: "promo-piscola",
        nombre: "¡Promo Piscola!",
        precio: 20000,
        descripcion: "Alto del Carmen 1LT + Bebida Coca Cola 3LT + Hielo. ¡Todo lo que necesitas para una piscola perfecta!",
        imagen: "/fono-copete/piscola.jpg",
        priority: true
    },
    {
        id: 4,
        slug: "six-pack-royal-guard",
        nombre: "Six Pack Royal Guard",
        precio: 14000,
        descripcion: "Six pack de cervezas Royal Guard en lata de 470cc. Perfecta para compartir.",
        imagen: "/fono-copete/royal.jpg",
        priority: true
    }
];