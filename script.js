'use strict';

/* ============================================================
   HEADER — スクロール時に背景を付与
============================================================ */
const header = document.getElementById('header');

function handleHeaderScroll() {
  if (window.scrollY > 60) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
}

window.addEventListener('scroll', handleHeaderScroll, { passive: true });
handleHeaderScroll(); // 初期状態チェック


/* ============================================================
   MOBILE NAV — バーガーメニュー
============================================================ */
const burgerBtn   = document.getElementById('burgerBtn');
const headerNav   = document.getElementById('headerNav');

// モバイル用オーバーレイを動的生成
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
navOverlay.setAttribute('role', 'dialog');
navOverlay.setAttribute('aria-modal', 'true');
navOverlay.setAttribute('aria-label', 'ナビゲーションメニュー');

// ナビリストをクローンしてオーバーレイに追加
const navClone = headerNav.querySelector('.header__nav-list').cloneNode(true);
navOverlay.appendChild(navClone);

// 閉じるボタン
const closeBtn = document.createElement('button');
closeBtn.className = 'btn btn--ghost';
closeBtn.textContent = '× 閉じる';
closeBtn.setAttribute('aria-label', 'メニューを閉じる');
navOverlay.appendChild(closeBtn);

document.body.appendChild(navOverlay);

function openMenu() {
  navOverlay.classList.add('is-open');
  burgerBtn.classList.add('is-open');
  burgerBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navOverlay.classList.remove('is-open');
  burgerBtn.classList.remove('is-open');
  burgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

burgerBtn.addEventListener('click', () => {
  if (navOverlay.classList.contains('is-open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

closeBtn.addEventListener('click', closeMenu);

// オーバーレイ内のリンクをクリックしたらメニューを閉じる
navOverlay.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Escape キーで閉じる
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navOverlay.classList.contains('is-open')) {
    closeMenu();
  }
});


/* ============================================================
   SCROLL ANIMATION — Intersection Observer
============================================================ */
const aosElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const delay = parseInt(entry.target.dataset.aosDelay ?? 0, 10);

      setTimeout(() => {
        entry.target.classList.add('is-visible');
      }, delay);

      aosObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  }
);

aosElements.forEach(el => aosObserver.observe(el));


/* ============================================================
   SMOOTH SCROLL — アンカーリンク
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const headerHeight = header.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
