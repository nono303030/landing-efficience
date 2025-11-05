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
                } else if (value === '2h') {
                    animateValue(entry.target, 0, 2, 1000);
                }
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
        question: "Lorsqu'on veut automatiser un processus de suivi client, quelle est la première étape logique ?",
        answers: [
            { text: "Choisir les outils (Make, Zapier, etc.)", correct: false },
            { text: "Cartographier le flux et les points de données", correct: true },
            { text: "Lancer un test rapide et voir si ça fonctionne", correct: false }
        ],
        feedback: "Exactement. L'outil vient après la compréhension du flux. C'est cette étape qui garantit un système fiable et maintenable."
    },
    {
        question: "Dans le cadre du marketing automation, une IA doit être utilisée principalement pour :",
        answers: [
            { text: "Assister la décision et réduire les tâches répétitives", correct: true },
            { text: "Remplacer complètement l'humain dans la stratégie", correct: false },
            { text: "Générer massivement du contenu sans contrôle qualité", correct: false }
        ],
        feedback: "Bien vu. Une IA performante en marketing automation agit comme un copilote intelligent, pas un pilote automatique."
    },
    {
        question: "Quelle est la meilleure façon d'évaluer la performance d'une automation marketing ?",
        answers: [
            { text: "En regardant le nombre d'automations créées", correct: false },
            { text: "En calculant le temps gagné", correct: false },
            { text: "En mesurant l'impact business (taux de conversion, réactivité, satisfaction)", correct: true }
        ],
        feedback: "Oui, le succès d'une automation, ce sont ses résultats mesurables — pas sa complexité."
    },
    {
        question: "Chez LUMA Arles, j'ai automatisé la gestion des avis clients. Quel a été le plus gros bénéfice ?",
        answers: [
            { text: "Diminution du temps de traitement et meilleure réactivité", correct: true },
            { text: "Suppression des équipes dédiées", correct: false },
            { text: "Augmentation du nombre d'avis négatifs traités", correct: false }
        ],
        feedback: "Exact. L'automation a permis de gagner du temps et de rendre la relation client plus fluide — sans perte de qualité."
    },
    {
        question: "Quand on crée un système automatisé, la clé du succès, c'est…",
        answers: [
            { text: "Concevoir pour être réutilisable et mesurable", correct: true },
            { text: "Automatiser tout ce qui bouge", correct: false },
            { text: "Ajouter un maximum d'IA pour impressionner", correct: false }
        ],
        feedback: "Exactement. L'automation utile est celle qui reste lisible, évolutive et mesurable."
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
        resultsTitle.textContent = "L'IA, c'est bien… mais avec un copilote, c'est mieux ! 😊";
        resultsMessage.textContent = "Pas de souci, c'est pour ça que je suis là. Ensemble, on structure vos process avec méthode.";
        resultsIcon.textContent = '🤔';
    } else if (score <= 4) {
        resultsTitle.textContent = "Vous avez de bons réflexes d'automation ! 👏";
        resultsMessage.textContent = "Encore un peu de structuration et c'est parfait. Je peux vous aider à passer au niveau supérieur.";
        resultsIcon.textContent = '💪';
    } else {
        resultsTitle.textContent = "Félicitations ! Vous pensez comme un Product Owner data-driven 😎";
        resultsMessage.textContent = "On parle le même langage. Imaginons ensemble ce qu'on pourrait construire pour Be Siouxx !";
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
