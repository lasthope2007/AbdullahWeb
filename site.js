(()=>{"use strict";
const root=document.documentElement;
const themeButton=document.querySelector(".theme-toggle");
const menuButton=document.querySelector(".menu-toggle");
const nav=document.querySelector(".main-nav");
const storedTheme=(()=>{try{return localStorage.getItem("az-theme")}catch{return null}})();
const preferredDark=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;
function applyTheme(theme){root.dataset.theme=theme;if(themeButton){const dark=theme==="dark";themeButton.setAttribute("aria-label",dark?"فعال‌کردن حالت روشن":"فعال‌کردن حالت تیره");themeButton.setAttribute("aria-pressed",String(dark));}try{localStorage.setItem("az-theme",theme)}catch{}}
applyTheme(storedTheme==="dark"||storedTheme==="light"?storedTheme:(preferredDark?"dark":"light"));
themeButton?.addEventListener("click",()=>applyTheme(root.dataset.theme==="dark"?"light":"dark"));
function closeMenu(){if(!menuButton||!nav)return;menuButton.setAttribute("aria-expanded","false");menuButton.setAttribute("aria-label","باز کردن منو");nav.classList.remove("is-open")}
menuButton?.addEventListener("click",()=>{const open=menuButton.getAttribute("aria-expanded")!=="true";menuButton.setAttribute("aria-expanded",String(open));menuButton.setAttribute("aria-label",open?"بستن منو":"باز کردن منو");nav?.classList.toggle("is-open",open)});
nav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",closeMenu));
document.addEventListener("keydown",event=>{if(event.key==="Escape")closeMenu()});
const sections=[...document.querySelectorAll("main section[id]")];
if("IntersectionObserver"in window){const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");revealObserver.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll(".section-heading,.about-detail,.interest-item,.contact-panel,.intro-band-inner").forEach(el=>{el.classList.add("reveal");revealObserver.observe(el)});
const activeObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){nav?.querySelectorAll(".nav-link").forEach(link=>link.classList.toggle("is-active",link.getAttribute("href")==="#"+entry.target.id))}}),{rootMargin:"-35% 0px -55% 0px"});sections.forEach(section=>activeObserver.observe(section))}
})();