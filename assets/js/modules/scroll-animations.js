// scroll-animations.js - Intersection Observers para fade-in e reveal

const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -100px 0px' };

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

const aboutCard = document.querySelector('.about-card');
if (aboutCard) {
  aboutCard.style.opacity = '0';
  fadeInObserver.observe(aboutCard);
}

const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.animationDelay = `${index * 0.1}s`;
  fadeInObserver.observe(card);
});

const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.classList.add('fade-in');
      }, index * 100);
      projectObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

projectCards.forEach(card => {
  card.style.opacity = '0';
  projectObserver.observe(card);
});

const revealElements = document.querySelectorAll(`
  .section-title, .about-card, .skill-card, .project-card,
  .timeline-item, .contact-info, .contact-form
`);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 50);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(element);
});

console.log('📚 Animações de scroll inicializadas!');