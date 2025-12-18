document.addEventListener("DOMContentLoaded", () => {
  // YEAR
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sticky header scroll effect
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".site-header");
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
     
 

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
  dotEls.forEach((dot, i) => {
    dot.addEventListener("click", () => setTestimonial(i));
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
      }
    });
  });

  // Contact form validation
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const serviceType = contactForm.serviceType.value.trim();
      const message = contactForm.message.value.trim();
      if (!name || !email || !serviceType || !message) {
        formStatus.textContent = "Please fill in all required fields (*) before sending.";
        formStatus.style.color = "var(--danger)";
        return;
      }
      formStatus.textContent = "Thanks for your message! We'll get back to you soon.";
      formStatus.style.color = "var(--accent)";
      contactForm.reset();
    });
  }
});
