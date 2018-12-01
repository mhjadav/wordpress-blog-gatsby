require('dotenv').config({
  path: '.env',
});
const path = require('path');

const siteUrl = 'https://wordpress-gatsby.netlify.com/';
module.exports = {
  siteMetadata: {
    siteUrl,
    description: 'Convert your wordpress blog to pwa using gatsby',
    keyword: 'wordpress, gatsby, blog, pwa',
    title: 'Wordpress Blog PWA',
  },
  plugins: [
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
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Wordpress Blog PWA',
        short_name: 'Blog PWA',
        start_url: '/blog',
        background_color: '#1d69ab',
        theme_color: '#1d69ab',
        display: 'standalone',
        icon: path.join(__dirname, 'src/images/logo.png'),
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap.xml`,
        policy: [{ userAgent: '*', disallow: '' }],
      },
    },
    'gatsby-plugin-offline',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  ],
};
