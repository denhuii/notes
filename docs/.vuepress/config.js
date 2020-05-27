module.exports = {
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    // repo: 'https://github.com/xxxxxxx/blog-demo',
    // 自定义仓库链接文字。
    repoLabel: 'My GitHub',
    nav: [
      { text: 'Home', link: '/notes' },
      { text: 'FirstBlog', link: '/notes/blog/FirstBlog.md' },
    ],
    sidebar: [
      ['/notes', '首页'],
      ['/notes/blog/FirstBlog.md', '我的第一篇牛逼博客'],
    ],
  },
};
