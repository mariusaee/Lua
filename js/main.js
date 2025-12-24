/**
 * LUA Wedding Agency - Main JavaScript
 * Handles all interactive functionality
 */

(function() {
  'use strict';

  // ==========================================================================
  // DOM Ready
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initFAQ();
    initModals();
    initLightbox();
    initScrollAnimations();
    initContactForm();
  });

  // ==========================================================================
  // Header Scroll Effect
  // ==========================================================================
  function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    const scrollThreshold = 50;

    function updateHeader() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    }

    // Initial check
    updateHeader();

    // Listen for scroll with throttling
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          updateHeader();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ==========================================================================
  // Mobile Menu
  // ==========================================================================
  function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu__link');

    if (!menuToggle || !mobileMenu) return;

    function openMenu() {
      mobileMenu.classList.add('active');
      document.body.classList.add('no-scroll');
    }

    function closeMenu() {
      mobileMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }

    menuToggle.addEventListener('click', openMenu);

    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', closeMenu);
    }

    // Close menu when clicking on links
    mobileMenuLinks.forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // ==========================================================================
  // Smooth Scroll for Anchor Links
  // ==========================================================================
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    const header = document.getElementById('header');
    const headerHeight = header ? header.offsetHeight : 0;

    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const targetPosition = target.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = targetPosition - headerHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      });
    });
  }

  // ==========================================================================
  // FAQ Accordion
  // ==========================================================================
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function(item) {
      const question = item.querySelector('.faq-item__question');

      if (!question) return;

      question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(function(otherItem) {
          otherItem.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  // ==========================================================================
  // Modals
  // ==========================================================================
  function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const closeButtons = document.querySelectorAll('[data-close-modal]');

    modalTriggers.forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById('modal-' + modalId);

        if (modal) {
          openModal(modal);
        }
      });
    });

    closeButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const modal = this.closest('.modal');
        if (modal) {
          closeModal(modal);
        }
      });
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
          closeModal(activeModal);
        }
      }
    });
  }

  function openModal(modal) {
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  // ==========================================================================
  // Lightbox Gallery
  // ==========================================================================
  function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery__item[data-lightbox]');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');

    if (!lightbox || !lightboxImage) return;

    galleryItems.forEach(function(item) {
      item.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
          lightboxImage.src = img.src;
          lightboxImage.alt = img.alt || '';
          lightbox.classList.add('active');
          document.body.classList.add('no-scroll');
        }
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.classList.remove('no-scroll');
      lightboxImage.src = '';
    }

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // ==========================================================================
  // Scroll Animations (Fade In on Scroll)
  // ==========================================================================
  function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    if (!fadeElements.length) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements
      fadeElements.forEach(function(el) {
        el.classList.add('visible');
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(function(el) {
      observer.observe(el);
    });
  }

  // ==========================================================================
  // Contact Form
  // ==========================================================================
  function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const data = {};
      formData.forEach(function(value, key) {
        data[key] = value;
      });

      // Basic validation
      if (!data.name || !data.phone || !data.email) {
        showFormMessage(form, 'error', 'Please fill in all required fields');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showFormMessage(form, 'error', 'Please enter a valid email address');
        return;
      }

      // Simulate form submission (replace with actual API call)
      const submitButton = form.querySelector('[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';

      // Simulate API delay
      setTimeout(function() {
        submitButton.disabled = false;
        submitButton.textContent = originalText;

        // Show success message
        showFormMessage(form, 'success', 'Thank you! We will contact you shortly.');

        // Reset form
        form.reset();
      }, 1500);
    });
  }

  function showFormMessage(form, type, message) {
    // Remove existing message
    const existingMessage = form.querySelector('.form__message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = 'form__message form__message--' + type;
    messageEl.textContent = message;
    messageEl.style.cssText = 'padding: 12px 16px; margin-bottom: 16px; border-radius: 4px;';

    if (type === 'error') {
      messageEl.style.backgroundColor = '#FEE2E2';
      messageEl.style.color = '#DC2626';
      messageEl.style.border = '1px solid #FECACA';
    } else {
      messageEl.style.backgroundColor = '#D1FAE5';
      messageEl.style.color = '#059669';
      messageEl.style.border = '1px solid #A7F3D0';
    }

    // Insert at top of form
    form.insertBefore(messageEl, form.firstChild);

    // Auto-remove after 5 seconds
    setTimeout(function() {
      if (messageEl.parentNode) {
        messageEl.remove();
      }
    }, 5000);
  }

  // ==========================================================================
  // Utility Functions
  // ==========================================================================

  // Debounce function for performance
  function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle function for scroll events
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(function() {
          inThrottle = false;
        }, limit);
      }
    };
  }

})();
