// Wow emoji effect function
function createWowEffect() {
    const emojis = ['🤩', '😲', '🤯', '🎉', '✨', '🚀'];
    const emojiCount = 40;
    
    for (let i = 0; i < emojiCount; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji-fall';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.animationDelay = Math.random() * 0.5 + 's';
        emoji.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(emoji);
        
        setTimeout(() => emoji.remove(), 4000);
    }
}

// Sad effect function (vomit emojis)
function createSadEffect() {
    const emojis = ['🤮', '🤢', '😵', '😱', '💩'];
    const emojiCount = 40;
    
    for (let i = 0; i < emojiCount; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji-fall';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.animationDelay = Math.random() * 0.5 + 's';
        emoji.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(emoji);
        
        setTimeout(() => emoji.remove(), 4000);
    }
    
    // Also shake the wrapper
    const toggleWrapper = document.querySelector('.toggle-wrapper');
    toggleWrapper.classList.add('shake');
    setTimeout(() => toggleWrapper.classList.remove('shake'), 500);
}

// Toggle Sans/Avec
document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const comparisons = document.querySelectorAll('.comparison');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Hide all comparisons
            comparisons.forEach(comp => comp.classList.remove('active'));
            
            // Show the selected comparison
            const view = button.getAttribute('data-view');
            const selectedComparison = document.querySelector(`.comparison.${view}`);
            if (selectedComparison) {
                selectedComparison.classList.add('active');
            }
            
            // Add fun effects
            if (view === 'avec') {
                createWowEffect();
            } else {
                createSadEffect();
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Header height
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elements to animate on scroll
    const animatedElements = [
        '.benefit-card',
        '.check-item',
        '.workflow-detail > div',
        '.visual-card'
    ];
    
    animatedElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Add hover effect to cards
    document.querySelectorAll('.benefit-card, .check-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animate metrics on scroll
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            const current = Math.floor(progress * (end - start) + start);
            if (element.textContent.includes('%')) {
                element.textContent = (current > 0 ? '+' : '') + current + '%';
            } else if (element.textContent.includes('h')) {
                element.textContent = current + 'h';
            } else {
                element.textContent = (current > 0 ? '-' : '') + current + '%';
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    // Observe metrics for animation
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const value = entry.target.textContent;
                
                if (value === '-65%') {
                    animateValue(entry.target, 0, -65, 1000);
                } else if (value === '+47%') {
                    animateValue(entry.target, 0, 47, 1000);
                }
                // La troisième métrique (✓) n'a pas besoin d'animation
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.metric-value').forEach(metric => {
        metricsObserver.observe(metric);
    });
    
    // Dynamic year for copyright (if needed)
    const year = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(element => {
        element.textContent = year;
    });
    
    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Any scroll-based logic here
        }, 100);
    });
    
    // Mobile menu toggle (if needed in future)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            document.querySelector('.header-nav').classList.toggle('active');
        });
    }
});

// Log page load for analytics (can be replaced with real analytics)
window.addEventListener('load', () => {
    console.log('Landing page loaded successfully');
    
    // Track CTA clicks
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', () => {
            console.log('CTA clicked:', button.textContent);
            // Here you could add real analytics tracking
        });
    });
    
    // Track portfolio link clicks
    document.querySelectorAll('a[href*="arnaudlavesque"]').forEach(link => {
        link.addEventListener('click', () => {
            console.log('Portfolio link clicked');
            // Here you could add real analytics tracking
        });
    });
});

// Quiz IA & Automation
const quizData = [
    {
        question: "Quand on parle d'IA et d'automatisation dans une agence comme Efficience Strategy, par quoi faut-il commencer ?",
        answers: [
            { text: "Par choisir l'outil le plus \"\u00e0 la mode\" (ChatGPT, Make, etc.)", correct: false },
            { text: "Par cartographier le process et les points de données à chaque étape", correct: true },
            { text: "Par automatiser un maximum de tâches en même temps", correct: false }
        ],
        feedback: "Exactement. L'outil vient après. Ce qui compte d'abord, c'est de comprendre le flux (acquisition, suivi, reporting) pour créer un système fiable et maintenable."
    },
    {
        question: "À quoi devrait servir l'IA en priorité dans une agence marketing orientée acquisition ?",
        answers: [
            { text: "À remplacer complètement l'équipe", correct: false },
            { text: "À assister la décision, réduire les tâches répétitives et améliorer la qualité des livrables", correct: true },
            { text: "À produire du contenu sans validation", correct: false }
        ],
        feedback: "Une IA bien utilisée agit comme un copilote : elle accélère, sécurise et enrichit le travail de l'équipe, sans la remplacer."
    },
    {
        question: "Quand on met en place une automatisation IA pour le marketing (lead gen, nurturing…), quel est le meilleur indicateur de succès ?",
        answers: [
            { text: "Le nombre d'automatisations créées dans l'outil", correct: false },
            { text: "Le temps gagné, même si les résultats business ne bougent pas", correct: false },
            { text: "L'impact sur les KPI d'acquisition : leads qualifiés, coût par lead, taux de conversion", correct: true }
        ],
        feedback: "Le succès se mesure sur les KPI business, pas seulement sur le temps gagné ou le volume d'automations."
    },
    {
        question: "Comment l'IA peut-elle aider concrètement Efficience Strategy sur les campagnes Social Ads / Google Ads ?",
        answers: [
            { text: "En lançant automatiquement des campagnes sans validation", correct: false },
            { text: "En aidant à analyser les performances, tester des variations créatives et prioriser les optimisations", correct: true },
            { text: "En remplaçant complètement les media buyers", correct: false }
        ],
        feedback: "L'IA est un excellent assistant pour analyser, tester et prioriser — mais la stratégie média reste humaine."
    },
    {
        question: "Quand on conçoit une automatisation IA pour le marketing digital, la clé est de…",
        answers: [
            { text: "Concevoir un système lisible, documenté, et facilement ajustable", correct: true },
            { text: "Chercher la solution la plus complexe possible", correct: false },
            { text: "Automatiser tout, même ce qui apporte peu de valeur", correct: false }
        ],
        feedback: "Un bon système IA est simple à comprendre, bien documenté et orienté valeur. C'est ce que j'essaie toujours de construire."
    }
];

let currentQuestion = 0;
let score = 0;

const initQuiz = () => {
    const startBtn = document.getElementById('start-quiz');
    const restartBtn = document.getElementById('restart-quiz');
    const nextBtn = document.getElementById('next-btn');
    
    if (!startBtn) return;
    
    startBtn.addEventListener('click', startQuiz);
    restartBtn.addEventListener('click', resetQuiz);
    nextBtn.addEventListener('click', nextQuestion);
};

const startQuiz = () => {
    document.getElementById('quiz-intro').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    currentQuestion = 0;
    score = 0;
    showQuestion();
};

const showQuestion = () => {
    const questionCard = document.getElementById('question-card');
    const feedbackCard = document.getElementById('feedback-card');
    const questionText = document.getElementById('question-text');
    const answersGrid = document.getElementById('answers-grid');
    const currentQuestionSpan = document.getElementById('current-question');
    const progressFill = document.getElementById('progress-fill');
    
    questionCard.style.display = 'block';
    feedbackCard.style.display = 'none';
    
    const data = quizData[currentQuestion];
    questionText.textContent = data.question;
    currentQuestionSpan.textContent = currentQuestion + 1;
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.width = progress + '%';
    
    // Clear and populate answers
    answersGrid.innerHTML = '';
    data.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answer.text;
        btn.addEventListener('click', () => selectAnswer(index));
        answersGrid.appendChild(btn);
    });
};

const selectAnswer = (selectedIndex) => {
    const data = quizData[currentQuestion];
    const answersGrid = document.getElementById('answers-grid');
    const buttons = answersGrid.querySelectorAll('.answer-btn');
    const isCorrect = data.answers[selectedIndex].correct;
    
    // Disable all buttons
    buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (data.answers[index].correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // Update score
    if (isCorrect) {
        score++;
        document.getElementById('score').textContent = score;
    }
    
    // Show feedback
    setTimeout(() => {
        showFeedback(isCorrect);
    }, 800);
};

const showFeedback = (isCorrect) => {
    const questionCard = document.getElementById('question-card');
    const feedbackCard = document.getElementById('feedback-card');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackText = document.getElementById('feedback-text');
    const nextBtn = document.getElementById('next-btn');
    
    questionCard.style.display = 'none';
    feedbackCard.style.display = 'block';
    
    feedbackIcon.textContent = isCorrect ? '✅' : '❌';
    feedbackText.textContent = quizData[currentQuestion].feedback;
    
    // Change button text for last question
    if (currentQuestion === quizData.length - 1) {
        nextBtn.textContent = 'Voir mes résultats';
    }
};

const nextQuestion = () => {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResults();
    }
};

const showResults = () => {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';
    
    const resultsTitle = document.getElementById('results-title');
    const resultsMessage = document.getElementById('results-message');
    const finalScore = document.getElementById('final-score');
    const resultsIcon = document.querySelector('.results-icon');
    
    finalScore.textContent = score;
    
    // Personalized message based on score
    if (score <= 2) {
        resultsTitle.textContent = "L'IA, c'est bien. Avec une méthode, c'est mieux.";
        resultsMessage.textContent = "Mon rôle : structurer des usages IA mesurables et alignés avec vos objectifs.";
        resultsIcon.textContent = '🤔';
    } else if (score <= 4) {
        resultsTitle.textContent = "Bons réflexes. On peut aller plus loin.";
        resultsMessage.textContent = "Avec plus de structure (process, data, reporting), l'IA devient un vrai levier de performance.";
        resultsIcon.textContent = '💪';
    } else {
        resultsTitle.textContent = "Même vision : IA, data, performance.";
        resultsMessage.textContent = "C'est ce que je veux mettre au service d'Efficience Strategy.";
        resultsIcon.textContent = '🎯';
    }
    
    // Scroll to results
    document.getElementById('quiz-results').scrollIntoView({ behavior: 'smooth', block: 'center' });
};

const resetQuiz = () => {
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-intro').style.display = 'block';
    document.getElementById('next-btn').textContent = 'Question suivante';
    currentQuestion = 0;
    score = 0;
    document.getElementById('score').textContent = '0';
};

// Preload images to improve performance
const preloadImages = () => {
    const images = [
        'photo.svg'
        // Add more image URLs as needed
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

// Call functions on page load
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    initQuiz();
});
