/* Konek Aja — interactions */
(function () {
  "use strict";

  /* ---------- scroll progress bar ---------- */
  var progress = document.getElementById("scrollProgress");
  function updateProgress() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var ratio = max > 0 ? window.scrollY / max : 0;
    progress.style.transform = "scaleX(" + ratio + ")";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ---------- mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- count-up stats ---------- */
  function animateCount(el) {
    var target = parseFloat(el.dataset.target);
    var decimals = parseInt(el.dataset.decimals || "0", 10);
    var suffix = el.dataset.suffix || "";
    var duration = 1800;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      var eased = 1 - Math.pow(1 - p, 3);
      var value = target * eased;
      el.textContent =
        value.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        }) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var counted = new WeakSet();
  var countObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !counted.has(entry.target)) {
          counted.add(entry.target);
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll(".count").forEach(function (el) {
    countObserver.observe(el);
  });

  /* ---------- promo countdown (12h cycle, persisted) ---------- */
  var KEY = "konekaja-promo-end";
  var TWELVE_H = 12 * 60 * 60 * 1000;
  var end = parseInt(localStorage.getItem(KEY) || "0", 10);
  if (!end || end < Date.now()) {
    end = Date.now() + TWELVE_H;
    localStorage.setItem(KEY, String(end));
  }

  var elH = document.getElementById("cdH");
  var elM = document.getElementById("cdM");
  var elS = document.getElementById("cdS");

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function tick() {
    var left = end - Date.now();
    if (left <= 0) {
      end = Date.now() + TWELVE_H;
      localStorage.setItem(KEY, String(end));
      left = TWELVE_H;
    }
    elH.textContent = pad(Math.floor(left / 3600000));
    elM.textContent = pad(Math.floor((left % 3600000) / 60000));
    elS.textContent = pad(Math.floor((left % 60000) / 1000));
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- FAQ: close others when one opens ---------- */
  var faqs = document.querySelectorAll(".faq-item");
  faqs.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (item.open) {
        faqs.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ---------- cursor neon glow ---------- */
  var glow = document.getElementById("cursorGlow");
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (glow && finePointer && !reducedMotion) {
    var targetX = window.innerWidth / 2;
    var targetY = window.innerHeight / 2;
    var glowX = targetX;
    var glowY = targetY;
    var glowVisible = false;

    window.addEventListener(
      "mousemove",
      function (e) {
        targetX = e.clientX;
        targetY = e.clientY;
        if (!glowVisible) {
          glowVisible = true;
          glowX = targetX;
          glowY = targetY;
          glow.style.opacity = "1";
        }
      },
      { passive: true }
    );

    document.documentElement.addEventListener("mouseleave", function () {
      glowVisible = false;
      glow.style.opacity = "0";
    });

    (function follow() {
      // lerp for a smooth trailing motion
      glowX += (targetX - glowX) * 0.12;
      glowY += (targetY - glowY) * 0.12;
      glow.style.transform = "translate(" + glowX + "px," + glowY + "px)";
      requestAnimationFrame(follow);
    })();
  } else if (glow) {
    glow.style.display = "none";
  }

  /* ---------- reveal on scroll ---------- */
  var revealTargets = document.querySelectorAll(
    ".section-head, .stat-card, .promo-card, .product-card, .feature-card, .timeline-item, .cta-card"
  );
  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach(function (el) {
    revealObserver.observe(el);
  });
})();
