document.addEventListener('DOMContentLoaded', () => {
    // Menu hambúrguer
    const nav = document.querySelector('nav');
    const ul = nav.querySelector('ul');
    const hamburger = document.createElement('button');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = '☰';
    nav.appendChild(hamburger);

    hamburger.addEventListener('click', () => {
        ul.classList.toggle('active');
        hamburger.innerHTML = ul.classList.contains('active') ? '✖' : '☰';
    });

    ul.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            ul.classList.remove('active');
            hamburger.innerHTML = '☰';
        });
    });

    // Animação ao rolar para todas as seções
    const sections = document.querySelectorAll('.txtInicio, .habilidades, .services-grid .service-card, .contatos, .redes-sociais, .formulario-orcamento, .contato-whatsapp');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));

    // Efeito de partículas
    const canvas = document.createElement('canvas');
    canvas.id = 'particles';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(0, 221, 235, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Validação do formulário de orçamento
    const form = document.querySelector('.formulario-orcamento form');
    if (form) {
        form.addEventListener('submit', (e) => {
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const servico = document.getElementById('servico').value;
            const mensagem = document.getElementById('mensagem').value;

            if (!nome || !email || !servico || !mensagem) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }
});