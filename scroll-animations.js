// Smooth scroll animations library using Intersection Observer and requestAnimationFrame
// This provides professional smooth animations without changing your existing HTML structure

const ScrollAnimations = {
  animations: [],
  isInitialized: false,

  // Parallax effect for background elements
  parallax: function () {
    const parallaxElements = document.querySelectorAll('.hero-cube, .about-image img');
    
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight) {
          const speed = 0.5;
          const distance = elementPosition - scrollY;
          element.style.transform = `translateY(${distance * speed}px)`;
        }
      });
    });
  },

  // Smooth fade-in animation on scroll
  fadeInOnScroll: function () {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = `
            fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards
          `;
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(
      '.project-card, .skill-card, .timeline-item, .about-container, .contact-info'
    ).forEach(el => {
      observer.observe(el);
    });
  },

  // Smooth number counter animation for stats
  animateNumbers: function () {
    const numberElements = document.querySelectorAll('[data-target]');
    
    const animateValue = (element, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          const target = parseInt(entry.target.dataset.target);
          animateValue(entry.target, 0, target, 1500);
          entry.target.dataset.animated = 'true';
        }
      });
    });

    numberElements.forEach(el => observer.observe(el));
  },

  // Smooth hover effects for interactive elements
  smoothHoverEffects: function () {
    const buttons = document.querySelectorAll('.btn, .info-btn, .project-link');
    
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });
    });
  },

  // Stagger animation for grid items
  staggerAnimation: function () {
    const grids = document.querySelectorAll('.projects-grid, .skills-grid');
    
    grids.forEach(grid => {
      const items = grid.querySelectorAll('.project-card, .skill-card');
      
      items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
      });

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.project-card, .skill-card');
            items.forEach((item, index) => {
              setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      observer.observe(grid);
    });
  },

  // Smooth scroll behavior
  smoothScrollBehavior: function () {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // For older browsers
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  },

  // Add CSS animations
  injectAnimationStyles: function () {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
      }

      .smooth-scroll {
        scroll-behavior: smooth;
      }

      .animate-on-scroll {
        animation: fadeInUp 0.8s ease-out forwards;
      }

      html {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);
  },

  // Initialize all animations
  init: function () {
    if (this.isInitialized) return;
    
    this.injectAnimationStyles();
    this.smoothScrollBehavior();
    this.parallax();
    this.fadeInOnScroll();
    this.smoothHoverEffects();
    this.staggerAnimation();
    this.animateNumbers();
    
    this.isInitialized = true;
    console.log('✨ Smooth scroll animations initialized!');
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    ScrollAnimations.init();
  });
} else {
  ScrollAnimations.init();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScrollAnimations;
}
