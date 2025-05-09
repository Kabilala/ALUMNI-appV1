module.exports = {
  siteMetadata: {
    title: "Alumni App",
    description: "Une application pour les anciens étudiants",
    author: "",
  },
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Alumni App",
        short_name: "Alumni",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#000000",
        display: "standalone",
        icon: "src/images/icon.png",
      },
    },
  ],
};