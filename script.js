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
      // Revolving gallery (spotlight + auto-rotate)
  const track = document.getElementById("revolveTrack");
  const dotsWrap = document.getElementById("revolveDots");
  const prevBtn = document.querySelector(".revolve-btn.prev");
  const nextBtn = document.querySelector(".revolve-btn.next");

  if (track) {
    const slides = Array.from(track.querySelectorAll(".revolve-slide"));
    let index = slides.findIndex(s => s.classList.contains("is-active"));
    if (index < 0) index = 0;

    // Build dots
    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      slides.forEach((_, i) => {
        const d = document.createElement("button");
        d.type = "button";
        d.className = "revolve-dot" + (i === index ? " active" : "");
        d.setAttribute("aria-label", `Go to photo ${i + 1}`);
        d.addEventListener("click", () => goTo(i));
        dotsWrap.appendChild(d);
      });
    }

    function update() {
      slides.forEach((s, i) => s.classList.toggle("is-active", i === index));

      // Reorder visually by translating track so active slide is centered
      const active = slides[index];
      const viewport = track.closest(".revolve-viewport");
      if (viewport && active) {
        const vpRect = viewport.getBoundingClientRect();
        const aRect = active.getBoundingClientRect();
        const delta = (vpRect.left + vpRect.width / 2) - (aRect.left + aRect.width / 2);
        track.style.transform = `translateX(${delta}px)`;
      }

      if (dotsWrap) {
        dotsWrap.querySelectorAll(".revolve-dot").forEach((d, i) => {
          d.classList.toggle("active", i === index);
        });
      }
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      update();
      restartAuto();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    // Click slide to focus it
    slides.forEach((s, i) => s.addEventListener("click", () => goTo(i)));

    // Buttons
    if (nextBtn) nextBtn.addEventListener("click", next);
    if (prevBtn) prevBtn.addEventListener("click", prev);

    // Auto rotate + pause on hover
    let timer = null;
    const AUTO_MS = 4200;

    function startAuto() {
      timer = setInterval(next, AUTO_MS);
    }
    function stopAuto() {
      if (timer) clearInterval(timer);
      timer = null;
    }
    function restartAuto() {
      stopAuto();
      startAuto();
    }

    const viewport = track.closest(".revolve-viewport");
    if (viewport) {
      viewport.addEventListener("mouseenter", stopAuto);
      viewport.addEventListener("mouseleave", startAuto);
      viewport.addEventListener("touchstart", stopAuto, { passive: true });
      viewport.addEventListener("touchend", startAuto);
    }

    // Keyboard support
    document.addEventListener("keydown", (e) => {
      const inGallery = document.activeElement && document.activeElement.closest && document.activeElement.closest("#gallery");
      if (!inGallery) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    });

    // Initial render
    update();
    startAuto();

    // Re-center on resize
    window.addEventListener("resize", () => update());
  }

  });

  // Burger menu
  const burger = document.getElementById("burgerButton");
  const mobileMenu = document.getElementById("mobileMenu");
  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      const open = burger.classList.toggle("open");
      mobileMenu.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        burger.classList.remove("open");
        mobileMenu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
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
