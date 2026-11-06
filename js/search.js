/* ==========================================================================
   AZ — Abdullah Zare · search.js
   Client-side search + category filtering for the writing index (writing.html).
   Normalizes common Persian typographic variants before matching.
   ========================================================================== */
(function () {
  "use strict";

  var searchWrap = document.querySelector("[data-search]");
  if (!searchWrap) return;

  var input = searchWrap.querySelector("input[type='search']");
  var chips = document.querySelectorAll("[data-cat-filter]");
  var rows = document.querySelectorAll("[data-article]");
  var countEl = document.querySelector("[data-search-count]");
  var emptyEl = document.querySelector("[data-search-empty]");

  function faNumber(n) {
    var fa = "۰۱۲۳۴۵۶۷۸۹";
    return String(n).replace(/\d/g, function (d) {
      return fa[+d];
    });
  }

  /* Normalize: unify Arabic/Persian letter variants, drop ZWNJ & diacritics */
  function normalize(text) {
    return String(text)
      .toLowerCase()
      .replace(/[\u064A\u0649]/g, "\u06CC") // ي/ى → ی
      .replace(/\u0643/g, "\u06A9") // ك → ک
      .replace(/[\u200C\u200F\u200E]/g, " ") // ZWNJ & marks → space
      .replace(/[\u064B-\u0652]/g, "") // harakat
      .replace(/\s+/g, " ")
      .trim();
  }

  var activeCategory = "all";

  function apply() {
    var query = normalize(input ? input.value : "");
    var terms = query ? query.split(" ") : [];
    var visible = 0;

    rows.forEach(function (row) {
      var haystack = normalize(row.getAttribute("data-article"));
      var inCategory =
        activeCategory === "all" ||
        row.getAttribute("data-cat") === activeCategory;
      var matches =
        terms.length === 0 ||
        terms.every(function (t) {
          return haystack.indexOf(t) !== -1;
        });
      var show = inCategory && matches;
      row.classList.toggle("is-hidden", !show);
      if (show) visible++;
    });

    if (emptyEl) emptyEl.style.display = visible === 0 ? "" : "none";
    if (countEl) {
      countEl.textContent = terms.length || activeCategory !== "all"
        ? faNumber(visible) + " نوشتار"
        : faNumber(visible) + " نوشتار";
    }
  }

  if (input) {
    input.addEventListener("input", apply);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        input.value = "";
        apply();
      }
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) {
        c.setAttribute("aria-pressed", c === chip ? "true" : "false");
      });
      activeCategory = chip.getAttribute("data-cat-filter");
      apply();
    });
  });

  /* "/" focuses the search box (when not typing in a field) */
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement !== input) {
      var tag = (document.activeElement && document.activeElement.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      e.preventDefault();
      input.focus();
    }
  });

  // Initial state
  apply();
})();
