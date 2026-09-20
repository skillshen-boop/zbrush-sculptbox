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

  /* ── 焦虑区卡片轨道：自动巡航 + 悬浮暂停 + 甩动 ─────────────────────
     要的是「自己左右动、鼠标浮上去停、往左甩它飞过去、往右甩也飞过去」。

     做法**不是** transform 跑马灯 —— 那样甩不动。这里保留原生横向滚动：
     轮盘 / 触控板的惯性甩动、双指横扫全是浏览器原生的，我们只负责在没人
     碰的时候往前慢慢推。

     无缝循环：把卡片在 JS 里复制两份（无 JS 时 DOM 一个字节不变），
     内容于是有了周期 P。相隔 P 的画面逐像素相同，所以整段平移 P 看不见接缝。

     ★ 为什么复制**两份**（共三组）而不是一份：轨道现在是满屏宽
       （.pain-track 不在 .wrap 里），视口越宽可滚动范围越短。
       4K 屏下两份只剩不到一个周期，循环窗口就摆不下了。

     ★ 循环窗口取**居中**的一段 [lo, lo+P)，而不是 [0, P)：
       窗口居中 → 两端各留 (maxScroll-P)/2 的甩动余量，往回甩不会一头撞死。
       若分成"快到左端就 +P、快到右端就 -P"两条规则，在窄余量下会互相
       触发（+P 的结果落回 -P 的触发区），整条轨道每帧来回跳 —— 必须
       让"平移后的落点"落在两个触发区之外，居中窗口天然满足。

     ★ home.css 里必须**没有** scroll-snap：mandatory 吸附会在每帧程序化
       写 scrollLeft 之后把位置拽回吸附点，轨道会一抖一抖。
     ★ 手在轨道上（鼠标）→ 停；移开或甩完闲置 1.6s → 自己接着走。
     ★ 观感定了但不该空转：轨道不在视口里、标签页在后台、系统开了
       「减弱动态效果」，都不跑。 */
  var track = document.querySelector('.pain-track');
  var reduceMotion = window.matchMedia &&
                     window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (track && !reduceMotion) {
    var count = track.children.length;         // 复制前 = 真实卡片数
    var head = track.children[0];
    for (var rep = 0; rep < 2; rep++) {        // 共三组
      for (var c = 0; c < count; c++) {
        var dup = track.children[c].cloneNode(true);
        dup.setAttribute('aria-hidden', 'true');  // 复本不进无障碍树、不进 SEO
        dup.style.setProperty('--i', '0');        // 复本不参与入场错峰
        track.appendChild(dup);
      }
    }
    var mirror = track.children[count];
    var SPEED = 34;                            // px / 秒
    var IDLE = 1600;                           // 甩完多久自己接着走
    var P = 0, lo = 0, maxScroll = 0, acc = 0, last = 0, raf = 0;
    var started = false, visible = false, hovering = false, idleUntil = 0;

    var normalize = function () {
      if (P <= 0) { return; }
      if (acc >= lo + P) { acc -= P; }
      else if (acc < lo) { acc += P; }
    };

    var measure = function () {
      /* ★★ 周期必须用 offsetLeft 量，**不能用 getBoundingClientRect** ——
         rect 会把入场动画的 transform 算进去：奇数卡 translateX(-46px)、
         偶数卡 +46px，于是 P 被量成"真实周期 + 92px"（实测 2936 vs 2844）。
         后果是每循环一圈跳 92px，肉眼可见。offsetLeft 是布局值，不受
         transform 影响。
         ★ 也**不能**拿 scrollWidth / 3：栅格 gap 有 26 段，除不尽。 */
      P = mirror.offsetLeft - head.offsetLeft;
      maxScroll = track.scrollWidth - track.clientWidth;
      if (P <= 0 || maxScroll < P + 200) {     // 视口宽到摆不下一个循环窗口
        P = 0; track.scrollLeft = 0; started = false; return;
      }
      lo = (maxScroll - P) / 2;                // 窗口居中，两端余量对等
      acc = started ? track.scrollLeft : lo + P * 0.5;
      started = true;
      normalize();
      track.scrollLeft = acc;
    };

    var step = function (t) {
      raf = requestAnimationFrame(step);
      var dt = last ? Math.min(t - last, 64) : 0;   // 切回标签页时别一步跳出去
      last = t;
      if (!P || !visible || hovering || t < idleUntil) {
        if (P) { acc = track.scrollLeft; }
        return;
      }
      acc += SPEED * dt / 1000;
      normalize();
      track.scrollLeft = acc;
    };

    var poke = function () { idleUntil = performance.now() + IDLE; last = 0; };

    track.addEventListener('wheel', poke, { passive: true });
    track.addEventListener('touchstart', poke, { passive: true });
    track.addEventListener('touchmove', poke, { passive: true });
    track.addEventListener('pointerdown', poke, { passive: true });
    track.addEventListener('pointerenter', function (e) {
      if (e.pointerType === 'mouse') { hovering = true; }
    });
    track.addEventListener('pointerleave', function (e) {
      if (e.pointerType === 'mouse') { hovering = false; poke(); }
    });
    window.addEventListener('resize', measure, { passive: true });

    if (hasIO) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        if (visible) { acc = track.scrollLeft; last = 0; }
      }, { threshold: 0.05 }).observe(track);
    } else {
      visible = true;
    }

    measure();
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(measure); }
    window.addEventListener('load', measure);
    raf = requestAnimationFrame(step);
  }

  /* ── Features 前 4 张：滚动时叠成"牌堆" ─────────────────────────────
     机制借自 radialz 的 STEP 卡片：卡片在 CSS 里是 position: sticky +
     递减的 top，这里负责给"正被下一张盖住的那张"做纵深 ——
     缩小 5%、上移 10px、淡到 50%。
     只监听 scroll 并用 rAF 节流，一帧只算一次。 */
  var stack = document.querySelector('.feat-stack');
  if (stack) {
    var cards = [].slice.call(stack.querySelectorAll('.feat-item--stack'));
    var raf = 0;
    var updateDeck = function () {
      raf = 0;
      for (var i = 0; i < cards.length; i++) {
        var card = cards[i], next = cards[i + 1];
        var p = 0;
        if (next) {
          var cr = card.getBoundingClientRect();
          var nr = next.getBoundingClientRect();
          var range = cr.height || 1;
          p = Math.max(0, Math.min(1, 1 - (nr.top - cr.top) / range));
        }
        card.style.transform =
          'translateY(' + (-p * 10).toFixed(2) + 'px) scale(' +
          (1 - 0.05 * p).toFixed(4) + ')';
        card.style.opacity = String(1 - 0.5 * p);
      }
    };
    var onScroll = function () { if (!raf) { raf = requestAnimationFrame(updateDeck); } };
    updateDeck();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

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
