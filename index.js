 // Mobile navigation functionality
        const mobileToggle = document.getElementById('mobileToggle');
        const mobileNav = document.getElementById('mobileNav');
        const mobileOverlay = document.getElementById('mobileOverlay');
        const mobileClose = document.getElementById('mobileClose');
        
        let isMenuOpen = false;
        
        // Toggle mobile menu
        function toggleMobileMenu() {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                mobileNav.classList.add('active');
                mobileOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileNav.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
        
        // Close mobile menu
        function closeMobileMenu() {
            isMenuOpen = false;
            mobileNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
        
        // Event listeners for mobile menu
        mobileToggle.addEventListener('click', toggleMobileMenu);
        mobileClose.addEventListener('click', closeMobileMenu);
        mobileOverlay.addEventListener('click', closeMobileMenu);
        
        // Close menu when clicking on a link
        document.querySelectorAll('.mobile-nav-links a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Search functionality
        const searchToggle = document.getElementById('searchToggle');
        const searchBox = document.getElementById('searchBox');
        const mobileSearchToggle = document.getElementById('mobileSearchToggle');
        const mobileSearchBox = document.getElementById('mobileSearchBox');
        
        let isSearchOpen = false;
        let isMobileSearchOpen = false;
        
        // Desktop search toggle
        searchToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            isSearchOpen = !isSearchOpen;
            searchBox.classList.toggle('active', isSearchOpen);
        });
        
        // Mobile search toggle
        mobileSearchToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            isMobileSearchOpen = !isMobileSearchOpen;
            mobileSearchBox.classList.toggle('active', isMobileSearchOpen);
        });
        
        // Close search boxes when clicking outside
        document.addEventListener('click', function(e) {
            if (isSearchOpen && !searchBox.contains(e.target) && !searchToggle.contains(e.target)) {
                isSearchOpen = false;
                searchBox.classList.remove('active');
            }
            
            if (isMobileSearchOpen && !mobileSearchBox.contains(e.target) && !mobileSearchToggle.contains(e.target)) {
                isMobileSearchOpen = false;
                mobileSearchBox.classList.remove('active');
            }
        });
        
        // Active section highlighting
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
        
        function setActiveLink() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', setActiveLink);
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            });
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
                
                // Also close search boxes
                if (isSearchOpen) {
                    isSearchOpen = false;
                    searchBox.classList.remove('active');
                }
                
                if (isMobileSearchOpen) {
                    isMobileSearchOpen = false;
                    mobileSearchBox.classList.remove('active');
                }
                
                // Close consultation modal
                closeConsultationModal();
            }
        });

        // Hero Section Features
        
        // 1. Background Image Rotation
        const heroBackgrounds = document.querySelectorAll('.hero-background');
        let currentBgIndex = 0;
        
        function rotateBackground() {
            heroBackgrounds[currentBgIndex].classList.remove('active');
            currentBgIndex = (currentBgIndex + 1) % heroBackgrounds.length;
            heroBackgrounds[currentBgIndex].classList.add('active');
        }

        // Change background every 5 seconds
        setInterval(rotateBackground, 5000);
        
        
        
        // 3. Consultation Form Modal
        const consultationBtn = document.getElementById('consultationBtn');
        const consultationModal = document.getElementById('consultationModal');
        const formClose = document.getElementById('formClose');
        const consultationForm = document.getElementById('consultationForm');
        
        function openConsultationModal() {
            consultationModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeConsultationModal() {
            consultationModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        consultationBtn.addEventListener('click', openConsultationModal);
        formClose.addEventListener('click', closeConsultationModal);
        
        // Close modal when clicking outside
        consultationModal.addEventListener('click', function(e) {
            if (e.target === consultationModal) {
                closeConsultationModal();
            }
        });
        
        // Form submission
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(consultationForm);
            const data = Object.fromEntries(formData);
            
            // In a real application, you would send this data to your server
            // For now, we'll just show an alert and close the modal
            alert('Thank you for your consultation request! We will contact you within 24 hours.');
            closeConsultationModal();
            consultationForm.reset();
        });

        // Simple AOS (Animate On Scroll) implementation
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, parseInt(delay));
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initScrollAnimations();
        
        // Add hover effects for feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    });

    // Fallback for older browsers
    if (!window.IntersectionObserver) {
        document.addEventListener('DOMContentLoaded', function() {
            const animatedElements = document.querySelectorAll('[data-aos]');
            animatedElements.forEach(element => {
                element.classList.add('aos-animate');
            });
        });
    }

     // Get elements
        const whatsappBtn = document.getElementById('whatsappBtn');
        const chatWindow = document.getElementById('chatWindow');
        const closeBtn = document.getElementById('closeBtn');
        const startChatBtn = document.getElementById('startChatBtn');

        // Toggle chat window
        whatsappBtn.addEventListener('click', function() {
            chatWindow.classList.toggle('active');
        });

        // Close chat window
        closeBtn.addEventListener('click', function() {
            chatWindow.classList.remove('active');
        });

      
        startChatBtn.addEventListener('click', function() {

            const phoneNumber = '+254723565739';
            const message = 'Hi Kagira Advocates, I would like to inquire about your legal services.';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

            window.open(whatsappUrl, '_blank');
        });

    
        document.addEventListener('click', function(event) {
            if (!chatWindow.contains(event.target) && !whatsappBtn.contains(event.target)) {
                chatWindow.classList.remove('active');
            }
        });


        chatWindow.addEventListener('click', function(event) {
            event.stopPropagation();
        });


    document.addEventListener('DOMContentLoaded', function() {
        
        const practiceImages = document.querySelectorAll('.practice-img');
        practiceImages.forEach(img => {
            img.onerror = function() {
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMWExYTFhO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMyZDJkMmQ7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIgLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIG9wYWNpdHk9IjAuNyI+UHJhY3RpY2UgQXJlYSBJbWFnZTwvdGV4dD4KPC9zdmc+';
                this.alt = 'Practice Area';
            };
        });

        // Add scroll animations
        const practiceCards = document.querySelectorAll('.practice-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        practiceCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease ' + (index * 0.1) + 's';
            observer.observe(card);
        });
    });

     // Initialize team section animations and interactions
    document.addEventListener('DOMContentLoaded', function() {
        // Add image fallbacks
        const memberImages = document.querySelectorAll('.member-img');
        memberImages.forEach(img => {
            img.onerror = function() {
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMWExYTFhO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMyZDJkMmQ7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIgLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIG9wYWNpdHk9IjAuNyI+VGVhbSBNZW1iZXI8L3RleHQ+Cjwvc3ZnPg==';
                this.alt = 'Team Member';
            };
        });

        // Initialize scroll animations
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, parseInt(delay));
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });

        // Add hover effects for team members
        const teamMembers = document.querySelectorAll('.team-member');
        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            member.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    });

    // Initialize partnerships section
    document.addEventListener('DOMContentLoaded', function() {
        // Add image fallbacks
        const logoImages = document.querySelectorAll('.logo-img');
        logoImages.forEach(img => {
            img.onerror = function() {
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMmQyZDJkO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMxYTFhMWE7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIgLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIG9wYWNpdHk9IjAuNyI+UGFydG5lciBMb2dvPC90ZXh0Pgo8L3N2Zz4=';
                this.alt = 'Partner Logo';
            };
        });

        // Initialize scroll animations
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, parseInt(delay));
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });

        // Add click tracking for analytics
        const partnershipCards = document.querySelectorAll('.partnership-card');
        partnershipCards.forEach(card => {
            card.addEventListener('click', function() {
                // You can add analytics tracking here
                console.log('Partnership card clicked:', this.href);
            });
        });
    });


    // Auto-update copyright year
    document.addEventListener('DOMContentLoaded', function() {
        // Update copyright year
        const currentYear = new Date().getFullYear();
        document.getElementById('currentYear').textContent = currentYear;

        // Back to top functionality
        const backToTopBtn = document.getElementById('footerBackToTop');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Newsletter form submission
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                
                // Here you would typically send the data to your server
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            });
        }

        // Smooth scrolling for footer links
        const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
        footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    });