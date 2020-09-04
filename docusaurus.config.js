module.exports = {
  title: 'Knowledge',
  tagline: '',
  url: 'https://knowledge.markdessain.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'markdessain', // Usually your GitHub org/user name.
  projectName: 'knowledge', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Knowledge',
      logo: {
        alt: 'Knowledge',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/markdessain/knowledge',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Mark Dessain, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'getting-started',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/markdessain/knowledge/edit/master/',
          remarkPlugins: [require('remark-mermaid')],
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/markdessain/knowledge/edit/master/blog/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
