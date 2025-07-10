// Variáveis globais
let isMenuOpen = false;
let scrolled = false;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Função principal de inicialização
function initializeApp() {
    setupEventListeners();
    setupScrollEffects();
    setupAnimations();
}

// Configurar event listeners
function setupEventListeners() {
    // Menu mobile
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Scroll do header
    window.addEventListener('scroll', handleScroll);
    
    // Fechar menu mobile ao clicar em links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Fechar menu mobile ao clicar fora
    document.addEventListener('click', function(event) {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        if (isMenuOpen && 
            !mobileMenu.contains(event.target) && 
            !mobileMenuBtn.contains(event.target)) {
            closeMobileMenu();
        }
    });
}

// Toggle do menu mobile
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        mobileMenu.style.display = 'block';
        mobileMenuBtn.classList.add('active');
        // Animar hamburger para X
        animateHamburgerToX();
    } else {
        mobileMenu.style.display = 'none';
        mobileMenuBtn.classList.remove('active');
        // Animar X para hamburger
        animateXToHamburger();
    }
}

// Fechar menu mobile
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    isMenuOpen = false;
    mobileMenu.style.display = 'none';
    mobileMenuBtn.classList.remove('active');
    animateXToHamburger();
}

// Animações do hamburger menu
function animateHamburgerToX() {
    const hamburgers = document.querySelectorAll('.hamburger');
    if (hamburgers.length >= 3) {
        hamburgers[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        hamburgers[1].style.opacity = '0';
        hamburgers[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    }
}

function animateXToHamburger() {
    const hamburgers = document.querySelectorAll('.hamburger');
    if (hamburgers.length >= 3) {
        hamburgers[0].style.transform = 'none';
        hamburgers[1].style.opacity = '1';
        hamburgers[2].style.transform = 'none';
    }
}

// Manipular scroll do header
function handleScroll() {
    const header = document.getElementById('header');
    const currentScrolled = window.scrollY > 50;
    
    if (currentScrolled !== scrolled) {
        scrolled = currentScrolled;
        
        if (scrolled) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Trigger animations on scroll
    triggerScrollAnimations();
}

// Função para scroll suave para seções
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = 64; // Altura do header fixo
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
    
    // Fechar menu mobile se estiver aberto
    if (isMenuOpen) {
        closeMobileMenu();
    }
}

// Configurar efeitos de scroll
function setupScrollEffects() {
    // Adicionar classe fade-in aos elementos que devem animar
    const animatedElements = document.querySelectorAll('.service-card, .contact-card, .feature-item');
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
}

// Trigger das animações no scroll
function triggerScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Configurar animações iniciais
function setupAnimations() {
    // Trigger inicial das animações
    setTimeout(() => {
        triggerScrollAnimations();
    }, 100);
}

// Função para validar formulários (se necessário no futuro)
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Email inválido');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Mensagem deve ter pelo menos 10 caracteres');
    }
    
    return errors;
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para mostrar notificações (se necessário no futuro)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos inline para a notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Cores baseadas no tipo
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#10b981';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        case 'warning':
            notification.style.backgroundColor = '#f59e0b';
            break;
        default:
            notification.style.backgroundColor = '#2563eb';
    }
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Função para detectar dispositivo móvel
function isMobileDevice() {
    return window.innerWidth <= 768;
}

// Função para otimizar performance em dispositivos móveis
function optimizeForMobile() {
    if (isMobileDevice()) {
        // Reduzir animações em dispositivos móveis para melhor performance
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                * {
                    animation-duration: 0.3s !important;
                    transition-duration: 0.3s !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Função para lazy loading de imagens (se necessário no futuro)
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Função para debug (remover em produção)
function debugLog(message, data = null) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log(`[JottaSites Debug] ${message}`, data || '');
    }
}

// Event listeners adicionais para melhor UX
window.addEventListener('resize', function() {
    // Fechar menu mobile ao redimensionar para desktop
    if (window.innerWidth > 768 && isMenuOpen) {
        closeMobileMenu();
    }
});

// Prevenir zoom em inputs no iOS
document.addEventListener('touchstart', function() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.style.fontSize !== '16px') {
            input.style.fontSize = '16px';
        }
    });
});

// Inicializar otimizações
document.addEventListener('DOMContentLoaded', function() {
    optimizeForMobile();
    debugLog('JottaSites inicializado com sucesso!');
});