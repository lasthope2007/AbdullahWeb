"use strict";

/* ==========================================================
   Translations — all visible text lives here.
   To add a string: add the same key to BOTH objects, then reference it
   with data-i18n="key" (text) or data-i18n-aria="key" (aria-label) in index.html.
   A missing Persian key falls back to English; if both are missing the
   text already written in index.html is left untouched.
   ========================================================== */
const translations = {
  en: {
    "meta.title": "Abdullah Zare (عبدالله زارع) | Computer Engineering Student",
    "meta.description": "Abdullah Zare (عبدالله زارع), also spelled Abdollah Zare, is a Computer Engineering student interested in technology, programming, and building useful digital experiences.",
    "skip": "Skip to content",
    "brand": "Abdullah Zare",
    "brand.initials": "AZ",
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
    "a11y.newTab": "(opens in a new tab)",
    "footer.copy": "© 2026 Abdullah Zare. All rights reserved.",
  },
  fa: {
    "meta.title": "عبدالله زارع | دانشجوی مهندسی کامپیوتر",
    "meta.description": "عبدالله زارع (Abdullah Zare)، دانشجوی مهندسی کامپیوتر و علاقه‌مند به فناوری، برنامه‌نویسی و ساخت تجربه‌های دیجیتال کاربردی.",
    "skip": "رفتن به محتوا",
    "brand": "عبدالله زارع",
    "brand.initials": "ع ز",
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
    "a11y.newTab": "(در تب جدید باز می‌شود)",
    "footer.copy": "© ۱۴۰۵ عبدالله زارع. تمامی حقوق محفوظ است.",
  },
};

const languages = {
  en: { dir: "ltr", locale: "en_US" },
  fa: { dir: "rtl", locale: "fa_IR" },
};

const DEFAULT_LANG = "en";

/* Metadata elements updated on every language change: [selector, attribute, translation key].
   Elements that are missing from the page are skipped silently. */
const metaBindings = [
  ['meta[name="description"]', "content", "meta.description"],
  ['meta[property="og:title"]', "content", "meta.title"],
  ['meta[property="og:description"]', "content", "meta.description"],
  ['meta[name="twitter:title"]', "content", "meta.title"],
  ['meta[name="twitter:description"]', "content", "meta.description"],
];

/* ==========================================================
   Projects — intentionally empty until real projects exist. Add objects like this:
   {
     title:       { en: "Project name", fa: "نام پروژه" },
     description: { en: "What it is.",  fa: "توضیح پروژه." },
     tags:        ["HTML", "CSS"],                         // optional
     image:       "assets/images/x.webp",                  // optional
     imageAlt:    { en: "Screenshot of …", fa: "…" },      // optional; leave out if the image is purely decorative
     url:         "https://example.com"                    // optional, full http(s) address
   }
   ========================================================== */
const projects = [];

/* ==========================================================
   Helpers
   ========================================================== */
const STORAGE_KEY = "az-portfolio-lang";
const root = document.documentElement;
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
const isLang = (value) => typeof value === "string" && hasOwn(languages, value);
const reducedMotion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };

/* Translation lookup: chosen language -> English -> undefined (caller keeps existing text). */
function lookup(lang, key) {
  const own = translations[lang];
  if (own && hasOwn(own, key)) return own[key];
  return hasOwn(translations[DEFAULT_LANG], key) ? translations[DEFAULT_LANG][key] : undefined;
}

/* Same as lookup, but never undefined (used for text built in JavaScript). */
const t = (lang, key) => lookup(lang, key) ?? key;

function readStoredLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isLang(stored) ? stored : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG; // storage blocked or unavailable
  }
}

function storeLang(lang) {
  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* storage unavailable: preference lasts for this visit only */ }
}

/* addEventListener on MediaQueryList is missing in very old Safari. */
function onMediaChange(query, handler) {
  if (query.addEventListener) query.addEventListener("change", handler);
  else if (query.addListener) query.addListener(handler);
}

/* Only allow web/mail links from the projects array (blocks javascript: and similar). */
function safeLink(value) {
  try {
    const url = new URL(value, document.baseURI);
    return ["https:", "http:", "mailto:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

/* ==========================================================
   Language
   ========================================================== */
let currentLang = DEFAULT_LANG;

function applyLanguage(lang, { animate = false } = {}) {
  if (!isLang(lang)) lang = DEFAULT_LANG;
  currentLang = lang;

  const { dir, locale } = languages[lang];
  const alternateLocale = languages[lang === "en" ? "fa" : "en"].locale;

  root.lang = lang;
  root.dir = dir;

  $$("[data-i18n]").forEach((el) => {
    const text = lookup(lang, el.dataset.i18n);
    if (text !== undefined) el.textContent = text;
  });
  $$("[data-i18n-aria]").forEach((el) => {
    const label = lookup(lang, el.dataset.i18nAria);
    if (label !== undefined) el.setAttribute("aria-label", label);
  });

  // Document title and social/SEO metadata (each element is optional)
  const title = lookup(lang, "meta.title");
  if (title !== undefined) document.title = title;
  metaBindings.forEach(([selector, attribute, key]) => {
    const el = $(selector);
    const value = lookup(lang, key);
    if (el && value !== undefined) el.setAttribute(attribute, value);
  });
  const ogLocale = $('meta[property="og:locale"]');
  if (ogLocale) ogLocale.setAttribute("content", locale);
  const ogAlternate = $('meta[property="og:locale:alternate"]');
  if (ogAlternate) ogAlternate.setAttribute("content", alternateLocale);

  $$("[data-lang]").forEach((btn) => btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang)));
  updateMenuLabel();
  renderProjects();

  if (animate && !reducedMotion.matches) {
    document.body.classList.remove("lang-fade");
    void document.body.offsetWidth; // restart the animation
    document.body.classList.add("lang-fade");
  }
}

function initLanguage() {
  applyLanguage(readStoredLang());
  $$("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      if (!isLang(lang) || lang === currentLang) return;
      storeLang(lang);
      applyLanguage(lang, { animate: true });
    });
  });
}

/* ==========================================================
   Header logo: show the initials if the logo image is missing or broken
   ========================================================== */
function initBrandMark() {
  const mark = $("#brandMark");
  const img = mark && $("img", mark);
  if (!mark || !img) return;

  const showInitials = () => mark.classList.add("is-fallback");
  img.addEventListener("error", showInitials);
  // The error may already have happened before this script ran
  if (img.complete && img.naturalWidth === 0) showInitials();
}

/* ==========================================================
   Projects rendering
   ========================================================== */
function renderProjects() {
  const grid = $("#projectGrid");
  const empty = $("#projectsEmpty");
  const template = $("#projectCardTemplate");
  if (!grid || !template) return;

  grid.replaceChildren();
  const hasProjects = projects.length > 0;
  grid.hidden = !hasProjects;
  if (empty) empty.hidden = hasProjects;

  projects.forEach((project) => {
    const card = template.content.firstElementChild.cloneNode(true);
    const title = project.title?.[currentLang] ?? project.title?.en ?? "";
    $(".project-title", card).textContent = title;
    $(".project-desc", card).textContent = project.description?.[currentLang] ?? project.description?.en ?? "";

    if (project.image) {
      const img = $(".project-media", card);
      img.src = project.image;
      img.alt = project.imageAlt?.[currentLang] ?? project.imageAlt?.en ?? ""; // empty alt = decorative
      img.hidden = false;
    }
    (project.tags ?? []).forEach((tag) => {
      const li = document.createElement("li");
      li.textContent = tag;
      $(".project-tags", card).append(li);
    });
    const href = project.url ? safeLink(project.url) : null;
    if (href) {
      const link = $(".project-link", card);
      const label = t(currentLang, "projects.visit");
      link.href = href;
      link.textContent = label;
      link.setAttribute("aria-label", title ? `${label}: ${title}` : label);
      link.hidden = false;
    }
    grid.append(card);
  });
}

/* ==========================================================
   Header, mobile menu, scroll behaviour
   ========================================================== */
function updateMenuLabel() {
  const menuToggle = $("#menuToggle");
  if (!menuToggle) return;
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  const label = lookup(currentLang, open ? "menu.close" : "menu.open");
  if (label !== undefined) menuToggle.setAttribute("aria-label", label);
}

function initHeader() {
  const header = $("#header");
  const nav = $("#nav");
  const menuToggle = $("#menuToggle");

  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  if (!header || !nav || !menuToggle) return;

  const setMenu = (open) => {
    menuToggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    updateMenuLabel();
  };

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
  if (window.matchMedia) {
    onMediaChange(window.matchMedia("(min-width: 821px)"), (e) => { if (e.matches) setMenu(false); });
  }
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
  const sections = $$("main section[id]");
  if (!links.length || !sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => {
        const active = a.hash === `#${entry.target.id}`;
        a.classList.toggle("is-active", active);
        if (active) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((section) => observer.observe(section));
}

/* ==========================================================
   Init — each step is isolated so one failure cannot break the rest
   ========================================================== */
function init() {
  [initReveal, initLanguage, initBrandMark, initHeader, initActiveLink].forEach((step) => {
    try { step(); } catch (error) { console.error(`${step.name} failed:`, error); }
  });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
