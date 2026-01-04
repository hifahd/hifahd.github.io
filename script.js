// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// -----------------------------------------------------------------------------
// 0. Intro Animation (Laptop)
// -----------------------------------------------------------------------------
function initIntroAnimation() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#intro-section",
            start: "top top",
            end: "+=800", // Further reduced for faster content reveal
            scrub: 1,
            pin: true,
            onLeave: () => {
                gsap.to("#navbar", { opacity: 1, duration: 0.5 });
            },
            onEnterBack: () => {
                gsap.to("#navbar", { opacity: 0, duration: 0.3 });
            }
        }
    });

    // 1. Reveal Text & Open Laptop simultaneously
    tl.to("#login-text", { opacity: 1, duration: 0.2 })
      .to(".macbook", {
          rotationX: 20, // Tilt base up to viewing angle
          duration: 1.5,
          ease: "power1.inOut"
      }, "<")
      .to(".lid", {
        rotationX: 0,
        duration: 1.5,
        ease: "power2.inOut"
    }, "<") // Sync with base tilt
    
    // 2. FADE OUT TEXT - Fast, before zoom hits hard
    .to("#login-text", {
        opacity: 0,
        duration: 0.2
    }, "-=0.2") 
    
    // 3. ZOOM 
    .to(".laptop-scene", {
        scale: 60, 
        duration: 2,
        ease: "power2.in", 
    }, "-=0.1") 
    
    // 4. Fade out intro container
    .to("#intro-section", {
        opacity: 0,
        duration: 0.5,
        pointerEvents: "none"
    }, "-=1.0") 
    
    // 5. Show Hero Content
    .to("#hero-content", {
        opacity: 1,
        duration: 0.8
    }, "-=0.5");

    // Handle reload in middle of page
    if (window.scrollY > 800) {
        gsap.set("#intro-section", { display: "none" });
        gsap.set("#hero-content", { opacity: 1 });
        gsap.set("#navbar", { opacity: 1 });
    }
}

// -----------------------------------------------------------------------------
// 1. Projects Carousel
// -----------------------------------------------------------------------------
const carouselContainer = document.getElementById('projects-carousel');
const prevBtn = document.getElementById('prev-project');
const nextBtn = document.getElementById('next-project');

function inferTags(description) {
    const keywords = ["Python", "Flutter", "React", "AI", "Machine Learning", "NLP", "IoT", "SQL", "Flask", "Node.js", "Firebase", "Java", "Docker", "AWS", "Google Cloud"];
    return keywords.filter(keyword => description.includes(keyword));
}

function createProjectCard(project, index) {
    return `
        <div class="glass-card rounded-2xl overflow-hidden group flex flex-col snap-center flex-shrink-0 w-[85vw] md:w-[350px] lg:w-[400px] h-full cursor-pointer" onclick="openProjectModal(${index})">
            <div class="relative h-56 overflow-hidden flex-shrink-0">
                <div class="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors z-10"></div>
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700">
                <div class="absolute top-4 right-4 z-20">
                    <span class="px-3 py-1 bg-black/90 backdrop-blur-md text-[10px] uppercase tracking-wider font-bold text-white rounded-full border border-white/20">
                        View
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
                    <button class="text-sm font-bold text-white hover:text-primary-400 transition-colors flex items-center gap-2 group-link">
                        Details <i class="fas fa-arrow-right text-xs transform group-link-hover:translate-x-1 transition-transform"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

if (carouselContainer) {
    carouselContainer.innerHTML = projects.map((p, i) => createProjectCard(p, i)).join('');
    
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
// 2. Project Modal Logic
// -----------------------------------------------------------------------------
const modal = document.getElementById('project-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalCloseBtn = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalTags = document.getElementById('modal-tags');

function openProjectModal(index) {
    const project = projects[index];
    
    modalTitle.textContent = project.title;
    modalImage.src = project.image;
    modalDescription.innerHTML = project.description;
    
    const tags = inferTags(project.description);
    if(tags.length === 0) tags.push("Software Engineering");
    
    modalTags.innerHTML = tags.map(tag => 
        `<span class="px-3 py-1 bg-primary-500/20 text-primary-400 text-sm rounded-full border border-primary-500/30">${tag}</span>`
    ).join('');

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.classList.add('modal-open');
}

function closeProjectModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.classList.remove('modal-open');
}

if (modal) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
    modalBackdrop.addEventListener('click', closeProjectModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeProjectModal();
        }
    });
}

// -----------------------------------------------------------------------------
// 3. Full Skills Data & Rendering
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
        skills: ["HTML5/CSS3", "Tailwind CSS", "Markdown", "React", "Laravel", "Flutter", "Flask", "FastAPI", "Streamlit", "Node.js", "Socket.io", "WebSocket", "n8n"]
    },
    {
        title: "Machine Learning & Deep Learning",
        icon: "fas fa-brain",
        color: "text-pink-400",
        skills: ["TensorFlow/Keras", "PyTorch", "Scikit-learn", "MLflow", "Optuna", "MediaPipe"]
    },
    {
        title: "Data Science & Analysis",
        icon: "fas fa-chart-line",
        color: "text-emerald-400",
        skills: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "spaCy", "NLTK", "fuzzywuzzy", "statsmodels (ARIMA)"]
    },
    {
        title: "LLM & RAG Technologies",
        icon: "fas fa-network-wired",
        color: "text-violet-400",
        skills: ["LangChain", "LangGraph", "LangSmith", "DSPy", "ChromaDB", "Sentence-Transformers", "Ollama"]
    },
    {
        title: "AI/ML Capabilities",
        icon: "fas fa-robot",
        color: "text-yellow-400",
        skills: ["Natural Language Processing (NLP)", "Computer Vision", "Pose Estimation", "Sentiment Analysis", "Named Entity Recognition (NER)", "Text Classification", "Recommendation Systems", "Time Series Analysis", "Anomaly Detection", "Pattern Recognition"]
    },
    {
        title: "Advanced AI & MLOps",
        icon: "fas fa-cogs",
        color: "text-amber-400",
        skills: ["Hyperparameter Optimization", "Experiment Tracking", "Model Versioning", "Retrieval-Augmented Generation (RAG)", "Vector Embeddings", "Hybrid Search"]
    },
    {
        title: "Prompt Engineering",
        icon: "fas fa-wand-magic-sparkles",
        color: "text-indigo-400",
        skills: ["Claude (Advanced)", "ChatGPT (Advanced)", "DeepSeek (Advanced)", "AI System Optimization", "Creative Content Generation"]
    },
    {
        title: "Development Tools",
        icon: "fas fa-tools",
        color: "text-cyan-400",
        skills: ["Git & GitHub", "GitHub Actions", "Visual Studio Code", "Docker", "Jupyter Notebooks", "Android Studio", "Selenium", "Undetected Chrome"]
    },
    {
        title: "Mobile, AR & IoT",
        icon: "fas fa-mobile-alt",
        color: "text-green-400",
        skills: ["Flutter", "AR Flutter Plugin", "ARKit (iOS)", "ARCore (Android)", "Unity3D", "ESP32 Programming", "Sensor Integration", "ThingSpeak Cloud Platform", "Real-time Monitoring", "Webhooks"]
    },
    {
        title: "Security & Cryptography",
        icon: "fas fa-shield-alt",
        color: "text-red-400",
        skills: ["Authentication Systems", "Trust Scoring", "Multi-level Encryption", "Penetration Testing", "Dynamic Trust Mechanisms", "File Encryption", "Secure Data Transmission"]
    },
    {
        title: "APIs & Data Formats",
        icon: "fas fa-plug",
        color: "text-teal-400",
        skills: ["RESTful APIs", "Apollo.io API", "Firebase API", "Hunter.io API", "JSON", "LeadRocks API", "NewsAPI", "OpenAI API", "Regular Expressions", "Snov.io API", "Telegram Bot API", "Webhook Implementation", "Yahoo Finance API"]
    },
    {
        title: "Cloud & Database",
        icon: "fas fa-cloud",
        color: "text-sky-400",
        skills: ["Google Cloud Platform", "Microsoft Power BI", "Firebase", "Cloud Firestore", "MySQL", "MongoDB", "PostgreSQL", "Neo4j", "Pinecone", "Redis", "Render", "SQLite", "Supabase", "ThingSpeak IoT Cloud"]
    },
    {
        title: "3D Modeling & Design",
        icon: "fas fa-cube",
        color: "text-rose-400",
        skills: ["AutoCAD", "Autodesk Inventor", "Figma", "Arduino IDE", "Proteus Simulation", "ModelSim", "Blender", "Cisco Packet Tracer", "Wireshark"]
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
// 4. Type-on-Scroll for Headings
// -----------------------------------------------------------------------------
const typeOnScrollElements = document.querySelectorAll('.type-on-scroll');

const typingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const text = el.getAttribute('data-text');
            if (text && !el.classList.contains('typed')) {
                el.classList.add('typed', 'type-cursor'); 
                el.textContent = ''; 
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
            setTimeout(type, 50 + Math.random() * 50);
        } else {
            setTimeout(() => {
                element.classList.remove('type-cursor');
            }, 1000);
        }
    }
    type();
}


// -----------------------------------------------------------------------------
// 5. Hero Typing Loop
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
// 6. Utility & Init
// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Init Intro Animation
    initIntroAnimation();

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