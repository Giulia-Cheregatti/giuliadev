// smooth-scroll.js - Scroll suave com offset da navbar

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#' || !targetId) return;

    const target = document.querySelector(targetId);
    if (!target) return;

    const navbarHeight = document.getElementById('navbar').offsetHeight;
    const offsetTop = target.offsetTop - navbarHeight - 20;

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  });
});