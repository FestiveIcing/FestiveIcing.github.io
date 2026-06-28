const signalContent = {
  platform: {
    title: "Platform modernization with operational clarity",
    description:
      "We replace fragile systems with resilient architecture, measurable delivery standards, and visibility that leadership can actually use.",
    points: [
      "Cloud migration strategy with measurable milestones",
      "Unified data flows for product and operations teams",
      "Launch-grade observability without interface clutter",
    ],
    metrics: ["+38%", "-41%", "High signal"],
  },
  ai: {
    title: "Applied AI that makes teams faster, not noisier",
    description:
      "We design intelligent workflows, retrieval-backed copilots, and automation loops that help real operators make better decisions faster.",
    points: [
      "Assistant workflows connected to internal knowledge",
      "Decision support interfaces with human approval paths",
      "Automation guardrails that keep quality visible",
    ],
    metrics: ["+52%", "-28%", "Human guided"],
  },
  security: {
    title: "Security posture built into the delivery rhythm",
    description:
      "Controls should be precise, auditable, and calm. We bring review loops, access boundaries, and better defaults into the core system design.",
    points: [
      "Least-privilege access and cleaner role boundaries",
      "Operational dashboards for risk, audits, and drift",
      "Secure automation that does not trade speed for confidence",
    ],
    metrics: ["99.9%", "-47%", "Audit ready"],
  },
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const tabButtons = Array.from(document.querySelectorAll(".signal-pill"));
const title = document.getElementById("signal-title");
const description = document.getElementById("signal-description");
const list = document.getElementById("signal-list");
const metrics = [
  document.getElementById("metric-one"),
  document.getElementById("metric-two"),
  document.getElementById("metric-three"),
];

function setSignal(signalKey) {
  const selected = signalContent[signalKey];
  if (!selected) return;

  title.textContent = selected.title;
  description.textContent = selected.description;
  list.innerHTML = selected.points.map((point) => `<li>${point}</li>`).join("");
  selected.metrics.forEach((value, index) => {
    metrics[index].textContent = value;
  });

  tabButtons.forEach((button) => {
    const active = button.dataset.signal === signalKey;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });

  const activeButton = tabButtons.find((button) => button.dataset.signal === signalKey);
  if (activeButton) {
    document.getElementById("signal-panel").setAttribute("aria-labelledby", activeButton.id);
  }
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => setSignal(button.dataset.signal));
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = `${entry.target.dataset.progress}%`;
        progressObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll(".progress-fill").forEach((bar) => progressObserver.observe(bar));

const topbar = document.querySelector(".topbar");
window.addEventListener("scroll", () => {
  topbar.classList.toggle("is-scrolled", window.scrollY > 12);
});

document.addEventListener("mousemove", (event) => {
  const x = (event.clientX / window.innerWidth) * 100;
  const y = (event.clientY / window.innerHeight) * 100;
  document.body.style.setProperty("--pointer-x", `${x}%`);
  document.body.style.setProperty("--pointer-y", `${y}%`);
});

if (!prefersReducedMotion.matches) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const rotateX = ((y / bounds.height) - 0.5) * -5;
      const rotateY = ((x / bounds.width) - 0.5) * 5;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const name = data.get("name");
  const email = data.get("email");
  const focus = data.get("focus");
  const brief = data.get("brief");

  const subject = encodeURIComponent(`Project inquiry: ${focus}`);
  const body = encodeURIComponent(
    [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project Focus: ${focus}`,
      "",
      "Brief:",
      brief,
      "",
      "Requested via the Starlight Solutions website demo.",
    ].join("\n")
  );

  window.location.href = `mailto:hello@starlightsolutions.inc?subject=${subject}&body=${body}`;
  formStatus.textContent = "Draft opened in your mail client. Update the destination address if needed.";
});

const canvas = document.getElementById("starfield");
const context = canvas.getContext("2d");
let stars = [];
let animationFrame = null;
let pointer = { x: 0, y: 0 };

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  createStars(width, height);
}

function createStars(width, height) {
  const count = Math.max(70, Math.round((width * height) / 9000));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.8 + 0.4,
    speed: Math.random() * 0.2 + 0.05,
    alpha: Math.random() * 0.7 + 0.15,
  }));
}

function drawStarfield() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  context.clearRect(0, 0, width, height);

  const gradient = context.createRadialGradient(
    width * 0.6 + pointer.x * 0.02,
    height * 0.35 + pointer.y * 0.02,
    0,
    width * 0.5,
    height * 0.5,
    width * 0.8
  );
  gradient.addColorStop(0, "rgba(139, 92, 246, 0.18)");
  gradient.addColorStop(0.45, "rgba(34, 211, 238, 0.07)");
  gradient.addColorStop(1, "rgba(5, 8, 22, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  stars.forEach((star) => {
    star.y += star.speed;
    if (star.y > height + 2) {
      star.y = -4;
      star.x = Math.random() * width;
    }

    const parallaxX = pointer.x * 0.012 * (star.radius / 2);
    const parallaxY = pointer.y * 0.01 * (star.radius / 2);
    context.beginPath();
    context.arc(star.x + parallaxX, star.y + parallaxY, star.radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(248, 250, 252, ${star.alpha})`;
    context.fill();
  });

  for (let index = 0; index < stars.length; index += 1) {
    const star = stars[index];
    const next = stars[index + 1];
    if (!next) continue;
    const dx = star.x - next.x;
    const dy = star.y - next.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 90) {
      context.strokeStyle = "rgba(148, 163, 184, 0.08)";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(star.x, star.y);
      context.lineTo(next.x, next.y);
      context.stroke();
    }
  }

  animationFrame = window.requestAnimationFrame(drawStarfield);
}

canvas.addEventListener("mousemove", (event) => {
  const bounds = canvas.getBoundingClientRect();
  pointer.x = event.clientX - bounds.left - bounds.width / 2;
  pointer.y = event.clientY - bounds.top - bounds.height / 2;
});

canvas.addEventListener("mouseleave", () => {
  pointer = { x: 0, y: 0 };
});

window.addEventListener("resize", resizeCanvas);

function startStarfield() {
  resizeCanvas();
  if (!prefersReducedMotion.matches) {
    drawStarfield();
  } else {
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    stars.forEach((star) => {
      context.beginPath();
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(248, 250, 252, ${star.alpha})`;
      context.fill();
    });
  }
}

prefersReducedMotion.addEventListener("change", () => {
  if (animationFrame) {
    window.cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
  startStarfield();
});

setSignal("platform");
startStarfield();
