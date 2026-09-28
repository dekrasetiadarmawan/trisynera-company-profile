(() => {
  'use strict';

  const toggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-navigation');
  const mobileViewport = window.matchMedia('(max-width: 760px)');
  // Browsers may blur a control as soon as a breakpoint hides it.
  let lastFocused = document.activeElement;
  document.addEventListener('focusin', (event) => {
    lastFocused = event.target;
  });

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    toggle.querySelector('span').textContent = '+';
  };

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
    toggle.querySelector('span').textContent = open ? '−' : '+';
  });

  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || !mobileViewport.matches) return;
    closeMenu();
    // The links navigate to other pages; keep focus visible until navigation.
    toggle.focus({ preventScroll: true });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });

  mobileViewport.addEventListener('change', () => {
    const focused = document.activeElement === document.body ? lastFocused : document.activeElement;
    const focusWillBeHidden = mobileViewport.matches && navigation.contains(focused);
    const toggleWillBeHidden = !mobileViewport.matches && focused === toggle;
    closeMenu();
    if (focusWillBeHidden) toggle.focus();
    if (toggleWillBeHidden) navigation.querySelector('a').focus({ preventScroll: true });
  });
  document.documentElement.classList.add('nav-ready');

  // UI only. Replace this guard when a real Cloudflare Worker or other form
  // backend is configured, with server validation and success/error feedback.
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
    });
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window) || reducedMotion.matches) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-pending');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach((element) => {
    element.classList.add('is-pending');
    observer.observe(element);
  });

  // Keyboard users must never focus a link inside an invisible reveal block.
  document.addEventListener('focusin', (event) => {
    const pending = event.target.closest('.is-pending');
    if (pending) {
      pending.classList.remove('is-pending');
      observer.unobserve(pending);
    }
  });

  reducedMotion.addEventListener('change', (event) => {
    if (event.matches) {
      observer.disconnect();
      document.querySelectorAll('.is-pending').forEach((element) => element.classList.remove('is-pending'));
    }
  });
})();
