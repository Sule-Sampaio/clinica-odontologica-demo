const loader = document.querySelector(".page-loader");
window.addEventListener("load", () => {
  setTimeout(() => loader?.classList.add("hide"), 300);
});

const header = document.querySelector(".header");
const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 20);
  backToTop?.classList.toggle("show", window.scrollY > 500);
});

backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const btn = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
btn?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  btn.setAttribute("aria-expanded", open ? "true" : "false");
});
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const counters = document.querySelectorAll("[data-counter]");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.counter);
    let current = 0;
    const steps = 50;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString("pt-BR") + (target === 98 ? "%" : target === 10 ? "+" : "+");
    }, 24);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(el => counterObserver.observe(el));

document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    const answer = item.querySelector(".faq-answer");
    item.classList.toggle("open");
    answer.style.maxHeight = item.classList.contains("open") ? answer.scrollHeight + "px" : "0px";
  });
});

const tilt = document.querySelector(".tilt-card");
tilt?.addEventListener("mousemove", (e) => {
  const rect = tilt.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  tilt.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${y * -6}deg)`;
});
tilt?.addEventListener("mouseleave", () => {
  tilt.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
});
