// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// -----------------------------------------------------------------------------
// 1. Projects Carousel
// -----------------------------------------------------------------------------
const carouselContainer = document.getElementById('projects-carousel');
const prevBtn = document.getElementById('prev-project');
const nextBtn = document.getElementById('next-project');

function createProjectCard(project, index) {
    return `
        <div class="glass-card rounded-2xl overflow-hidden group flex flex-col snap-center min-w-[85vw] md:min-w-[350px] lg:min-w-[400px] h-full">
            <div class="relative h-56 overflow-hidden flex-shrink-0">
                <div class="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors z-10"></div>
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
                <div class="absolute top-4 right-4 z-20">
                    <span class="px-3 py-1 bg-black/90 backdrop-blur-md text-[10px] uppercase tracking-wider font-bold text-white rounded-full border border-white/20">
                        Project
                    </span>
                </div>
            </div>
            <div class="p-8 flex flex-col flex-grow">
                <h3 class="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors leading-tight">${project.title}</h3>
                <div class="text-slate-400 text-sm mb-6 line-clamp-3 flex-grow font-light leading-relaxed">
                    ${project.description}
                </div>
                <div class="mt-auto pt-5 border-t border-white/10 flex justify-between items-center">
                    <span class="text-xs text-slate-500 font-mono">2024-2025</span>
                    <a href="#" class="text-sm font-bold text-white hover:text-primary-400 transition-colors flex items-center gap-2 group-link">
                        Details <i class="fas fa-arrow-right text-xs transform group-link-hover:translate-x-1 transition-transform"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
}

if (carouselContainer) {
    // Render all projects
    carouselContainer.innerHTML = projects.map((p, i) => createProjectCard(p, i)).join('');

    // Scroll Logic
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            carouselContainer.scrollBy({ left: -420, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            carouselContainer.scrollBy({ left: 420, behavior: 'smooth' });
        });
    }
}

// -----------------------------------------------------------------------------
// 2. Full Skills Data & Rendering
// -----------------------------------------------------------------------------
const skillsCategories = [
    {
        title: "Programming Languages",
        icon: "fas fa-code",
        color: "text-blue-400",
        skills: ["Python", "Java", "C/C++", "JavaScript", "SQL", "Dart", "PHP", "Verilog", "MATLAB"]
    },
    {
        title: "Web Technologies",
        icon: "fas fa-globe",
        color: "text-purple-400",
        skills: ["HTML5/CSS3", "Tailwind CSS", "React", "Laravel", "Flutter", "Flask", "FastAPI", "Streamlit", "Node.js", "Socket.io"]
    },
    {
        title: "Data Science & ML",
        icon: "fas fa-brain",
        color: "text-pink-400",
        skills: ["TensorFlow/Keras", "PyTorch", "Scikit-learn", "MLflow", "Optuna", "MediaPipe", "NumPy", "Pandas", "Matplotlib", "spaCy", "NLTK", "LangChain"]
    },
    {
        title: "AI & Prompt Eng",
        icon: "fas fa-robot",
        color: "text-yellow-400",
        skills: ["OpenAI API", "Claude", "DeepSeek", "RAG Systems", "Vector Embeddings", "DSPy", "ChromaDB", "Ollama", "Computer Vision", "NLP"]
    },
    {
        title: "Tools & Cloud",
        icon: "fas fa-cloud",
        color: "text-cyan-400",
        skills: ["Git/GitHub", "Docker", "GCP", "Firebase", "PostgreSQL", "MongoDB", "Neo4j", "Pinecone", "Selenium", "Undetected Chrome"]
    },
    {
        title: "Specialized Tech",
        icon: "fas fa-microchip",
        color: "text-emerald-400",
        skills: ["IoT (ESP32)", "ARKit/ARCore", "Unity3D", "AutoCAD", "Figma", "Wireshark", "Power BI", "Proteus"]
    }
];

const skillsGrid = document.getElementById('skills-grid');

if (skillsGrid) {
    skillsGrid.innerHTML = skillsCategories.map(category => `
        <div class="bg-black p-8 rounded-3xl border border-white/10 hover:border-white/30 transition-all duration-300 group">
            <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${category.color}">
                    <i class="${category.icon} text-xl"></i>
                </div>
                <h3 class="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">${category.title}</h3>
            </div>
            <div class="flex flex-wrap gap-2">
                ${category.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
    `).join('');
}


// -----------------------------------------------------------------------------
// 3. Type-on-Scroll for Headings
// -----------------------------------------------------------------------------
const typeOnScrollElements = document.querySelectorAll('.type-on-scroll');

const typingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const text = el.getAttribute('data-text');
            if (text && !el.classList.contains('typed')) {
                el.classList.add('typed', 'type-cursor'); // Add cursor
                el.textContent = ''; // Clear initial text
                typeEffect(el, text);
            }
        }
    });
}, { threshold: 0.5 });

typeOnScrollElements.forEach(el => typingObserver.observe(el));

function typeEffect(element, text) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50 + Math.random() * 50); // Random variance for realism
        } else {
            // Remove cursor after a delay
            setTimeout(() => {
                element.classList.remove('type-cursor');
            }, 1000);
        }
    }
    type();
}


// -----------------------------------------------------------------------------
// 4. Hero Typing Loop
// -----------------------------------------------------------------------------
const typingPhrases = [
    "Software Engineer",
    "NUST Graduate",
    "Learner",
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
            typeSpeed = 50;
        } else {
            element.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; 
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(loop, typeSpeed);
    }
    loop();
}


// -----------------------------------------------------------------------------
// 5. Utility
// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Init Hero Typing
    typeWriterLoop("typing-text", typingPhrases);

    // GSAP Fade Ins
    gsap.utils.toArray('.gs-reveal-up').forEach(elem => {
        gsap.fromTo(elem, 
            { y: 60, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: elem, start: "top 85%" }
            }
        );
    });

    gsap.utils.toArray('.gs-reveal-left').forEach(elem => {
        gsap.fromTo(elem, 
            { x: -50, opacity: 0 },
            {
                x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
                scrollTrigger: { trigger: elem, start: "top 85%" }
            }
        );
    });

    gsap.utils.toArray('.gs-reveal-right').forEach(elem => {
        gsap.fromTo(elem, 
            { x: 50, opacity: 0 },
            {
                x: 0, opacity: 1, duration: 1.2, ease: "power3.out",
                scrollTrigger: { trigger: elem, start: "top 85%" }
            }
        );
    });

    // Mobile Menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
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
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));
});