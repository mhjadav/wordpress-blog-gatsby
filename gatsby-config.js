require('dotenv').config({
  path: '.env',
});

module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: 'mojaave.wordpress.com',
        protocol: 'https',
        hostingWPCOM: true,
        useACF: false,
        auth: {
          wpcom_app_clientSecret: process.env.WORDPRESS_SECRET,
          wpcom_app_clientId: process.env.WORDPRESS_CLIENTID,
          wpcom_user: process.env.WORDPRESS_U,
          wpcom_pass: process.env.WORDPRESS_P,
        },
        verboseOutput: false,
        // searchAndReplaceContentUrls: {
        //   sourceUrl: 'https://mojaave.wordpress.com',
        //   replacementUrl: 'https://mojaave.com',
        // },
      },
    },
    'gatsby-plugin-offline',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  
  ],
}
