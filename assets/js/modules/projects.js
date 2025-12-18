// projects.js - Lazy loading de imagens e interações

const projectImages = document.querySelectorAll('.project-image img');

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      const parent = img.parentElement;
      parent.classList.add('loading');
      img.src = img.getAttribute('src');

      img.addEventListener('load', () => {
        parent.classList.remove('loading');
        img.style.opacity = '1';
      });

      imageObserver.unobserve(img);
    }
  });
}, { threshold: 0.01, rootMargin: '50px' });

projectImages.forEach(img => {
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.5s ease';
  imageObserver.observe(img);
});

console.log('🚀 Projects Section inicializada!');