// Terapia Familiar Application - Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize application
    initializeNavigation();
    initializeCollapsibleCards();
    initializePrintFunctionality();
    initializeAnimations();
});

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Update active navigation item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section with animation
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });
}

// ===== COLLAPSIBLE CARDS =====
function initializeCollapsibleCards() {
    const collapsibleCards = document.querySelectorAll('.card.collapsible');
    
    collapsibleCards.forEach(card => {
        const header = card.querySelector('.card-header');
        const body = card.querySelector('.card-body');
        const toggleIcon = card.querySelector('.toggle-icon');
        
        // Add click event to header
        header.addEventListener('click', function() {
            const isOpen = card.classList.contains('open');
            
            if (isOpen) {
                closeCard(card);
            } else {
                openCard(card);
            }
        });
        
        // Add hover effects
        header.addEventListener('mouseenter', function() {
            if (!card.classList.contains('open')) {
                card.style.transform = 'translateY(-2px)';
                card.style.boxShadow = 'var(--shadow-md)';
            }
        });
        
        header.addEventListener('mouseleave', function() {
            if (!card.classList.contains('open')) {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'var(--shadow-sm)';
            }
        });
    });
}

function openCard(card) {
    card.classList.add('open');
    
    // Add slight delay for smooth animation
    setTimeout(() => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = 'var(--shadow-lg)';
    }, 100);
}

function closeCard(card) {
    card.classList.remove('open');
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = 'var(--shadow-sm)';
}

// ===== PRINT FUNCTIONALITY =====
function initializePrintFunctionality() {
    const printBtn = document.getElementById('printBtn');
    
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            // Open all collapsible cards before printing
            const collapsibleCards = document.querySelectorAll('.card.collapsible');
            collapsibleCards.forEach(card => {
                card.classList.add('open');
            });
            
            // Print with slight delay to ensure cards are expanded
            setTimeout(() => {
                window.print();
            }, 300);
        });
    }
}

// ===== ANIMATIONS AND INTERACTIONS =====
function initializeAnimations() {
    // Add entrance animations to cards
    const cards = document.querySelectorAll('.card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        cardObserver.observe(card);
    });
    
    // Add button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-1px)';
        });
    });
}

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .card:hover {
        animation: pulse 0.3s ease-in-out;
    }
    
    .nav-item:hover {
        transform: translateY(-2px);
        transition: transform 0.2s ease;
    }
    
    .section-header h2 {
        background: linear-gradient(45deg, var(--color-primary), var(--color-success));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .card.danger:hover {
        border-left-color: var(--color-error);
        box-shadow: 0 4px 12px rgba(192, 21, 47, 0.15);
    }
    
    .card.warning:hover {
        border-left-color: var(--color-warning);
        box-shadow: 0 4px 12px rgba(168, 75, 47, 0.15);
    }
    
    .card.success:hover {
        border-left-color: var(--color-success);
        box-shadow: 0 4px 12px rgba(33, 128, 141, 0.15);
    }
    
    .card.tool:hover {
        border-left-color: var(--color-info);
        box-shadow: 0 4px 12px rgba(98, 108, 113, 0.15);
    }
    
    .card.next-step:hover {
        border-left-color: var(--color-primary);
        box-shadow: 0 4px 12px rgba(33, 128, 141, 0.15);
    }
`;
document.head.appendChild(style);

// ===== UTILITY FUNCTIONS =====
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function addRippleEffect(element, event) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = 60;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ===== ACCESSIBILITY IMPROVEMENTS =====
function enhanceAccessibility() {
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('using-keyboard');
    });
    
    // Add ARIA labels
    const collapsibleCards = document.querySelectorAll('.card.collapsible');
    collapsibleCards.forEach((card, index) => {
        const header = card.querySelector('.card-header');
        const body = card.querySelector('.card-body');
        
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('aria-controls', `card-body-${index}`);
        body.setAttribute('id', `card-body-${index}`);
        
        header.addEventListener('click', function() {
            const isOpen = card.classList.contains('open');
            header.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
        });
    });
}

// Initialize accessibility improvements
enhanceAccessibility();

// ===== RESPONSIVE BEHAVIOR =====
function handleResponsiveDesign() {
    const nav = document.querySelector('.navigation');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth < 768) {
        navMenu.style.flexDirection = 'column';
    } else {
        navMenu.style.flexDirection = 'row';
    }
}

window.addEventListener('resize', handleResponsiveDesign);
handleResponsiveDesign(); // Initial call