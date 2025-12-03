/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/desobediencia',
        destination: '/stores/desobediencia',
      },
      {
        source: '/contruhazard',
        destination: '/stores/contruhazard',
      },
      {
        source: '/contruhazard/jarros',
        destination: '/stores/contruhazard/jarros',
      },
      {
        source: '/fono-copete',
        destination: '/stores/fono-copete',
      },
    ]
  },
}

module.exports = nextConfig