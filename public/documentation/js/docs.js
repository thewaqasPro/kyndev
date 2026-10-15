/**
 * KYNDEV Documentation Portal - Client Controller
 * Pure vanilla JavaScript: Fast, zero-dependency, works offline.
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initCopyButtons();
  initTocTracking();
  initMobileNav();
  initQuickSearch();
});

// Theme Toggle (Dark / Light)
function initTheme() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem("kyndev-docs-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(toggleBtn, savedTheme);

  toggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("kyndev-docs-theme", nextTheme);
    updateThemeIcon(toggleBtn, nextTheme);
  });
}

function updateThemeIcon(btn, theme) {
  btn.innerHTML = theme === "dark" ? "☀️" : "🌙";
  btn.title = theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
}

// 1-Click Code Copy to Clipboard
function initCopyButtons() {
  const codeBlocks = document.querySelectorAll("pre");
  codeBlocks.forEach((pre) => {
    // Check if code-header already exists before pre
    let header = pre.previousElementSibling;
    let btn;

    if (header && header.classList.contains("code-header")) {
      btn = header.querySelector(".copy-btn");
    } else {
      btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.style.cssText = "position: absolute; top: 8px; right: 8px;";
      btn.textContent = "Copy";
      pre.appendChild(btn);
    }

    if (btn) {
      btn.addEventListener("click", () => {
        const code = pre.querySelector("code") || pre;
        const text = code.innerText || code.textContent;
        navigator.clipboard.writeText(text).then(() => {
          const orig = btn.textContent;
          btn.textContent = "Copied!";
          btn.style.color = "#10b981";
          btn.style.borderColor = "#10b981";
          setTimeout(() => {
            btn.textContent = orig;
            btn.style.color = "";
            btn.style.borderColor = "";
          }, 2000);
        });
      });
    }
  });
}

// Scrollspy for Right Sidebar Table of Contents
function initTocTracking() {
  const tocLinks = document.querySelectorAll(".toc-item a");
  const headings = document.querySelectorAll(".prose h2, .prose h3");
  if (!tocLinks.length || !headings.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (!id) return;
          tocLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${id}`) {
              link.parentElement.classList.add("active");
            } else {
              link.parentElement.classList.remove("active");
            }
          });
        }
      });
    },
    { rootMargin: "0px 0px -70% 0px" }
  );

  headings.forEach((h) => observer.observe(h));
}

// Mobile Sidebar Drawer Toggle
function initMobileNav() {
  const toggle = document.querySelector(".mobile-nav-toggle");
  const sidebar = document.querySelector(".docs-sidebar");
  if (!toggle || !sidebar) return;

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (sidebar.classList.contains("open") && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
      sidebar.classList.remove("open");
    }
  });
}

// Quick In-Page & Sidebar Search Filter
function initQuickSearch() {
  const searchInput = document.getElementById("docs-search-input");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const navItems = document.querySelectorAll(".sidebar-nav-item");

    if (!query) {
      navItems.forEach((item) => (item.style.display = ""));
      return;
    }

    navItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? "" : "none";
    });
  });
}
