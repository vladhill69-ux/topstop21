document.addEventListener("DOMContentLoaded", () => {
  // YEAR
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
// SERVICES reveal on scroll (fixes invisible cards)
const serviceCards = document.querySelectorAll(".service-card");
if (serviceCards.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-in");
      });
    },
    { threshold: 0.15 }
  );
  serviceCards.forEach((card) => io.observe(card));
}

  // Sticky header scroll effect
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
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

  // Testimonials slider (kept as-is)
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
    if (!quoteEl || !nameEl || !metaEl) return;
    const t = testimonials[index];
    quoteEl.textContent = t.quote;
    nameEl.textContent = t.name;
    metaEl.textContent = t.meta;
    dotEls.forEach(dot => dot.classList.remove("active"));
    if (dotEls[index]) dotEls[index].classList.add("active");
  }

  dotEls.forEach((dot, i) => dot.addEventListener("click", () => setTestimonial(i)));

  let testimonialIndex = 0;
  setTestimonial(testimonialIndex);
  setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    setTestimonial(testimonialIndex);
  }, 9000);

  // Manual Gallery Slider (NO autoplay)
  const track = document.getElementById("galleryTrack");
  if (track) {
    const prev = document.querySelector(".gallery-arrow.prev");
    const next = document.querySelector(".gallery-arrow.next");

    function getStep() {
      const first = track.querySelector(".gallery-slide");
      if (!first) return 300;
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
      return first.getBoundingClientRect().width + gap;
    }

    function scrollBySlides(dir) {
      track.scrollBy({ left: dir * getStep(), behavior: "smooth" });
    }

    if (prev) prev.addEventListener("click", () => scrollBySlides(-1));
    if (next) next.addEventListener("click", () => scrollBySlides(1));

    // Keyboard support when focused
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") scrollBySlides(1);
      if (e.key === "ArrowLeft") scrollBySlides(-1);
    });
  }
  // =====================
// GALLERY LIGHTBOX
// =====================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.querySelector(".lightbox-close");

// Click gallery slide → open
document.querySelectorAll(".gallery-slide, .gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    const bg = item.style.backgroundImage;
    if (!bg) return;

    const imgUrl = bg.slice(5, -2); // remove url("...")
    lightboxImg.src = imgUrl;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

// Close button
closeBtn.addEventListener("click", closeLightbox);

// Click outside image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}
  //changeanim
  // Fade-in animation for services cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe each service card
document.querySelectorAll('.service-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

});
