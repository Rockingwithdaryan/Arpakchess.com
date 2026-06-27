/* =============================================
   chess-portfolio.js
   Handles: active nav highlighting on scroll,
   smooth nav link behaviour, and any future
   interactivity you want to add.
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     ACTIVE NAV LINK ON SCROLL
     Highlights the nav link for whichever
     section is currently in view.
  ------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));

  /* ------------------------------------------
     NAV SHADOW ON SCROLL
     Adds a subtle shadow to the nav once the
     user scrolls down past the top.
  ------------------------------------------ */
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });

  /* ------------------------------------------
     SCROLL-IN ANIMATION
     Cards and sections fade up when they
     enter the viewport.
     To disable: remove the 'fade-up' class
     from elements in index.html, or delete
     this block entirely.
  ------------------------------------------ */
  const fadeEls = document.querySelectorAll(
    '.achievement-card, .testimonial-card, .about-grid, .contact-wrap'
  );

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  fadeEls.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObserver.observe(el);
  });

  /* ------------------------------------------
     ADD YOUR OWN JS BELOW THIS LINE
     e.g. a lightbox for photos, a mobile
     hamburger menu, a contact form handler, etc.
  ------------------------------------------ */

});