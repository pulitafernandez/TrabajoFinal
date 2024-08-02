document.addEventListener('DOMContentLoaded', () => {
    const btnEnviar = document.getElementById('enviar');
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');

    // Función para verificar si todos los campos del formulario estan llenos
    function checkFormValidity() {
        // trim() elimina los espacios en blanco al principio y al final del valor del campo
        const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
        btnEnviar.disabled = !allFilled;
    }

    inputs.forEach(input => {
        input.addEventListener('input', checkFormValidity);
    });

    

    btnEnviar.addEventListener("click", (e) => {
        // Previene la actualización de la página al enviar el formulario
        e.preventDefault(); 
        
        let nombre = document.getElementById('nombre');
        let apellido = document.getElementById('apellido');
        let email = document.getElementById('email');
        let telefono = document.getElementById('telefono');
        let mensaje = document.getElementById('mensaje');
        
        // Crea un txt con la información del formulario
        let informacion = 
        `Nombre y Apellido: ${nombre.value} ${apellido.value}\n` +
        `Email: ${email.value}\n` +
        `Telefono: ${telefono.value}\n` +
        `Mensaje: ${mensaje.value}`;

        // Mensaje pop up usando SweetAlert2
        Swal.fire({
            title: 'Gracias!',
            text: ` Gracias ${nombre.value} ${apellido.value} por su contacto `,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            // Crea y guarda el archivo txt después de que el usuario cierre el pop-up
            let blob = new Blob([informacion], {type: "text/plain;charset=utf-8"});
            saveAs(blob, 'contacto.txt');
            
            // Vacía los campos del formulario
            inputs.forEach(input => input.value = '');
            
            // Desactiva el botón de enviar nuevamente
            btnEnviar.disabled = true;
        });
    });
});