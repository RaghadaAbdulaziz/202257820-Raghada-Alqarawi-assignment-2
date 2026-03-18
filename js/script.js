const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.querySelector('.theme-icon');
const currentTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

themeBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function displayGreeting() {
    const greetingElement = document.getElementById('greeting');
    const currentHour = new Date().getHours();
    let greeting = '';

    if (currentHour < 12) {
        greeting = 'Good morning! ☀️ Ready to start coding?';
    } else if (currentHour < 17) {
        greeting = "Good afternoon! 🌤️ Hope you're having a productive day!";
    } else {
        greeting = 'Good evening! 🌙 Perfect time for some late-night coding!';
    }

    greetingElement.textContent = greeting;

    setTimeout(() => {
        greetingElement.style.display = 'none';
    }, 5000);
}

function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, .smooth-scroll');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function setupNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function setupRevealAnimation() {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(element => observer.observe(element));
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    function setError(input, errorElement, message) {
        input.classList.add('input-error');
        errorElement.textContent = message;
    }

    function clearError(input, errorElement) {
        input.classList.remove('input-error');
        errorElement.textContent = '';
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function clearAllErrors() {
        clearError(nameInput, nameError);
        clearError(emailInput, emailError);
        clearError(messageInput, messageError);
    }

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        clearAllErrors();
        formMessage.className = 'form-feedback';
        formMessage.textContent = '';

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        let isValid = true;

        if (!name) {
            setError(nameInput, nameError, 'Please enter your name.');
            isValid = false;
        }

        if (!email) {
            setError(emailInput, emailError, 'Please enter your email.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            setError(emailInput, emailError, 'Please enter a valid email address.');
            isValid = false;
        }

        if (!message) {
            setError(messageInput, messageError, 'Please enter your message.');
            isValid = false;
        }

        if (!isValid) {
            formMessage.className = 'form-feedback error';
            formMessage.textContent = 'Please fix the highlighted fields and try again.';
            return;
        }

        formMessage.className = 'form-feedback info';
        formMessage.textContent = 'Sending message...';

        setTimeout(() => {
            formMessage.className = 'form-feedback success';
            formMessage.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
            contactForm.reset();
        }, 1200);
    });
}

function setupProjectModal() {
    const modal = document.getElementById('projectModal');
    const closeModal = document.getElementById('closeModal');
    const detailButtons = document.querySelectorAll('.details-btn');

    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalType = document.getElementById('modalType');
    const modalTools = document.getElementById('modalTools');
    const modalFeatures = document.getElementById('modalFeatures');

    detailButtons.forEach(button => {
        button.addEventListener('click', () => {
            modalTitle.textContent = button.dataset.title;
            modalDescription.textContent = button.dataset.description;
            modalType.textContent = button.dataset.type;
            modalTools.textContent = button.dataset.tools;
            modalFeatures.textContent = button.dataset.features;
            modal.classList.add('show');
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}


function setupProjectFilter() {

    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.card[data-category]');
    const searchInput = document.getElementById('projectSearch');
    const noProjectsMessage = document.getElementById('noProjectsMessage');

    let currentFilter = 'all';

    function updateProjects() {

        const searchTerm = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        projectCards.forEach(card => {

            const category = card.dataset.category;
            const title = card.dataset.title;

            const matchesFilter = currentFilter === 'all' || category === currentFilter;
            const matchesSearch = title.includes(searchTerm);

            if (matchesFilter && matchesSearch) {

                card.classList.remove('hidden');
                visibleCount++;

            } else {

                card.classList.add('hidden');

            }

        });

        if (visibleCount === 0) {
            noProjectsMessage.style.display = 'block';
        } else {
            noProjectsMessage.style.display = 'none';
        }

    }

    filterButtons.forEach(button => {

        button.addEventListener('click', () => {

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            currentFilter = button.dataset.filter;

            updateProjects();

        });

    });

    searchInput.addEventListener('input', updateProjects);

    updateProjects();

}

document.addEventListener('DOMContentLoaded', () => {

    displayGreeting();
    setupSmoothScroll();
    setupNavHighlight();
    setupRevealAnimation();
    setupContactForm();
    setupProjectFilter();
    setupProjectModal();

});