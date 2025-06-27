document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.dataset.theme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', document.body.dataset.theme);
    });

    // Set initial theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.dataset.theme = savedTheme;

    // Cursor Effects
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-item, .skill-category, .timeline-content, .info-item i, .form-group input, .form-group textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Typing Animation
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorBlink = document.querySelector('.cursor-blink');
    const textArray = ['Developer', 'Designer', 'Content Creator', 'Video Editor', 'Network Specialist'];
    const typingDelay = 200;
    const erasingDelay = 100;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start animation
    setTimeout(type, newTextDelay + 250);

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (isElementInViewport(bar)) {
                bar.style.width = width;
            }
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Run once on page load

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Create shooting stars
    function createShootingStars() {
        const shootingStarsContainer = document.querySelector('.shooting-stars');
        
        for (let i = 0; i < 5; i++) {
            const shootingStar = document.createElement('div');
            shootingStar.classList.add('shooting-star');
            
            // Random position
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            
            shootingStar.style.left = `${posX}px`;
            shootingStar.style.top = `${posY}px`;
            
            // Random delay
            const delay = Math.random() * 15;
            shootingStar.style.animationDelay = `${delay}s`;
            
            shootingStarsContainer.appendChild(shootingStar);
        }
    }

    createShootingStars();

    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll simulate a successful submission
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                this.reset();
                
                setTimeout(() => {
                    submitButton.textContent = 'Send Message';
                    submitButton.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Chatbot functionality
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const closeChatbot = document.querySelector('.close-chatbot');
    const sendChatbotQuery = document.getElementById('send-chatbot-query');
    const chatbotQueryInput = document.getElementById('chatbot-query');
    const chatbotMessages = document.querySelector('.chatbot-messages');

    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
    });

    closeChatbot.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });

    // Simple chatbot responses
    const chatbotResponses = {
        "hello": "Hello there! How can I help you learn more about Anil?",
        "hi": "Hi! I'm Anil's AI assistant. What would you like to know?",
        "who are you": "I'm an AI assistant created to provide information about Anil Kumar Sutihar Sharma.",
        "what does anil do": "Anil is a multi-talented professional with skills in development, design, content creation, video editing, and network specialization.",
        "education": "Anil is currently pursuing BSc (Hons) CSIT at Herald College Kathmandu, affiliated with Wolverhampton University, UK.",
        "skills": "Anil's skills include web development, graphic design, video editing, content creation, and network specialization.",
        "projects": "Anil has worked on various projects including e-commerce websites, brand identity packages, and network security systems.",
        "contact": "You can contact Anil through the contact form on this website or via email at anil@example.com.",
        "birthday": "Anil was born on November 4, 2004.",
        "default": "I'm sorry, I didn't understand that. You can ask me about Anil's education, skills, projects, or how to contact him."
    };

    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('bot-message');
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('user-message');
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function processUserQuery(query) {
        const lowerQuery = query.toLowerCase();
        let response = chatbotResponses.default;
        
        for (const key in chatbotResponses) {
            if (lowerQuery.includes(key)) {
                response = chatbotResponses[key];
                break;
            }
        }
        
        // Simulate typing delay
        setTimeout(() => {
            addBotMessage(response);
        }, 500);
    }

    sendChatbotQuery.addEventListener('click', () => {
        const query = chatbotQueryInput.value.trim();
        if (query) {
            addUserMessage(query);
            chatbotQueryInput.value = '';
            processUserQuery(query);
        }
    });

    chatbotQueryInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = chatbotQueryInput.value.trim();
            if (query) {
                addUserMessage(query);
                chatbotQueryInput.value = '';
                processUserQuery(query);
            }
        }
    });

    // Initialize with welcome message
    addBotMessage(chatbotResponses.hello);

    // Particle.js configuration
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00f7ff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00f7ff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Neon circle follow mouse
    const neonCircle = document.querySelector('.neon-circle');
    
    document.addEventListener('mousemove', (e) => {
        neonCircle.style.left = `${e.clientX - 300}px`;
        neonCircle.style.top = `${e.clientY - 300}px`;
    });

    // Initialize animations
    AOS.init();
});