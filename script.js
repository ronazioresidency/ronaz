/* ============================================================
   RONAZIO — ULTRA PREMIUM script.js v2.0
   ============================================================ */

/* ──────────────────────────────────────────────
   1. CUSTOM CURSOR
   ────────────────────────────────────────────── */
(function initCursor() {
  const dot  = document.createElement('div'); dot.id  = 'cursor-dot';
  const ring = document.createElement('div'); ring.id = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Cursor scale on interactive elements
  document.querySelectorAll('a, button, .gallery-item, .room-unique-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform  = 'translate(-50%,-50%) scale(2.5)';
      ring.style.transform = 'translate(-50%,-50%) scale(1.5)';
      ring.style.borderColor = 'var(--gold-light)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform  = 'translate(-50%,-50%) scale(1)';
      ring.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.borderColor = '';
    });
  });
})();

/* ──────────────────────────────────────────────
   2. LOADER — CINEMATIC CURTAIN BUILD
   ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  const loaderWrapper = document.getElementById('loader-wrapper');

  // Inject curtain panels + ornaments into existing loader
  if (loaderWrapper) {
    const loaderContent = loaderWrapper.querySelector('.loader-content');

    // Curtain panels
    const cl = document.createElement('div'); cl.className = 'loader-curtain-left';
    const cr = document.createElement('div'); cr.className = 'loader-curtain-right';
    loaderWrapper.insertBefore(cl, loaderContent);
    loaderWrapper.insertBefore(cr, loaderContent);

    // Decorative rings
    const ro = document.createElement('div'); ro.className = 'loader-ring-outer';
    const ri = document.createElement('div'); ri.className = 'loader-ring-inner';
    loaderContent.prepend(ri);
    loaderContent.prepend(ro);

    // Corner ornaments
    ['tl','tr','bl','br'].forEach(pos => {
      const c = document.createElement('div');
      c.className = `loader-corner loader-corner-${pos}`;
      loaderWrapper.appendChild(c);
    });

    // Progress bar + tagline
    const barTrack = document.createElement('div'); barTrack.className = 'loader-bar-track';
    const barFill  = document.createElement('div'); barFill.className  = 'loader-bar-fill';
    barTrack.appendChild(barFill);
    loaderContent.appendChild(barTrack);

    const tag = document.createElement('p'); tag.className = 'loader-tagline';
    tag.textContent = 'Auroville · ECR Road · Puducherry';
    loaderContent.appendChild(tag);
  }

  const video = document.getElementById('heroVideo');

  const initSite = () => {
    if (loaderWrapper) {
      loaderWrapper.classList.add('loader-hidden');
      document.body.classList.add('loaded');
      document.body.style.overflow = 'auto';
    }
  };

  window.addEventListener('load', () => {
    if (video) video.play().catch(() => {});
    setTimeout(initSite, 4000);
  });

  setTimeout(initSite, 6500);
});

/* ──────────────────────────────────────────────
   3. NAV SCROLL EFFECT
   ────────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.royal-nav');
  if (!nav) return;
  nav.classList.toggle('scrolled', window.pageYOffset > 60);
});

/* ──────────────────────────────────────────────
   4. SMOOTH SCROLLING
   ────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ──────────────────────────────────────────────
   5. PARALLAX — ABOUT IMAGES
   ────────────────────────────────────────────── */
window.addEventListener('scroll', function () {
  const scrollPos   = window.pageYOffset;
  const aboutSection = document.querySelector('.ronazio-custom-about');
  if (!aboutSection) return;

  const sectionTop = aboutSection.offsetTop;
  const mainCard   = document.querySelector('.ronazio-card-main');
  const subCard    = document.querySelector('.ronazio-card-sub');

  if (mainCard && subCard && scrollPos > sectionTop - 900) {
    const offset = (scrollPos - sectionTop) * 0.06;
    mainCard.style.transform = `translateY(${offset}px)`;
    subCard.style.transform  = `translateY(${-offset * 0.8}px)`;
  }
});

/* ──────────────────────────────────────────────
   6. INTERSECTION OBSERVER — REVEAL ANIMATIONS
   ────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', () => {
  // Add reveal classes to elements
  document.querySelectorAll('.ronazio-content-box .col-lg-6:first-child').forEach(el => {
    el.classList.add('reveal-left');
    revealObserver.observe(el);
  });
  document.querySelectorAll('.ronazio-content-box .col-lg-6:last-child').forEach(el => {
    el.classList.add('reveal-right');
    revealObserver.observe(el);
  });
  document.querySelectorAll('.ronazio-perk-item').forEach(el => {
    revealObserver.observe(el);
  });
  document.querySelectorAll('.room-unique-card').forEach((el, i) => {
    el.classList.add('section-reveal');
    el.style.transitionDelay = (i * 0.1) + 's';
    revealObserver.observe(el);
  });
  document.querySelectorAll('.contact-royal-label, .ronazio-form-glass').forEach(el => {
    el.classList.add('section-reveal');
    revealObserver.observe(el);
  });
  const titles = document.querySelectorAll('.ronazio-title, .ronazio-label');
  titles.forEach(el => {
    el.classList.add('section-reveal');
    revealObserver.observe(el);
  });
});

/* ──────────────────────────────────────────────
   7. STAT COUNTER ANIMATION
   ────────────────────────────────────────────── */
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 1800;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const val = Math.floor(progress * target);
    el.textContent = (val || target === 4 ? val : val) + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.stat-item h3');
      const data = [['150', '+'], ['4', '★'], ['10', '+'], ['5', '']];
      items.forEach((el, i) => {
        setTimeout(() => animateCounter(el, parseInt(data[i][0]), data[i][1]), i * 200);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
  const statsRow = document.querySelector('.stats-row');
  if (statsRow) statsObserver.observe(statsRow);
});

/* ──────────────────────────────────────────────
   8. BOOKING MODAL — WAVE OPEN / CLOSE
   ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  const modal          = document.getElementById('booking-modal-unique');
  const closeBtn       = document.querySelector('#booking-modal-unique .rich-close-wrapper');
  const roomTriggers   = document.querySelectorAll('.btn-royal-trigger');
  const slidesContainer = document.getElementById('modal-slides-container');
  const mName          = document.getElementById('m-room-name');
  const mDesc          = document.getElementById('m-room-desc');

  if (!modal) return;

  roomTriggers.forEach(btn => {
    btn.addEventListener('click', function () {
      const card = this.closest('.room-unique-card');
      if (!card) return;

      const name = card.getAttribute('data-room');
      const desc = card.getAttribute('data-desc');
      const imgs = card.querySelectorAll('.room-unique-slides img');

      if (mName) mName.innerText = name;
      if (mDesc) mDesc.innerText = desc;

      if (slidesContainer) {
        slidesContainer.innerHTML = '';
        imgs.forEach(img => {
          const clone = document.createElement('img');
          clone.src = img.src;
          clone.alt = name;
          slidesContainer.appendChild(clone);
        });
      }

      modal.style.display = 'flex';
      setTimeout(() => modal.classList.add('active'), 40);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      setTimeout(() => { modal.style.display = 'none'; }, 1100);
    });
  }

  // Close on overlay click
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.classList.remove('active');
      setTimeout(() => { modal.style.display = 'none'; }, 1100);
    }
  });

  // WhatsApp Form
  const form = document.getElementById('whatsapp-form-unique');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const phone   = '919597562331';
      const roomName = mName ? mName.innerText : '';
      const msg = `*Ronazio Booking Enquiry*%0A` +
                  `*Room:* ${roomName}%0A` +
                  `*Guest:* ${document.getElementById('g-name').value}%0A` +
                  `*Location:* ${document.getElementById('g-loc').value}%0A` +
                  `*Check-in:* ${document.getElementById('cin').value}%0A` +
                  `*Check-out:* ${document.getElementById('cout').value}%0A` +
                  `*Adults:* ${document.getElementById('ad').value}%0A` +
                  `*Kids:* ${document.getElementById('ch').value} (Age: ${document.getElementById('age').value})`;
      window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    });
  }
});

/* ──────────────────────────────────────────────
   9. GALLERY — STAGGER LOAD + MODAL
   ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  const grid     = document.getElementById('gallery-grid');
  const modal    = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('modal-img-full');
  const closeBtn = document.getElementById('close-gallery');
  const prevBtn  = document.getElementById('prev-photo');
  const nextBtn  = document.getElementById('next-photo');

  if (!grid) return;

  let currentIndex = 0;

  const photoIDs = [
    'Ext.jpeg', 'Exter.jpeg', 'Bal.jpeg', 'Balco.jpeg',
    'Exterior.jpeg', 'Exteriorr.jpeg', 'Family.jpeg', 'SeaV4.jpeg', 'Family2.jpeg',
    'Balcony FAMLY.jpeg', 'Exteriorrr.jpeg', 'Family3.jpeg',
    'FamilyBalcony.jpeg', 'Sea.jpeg',
    'D With B.jpeg', 'D1.jpeg', 'Deluxe1.jpeg', 'Deluxe3.jpeg',
    'Exterior1.jpeg', 'Reception.jpeg'
  ];

  const fullImages = photoIDs.map(name => `images/${name}`);

  // Build gallery items with stagger observer
  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        galleryObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  photoIDs.forEach((id, index) => {
    const thumbUrl = `images/${id}`;
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 col-lg-3 gallery-item splash-trigger';
    col.style.transitionDelay = (index % 8 * 0.07) + 's';

    col.innerHTML = `
      <div class="gallery-card-inner">
        <div class="gallery-front">
          <img src="${thumbUrl}" alt="Gallery ${index + 1}" loading="lazy">
        </div>
        <div class="gallery-back">
          <img src="${thumbUrl}" alt="Gallery flip ${index + 1}" loading="lazy">
        </div>
      </div>
    `;

    col.addEventListener('click', () => {
      currentIndex = index;
      updateModalImage(false);
      modal.style.display = 'flex';
      setTimeout(() => modal.classList.add('active'), 40);
    });

    grid.appendChild(col);
    galleryObserver.observe(col);
  });

  function updateModalImage(animate = true) {
    if (!modalImg) return;
    if (animate) {
      modalImg.style.opacity = '0';
      modalImg.style.transform = 'scale(0.96)';
      setTimeout(() => {
        modalImg.src = fullImages[currentIndex];
        modalImg.style.opacity = '1';
        modalImg.style.transform = 'scale(1)';
        modalImg.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      }, 220);
    } else {
      modalImg.src = fullImages[currentIndex];
    }
  }

  if (nextBtn) nextBtn.addEventListener('click', e => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % fullImages.length;
    updateModalImage(true);
  });

  if (prevBtn) prevBtn.addEventListener('click', e => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + fullImages.length) % fullImages.length;
    updateModalImage(true);
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!modal || modal.style.display !== 'flex') return;
    if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % fullImages.length; updateModalImage(true); }
    if (e.key === 'ArrowLeft')  { currentIndex = (currentIndex - 1 + fullImages.length) % fullImages.length; updateModalImage(true); }
    if (e.key === 'Escape') closeGalleryModal();
  });

  // Touch/swipe support
  let touchStartX = 0;
  if (modal) {
    modal.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    modal.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) {
        if (dx < 0) { currentIndex = (currentIndex + 1) % fullImages.length; }
        else        { currentIndex = (currentIndex - 1 + fullImages.length) % fullImages.length; }
        updateModalImage(true);
      }
    });
  }

  function closeGalleryModal() {
    if (!modal) return;
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 1000);
  }

  if (closeBtn) closeBtn.addEventListener('click', closeGalleryModal);
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeGalleryModal();
    });
  }
});

/* ──────────────────────────────────────────────
   10. CONTACT FORM — WHATSAPP
   ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contact-form-whatsapp');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = (document.getElementById('c-name')?.value    || '').trim();
    const email   = (document.getElementById('c-email')?.value   || '').trim();
    const message = (document.getElementById('c-message')?.value || '').trim();
    const phone   = '919597562331';

    const whatsappMsg =
      `*New Contact Enquiry — Ronazio Residency*%0A%0A` +
      `*Name:* ${name}%0A` +
      `*Email:* ${email}%0A` +
      `*Message:* ${message}`;

    window.open(`https://wa.me/${phone}?text=${whatsappMsg}`, '_blank');
  });
});

/* ──────────────────────────────────────────────
   11. MATRIXBYTES GLITTER
   ────────────────────────────────────────────── */
(function initGlitter() {
  const brandLink  = document.getElementById('matrix-brand-hover');
  const glitterBox = document.getElementById('glitter-container');
  if (!brandLink || !glitterBox) return;

  let dustInterval;

  function createDust() {
    const colors = ['#FF2020', '#FFFFFF', '#FF8888', '#FFD700'];
    for (let i = 0; i < 7; i++) {
      const dust = document.createElement('div');
      dust.className = 'star-dust';
      dust.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      const x = (Math.random() - 0.5) * 120 + 'px';
      const y = (Math.random() - 0.5) * 120 + 'px';
      dust.style.setProperty('--x', x);
      dust.style.setProperty('--y', y);
      dust.style.left = '40%';
      dust.style.top  = '50%';
      glitterBox.appendChild(dust);
      setTimeout(() => dust.remove(), 1000);
    }
  }

  brandLink.addEventListener('click',      createDust);
  brandLink.addEventListener('mouseenter', () => { dustInterval = setInterval(createDust, 130); });
  brandLink.addEventListener('mouseleave', () => { clearInterval(dustInterval); });
})();

/* ──────────────────────────────────────────────
   12. HERO RESERVE BUTTON SCROLL REDIRECT
   ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const reserveBtn = document.querySelector('.btn-reserve');
  if (reserveBtn && reserveBtn.getAttribute('href') === '#') {
    reserveBtn.setAttribute('href', '#rooms');
  }
});

/* ──────────────────────────────────────────────
   13. MAGNETIC HOVER ON GOLD BUTTONS
   ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.btn-royal-trigger, .btn-gold-nav, .btn-reserve').forEach(btn => {
    btn.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width  / 2) * 0.18;
      const y = (e.clientY - rect.top  - rect.height / 2) * 0.18;
      this.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });
});
