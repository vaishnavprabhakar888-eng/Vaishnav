/* =====================================================
   1. EDIT YOUR CONTENT HERE (everything is sample text)
   Leave a value as "" (or [] ) and it is hidden.
   ===================================================== */
const CONFIG = {
  name: "Vaishnav",
  initials: "V",
  headline: "I build fast, reliable web products.",
  roles: ["Data Analyst"], // [] to disable
  intro: "SAMPLE: Replace this with two sentences about what you do and the value you bring.",
  availability: "Open to opportunities", // "" to hide
  accent: "", // optional CSS colour, e.g. "#75e3cf". Empty = default accent
  avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAizEoEajmGg6QFtMhDU2bTpTb7_YxKL9h2tWwGc6VDw&s=10", // e.g. "assets/images/profile.jpg". Empty = initials
  resume: "", // e.g. "assets/resume.pdf". Empty = button hidden

  location: "City, Country",
  email: "you@example.com",
  phone: "+10000000000", // international format, no spaces
  whatsapp: "10000000000", // digits only, with country code, no "+"
  whatsappMessage: "Hi! I found your portfolio and would like to connect.",
  social: { linkedin: "", github: "", instagram: "" }, // full profile URLs

  about: {
    paragraphs: [
      "SAMPLE: Introduce yourself and your background.",
      "SAMPLE: Describe your career journey, interests and how you approach problems."
    ],
    focus: ["Web application development", "API design", "Performance and accessibility"],
    stats: [] // e.g. [{ value: "3+", label: "Years of experience" }] (only add verifiable numbers)
  },

  skills: {
    "Frontend": ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS"],
    "Backend": ["Node.js", "Express", "REST APIs"],
    "Databases": ["MongoDB", "PostgreSQL"],
    "Tools": ["Git", "GitHub", "VS Code", "Figma"]
  },

  projects: [
    { title: "Sample Project One", category: "Web Development",
      desc: "SAMPLE: One or two sentences on the problem this solves.",
      features: ["Key feature or outcome"], tags: ["React", "Node.js", "MongoDB"],
      image: "", demo: "", code: "", caseStudy: "" },
    { title: "Sample Project Two", category: "Data Analytics",
      desc: "SAMPLE: Describe the dataset, method and insight.",
      features: [], tags: ["Python", "Pandas"], image: "", demo: "", code: "", caseStudy: "" },
    { title: "Sample Project Three", category: "Web Development",
      desc: "SAMPLE: Describe what you built and why.",
      features: [], tags: ["JavaScript", "Tailwind CSS"], image: "", demo: "", code: "", caseStudy: "" }
  ],

  experience: [
    { role: "Your Role or Qualification", org: "Company or Institution", period: "Start – End",
      points: ["SAMPLE: A responsibility or achievement."], tags: ["Tech"] }
  ],

  certs: [] // e.g. [{ title: "Certificate name", issuer: "Issuer", year: "2025", url: "" }]
};

/* =====================================================
   2. APP LOGIC
   ===================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const NAV = [["home", "Home"], ["about", "About"], ["skills", "Skills"], ["projects", "Projects"], ["experience", "Experience"], ["contact", "Contact"]];
const EXT = 'target="_blank" rel="noopener noreferrer"';

function renderBasics() {
  $$("[data-bind]").forEach((el) => { el.textContent = CONFIG[el.dataset.bind] || ""; });
  document.title = `${CONFIG.name} | Portfolio`;
  if (CONFIG.accent) document.documentElement.style.setProperty("--accent", CONFIG.accent);
  $("#availability").hidden = !CONFIG.availability;
  if (CONFIG.avatar) {
    const img = $("#avatar-img");
    img.src = CONFIG.avatar; img.hidden = false; $("#avatar-fallback").hidden = true;
  }
  const links = NAV.map(([id, label]) => `<a class="nav-link" href="#${id}" data-nav="${id}">${label}</a>`).join("");
  $("#desktop-nav").innerHTML = links;
  $("#mobile-nav").innerHTML = links + '<a class="btn btn-primary mt-2" href="#contact">Let\'s Connect</a>';
  $("#footer-nav").innerHTML = NAV.map(([id, l]) => `<a href="#${id}">${l}</a>`).join("");
  $("#year").textContent = new Date().getFullYear();
}

const socialItems = () => [
  ["linkedin", "LinkedIn", CONFIG.social.linkedin], ["github", "GitHub", CONFIG.social.github], ["instagram", "Instagram", CONFIG.social.instagram]
].filter((s) => s[2]);

function renderSocial() {
  const html = socialItems().map(([icon, label, url]) => `<a class="icon-btn" href="${esc(url)}" ${EXT} aria-label="${label} profile"><i data-lucide="${icon}"></i></a>`).join("");
  $("#hero-social").innerHTML = html; $("#footer-social").innerHTML = html;
}

function renderAbout() {
  const a = CONFIG.about;
  $("#about-text").innerHTML = a.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#about-focus").innerHTML = a.focus.length
    ? `<h3 class="mb-3 text-lg font-semibold">Focus areas</h3><ul class="space-y-2 text-muted">${a.focus.map((f) => `<li class="flex gap-2"><i data-lucide="check" class="mt-0.5 h-4 w-4 shrink-0 text-accent"></i>${esc(f)}</li>`).join("")}</ul>` : "";
  if (!a.focus.length) $("#about-focus").remove();
  $("#about-stats").innerHTML = a.stats.map((s) => `<div class="card p-4"><p class="font-heading text-2xl font-bold">${esc(s.value)}</p><p class="text-sm text-muted">${esc(s.label)}</p></div>`).join("");
  if (CONFIG.resume) { const b = $("#resume-btn"); b.href = CONFIG.resume; b.hidden = false; }
}

function renderSkills() {
  $("#skills-grid").innerHTML = Object.entries(CONFIG.skills).filter(([, l]) => l.length).map(([cat, list]) =>
    `<div class="card reveal p-6"><h3 class="mb-4 text-lg font-semibold">${esc(cat)}</h3><div class="flex flex-wrap gap-2">${list.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div></div>`).join("");
}

function renderProjects() {
  const cats = ["All", ...new Set(CONFIG.projects.map((p) => p.category).filter(Boolean))];
  $("#filters").innerHTML = cats.length > 2 ? cats.map((c, i) => `<button type="button" class="filter-btn" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join("") : "";
  $("#projects-grid").innerHTML = CONFIG.projects.map((p) => {
    const link = (url, icon, text) => url ? `<a class="link-sm" href="${esc(url)}" ${EXT}><i data-lucide="${icon}"></i>${text}</a>` : "";
    const thumb = p.image ? `<img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}" loading="lazy" width="640" height="360">` : '<i data-lucide="layout-template" class="h-10 w-10"></i>';
    return `<article class="card project reveal" data-category="${esc(p.category || "")}">
      <div class="project-thumb">${thumb}</div>
      <div class="flex flex-1 flex-col p-5">
        <h3 class="text-xl font-semibold">${esc(p.title)}</h3>
        <p class="mt-2 text-sm leading-relaxed text-muted">${esc(p.desc)}</p>
        ${p.features.length ? `<ul class="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
        <div class="mt-4 flex flex-wrap gap-2">${p.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
        <div class="mt-auto flex flex-wrap gap-x-4 pt-4">${link(p.demo, "external-link", "Live demo")}${link(p.code, "code-2", "Source code")}${link(p.caseStudy, "book-open", "Case study")}</div>
      </div></article>`;
  }).join("");
}

function renderExperience() {
  $("#timeline").innerHTML = CONFIG.experience.map((e) => `<li class="reveal">
    <h3 class="text-lg font-semibold">${esc(e.role)}</h3>
    <p class="text-sm text-muted">${esc(e.org)} &middot; ${esc(e.period)}</p>
    ${e.points.length ? `<ul class="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
    ${e.tags.length ? `<div class="mt-3 flex flex-wrap gap-2">${e.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>` : ""}</li>`).join("");
}

function renderCerts() {
  if (!CONFIG.certs.length) return;
  $("#achievements").hidden = false;
  $("#ach-grid").innerHTML = CONFIG.certs.map((c) => {
    const inner = `<i data-lucide="award" class="mt-0.5 h-5 w-5 shrink-0 text-accent"></i><div><h3 class="font-semibold">${esc(c.title)}</h3><p class="text-sm text-muted">${esc(c.issuer)}${c.year ? " &middot; " + esc(c.year) : ""}</p></div>`;
    return c.url ? `<a class="card card-link reveal" href="${esc(c.url)}" ${EXT}>${inner}</a>` : `<div class="card card-link reveal">${inner}</div>`;
  }).join("");
}

function renderContact() {
  const C = CONFIG, S = C.social, items = [];
  if (C.email) items.push(["mail", "Email", C.email, `mailto:${C.email}`, false]);
  if (C.phone) items.push(["phone", "Phone", C.phone, `tel:${C.phone}`, false]);
  if (C.whatsapp) items.push(["message-circle", "WhatsApp", "Chat directly", `https://wa.me/${C.whatsapp.replace(/\D/g, "")}${C.whatsappMessage ? "?text=" + encodeURIComponent(C.whatsappMessage) : ""}`, true]);
  if (S.linkedin) items.push(["linkedin", "LinkedIn", "Connect professionally", S.linkedin, true]);
  if (S.github) items.push(["github", "GitHub", "Browse my code", S.github, true]);
  if (S.instagram) items.push(["instagram", "Instagram", "Follow along", S.instagram, true]);
  const cards = items.map(([icon, label, desc, href, ext]) =>
    `<a class="card card-link reveal" href="${esc(href)}" ${ext ? EXT : ""}><span class="ico"><i data-lucide="${icon}"></i></span><span><span class="block font-semibold">${label}</span><span class="block break-all text-sm text-muted">${esc(desc)}</span></span></a>`);
  if (C.location) cards.push(`<div class="card card-link reveal"><span class="ico"><i data-lucide="map-pin"></i></span><span><span class="block font-semibold">Location</span><span class="block text-sm text-muted">${esc(C.location)}</span></span></div>`);
  $("#contact-grid").innerHTML = cards.join("");
}

function initTheme() {
  const root = document.documentElement, meta = $('meta[name="theme-color"]');
  const apply = (t) => { root.dataset.theme = t; if (meta) meta.content = t === "dark" ? "#0b0d10" : "#fafaf9"; };
  let saved = null; try { saved = localStorage.getItem("theme"); } catch (e) {}
  apply(saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
  $("#theme-toggle").addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    apply(next); try { localStorage.setItem("theme", next); } catch (e) {}
  });
}

function initMenu() {
  const btn = $("#menu-toggle"), menu = $("#mobile-menu"), header = $("#header");
  const set = (open) => {
    menu.hidden = !open; btn.setAttribute("aria-expanded", open);
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    btn.innerHTML = `<i data-lucide="${open ? "x" : "menu"}"></i>`; lucide.createIcons();
  };
  btn.addEventListener("click", () => set(menu.hidden));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
  document.addEventListener("click", (e) => { if (!menu.hidden && !header.contains(e.target)) set(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { set(false); btn.focus(); } });
  matchMedia("(min-width: 768px)").addEventListener("change", (e) => { if (e.matches) set(false); });
}

function initActiveNav() {
  const links = $$("[data-nav]");
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (!en.isIntersecting) return;
    links.forEach((l) => { const on = l.dataset.nav === en.target.id; l.classList.toggle("active", on); on ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current"); });
  }), { rootMargin: "-45% 0px -50% 0px" });
  NAV.forEach(([id]) => { const s = document.getElementById(id); if (s) io.observe(s); });
}

function initReveal() {
  const items = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) return items.forEach((i) => i.classList.add("visible"));
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  items.forEach((i) => io.observe(i));
}

function initFilters() {
  const bar = $("#filters");
  bar.addEventListener("click", (e) => {
    const b = e.target.closest(".filter-btn"); if (!b) return;
    $$(".filter-btn", bar).forEach((x) => x.setAttribute("aria-pressed", x === b));
    $$(".project").forEach((card) => { card.hidden = b.dataset.filter !== "All" && card.dataset.category !== b.dataset.filter; });
  });
}

function initRoles() {
  const el = $("#role-text"), roles = CONFIG.roles;
  if (!roles.length) return;
  if (reduceMotion || roles.length === 1) { el.textContent = roles[0]; return; }
  let r = 0, c = 0, del = false;
  (function tick() {
    const word = roles[r];
    el.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(tick, 1600); }
    if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 70);
  })();
}

function initToTop() {
  $("#to-top").addEventListener("click", () => scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
}

document.addEventListener("DOMContentLoaded", () => {
  renderBasics(); renderSocial(); renderAbout(); renderSkills(); renderProjects(); renderExperience(); renderCerts(); renderContact();
  lucide.createIcons();
  initTheme(); initMenu(); initActiveNav(); initReveal(); initFilters(); initRoles(); initToTop();
});