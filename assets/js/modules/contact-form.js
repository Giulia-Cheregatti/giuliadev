// contact-form.js - Envio do formulário com Formspree

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const FORMSPREE_ID = 'YOUR_FORM_ID'; // Substitua pelo seu ID

  contactForm.setAttribute('action', `https://formspree.io/f/${FORMSPREE_ID}`);
  contactForm.setAttribute('method', 'POST');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('.btn-primary');
    const formData = new FormData(contactForm);

    const oldMessage = contactForm.querySelector('.form-message');
    if (oldMessage) oldMessage.remove();

    submitButton.classList.add('loading');
    submitButton.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        showMessage('success', '✨ Mensagem enviada com sucesso! Obrigada pelo contato.');
        contactForm.reset();
      } else {
        throw new Error('Erro ao enviar');
      }
    } catch (error) {
      showMessage('error', '😔 Ops! Algo deu errado. Tente novamente ou envie um email direto.');
      console.error('Erro ao enviar formulário:', error);
    } finally {
      submitButton.classList.remove('loading');
      submitButton.disabled = false;
    }
  });

  function showMessage(type, text) {
    const message = document.createElement('div');
    message.className = `form-message ${type}`;
    message.textContent = text;
    contactForm.insertBefore(message, contactForm.firstChild);

    setTimeout(() => {
      message.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => message.remove(), 300);
    }, 5000);
  }

  // Validação visual
  const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (input.value.trim() === '' && input.hasAttribute('required')) {
        input.style.borderColor = '#ef4444';
      } else {
        input.style.borderColor = '';
      }
    });
    input.addEventListener('input', () => {
      input.style.borderColor = '';
    });
  });

  console.log('📬 Contact Section inicializada!');
}