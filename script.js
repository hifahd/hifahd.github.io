// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// -----------------------------------------------------------------------------
// 1. Projects Rendering (with Load More)
// -----------------------------------------------------------------------------
const projectsGrid = document.getElementById('projects-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const loadMoreContainer = document.getElementById('load-more-container');

let projectsShown = 0;
const INITIAL_PROJECTS = 6;

function createProjectCard(project, index) {
    return `
        <div class="glass-card rounded-2xl overflow-hidden group h-full flex flex-col gs-reveal-up project-item" style="animation-delay: ${(index % 3) * 0.1}s">
            <div class="relative h-56 overflow-hidden">
                <div class="absolute inset-0 bg-dark-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
                <div class="absolute top-4 right-4 z-20">
                    <span class="px-3 py-1 bg-dark-950/90 backdrop-blur-md text-[10px] uppercase tracking-wider font-bold text-white rounded-full border border-white/10">
                        ${index < 3 ? 'Featured' : 'Project'}
                    </span>
                </div>
            </div>
            <div class="p-8 flex flex-col flex-grow">
                <h3 class="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors leading-tight">${project.title}</h3>
                <div class="text-slate-400 text-sm mb-6 line-clamp-3 flex-grow font-light leading-relaxed">
                    ${project.description}
                </div>
                <div class="mt-auto pt-5 border-t border-white/5 flex justify-between items-center">
                    <span class="text-xs text-slate-500 font-mono">2024-2025</span>
                    <a href="#" class="text-sm font-bold text-white hover:text-primary-400 transition-colors flex items-center gap-2 group-link">
                        Details <i class="fas fa-arrow-right text-xs transform group-link-hover:translate-x-1 transition-transform"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
}

function renderProjects(startIndex, count) {
    if (!projectsGrid) return;
    
    const endIndex = Math.min(startIndex + count, projects.length);
    const newProjects = projects.slice(startIndex, endIndex);
    
    const html = newProjects.map((project, i) => createProjectCard(project, startIndex + i)).join('');
    
    // If it's the first load, replace content. If 'Load More', append.
    if (startIndex === 0) {
        projectsGrid.innerHTML = html;
    } else {
        projectsGrid.insertAdjacentHTML('beforeend', html);
        // Animate new items
        gsap.fromTo('.project-item:not(.gs-reveal-up-initialized)', 
            { y: 50, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                stagger: 0.1,
                onComplete: function() {
                    this.targets().forEach(t => t.classList.add('gs-reveal-up-initialized'));
                }
            }
        );
    }
    
    projectsShown = endIndex;
    
    // Handle button visibility
    if (projectsShown >= projects.length) {
        loadMoreContainer.classList.add('hidden');
    } else {
        loadMoreContainer.classList.remove('hidden');
    }
}

// Button Event Listener
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        renderProjects(projectsShown, 6); // Load 6 more
    });
}


// -----------------------------------------------------------------------------
// 2. GSAP Scroll Animations
// -----------------------------------------------------------------------------
function initAnimations() {
    gsap.utils.toArray('.gs-reveal-up').forEach(elem => {
        gsap.fromTo(elem, 
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                }
            }
        );
    });

    gsap.utils.toArray('.gs-reveal-left').forEach(elem => {
        gsap.fromTo(elem, 
            { x: -50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                }
            }
        );
    });

    gsap.utils.toArray('.gs-reveal-right').forEach(elem => {
        gsap.fromTo(elem, 
            { x: 50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                }
            }
        );
    });
}

// -----------------------------------------------------------------------------
// 3. Advanced Typing Effect (Typing + Deleting)
// -----------------------------------------------------------------------------
const typingPhrases = [
    "Software Engineer",
    "AI Automation Expert",
    "NUST Graduate",
    "Problem Solver"
];

function typeWriterLoop(elementId, phrases) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function loop() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            element.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Deleting is faster
        } else {
            element.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Typing speed
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Finished typing phrase, pause before delete
            isDeleting = true;
            typeSpeed = 2000; 
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(loop, typeSpeed);
    }

    loop();
}


// -----------------------------------------------------------------------------
// 4. Utility Logic
// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Render initial projects
    renderProjects(0, INITIAL_PROJECTS);

    // Init Animations
    initAnimations();

    // Start Typing Loop
    typeWriterLoop("typing-text", typingPhrases);

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('py-2');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.add('py-4');
            navbar.classList.remove('py-2');
        }
    });

    // Mobile Menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            // Small delay to allow display:flex to apply before opacity transition
            setTimeout(() => mobileMenu.classList.remove('opacity-0'), 10);
            document.body.style.overflow = 'hidden';
            menuBtn.innerHTML = '<i class="fas fa-times text-xl"></i>';
        } else {
            mobileMenu.classList.add('opacity-0');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            }, 300);
            document.body.style.overflow = 'auto';
            menuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
        }
    }

    menuBtn.addEventListener('click', toggleMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Scroll to Top
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.remove('opacity-0', 'translate-y-10');
        } else {
            scrollToTopBtn.classList.add('opacity-0', 'translate-y-10');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});