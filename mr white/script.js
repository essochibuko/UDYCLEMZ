/* ==========================================================================
   UDYCLEMZ - ART • DESIGN • CREATIVITY
   Interactive Application Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation & SPA Routing
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const pageSections = document.querySelectorAll('.page-section');
  const bottomNavItems = document.querySelectorAll('.bottom-nav-item.nav-link');

  // Hamburger Toggle
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('open');
      navMenu.classList.toggle('open');
    });
  }

  // SPA Navigation Handler
  function navigateToSection(targetId) {
    // Hide hamburger menu if open
    if (hamburgerBtn && hamburgerBtn.classList.contains('open')) {
      hamburgerBtn.classList.remove('open');
      navMenu.classList.remove('open');
    }

    // Clean section ID
    const sectionId = targetId.replace('#', '');

    // Toggle active section
    pageSections.forEach(section => {
      if (section.id === sectionId) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });

    // Update Desktop Nav Active Links
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Bind clicks to all navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        e.preventDefault();
        navigateToSection(targetId);
      }
    });
  });

  // Gallery Filter System
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Authentication Modal System
  const authModal = document.getElementById('auth-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const navLoginBtn = document.getElementById('nav-login-btn');
  const navSignupBtn = document.getElementById('nav-signup-btn');
  const bottomAuthBtn = document.getElementById('bottom-auth-btn');

  const tabLoginBtn = document.getElementById('tab-login-btn');
  const tabSignupBtn = document.getElementById('tab-signup-btn');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  function openAuthModal(tab = 'login') {
    authModal.classList.add('active');
    switchTab(tab);
  }

  function closeAuthModal() {
    authModal.classList.remove('active');
  }

  function switchTab(tab) {
    if (tab === 'login') {
      tabLoginBtn.classList.add('active');
      tabSignupBtn.classList.remove('active');
      loginForm.classList.add('active');
      signupForm.classList.remove('active');
    } else {
      tabSignupBtn.classList.add('active');
      tabLoginBtn.classList.remove('active');
      signupForm.classList.add('active');
      loginForm.classList.remove('active');
    }
  }

  if (navLoginBtn) navLoginBtn.addEventListener('click', () => openAuthModal('login'));
  if (navSignupBtn) navSignupBtn.addEventListener('click', () => openAuthModal('signup'));
  if (bottomAuthBtn) bottomAuthBtn.addEventListener('click', () => openAuthModal('login'));
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeAuthModal);

  tabLoginBtn.addEventListener('click', () => switchTab('login'));
  tabSignupBtn.addEventListener('click', () => switchTab('signup'));

  // Close Modal on Backdrop Click
  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) closeAuthModal();
  });

  // Service Request Modal Handler
  const serviceModalBtns = document.querySelectorAll('.open-service-modal');
  serviceModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service');
      navigateToSection('#contact');
      
      const messageBox = document.getElementById('contact-message');
      if (messageBox) {
        messageBox.value = `Hello UDYCLEMZ, I am interested in booking your "${serviceName}" service.`;
      }
      showToast(`Redirected to contact form for ${serviceName}`, 'info');
    });
  });

  // Contact Form Submission (Front-End Local Storage Simulation)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      
      showToast(`Thank you, ${name}! Your message has been received.`, 'success');
      contactForm.reset();
    });
  }

  // Auth Forms Submission (Front-End Simulation)
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      localStorage.setItem('udyclemz_user', email);
      showToast(`Successfully logged in as ${email}`, 'success');
      closeAuthModal();
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pass = document.getElementById('signup-password').value;
      const confirmPass = document.getElementById('signup-confirm-password').value;

      if (pass !== confirmPass) {
        showToast('Passwords do not match!', 'info');
        return;
      }

      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      localStorage.setItem('udyclemz_user', email);
      
      showToast(`Welcome to UDYCLEMZ, ${name}! Account created.`, 'success');
      closeAuthModal();
    });
  }

  // Custom Toast Notification System
  function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
});