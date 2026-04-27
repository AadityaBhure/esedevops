// Get form elements
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('successMessage');

// Validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9\-\+\(\)\s]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function validateSubject(subject) {
    return subject.trim().length >= 3;
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

// Clear error messages and styling
function clearError(inputElement, errorElement) {
    inputElement.classList.remove('error-input');
    errorElement.textContent = '';
}

function showError(inputElement, errorElement, message) {
    inputElement.classList.add('error-input');
    errorElement.textContent = message;
}

// Validate individual fields
nameInput.addEventListener('blur', () => {
    const errorElement = document.getElementById('nameError');
    if (!validateName(nameInput.value)) {
        showError(nameInput, errorElement, 'Name must be at least 2 characters');
    } else {
        clearError(nameInput, errorElement);
    }
});

emailInput.addEventListener('blur', () => {
    const errorElement = document.getElementById('emailError');
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, errorElement, 'Please enter a valid email');
    } else {
        clearError(emailInput, errorElement);
    }
});

phoneInput.addEventListener('blur', () => {
    const errorElement = document.getElementById('phoneError');
    if (!validatePhone(phoneInput.value)) {
        showError(phoneInput, errorElement, 'Please enter a valid phone number');
    } else {
        clearError(phoneInput, errorElement);
    }
});

subjectInput.addEventListener('blur', () => {
    const errorElement = document.getElementById('subjectError');
    if (!validateSubject(subjectInput.value)) {
        showError(subjectInput, errorElement, 'Subject must be at least 3 characters');
    } else {
        clearError(subjectInput, errorElement);
    }
});

messageInput.addEventListener('blur', () => {
    const errorElement = document.getElementById('messageError');
    if (!validateMessage(messageInput.value)) {
        showError(messageInput, errorElement, 'Message must be at least 10 characters');
    } else {
        clearError(messageInput, errorElement);
    }
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;

    if (!validateName(nameInput.value)) {
        showError(nameInput, document.getElementById('nameError'), 'Name must be at least 2 characters');
        isValid = false;
    }

    if (!validateEmail(emailInput.value)) {
        showError(emailInput, document.getElementById('emailError'), 'Please enter a valid email');
        isValid = false;
    }

    if (!validatePhone(phoneInput.value)) {
        showError(phoneInput, document.getElementById('phoneError'), 'Please enter a valid phone number');
        isValid = false;
    }

    if (!validateSubject(subjectInput.value)) {
        showError(subjectInput, document.getElementById('subjectError'), 'Subject must be at least 3 characters');
        isValid = false;
    }

    if (!validateMessage(messageInput.value)) {
        showError(messageInput, document.getElementById('messageError'), 'Message must be at least 10 characters');
        isValid = false;
    }

    // If all fields are valid, submit
    if (isValid) {
        // Collect form data
        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            subject: subjectInput.value,
            message: messageInput.value
        };

        // Log the data to console (in a real application, this would be sent to a server)
        console.log('Form Data:', formData);

        // Show success message
        successMessage.style.display = 'block';

        // Reset form
        form.reset();

        // Hide success message after 3 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);

        // Clear all error styles
        [nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach(input => {
            input.classList.remove('error-input');
        });
    }
});

// Clear error messages when user starts typing
[nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error')) {
            errorElement.textContent = '';
            input.classList.remove('error-input');
        }
    });
});
