export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Movies Room",
  description: "Descobra sobre filmes no Movies Room",
  keywords: [
    "movies",
    "room",
    "movie",
    "film",
    "cinema",
    "filmes",
    "series",
    "assistir",
    "watch",
  ],
  navItems: [
    {
      label: "Início",
      href: "/",
    },
    {
      label: "Filmes",
      href: "/movie",
    },
  ],
  links: {
    github: "https://github.com/Zuk3s/movies-room",
    discord: "https://discord.gg/9b6yyZKmH4",
    linkedin: "https://www.linkedin.com/in/felipe-dev/",
  },
};
