document.addEventListener('DOMContentLoaded', () => {
    // Menu hambúrguer
    const nav = document.querySelector('nav');
    const ul = document.querySelector('nav ul');
    const hamburger = document.querySelector('.hamburger') || document.createElement('button');
    if (!hamburger.classList.contains('hamburger')) {
        hamburger.classList.add('hamburger');
        hamburger.innerHTML = '☰';
        hamburger.setAttribute('aria-expanded', 'false');
        nav.appendChild(hamburger);
    }

    hamburger.addEventListener('click', () => {
        ul.classList.toggle('active');
        hamburger.innerHTML = ul.classList.contains('active') ? '✖' : '☰';
        hamburger.setAttribute('aria-expanded', ul.classList.contains('active'));
    });

    ul.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            ul.classList.remove('active');
            hamburger.innerHTML = '☰';
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Navegação por teclado
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            hamburger.click();
        }
    });

    // Animação ao rolar
    const sections = document.querySelectorAll('.txtInicio, .habilidades, .services-grid .service-card, .contatos, .redes-sociais, .formulario-orcamento, .contato-whatsapp, .filtro-projetos, .projetos .projeto-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));

    // Filtro de projetos/serviços
    const filtroTipo = document.getElementById('filtro-tipo');
    const projetoCards = document.querySelectorAll('.projeto-card');
    const serviceCards = document.querySelectorAll('.service-card');
    if (filtroTipo) {
        filtroTipo.addEventListener('change', () => {
            const tipoSelecionado = filtroTipo.value;
            const cards = [...projetoCards, ...serviceCards];
            cards.forEach(card => {
                if (tipoSelecionado === 'todos' || card.dataset.tipo === tipoSelecionado) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 100);
                } else {
                    card.style.display = 'none';
                    card.classList.remove('visible');
                }
            });
        });
    }

    // Efeito de partículas
    const canvas = document.createElement('canvas');
    canvas.id = 'particles';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 50 : 100;

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
            ctx.fillStyle = 'rgba(0, 255, 235, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Validação em tempo real do formulário (se presente)
    const form = document.querySelector('.formulario-orcamento form');
    if (form) {
        const nomeInput = document.getElementById('nome');
        const emailInput = document.getElementById('email');
        const servicoInput = document.getElementById('servico');
        const mensagemInput = document.getElementById('mensagem');
        const feedback = document.getElementById('form-feedback');

        const validateEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        const showError = (elementId, message) => {
            const errorElement = document.getElementById(`${elementId}-error`);
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        };

        const clearError = (elementId) => {
            const errorElement = document.getElementById(`${elementId}-error`);
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        };

        nomeInput.addEventListener('input', () => {
            if (nomeInput.value.trim() === '') {
                showError('nome', 'O nome é obrigatório.');
            } else {
                clearError('nome');
            }
        });

        emailInput.addEventListener('input', () => {
            if (!validateEmail(emailInput.value)) {
                showError('email', 'Insira um e-mail válido.');
            } else {
                clearError('email');
            }
        });

        servicoInput.addEventListener('change', () => {
            if (servicoInput.value === '') {
                showError('servico', 'Selecione um serviço.');
            } else {
                clearError('servico');
            }
        });

        mensagemInput.addEventListener('input', () => {
            if (mensagemInput.value.trim() === '') {
                showError('mensagem', 'A mensagem é obrigatória.');
            } else {
                clearError('mensagem');
            }
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!nomeInput.value.trim() || !validateEmail(emailInput.value) || !servicoInput.value || !mensagemInput.value.trim()) {
                feedback.textContent = 'Por favor, corrija os erros no formulário.';
                feedback.classList.add('error');
                feedback.classList.remove('success');
                feedback.style.display = 'block';
                return;
            }

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    feedback.textContent = 'Formulário enviado com sucesso!';
                    feedback.classList.add('success');
                    feedback.classList.remove('error');
                    feedback.style.display = 'block';
                    form.reset();
                } else {
                    throw new Error('Erro ao enviar o formulário.');
                }
            } catch (error) {
                feedback.textContent = 'Erro ao enviar o formulário. Tente novamente.';
                feedback.classList.add('error');
                feedback.classList.remove('success');
                feedback.style.display = 'block';
            }
        });
    }
});