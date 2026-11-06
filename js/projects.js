/* ==========================================================================
   AZ — Abdullah Zare · projects.js
   Category filtering for the projects archive (projects.html).
   Pure vanilla JS — chips with aria-pressed, animated show/hide.
   ========================================================================== */
(function () {
  "use strict";

  var bar = document.querySelector("[data-filter-bar]");
  if (!bar) return;

  var chips = bar.querySelectorAll(".filter-chip");
  var rows = document.querySelectorAll("[data-category]");
  var countEl = document.querySelector("[data-result-count]");

  function faNumber(n) {
    var fa = "۰۱۲۳۴۵۶۷۸۹";
    return String(n).replace(/\d/g, function (d) {
      return fa[+d];
    });
  }

  function applyFilter(value) {
    var visible = 0;
    rows.forEach(function (row) {
      var match = value === "all" || row.getAttribute("data-category") === value;
      row.classList.toggle("is-hidden", !match);
      if (match) visible++;
    });
    if (countEl) {
      countEl.textContent =
        value === "all"
          ? faNumber(visible) + " پروژه"
          : faNumber(visible) + " پروژه در این دسته";
    }
    // Re-trigger a soft entrance for the remaining rows
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rows.forEach(function (row, i) {
        if (!row.classList.contains("is-hidden")) {
          row.style.opacity = "0";
          row.style.transform = "translateY(8px)";
          row.style.transition = "none";
          // force reflow, then animate in
          void row.offsetWidth;
          row.style.transition = "";
          row.style.transitionDelay = (i * 40) + "ms";
          row.style.opacity = "1";
          row.style.transform = "none";
          window.setTimeout(function () {
            row.style.transitionDelay = "";
          }, 400 + i * 40);
        }
      });
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) {
        c.setAttribute("aria-pressed", c === chip ? "true" : "false");
      });
      applyFilter(chip.getAttribute("data-filter"));
    });
  });

  // Initial count
  if (countEl) countEl.textContent = faNumber(rows.length) + " پروژه";
})();
