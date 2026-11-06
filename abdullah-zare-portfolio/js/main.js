/* ==========================================================================
   AZ — Abdullah Zare · main.js
   Site configuration + shared behavior: mobile menu, reveal-on-scroll,
   back-to-top, copy-to-clipboard, optional social links.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     SITE CONFIG — edit these values to enable social links.
     Leave a value empty ("") to keep that link hidden / marked pending.
     Example: instagramUrl: "https://instagram.com/your_username"
     ------------------------------------------------------------------ */
  var AZ_SITE = {
    instagramUrl: "", // ← set your real Instagram profile URL here
    linkedinUrl: "", // ← set your real LinkedIn profile URL here
  };

  document.documentElement.classList.add("js");

  /* ---------------- Mobile navigation ---------------- */
  var header = document.querySelector(".site-header");
  var menuBtn = document.querySelector("[data-menu-toggle]");
  var mobileMenu = document.querySelector(".mobile-menu");

  function setMenu(open) {
    if (!mobileMenu || !menuBtn) return;
    document.body.classList.toggle("menu-locked", open);
    if (open) {
      document.body.setAttribute("data-menu-open", "");
      mobileMenu.classList.add("is-open");
      menuBtn.setAttribute("aria-expanded", "true");
      var firstLink = mobileMenu.querySelector("a");
      if (firstLink) firstLink.focus();
    } else {
      document.body.removeAttribute("data-menu-open");
      mobileMenu.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      var isOpen = document.body.hasAttribute("data-menu-open");
      setMenu(!isOpen);
    });
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && document.body.hasAttribute("data-menu-open")) {
      setMenu(false);
      if (menuBtn) menuBtn.focus();
    }
  });

  document.addEventListener("click", function (e) {
    if (
      document.body.hasAttribute("data-menu-open") &&
      mobileMenu &&
      !mobileMenu.contains(e.target) &&
      menuBtn &&
      !menuBtn.contains(e.target)
    ) {
      setMenu(false);
    }
  });

  /* ---------------- Header scroll state ---------------- */
  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------------- Reveal on scroll ---------------- */
  var revealEls = document.querySelectorAll(".reveal");
  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (revealEls.length && "IntersectionObserver" in window && !prefersReduced) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* ---------------- Back to top ---------------- */
  var backToTop = document.querySelector("[data-back-to-top]");
  function onScrollTopBtn() {
    if (!backToTop) return;
    backToTop.classList.toggle("is-visible", window.scrollY > 640);
  }
  window.addEventListener("scroll", onScrollTopBtn, { passive: true });
  onScrollTopBtn();
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  /* ---------------- Copy to clipboard (contact email) ---------------- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy") || "";
      var done = function () {
        btn.classList.add("copied");
        var label = btn.querySelector("[data-copy-label]");
        if (label) {
          var original = label.textContent;
          label.textContent = "کپی شد";
          window.setTimeout(function () {
            label.textContent = original;
            btn.classList.remove("copied");
          }, 1800);
        }
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
        } catch (e) {
          /* clipboard unavailable */
        }
        document.body.removeChild(ta);
        done();
      }
    });
  });

  /* ---------------- Optional social links (Instagram / LinkedIn) --------
     Rows in contact page + footer are rendered as "pending" placeholders.
     When AZ_SITE URLs above are filled, they become real links.          */
  function upgradeSocialLink(attr, url) {
    if (!url) return;
    document.querySelectorAll("[data-social='" + attr + "']").forEach(function (el) {
      if (el.tagName === "A") {
        el.setAttribute("href", url);
        el.removeAttribute("aria-disabled");
      } else {
        // Replace a <span>/<li> placeholder with a real anchor
        var a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
        a.setAttribute("data-social", attr);
        a.innerHTML = el.innerHTML;
        a.className = el.className;
        el.replaceWith(a);
      }
      var pending = el.parentElement && el.parentElement.querySelector(".pending");
      if (pending && el.parentElement) pending.remove();
    });
  }
  upgradeSocialLink("instagram", AZ_SITE.instagramUrl);
  upgradeSocialLink("linkedin", AZ_SITE.linkedinUrl);
})();
