/* ============================================================
   Renaissance Realty Trust - main.js
   Vanilla, dependency-free, progressive enhancement.
   Everything degrades gracefully if JS is off or APIs are missing.
   ============================================================ */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Sticky nav state ---------- */
  var nav = document.querySelector(".nav");
  function onScrollNav() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  onScrollNav();
  window.addEventListener("scroll", onScrollNav, { passive: true });

  /* ---------- 2. Mobile menu toggle ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  function closeMenu() { document.body.classList.remove("menu-open"); if (toggle) toggle.setAttribute("aria-expanded", "false"); }
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
    // Tap outside the nav (on the scrim / page) closes the menu.
    document.addEventListener("click", function (e) {
      if (document.body.classList.contains("menu-open") && !e.target.closest(".nav")) {
        closeMenu();
      }
    });
  }

  /* ---------- 3. Scroll reveals ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  }

  /* ---------- 4. Active section highlighting in nav ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a[href^="#"]'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { sectionObs.observe(s); });
  }

  /* ---------- 5. Lightweight parallax (hero media) ---------- */
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));
  var canParallax = !prefersReduced && window.innerWidth > 760 && parallaxEls.length;
  if (canParallax) {
    var ticking = false;
    function applyParallax() {
      var y = window.scrollY;
      parallaxEls.forEach(function (el) {
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.15;
        el.style.transform = "translate3d(0," + (y * speed).toFixed(1) + "px,0) scale(1.08)";
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(applyParallax); ticking = true; }
    }, { passive: true });
    applyParallax();
  }

  /* ---------- 6. Background video control ---------- */
  var videos = Array.prototype.slice.call(document.querySelectorAll("video[data-bg]"));
  videos.forEach(function (v) {
    // No media wired in yet -> leave the CSS gradient fallback alone (and keep the console clean).
    var hasSource = v.currentSrc || v.getAttribute("src") || v.querySelector("source");
    if (!hasSource) return;

    // Respect reduced-motion: show the poster instead of autoplaying.
    if (prefersReduced) {
      v.removeAttribute("autoplay");
      try { v.pause(); } catch (e) {}
      Array.prototype.slice.call(v.querySelectorAll("source")).forEach(function (s) { s.remove(); });
      v.load();
      return;
    }
    // Play on all viewports (incl. mobile). Requires muted + playsinline for iOS/Android autoplay.
    v.muted = true;
    v.setAttribute("playsinline", "");
    var p = v.play && v.play();
    if (p && p.catch) p.catch(function () {}); // autoplay may be blocked; poster remains

    // Pause when offscreen to save resources.
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { var pp = v.play(); if (pp && pp.catch) pp.catch(function () {}); }
          else { try { v.pause(); } catch (e) {} }
        });
      }, { threshold: 0.05 }).observe(v);
    }
  });

  /* ---------- 7. Footer year ---------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    // Static fallback content is already "2026"; only overwrite if Date is available.
    try { yearEl.textContent = String(new Date().getFullYear()); } catch (e) {}
  }
})();
