/* ============================================================================
   home.js — 首页专属脚本（只被 4 个 index*.html 引用）
   ============================================================================
   只做两件事：入场触发、离屏暂停。动画本体全在 home.css 里，
   本文件不含任何样式或文案。

   命名不是 site.js：24 个子页并不需要它。叫 site.js 会误导后来的人。

   无 JS 时不会瞎：home.css 里所有"初始隐藏"都写成 `html.js .xxx`，
   而 .js 类是 <head> 里的内联脚本打的。JS 被禁用/加载失败时没有这个类，
   内容直接可见、演示呈静态成品态。

   ★ 装饰线一律用 "=" 不用 "-"：双连字符在 XML 注释里非法。
   ============================================================================ */
(function () {
  var hasIO = 'IntersectionObserver' in window;

  /* 入场：进入视口加 .in，加完即停止观察 */
  var ioReveal = hasIO && new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    if (ioReveal) { ioReveal.observe(el); } else { el.classList.add('in'); }
  });

  /* 演示动画：进视口才跑，离开即暂停 ——
     页尾的无限动画不该在用户读页首时还空转（省电、防移动端掉帧） */
  var ioRun = hasIO && new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      e.target.classList.toggle('running', e.isIntersecting);
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.anim-scope').forEach(function (el) {
    if (ioRun) { ioRun.observe(el); } else { el.classList.add('running'); }
  });

  /* ★ 兜底：IO 若因任何原因没触发 —— 页面在后台标签页被浏览器节流
     （实测：visibilityState 为 hidden 时 IO 完全不回调）、老浏览器、
     或扩展干扰 —— 内容不能就这么留在 opacity:0 上变成一片空白。
     2.5 秒后无条件显示全部：入场动画只是锦上添花，不是显示的前提。 */
  setTimeout(function () {
    document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
      el.classList.add('in');
    });
    document.querySelectorAll('.anim-scope:not(.running)').forEach(function (el) {
      el.classList.add('running');
    });
  }, 2500);
})();
