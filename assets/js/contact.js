document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const envelopeContainer = document.getElementById('envelopeContainer');
    const letter = document.getElementById('letter');
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('successMessage');
    const loadingIndicator = document.getElementById('loadingIndicator');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // 1. Deshabilitar y mostrar carga
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        loadingIndicator.style.display = 'block';

        // 2. Iniciar animación de "introducir en la carta"
        envelopeContainer.classList.add('sending');

        // Retraso para que el usuario vea la animación de volteo
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 3. Simular el envío del formulario a Formspree
        const formspreeUrl = this.action;
        const formData = new FormData(this);

        let formSentSuccessfully = false;
        try {
            const response = await fetch(formspreeUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formSentSuccessfully = true;
            } else {
                const data = await response.json();
                console.error('Formspree error:', data);
                alert('Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error al conectar con Formspree:', error);
            alert('Error de conexión. Por favor, revisa tu red.');
        }

        // 4. Animación de "volar" si fue exitoso
        if (formSentSuccessfully) {
            letter.style.opacity = '0';

            envelopeContainer.classList.add('flying');

            successMessage.classList.add('show');

            await new Promise(resolve => setTimeout(resolve, 1000));

            setTimeout(() => {
                envelopeContainer.classList.remove('sending', 'flying');
                letter.style.opacity = '1';
                successMessage.classList.remove('show');

                form.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar Mensaje';
                loadingIndicator.style.display = 'none';

            }, 2500); 
        } else {
            envelopeContainer.classList.remove('sending');
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Mensaje';
            loadingIndicator.style.display = 'none';
        }
    });
});