// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();// Sticky header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
// BEFORE & AFTER DRAG SLIDER
const baContainer = document.querySelector(".ba-container");
const afterImg = document.querySelector(".after-img");
const baHandle = document.querySelector(".ba-handle");

let isDragging = false;

const startDrag = () => (isDragging = true);
const stopDrag = () => (isDragging = false);

const drag = (e) => {
  if (!isDragging) return;

  let rect = baContainer.getBoundingClientRect();
  let xPos = (e.clientX || e.touches[0].clientX) - rect.left;

  if (xPos < 0) xPos = 0;
  if (xPos > rect.width) xPos = rect.width;

  let percent = (xPos / rect.width) * 100;
  afterImg.style.width = percent + "%";
  baHandle.style.left = percent + "%";
};

baHandle.addEventListener("mousedown", startDrag);
baHandle.addEventListener("touchstart", startDrag, { passive: true });

window.addEventListener("mouseup", stopDrag);
window.addEventListener("touchend", stopDrag);

window.addEventListener("mousemove", drag);
window.addEventListener("touchmove", drag, { passive: true });

// Mobile nav toggle
const burgerButton = document.getElementById("burgerButton");
const mobileMenu = document.getElementById("mobileMenu");
burgerButton.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  burgerButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

// Close mobile menu on link click
mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    burgerButton.setAttribute("aria-expanded", "false");
  });
});

// Testimonials slider
const testimonials = [
  {
    quote: "“Top Coat Stoppers 21 nailed our reno. The painters were stoked with the prep and we hit our move-in date easily.”",
    name: "Sam, Builder",
    meta: "Full house reno"
  },
  {
    quote: "“Super tidy workmanship and really clear communication. They explained exactly what they were doing and why.”",
    name: "Aimee, Homeowner",
    meta: "Lounge + hallway skim coat"
  },
  {
    quote: "“We’ll definitely use them again. Deadlines were tight but they still delivered a high-quality finish.”",
    name: "Mark, Project Manager",
    meta: "Office refit"
  }
];

const quoteEl = document.getElementById("testimonialQuote");
const nameEl = document.getElementById("testimonialName");
const metaEl = document.getElementById("testimonialMeta");
const dotEls = document.querySelectorAll(".testimonial-dot");

function setTestimonial(index) {
  const t = testimonials[index];
  quoteEl.textContent = t.quote;
  nameEl.textContent = t.name;
  metaEl.textContent = t.meta;
  dotEls.forEach(dot => dot.classList.remove("active"));
  dotEls[index].classList.add("active");
}

dotEls.forEach(dot => {
  dot.addEventListener("click", () => {
    const index = parseInt(dot.getAttribute("data-index"), 10);
    setTestimonial(index);
  });
});

let testimonialIndex = 0;
setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  setTestimonial(testimonialIndex);
}, 9000);

// FAQ accordion
document.querySelectorAll(".faq-item").forEach(item => {
  const question = item.querySelector(".faq-question");
  const toggle = item.querySelector(".faq-toggle");

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach(i => {
      i.classList.remove("open");
      const t = i.querySelector(".faq-toggle");
      if (t) t.textContent = "+";
    });
    if (!isOpen) {
      item.classList.add("open");
      toggle.textContent = "–";
    } else {
      toggle.textContent = "+";
    }
  });
});

// Simple contact form validation (demo only)
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formStatus.textContent = "";

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const serviceType = contactForm.serviceType.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !serviceType || !message) {
    formStatus.textContent = "Please fill in all required fields (*) before sending.";
    formStatus.style.color = "#b91c1c";
    return;
  }

  formStatus.textContent = "Thanks for your message! This demo form doesn’t send yet – connect it to your email or CRM to go live.";
  formStatus.style.color = "#059669";
  contactForm.reset();
});
