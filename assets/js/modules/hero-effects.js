// hero-effects.js - Tilt 3D na foto, typewriter e scroll indicator

// Tilt 3D na foto
const imageWrapper = document.querySelector('.image-wrapper');
const profilePhoto = document.querySelector('.profile-photo');

if (imageWrapper && profilePhoto) {
  const tiltSettings = {
    max: 15,
    perspective: 1000,
    scale: 1.05,
    speed: 400,
    easing: 'cubic-bezier(.03,.98,.52,.99)'
  };

  const handleMouseMove = (e) => {
    const rect = imageWrapper.getBoundingClientRect();
    const width = imageWrapper.offsetWidth;
    const height = imageWrapper.offsetHeight;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateY = ((mouseX / width) - 0.5) * 2;
    const rotateX = ((mouseY / height) - 0.5) * -2;

    const tiltX = rotateX * tiltSettings.max;
    const tiltY = rotateY * tiltSettings.max;

    imageWrapper.style.transform = `
      perspective(${tiltSettings.perspective}px)
      rotateX(${tiltX}deg)
      rotateY(${tiltY}deg)
      scale3d(${tiltSettings.scale}, ${tiltSettings.scale}, ${tiltSettings.scale})
    `;

    const imageGlow = imageWrapper.querySelector('.image-glow');
    if (imageGlow) {
      imageGlow.style.transform = `
        translate(calc(-50% + ${rotateY * 10}px), calc(-50% + ${rotateX * 10}px))
        scale(1.1)
      `;
    }
  };

  const handleMouseLeave = () => {
    imageWrapper.style.transform = `
      perspective(${tiltSettings.perspective}px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;

    const imageGlow = imageWrapper.querySelector('.image-glow');
    if (imageGlow) {
      imageGlow.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  };

  imageWrapper.style.transition = `transform ${tiltSettings.speed}ms ${tiltSettings.easing}`;
  const imageGlow = imageWrapper.querySelector('.image-glow');
  if (imageGlow) {
    imageGlow.style.transition = `transform ${tiltSettings.speed}ms ${tiltSettings.easing}`;
  }

  imageWrapper.addEventListener('mousemove', handleMouseMove);
  imageWrapper.addEventListener('mouseleave', handleMouseLeave);

  console.log('✨ Efeito Tilt 3D na foto ativado!');
}

// Scroll indicator click
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// Typewriter effect (opcional, apenas desktop)
const heroName = document.querySelector('.hero-name');
if (heroName && window.innerWidth > 768) {
  const text = heroName.textContent;
  heroName.textContent = '';
  heroName.style.opacity = '1';

  let charIndex = 0;
  const typeWriter = () => {
    if (charIndex < text.length) {
      heroName.textContent += text.charAt(charIndex);
      charIndex++;
      const speed = Math.random() * 100 + 50;
      setTimeout(typeWriter, speed);
    }
  };
  setTimeout(typeWriter, 800);
}

console.log('👋 Hero Section inicializada!');