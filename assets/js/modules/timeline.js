// timeline.js - Animações da timeline

const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const isOdd = Array.from(timelineItems).indexOf(entry.target) % 2 === 0;

      if (window.innerWidth > 768) {
        entry.target.style.animation = isOdd 
          ? 'slideInLeft 0.6s ease forwards'
          : 'slideInRight 0.6s ease forwards';
      } else {
        entry.target.style.animation = 'fadeIn 0.6s ease forwards';
      }

      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

timelineItems.forEach(item => {
  item.style.opacity = '0';
  timelineObserver.observe(item);
});

console.log('⏱️ Timeline de experiência inicializada!');