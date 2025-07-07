document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // MENÚ MOBILE (HAMBURGUESA)
    // ======================
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        // Alternar menú y cambiar ícono
        nav.classList.toggle('active');
        this.classList.toggle('fa-times');
    });
    
    // ======================
    // CERRAR MENÚ AL CLICAR ENLACES
    // ======================
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.classList.remove('fa-times');
        });
    });
    
    // ======================
    // HEADER STICKY AL SCROLLEAR
    // ======================
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 50);
    });
    
    // ======================
    // FORMULARIO DE CONTACTO
    // ======================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            // Simulamos el envío del formulario
            setTimeout(() => {
                // Mensaje de éxito
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>¡Mensaje enviado con éxito!</p>
                    <small>Nos pondremos en contacto contigo pronto.</small>
                `;
                contactForm.parentNode.insertBefore(successMsg, contactForm);
                contactForm.style.display = 'none';
                
                // Resetear después de 5 segundos
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    successMsg.remove();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Enviar Mensaje';
                }, 5000);
            }, 1500);
        });
    }
    
    // ======================
    // EFECTO HOVER PARA PRODUCTOS
    // ======================
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.product-img img').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.product-img img').style.transform = 'scale(1)';
        });
    });
    
    // ======================
    // SCROLL SUAVE PARA ENLACES
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// WhatsApp config
const whatsappNumber = '573169741025';
const defaultMessage = 'Hola, vi este modelo en su catálogo y me interesa:';

function redirectToWhatsApp(productName) {
    const encodedMessage = encodeURIComponent(`${defaultMessage} ${productName}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
}

// Botones WhatsApp
document.querySelectorAll('.whatsapp-btn').forEach(button => {
    button.addEventListener('click', function (e) {
        e.stopPropagation();
        const productCard = this.closest('.product-card');
        const productName = productCard.getAttribute('data-product');
        redirectToWhatsApp(productName);
    });
});

// Click en tarjeta completa (excepto botón)
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function (e) {
        if (!e.target.closest('.whatsapp-btn')) {
            const productName = this.getAttribute('data-product');
            redirectToWhatsApp(productName);
        }
    });
});

// Opcional: navegación activa (ajusta si usas navLinks)
const navLinks = document.querySelectorAll('.nav-link'); // Cambia el selector si es necesario

function updateActiveLink() {
    const fromTop = window.scrollY;
    navLinks.forEach(link => {
        const section = document.querySelector(link.hash);
        if (
            section &&
            section.offsetTop <= fromTop + 100 &&
            section.offsetTop + section.offsetHeight > fromTop + 100
        ) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});
