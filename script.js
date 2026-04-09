document.addEventListener("DOMContentLoaded", () => {

  // ─── YEAR ───
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ─── STICKY HEADER ───
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  // ─── BURGER MENU ───
  const burger     = document.getElementById("burgerButton");
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

  // ─── SERVICE CARDS: scroll-reveal fly-in ───
  const serviceCards = document.querySelectorAll(".service-card");
  if (serviceCards.length) {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("is-in"); }),
      { threshold: 0.15 }
    );
    serviceCards.forEach(card => io.observe(card));
  }

  // ─── TESTIMONIALS SLIDER ───
  const testimonials = [
    {
      quote: "\u201cTop Coat Stoppers 21 nailed our reno. The painters were stoked with the prep and we hit our move-in date easily.\u201d",
      name:  "Sam, Builder",
      meta:  "Full house reno"
    },
    {
      quote: "\u201cSuper tidy workmanship and really clear communication. They explained exactly what they were doing and why.\u201d",
      name:  "Aimee, Homeowner",
      meta:  "Lounge + hallway skim coat"
    },
    {
      quote: "\u201cWe\u2019ll definitely use them again. Deadlines were tight but they still delivered a high-quality finish.\u201d",
      name:  "Mark, Project Manager",
      meta:  "Office refit"
    }
  ];

  const quoteEl = document.getElementById("testimonialQuote");
  const nameEl  = document.getElementById("testimonialName");
  const metaEl  = document.getElementById("testimonialMeta");
  const dotEls  = document.querySelectorAll(".testimonial-dot");

  function setTestimonial(index) {
    if (!quoteEl || !nameEl || !metaEl) return;
    const t = testimonials[index];
    quoteEl.textContent = t.quote;
    nameEl.textContent  = t.name;
    metaEl.textContent  = t.meta;
    dotEls.forEach(d => d.classList.remove("active"));
    if (dotEls[index]) dotEls[index].classList.add("active");
  }

  dotEls.forEach((dot, i) => dot.addEventListener("click", () => {
    testimonialIndex = i;
    setTestimonial(i);
  }));

  let testimonialIndex = 0;
  setTestimonial(0);

  setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    setTestimonial(testimonialIndex);
  }, 9000);

  // ─── GALLERY SLIDER (manual, no autoplay) ───
  const track = document.getElementById("galleryTrack");
  if (track) {
    const prev = document.querySelector(".gallery-arrow.prev");
    const next = document.querySelector(".gallery-arrow.next");

    function getStep() {
      const first = track.querySelector(".gallery-slide");
      if (!first) return 300;
      const gap = parseFloat(window.getComputedStyle(track).columnGap || "0") || 0;
      return first.getBoundingClientRect().width + gap;
    }

    function scrollBySlides(dir) {
      track.scrollBy({ left: dir * getStep(), behavior: "smooth" });
    }

    if (prev) prev.addEventListener("click", () => scrollBySlides(-1));
    if (next) next.addEventListener("click", () => scrollBySlides(1));

    track.addEventListener("keydown", e => {
      if (e.key === "ArrowRight") scrollBySlides(1);
      if (e.key === "ArrowLeft")  scrollBySlides(-1);
    });
  }

  // ─── GALLERY LIGHTBOX ───
  const lightbox    = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn    = document.querySelector(".lightbox-close");

  document.querySelectorAll(".gallery-slide, .gallery-item").forEach(item => {
    item.addEventListener("click", () => {
      const bg = item.style.backgroundImage;
      if (!bg) return;
      const url = bg.slice(5, -2); // strip url("...")
      lightboxImg.src = url;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

  if (lightbox) {
    lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
  }

  document.addEventListener("keydown", e => { if (e.key === "Escape") closeLightbox(); });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  // ─── CONTACT FORM ───
  //
  // Uses Web3Forms (https://web3forms.com) — free tier, no backend needed.
  // Replace YOUR_ACCESS_KEY_HERE in index.html with your key from web3forms.com.
  //
  const contactForm = document.getElementById("contactForm");
  const formStatus  = document.getElementById("formStatus");
  const submitBtn   = document.getElementById("submitBtn");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Basic client-side validation
      const name  = contactForm.querySelector("[name='name']").value.trim();
      const email = contactForm.querySelector("[name='email']").value.trim();

      if (!name || !email) {
        showStatus("Please fill in your name and email.", "error");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showStatus("Please enter a valid email address.", "error");
        return;
      }

      // Disable button during send
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      showStatus("", "");

      try {
        const formData = new FormData(contactForm);
        const object   = Object.fromEntries(formData);
        const json     = JSON.stringify(object);

        const res = await fetch("https://api.web3forms.com/submit", {
          method:  "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body:    json
        });

        const data = await res.json();

        if (data.success) {
          showStatus("✓ Message sent! We'll be in touch soon.", "success");
          contactForm.reset();
        } else {
          // Likely the access_key hasn't been set yet
          if (object.access_key === "YOUR_ACCESS_KEY_HERE") {
            showStatus("⚠ Form not yet configured. Call us on +64 22 028 2757.", "error");
          } else {
            showStatus("Something went wrong. Please call us directly.", "error");
          }
        }
      } catch (err) {
        showStatus("Network error. Please call us on +64 22 028 2757.", "error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message →";
      }
    });
  }

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className   = "form-status" + (type ? " " + type : "");
  }

});
