module.exports = {
  // 部署站点的基础路径
  base: '/notes/',
  title: 'NOTES',
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: 'https://github.com/denhuii/notes',
    // 自定义仓库链接文字。
    repoLabel: 'GitHub',
    // 导航栏
    nav: [
      { text: '前端', link: '/web/JavaScript.md' },
      { text: 'DevOps', link: '/doc/Linux.md' },
      // {
      //   text: '专业',
      //   items: [
      //     { text: '计算机网络', link: '/language/chinese/' },
      //     {
      //       text: '高级程序设计',
      //       link: '/language/chinese/',
      //     },
      //   ],
      // },
    ],
    // 侧边栏
    sidebar: {
      '/doc/': ['Linux.md', 'Docker.md', 'Gitlab.md', 'Jenkins.md'],
      '/web/': ['JavaScript.md', 'Typescript.md'],
    },
  },
};
