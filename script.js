const carousel = document.querySelector('.project-carousel-inner');
const prevButton = document.getElementById('prevProject');
const nextButton = document.getElementById('nextProject');
let currentIndex = 0;

function getVisibleProjects() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
}

function createProjectCard(project) {
    const div = document.createElement('div');
    div.className = 'project-card';
    div.innerHTML = `
<div class="bg-gray-800 p-6 rounded-lg project-card-inner card-hover overflow-hidden">
    <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover mb-4 rounded">
    <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
    <div class="project-card-description text-gray-300">
        ${project.description}
    </div>
</div>
`;
    return div;
}

function getCardWidth() {
    const card = document.querySelector('.project-card');
    return card ? card.offsetWidth : 0;
}

function updateCarousel() {
    carousel.innerHTML = '';
    const visibleProjects = getVisibleProjects();
    for (let i = 0; i < visibleProjects + 1; i++) {
        const index = (currentIndex + i) % projects.length;
        carousel.appendChild(createProjectCard(projects[index]));
    }
    carousel.style.transition = 'none';
    carousel.style.transform = 'translateX(0)';
}

function nextProject() {
    const cardWidth = getCardWidth();
    carousel.style.transition = 'transform 0.3s ease-in-out';
    carousel.style.transform = `translateX(-${cardWidth}px)`;
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % projects.length;
        updateCarousel();
    }, 300);
}

function prevProject() {
    const cardWidth = getCardWidth();
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    updateCarousel();
    carousel.style.transition = 'none';
    carousel.style.transform = `translateX(-${cardWidth}px)`;
    setTimeout(() => {
        carousel.style.transition = 'transform 0.3s ease-in-out';
        carousel.style.transform = 'translateX(0)';
    }, 10);
}

nextButton.addEventListener('click', nextProject);
prevButton.addEventListener('click', prevProject);

// Initialize carousel
updateCarousel();

// Update carousel on window resize
window.addEventListener('resize', updateCarousel);

// Intersection Observer for fade-in sections
const fadeInSections = document.querySelectorAll('.fade-in-section');
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        } else {
            entry.target.classList.remove('is-visible');
        }
    });
}, { threshold: 0.1 });

fadeInSections.forEach(section => {
    fadeInObserver.observe(section);
});

// Progress bar
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = `${scrollPercentage}%`;
});

// Scroll-to-top button
const scrollToTopButton = document.getElementById('scroll-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.classList.add('visible');
        scrollToTopButton.classList.remove('hidden');
    } else {
        scrollToTopButton.classList.remove('visible');
        scrollToTopButton.classList.add('hidden');
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
});

// Close menu when a link is clicked
const menuLinks = menu.querySelectorAll('a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {  // md breakpoint
            menu.classList.add('hidden');
            menu.classList.remove('flex');
        }
    });
});

function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        document.getElementById("typed-description").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

        setTimeout(function () {
            typeWriter(text, i + 1, fnCallback)
        }, 50);
    } else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 700);
    }
}

// Start the typing animation when the page loads
window.addEventListener('load', function () {
    var text = "Software Engineer specializing in AI/ML, data science, and full-stack development. Recent NUST graduate with experience in building production-ready systems and innovative technological solutions.";
    typeWriter(text, 0, function () {
        // Animation is complete
    });
});