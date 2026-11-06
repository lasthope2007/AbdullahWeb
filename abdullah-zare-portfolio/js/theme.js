/* ==========================================================================
   AZ — Abdullah Zare · theme.js
   Light/dark theme switching with localStorage persistence.
   The initial theme is applied by a tiny inline script in <head> (no FOUC);
   this module only wires the toggle button and system-preference changes.
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "az-theme";
  var root = document.documentElement;

  function storedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function systemTheme() {
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function currentTheme() {
    return root.getAttribute("data-theme") || systemTheme();
  }

  function applyTheme(theme, animate) {
    if (animate) {
      root.classList.add("theme-anim");
      window.setTimeout(function () {
        root.classList.remove("theme-anim");
      }, 320);
    }
    root.setAttribute("data-theme", theme);
    updateToggleState(theme);
  }

  function updateToggleState(theme) {
    var toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    toggle.setAttribute(
      "aria-label",
      theme === "dark" ? "تغییر به تم روشن" : "تغییر به تم تیره"
    );
    toggle.setAttribute(
      "title",
      theme === "dark" ? "تم روشن" : "تم تیره"
    );
  }

  function persist(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* storage unavailable (private mode) — theme still applies for session */
    }
  }

  // Wire the toggle button(s)
  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      applyTheme(next, true);
      persist(next);
    });
  });

  // Follow OS preference live — only when the user has not chosen manually
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function (e) {
      if (!storedTheme()) applyTheme(e.matches ? "dark" : "light", true);
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  // Sync button state with the theme the inline script already applied
  updateToggleState(currentTheme());
})();
