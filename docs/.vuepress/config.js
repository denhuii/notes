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
      { text: '前端', link: '/web/js' },
      { text: '运维', link: '/doc/linux' },
      { text: '代码片段', link: '/code/vue' },
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
      '/doc/': ['linux', 'docker', 'jenkins', 'node'],
      '/web/': ['js', 'ts', 'react', 'vue'],
      '/code/': ['vue'],
    },
  },
};
