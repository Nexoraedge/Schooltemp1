window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 128, 1)';
    } else {
        navbar.style.background = 'rgba(0, 0, 128, 0.95)';
    }
});

// Counter animation
const counters = document.querySelectorAll('.counter-value');
const speed = 200;

const animateCounter = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const inc = target / speed;

        const updateCount = () => {
            if (count < target) {
                count += inc;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
};

// Trigger counter animation when in view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => observer.observe(counter.parentElement));

// Multi-step form
const admissionSteps = document.querySelectorAll('.admission-step');
const nextButtons = document.querySelectorAll('.next-step');
const prevButtons = document.querySelectorAll('.prev-step');

nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        const currentStep = button.closest('.admission-step');
        const nextStep = currentStep.nextElementSibling;
        
        if (validateStep(currentStep)) {
            currentStep.classList.remove('active');
            nextStep.classList.add('active');
        }
    });
});

prevButtons.forEach(button => {
    button.addEventListener('click', () => {
        const currentStep = button.closest('.admission-step');
        const prevStep = currentStep.previousElementSibling;
        
        currentStep.classList.remove('active');
        prevStep.classList.add('active');
    });
});

function validateStep(step) {
    const inputs = step.querySelectorAll('input[required]');
    let valid = true;
    
    inputs.forEach(input => {
        if (!input.value) {
            valid = false;
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    return valid;
}

// Gallery modal
const galleryItems = document.querySelectorAll('.gallery-item');
const modalImage = document.getElementById('modalImage');
let currentImageIndex = 0;

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        modalImage.src = imgSrc;
        currentImageIndex = index;
    });
});

document.getElementById('prevImage').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    modalImage.src = galleryItems[currentImageIndex].querySelector('img').src;
});

document.getElementById('nextImage').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    modalImage.src = galleryItems[currentImageIndex].querySelector('img').src;
});

// Form validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (form.checkValidity()) {
            alert('Form submitted successfully!');
            form.reset();
        } else {
            form.classList.add('was-validated');
        }
    });
});