// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'EVM Expressions',
  tagline: 'Hey, I am Rahul and I love Ethereum and the EVM. I help protocols navigate the risky world of web3 with security audits and testing consultation.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://saxenism.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'saxenism', // Usually your GitHub org/user name.
  projectName: 'saxenism-expressions', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/btlabs.png',
      navbar: {
        title: 'EVM Expressions',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo512.png',
        },
        items: [
          // {
          //   type: 'doc',
          //   docId: 'intro',
          //   position: 'left',
          //   label: 'Tutorial',
          // },
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/videos', label: 'Videos', position: 'left'},
          {to: '/testimonials', label: 'Reviews', position: 'left'},
          {to: '/glossary', label: 'DeFi Dictionary', position: 'left'}
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Library',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'Video Presentations',
                to: '/videos'
              }
            ],
          },
          {
            title: 'Socials',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/users/11924484/rahul-saxena',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/saxenism',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/saxenism',
              },
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/saxenism/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Bluethroat Labs, Private Ltd. Built with Docusaurus.`,
      },
      prism: {
        theme: darkCodeTheme,
        darkTheme: lightCodeTheme
      },
    }),
};

module.exports = config;
