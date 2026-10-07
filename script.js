"use strict";

/* ==========================================================
   Translations — all visible text lives here.
   To add a language string: add the same key to both objects
   and reference it with data-i18n="key" in index.html.
   ========================================================== */
const translations = {
  en: {
    "meta.title": "Abdullah Zare | Computer Engineering Student",
    "meta.description": "Abdullah Zare is a Computer Engineering student interested in technology, programming, and building useful digital experiences.",
    "skip": "Skip to content",
    "brand": "Abdullah Zare",
    "nav.label": "Main navigation",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "lang.label": "Language",
    "menu.open": "Open menu",
    "menu.close": "Close menu",
    "hero.glyph": "AZ",
    "hero.name": "Abdullah Zare",
    "hero.role": "Computer Engineering Student",
    "hero.intro": "I'm Abdullah Zare, a Computer Engineering student interested in technology, programming, and building useful digital experiences.",
    "hero.cta.projects": "View Projects",
    "hero.cta.contact": "Contact Me",
    "about.title": "About Me",
    "about.text": "I'm Abdullah Zare, a Computer Engineering student focused on learning, improving my technical knowledge, and building my path in the world of technology.",
    "projects.title": "Projects",
    "projects.emptyTitle": "Projects Coming Soon",
    "projects.emptyText": "I'm currently working on building my projects. New projects will be added here soon.",
    "projects.visit": "View project",
    "contact.title": "Let's Connect",
    "contact.text": "If you'd like to connect with me, you can find me through the platforms below.",
    "contact.email": "Email",
    "footer.copy": "© 2026 Abdullah Zare. All rights reserved.",
  },
  fa: {
    "meta.title": "عبدالله زارع | دانشجوی مهندسی کامپیوتر",
    "meta.description": "عبدالله زارع، دانشجوی مهندسی کامپیوتر و علاقه‌مند به فناوری، برنامه‌نویسی و ساخت تجربه‌های دیجیتال کاربردی.",
    "skip": "رفتن به محتوا",
    "brand": "عبدالله زارع",
    "nav.label": "ناوبری اصلی",
    "nav.home": "خانه",
    "nav.about": "درباره من",
    "nav.projects": "پروژه‌ها",
    "nav.contact": "ارتباط با من",
    "lang.label": "زبان",
    "menu.open": "باز کردن منو",
    "menu.close": "بستن منو",
    "hero.glyph": "ع ز",
    "hero.name": "عبدالله زارع",
    "hero.role": "دانشجوی مهندسی کامپیوتر",
    "hero.intro": "من عبدالله زارع هستم، دانشجوی مهندسی کامپیوتر و علاقه‌مند به فناوری، برنامه‌نویسی و ساخت تجربه‌های دیجیتال کاربردی.",
    "hero.cta.projects": "مشاهده پروژه‌ها",
    "hero.cta.contact": "ارتباط با من",
    "about.title": "درباره من",
    "about.text": "من عبدالله زارع هستم، دانشجوی مهندسی کامپیوتر و در مسیر یادگیری، افزایش دانش فنی و ساختن مسیر حرفه‌ای خودم در دنیای فناوری هستم.",
    "projects.title": "پروژه‌ها",
    "projects.emptyTitle": "پروژه‌ها به‌زودی",
    "projects.emptyText": "در حال ساخت و توسعه پروژه‌های خودم هستم. پروژه‌های جدید به‌زودی در این بخش قرار خواهند گرفت.",
    "projects.visit": "مشاهده پروژه",
    "contact.title": "در ارتباط باشیم",
    "contact.text": "برای ارتباط با من می‌توانید از راه‌های زیر با من در تماس باشید.",
    "contact.email": "ایمیل",
    "footer.copy": "© ۱۴۰۵ عبدالله زارع. تمامی حقوق محفوظ است.",
  },
};

const languages = {
  en: { dir: "ltr", locale: "en_US" },
  fa: { dir: "rtl", locale: "fa_IR" },
};

/* ==========================================================
   Projects — intentionally empty. Add objects like this:
   {
     title:       { en: "Project name", fa: "نام پروژه" },
     description: { en: "What it is.",  fa: "توضیح پروژه." },
     tags:        ["HTML", "CSS"],          // optional
     image:       "assets/images/x.webp",   // optional
     url:         "https://example.com"     // optional
   }
   ========================================================== */
const projects = [];

/* ==========================================================
   Helpers
   ========================================================== */
const STORAGE_KEY = "az-portfolio-lang";
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const t = (lang, key) => translations[lang][key] ?? translations.en[key] ?? key;

function readStoredLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored in languages ? stored : "en";
  } catch {
    return "en";
  }
}

function storeLang(lang) {
  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* storage unavailable */ }
}

/* ==========================================================
   Language
   ========================================================== */
let currentLang = "en";

function applyLanguage(lang, { animate = false } = {}) {
  currentLang = lang;
  const { dir, locale } = languages[lang];

  document.documentElement.lang = lang;
  document.documentElement.dir = dir;

  $$("[data-i18n]").forEach((el) => { el.textContent = t(lang, el.dataset.i18n); });
  $$("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(lang, el.dataset.i18nAria)); });

  $("#heroGlyph").textContent = t(lang, "hero.glyph");
  updateMenuLabel();

  // Metadata
  document.title = t(lang, "meta.title");
  $('meta[name="description"]').content = t(lang, "meta.description");
  $('meta[property="og:title"]').content = t(lang, "meta.title");
  $('meta[property="og:description"]').content = t(lang, "meta.description");
  $('meta[property="og:locale"]').content = locale;

  $$("[data-lang]").forEach((btn) => btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang)));
  renderProjects();

  if (animate && !reducedMotion.matches) {
    document.body.classList.remove("lang-fade");
    void document.body.offsetWidth; // restart animation
    document.body.classList.add("lang-fade");
  }
}

function initLanguage() {
  applyLanguage(readStoredLang());
  $$("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      if (lang === currentLang) return;
      storeLang(lang);
      applyLanguage(lang, { animate: true });
    });
  });
}

/* ==========================================================
   Projects rendering
   ========================================================== */
function renderProjects() {
  const grid = $("#projectGrid");
  const empty = $("#projectsEmpty");
  const template = $("#projectCardTemplate");

  grid.replaceChildren();
  const hasProjects = projects.length > 0;
  grid.hidden = !hasProjects;
  empty.hidden = hasProjects;

  projects.forEach((project) => {
    const card = template.content.firstElementChild.cloneNode(true);
    const title = project.title[currentLang] ?? project.title.en;
    $(".project-title", card).textContent = title;
    $(".project-desc", card).textContent = project.description[currentLang] ?? project.description.en;

    if (project.image) {
      const img = $(".project-media", card);
      img.src = project.image;
      img.alt = title;
      img.hidden = false;
    }
    (project.tags ?? []).forEach((tag) => {
      const li = document.createElement("li");
      li.textContent = tag;
      $(".project-tags", card).append(li);
    });
    if (project.url) {
      const link = $(".project-link", card);
      link.href = project.url;
      link.textContent = t(currentLang, "projects.visit");
      link.hidden = false;
    }
    grid.append(card);
  });
}

/* ==========================================================
   Header, mobile menu, scroll behaviour
   ========================================================== */
const header = $("#header");
const nav = $("#nav");
const menuToggle = $("#menuToggle");

function updateMenuLabel() {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-label", t(currentLang, open ? "menu.close" : "menu.open"));
}

function setMenu(open) {
  menuToggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
  updateMenuLabel();
}

function initHeader() {
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  menuToggle.addEventListener("click", () => setMenu(menuToggle.getAttribute("aria-expanded") !== "true"));
  $$("a", nav).forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      menuToggle.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("is-open") && !header.contains(e.target)) setMenu(false);
  });
  window.matchMedia("(min-width: 821px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });
}

/* ==========================================================
   Reveal on scroll + active nav link
   ========================================================== */
function initReveal() {
  const items = $$("[data-reveal]");
  if (!("IntersectionObserver" in window) || reducedMotion.matches) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach((el) => observer.observe(el));
}

function initActiveLink() {
  if (!("IntersectionObserver" in window)) return;
  const links = $$(".nav-list a");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("is-active", a.hash === `#${entry.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach((section) => observer.observe(section));
}

/* ==========================================================
   Init
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  initHeader();
  initReveal();
  initActiveLink();
});
