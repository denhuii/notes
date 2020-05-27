module.exports = {
  // 部署站点的基础路径
  base: '/notes/',
  title: '个人笔记',
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: 'https://github.com/denhuii/notes',
    // 自定义仓库链接文字。
    repoLabel: 'GitHub',
    // 导航栏
    nav: [
      { text: 'Home', link: '/' },
      { text: 'FirstBlog', link: '/blog/FirstBlog.md' },
    ],
    // 侧边栏
    sidebar: [
      ['/', '首页'],
      ['/blog/FirstBlog.md', '我的第一篇牛逼博客'],
    ],
  },
};
