module.exports = {
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    // repo: 'https://github.com/xxxxxxx/blog-demo',
    // 自定义仓库链接文字。
    base:'/notes/',
    repoLabel: 'My GitHub',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'FirstBlog', link: '/blog/FirstBlog.md' },
    ],
    sidebar: [
      ['/', '首页'],
      ['/blog/FirstBlog.md', '我的第一篇牛逼博客'],
    ],
  },
};
