/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Protocolo usado
        hostname: "image.tmdb.org", // Domínio permitido
        port: "", // Porta (geralmente vazio para https)
        pathname: "/t/p/**", // Caminho permitido com wildcard
      },
    ], // Adicione o domínio aqui
  },
};

module.exports = nextConfig;
