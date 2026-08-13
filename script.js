// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll state
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu?.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn?.classList.remove('active');
        navMenu?.classList.remove('open');
    });
});

// Add click animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Subtle parallax on hero visual
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-visual');
    if (parallax && scrolled < window.innerHeight) {
        parallax.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
});

// Add interactive email form validation
document.querySelector('.email-input')?.addEventListener('input', function() {
    const email = this.value;
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    if (email && !isValid) {
        this.style.borderColor = '#e53935';
    } else if (email && isValid) {
        this.style.borderColor = '#2e7d32';
    } else {
        this.style.borderColor = '';
    }
});

// Add celebration animation for CTA form submission
document.querySelector('.btn-cta')?.addEventListener('click', function(e) {
    e.preventDefault();
    
    const emailInput = document.querySelector('.email-input');
    const email = emailInput.value;
    
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        // Create celebration effect
        createCelebration();
        
        // Show success message
        this.textContent = '🎉 DISCOUNT SENT!';
        this.style.background = 'linear-gradient(45deg, #51CF66, #37B24D)';
        
        setTimeout(() => {
            this.textContent = 'GET MY DISCOUNT!';
            this.style.background = '';
            emailInput.value = '';
        }, 3000);
    }
});

// Celebration effect function
function createCelebration() {
    const colors = ['#FFD700', '#FF69B4', '#FFB6C1', '#FFF59D', '#FC0FC0'];
    const container = document.querySelector('.cta');
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        container.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

// Add interactive cart functionality
document.querySelectorAll('.btn-product').forEach(button => {
    button.addEventListener('click', function() {
        cartItems++;
        updateCartCount();
        
        // Add to cart animation
        const productCard = this.closest('.product-card');
        const productEmoji = productCard.querySelector('.product-emoji');
        
        // Create flying emoji effect
        const flyingEmoji = productEmoji.cloneNode(true);
        flyingEmoji.style.position = 'fixed';
        flyingEmoji.style.fontSize = '40px';
        flyingEmoji.style.pointerEvents = 'none';
        flyingEmoji.style.zIndex = '9999';
        flyingEmoji.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        const rect = productEmoji.getBoundingClientRect();
        flyingEmoji.style.left = rect.left + 'px';
        flyingEmoji.style.top = rect.top + 'px';
        
        document.body.appendChild(flyingEmoji);
        
        setTimeout(() => {
            flyingEmoji.style.left = '20px';
            flyingEmoji.style.top = '20px';
            flyingEmoji.style.fontSize = '20px';
            flyingEmoji.style.opacity = '0';
        }, 100);
        
        setTimeout(() => {
            flyingEmoji.remove();
        }, 900);
        
        // Update button text temporarily
        const originalText = this.textContent;
        this.textContent = '✅ ADDED!';
        this.style.background = 'linear-gradient(45deg, #51CF66, #37B24D)';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
        }, 1500);
    });
});

// Update cart count function
function updateCartCount() {
    // Create cart counter if it doesn't exist
    let cartCounter = document.querySelector('.cart-counter');
    if (!cartCounter) {
        cartCounter = document.createElement('div');
        cartCounter.className = 'cart-counter';
        cartCounter.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, var(--hot-pink), var(--deep-pink));
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 18px;
            box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4);
            z-index: 1001;
            animation: bounce 0.5s ease;
        `;
        document.body.appendChild(cartCounter);
    }
    
    cartCounter.textContent = cartItems;
    cartCounter.style.animation = 'bounce 0.5s ease';
    
    setTimeout(() => {
        cartCounter.style.animation = '';
    }, 500);
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.35);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .cart-counter {
        animation: bounce 0.5s ease;
    }
`;
document.head.appendChild(style);

// Add mouse move parallax effect to hero gummies
document.addEventListener('mousemove', (e) => {
    const gummies = document.querySelectorAll('.gummy');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    gummies.forEach((gummy, index) => {
        const speed = (index + 1) * 10;
        const moveX = (x - 0.5) * speed;
        const moveY = (y - 0.5) * speed;
        
        gummy.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// FAQ Toggle functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Contact form submission
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.textContent = '✅ MESSAGE SENT!';
        submitBtn.style.background = 'linear-gradient(45deg, #51CF66, #37B24D)';
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
        
        // Show success notification
        showNotification('Thank you for your message! We will respond within 24 hours.');
    }, 1500);
});

// Size selection functionality
document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const sizeBtns = productCard.querySelectorAll('.size-btn');
        
        // Remove active class from all buttons
        sizeBtns.forEach(button => button.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Update price based on size (example logic)
        const size = this.textContent;
        const priceElement = productCard.querySelector('.price-current');
        const originalPrice = productCard.querySelector('.price-original');
        
        if (size === '5oz') {
            priceElement.textContent = '$12.99';
            originalPrice.textContent = '$15.99';
        } else if (size === '8oz') {
            priceElement.textContent = '$18.99';
            originalPrice.textContent = '$22.99';
        } else if (size === '12oz') {
            priceElement.textContent = '$24.99';
            originalPrice.textContent = '$29.99';
        } else if (size === '16oz') {
            priceElement.textContent = '$28.99';
            originalPrice.textContent = '$35.99';
        } else if (size === '24oz') {
            priceElement.textContent = '$39.99';
            originalPrice.textContent = '$49.99';
        }
    });
});

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #51CF66, #37B24D);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(81, 207, 102, 0.4);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Enhanced cart functionality with size consideration
let cartItems = 0;
let cartTotal = 0;

document.querySelectorAll('.btn-product').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productEmoji = productCard.querySelector('.product-emoji').textContent;
        const productName = productCard.querySelector('h3').textContent;
        const currentPrice = productCard.querySelector('.price-current').textContent;
        const selectedSize = productCard.querySelector('.size-btn.active').textContent;
        
        cartItems++;
        cartTotal += parseFloat(currentPrice.replace('$', ''));
        updateCartCount();
        updateCartTotal();
        
        // Create flying emoji effect
        const flyingEmoji = productEmoji.cloneNode(true);
        flyingEmoji.style.position = 'fixed';
        flyingEmoji.style.fontSize = '40px';
        flyingEmoji.style.pointerEvents = 'none';
        flyingEmoji.style.zIndex = '9999';
        flyingEmoji.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        const rect = productCard.getBoundingClientRect();
        flyingEmoji.style.left = rect.left + rect.width / 2 + 'px';
        flyingEmoji.style.top = rect.top + rect.height / 2 + 'px';
        
        document.body.appendChild(flyingEmoji);
        
        setTimeout(() => {
            flyingEmoji.style.left = '20px';
            flyingEmoji.style.top = '20px';
            flyingEmoji.style.fontSize = '20px';
            flyingEmoji.style.opacity = '0';
        }, 100);
        
        setTimeout(() => {
            flyingEmoji.remove();
        }, 900);
        
        // Update button text temporarily
        const originalText = this.textContent;
        this.textContent = '✅ ADDED!';
        this.style.background = 'linear-gradient(45deg, #51CF66, #37B24D)';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
        }, 1500);
        
        // Show detailed notification
        showNotification(`${productName} (${selectedSize}) added to cart!`);
    });
});

// Update cart total function
function updateCartTotal() {
    let cartTotalElement = document.querySelector('.cart-total');
    if (!cartTotalElement) {
        cartTotalElement = document.createElement('div');
        cartTotalElement.className = 'cart-total';
        cartTotalElement.style.cssText = `
            position: fixed;
            top: 70px;
            right: 20px;
            background: white;
            color: var(--dark-text);
            padding: 10px 15px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            z-index: 1001;
            font-weight: 600;
            font-size: 14px;
        `;
        document.body.appendChild(cartTotalElement);
    }
    
    cartTotalElement.textContent = `Total: $${cartTotal.toFixed(2)}`;
    cartTotalElement.style.animation = 'bounce 0.5s ease';
    
    setTimeout(() => {
        cartTotalElement.style.animation = '';
    }, 500);
}

// Enhanced scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe more elements for animations
document.querySelectorAll('.product-card, .feature, .testimonial-card, .quality-badge, .contact-item, .faq-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add smooth reveal animation for company stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                setTimeout(() => {
                    stat.style.animation = 'countUp 1s ease forwards';
                }, index * 200);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.company-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add count up animation
const countUpStyle = document.createElement('style');
countUpStyle.textContent = `
    @keyframes countUp {
        from {
            transform: scale(0.5);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(countUpStyle);

// Banner close functionality
document.querySelector('.banner-close')?.addEventListener('click', function() {
    const banner = document.querySelector('.top-banner');
    banner.style.animation = 'slideUp 0.3s ease forwards';
    setTimeout(() => {
        banner.remove();
        document.body.classList.add('no-banner');
    }, 300);
});

// Search functionality
document.querySelector('.search-btn')?.addEventListener('click', function() {
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        showNotification(`Searching for "${searchTerm}"...`);
        // Simulate search
        setTimeout(() => {
            showNotification(`Found 3 results for "${searchTerm}"`);
        }, 1000);
    }
});

document.querySelector('.search-input')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.querySelector('.search-btn').click();
    }
});

// Account and cart button interactions
document.querySelector('.account-btn')?.addEventListener('click', function() {
    showNotification('Account login coming soon!');
});

document.querySelector('.cart-btn')?.addEventListener('click', function() {
    if (cartItems === 0) {
        showNotification('Your cart is empty! Add some delicious gummies!');
    } else {
        showNotification(`You have ${cartItems} items in your cart - Total: $${cartTotal.toFixed(2)}`);
    }
});

// Subscription plan selection
document.querySelectorAll('.btn-plan').forEach(button => {
    button.addEventListener('click', function() {
        const planCard = this.closest('.plan-card');
        const planName = planCard.querySelector('h4').textContent;
        const planPrice = planCard.querySelector('.price-current').textContent;
        
        // Show loading state
        this.textContent = 'PROCESSING...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = '✅ SUBSCRIBED!';
            this.style.background = 'linear-gradient(45deg, #51CF66, #37B24D)';
            
            showNotification(`Welcome to ${planName}! Your first box ships soon.`);
            
            // Reset button after 3 seconds
            setTimeout(() => {
                this.textContent = planName.replace(' Box', ' PLAN');
                this.style.background = '';
                this.disabled = false;
            }, 3000);
        }, 2000);
    });
});

// Wholesale form submission
document.getElementById('wholesale-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.textContent = '✅ REQUEST SENT!';
        submitBtn.style.background = 'linear-gradient(45deg, #51CF66, #37B24D)';
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
        
        showNotification('Wholesale pricing request received! Our team will contact you within 24 hours.');
    }, 1500);
});

// Affiliate program signup
document.querySelector('.affiliate-section .btn-secondary')?.addEventListener('click', function() {
    const originalText = this.textContent;
    
    this.textContent = 'PROCESSING...';
    this.disabled = true;
    
    setTimeout(() => {
        this.textContent = '✅ WELCOME!';
        this.style.background = 'linear-gradient(45deg, #51CF66, #37B24D)';
        
        showNotification('Welcome to the HER BITE Affiliate Program! Check your email for next steps.');
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
            this.disabled = false;
        }, 3000);
    }, 2000);
});

// Tasting Experience Interactions
const flavorData = {
    strawberry: {
        emoji: '🍓',
        name: 'Strawberry Burst',
        firstBite: 'The soft exterior gives way instantly, releasing a wave of sweet strawberry aroma that fills your senses.',
        flavorExplosion: 'Natural strawberry essence bursts through, with notes of sun-ripened fruit and delicate floral undertones.',
        theChew: 'Perfect resistance that melts gradually, releasing layers of flavor with every chew.',
        aftertaste: 'Clean, sweet finish that lingers pleasantly, leaving you craving just one more.',
        sweetness: 80,
        tanginess: 40,
        intensity: 70,
        aftertasteLevel: 60
    },
    orange: {
        emoji: '🍊',
        name: 'Orange Explosion',
        firstBite: 'The bright citrus aroma hits you first, awakening your senses with zesty Valencia orange notes.',
        flavorExplosion: 'Sunshine bursts through with sweet orange essence, hints of citrus zest, and refreshing tang.',
        theChew: 'Bouncy and springy texture that mimics the satisfying bite of fresh orange segments.',
        aftertaste: 'Cleansing citrus finish that refreshes your palate and energizes your spirit.',
        sweetness: 75,
        tanginess: 70,
        intensity: 85,
        aftertasteLevel: 50
    },
    lemon: {
        emoji: '🍋',
        name: 'Lemon Zing',
        firstBite: 'Sharp, electrifying tang awakens your taste buds instantly with Meyer lemon brightness.',
        flavorExplosion: 'Complex citrus profile with bright lemon essence, subtle floral undertones, and invigorating zest.',
        theChew: 'Firm yet yielding texture that captures the natural fibrous quality of real lemon pulp.',
        aftertaste: 'Clean, refreshing aftertaste that lingers perfectly without overwhelming.',
        sweetness: 60,
        tanginess: 90,
        intensity: 80,
        aftertasteLevel: 70
    },
    grape: {
        emoji: '🍇',
        name: 'Grape Bliss',
        firstBite: 'Rich, deep Concord grape aroma envelops your senses like a warm embrace.',
        flavorExplosion: 'Bold grape essence with notes of vine-ripened fruit, subtle earthiness, and natural sweetness.',
        theChew: 'Smooth, velvety texture that melts effortlessly, releasing complex flavor layers.',
        aftertaste: 'Sophisticated finish with lingering notes of dark fruit and subtle sweetness.',
        sweetness: 85,
        tanginess: 30,
        intensity: 75,
        aftertasteLevel: 80
    },
    cherry: {
        emoji: '🍒',
        name: 'Cherry Delight',
        firstBite: 'Deep, sweet cherry aroma with hints of almond and vanilla fills your senses.',
        flavorExplosion: 'Rich cherry essence with notes of dark fruit, subtle tartness, and complex sweetness.',
        theChew: 'Perfectly firm texture that gives way to a juicy center bursting with authentic flavor.',
        aftertaste: 'Lingering sweetness with sophisticated fruit notes that dance on your palate.',
        sweetness: 90,
        tanginess: 35,
        intensity: 70,
        aftertasteLevel: 85
    }
};

// Flavor selector interactions
document.querySelectorAll('.flavor-option').forEach(option => {
    option.addEventListener('click', function() {
        // Remove active class from all options
        document.querySelectorAll('.flavor-option').forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        this.classList.add('active');
        
        // Get flavor data
        const flavor = this.dataset.flavor;
        const data = flavorData[flavor];
        
        // Update visual
        const gummyVisual = document.getElementById('gummy-visual');
        gummyVisual.textContent = data.emoji;
        gummyVisual.style.animation = 'none';
        setTimeout(() => {
            gummyVisual.style.animation = 'float 3s ease-in-out infinite';
        }, 100);
        
        // Update description
        document.getElementById('flavor-name').textContent = data.name;
        document.getElementById('first-bite').textContent = data.firstBite;
        document.getElementById('flavor-explosion').textContent = data.flavorExplosion;
        document.getElementById('the-chew').textContent = data.theChew;
        document.getElementById('aftertaste').textContent = data.aftertaste;
        
        // Update meters with animation
        updateMeter('sweetness-meter', data.sweetness);
        updateMeter('tanginess-meter', data.tanginess);
        updateMeter('intensity-meter', data.intensity);
        updateMeter('aftertaste-meter', data.aftertasteLevel);
        
        // Trigger taste wave animation
        triggerTasteWaves();
    });
});

// Update meter function
function updateMeter(meterId, value) {
    const meter = document.getElementById(meterId);
    meter.style.width = '0%';
    setTimeout(() => {
        meter.style.width = value + '%';
    }, 300);
}

// Trigger taste wave animation
function triggerTasteWaves() {
    const waves = document.querySelectorAll('.taste-wave');
    waves.forEach((wave, index) => {
        wave.style.animation = 'none';
        setTimeout(() => {
            wave.style.animation = `waveExpand 2s ease-out infinite`;
            wave.style.animationDelay = `${index * 0.5}s`;
        }, 100);
    });
}

// Taste button interaction
document.getElementById('taste-button')?.addEventListener('click', function() {
    const activeFlavor = document.querySelector('.flavor-option.active').dataset.flavor;
    const data = flavorData[activeFlavor];
    
    // Create taste explosion effect
    createTasteExplosion(data.emoji);
    
    // Show notification
    showNotification(`Tasting ${data.name}! Can you feel the flavor? 🎉`);
    
    // Trigger enhanced animations
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1.05)';
        this.textContent = 'TASTING...';
    }, 100);
    
    setTimeout(() => {
        this.style.transform = 'scale(1)';
        this.textContent = 'TASTE THIS FLAVOR';
    }, 2000);
});

// Compare button interaction
document.getElementById('compare-button')?.addEventListener('click', function() {
    showNotification('Flavor comparison mode activated! Select multiple flavors to compare.');
    
    // Enable multi-select mode
    document.querySelectorAll('.flavor-option').forEach(option => {
        option.style.cursor = 'pointer';
        option.addEventListener('click', function() {
            this.classList.toggle('compare-selected');
        });
    });
});

// Create taste explosion effect
function createTasteExplosion(emoji) {
    const colors = ['#FF69B4', '#FFD700', '#FFB6C1', '#FF1493', '#FFA500'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.textContent = emoji;
        particle.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 30 + 20}px;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 9999;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            animation: tasteParticle ${Math.random() * 2 + 1}s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 3000);
    }
    
    // Add taste particle animation
    const tasteParticleStyle = document.createElement('style');
    tasteParticleStyle.textContent = `
        @keyframes tasteParticle {
            0% {
                transform: translate(-50%, -50%) scale(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translate(
                    ${Math.random() * 400 - 200}px,
                    ${Math.random() * 400 - 200}px
                ) scale(0.5) rotate(${Math.random() * 720}deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(tasteParticleStyle);
}

// Gummy Lab interactions
document.querySelectorAll('.process-step').forEach((step, index) => {
    step.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    step.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    step.addEventListener('click', function() {
        // Create process animation
        const icon = this.querySelector('.step-icon');
        icon.style.animation = 'none';
        setTimeout(() => {
            icon.style.animation = 'spin 0.5s ease-in-out';
        }, 100);
        
        showNotification(`Step ${index + 1}: ${this.querySelector('h4').textContent} - Learn more!`);
    });
});

// Showcase item interactions
document.querySelectorAll('.showcase-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const visual = this.querySelector('.showcase-visual > div');
        if (visual) {
            visual.style.animation = 'none';
            setTimeout(() => {
                visual.style.animation = visual.style.animation || 'float 2s ease-in-out infinite';
            }, 100);
        }
    });
});

// Add keyboard navigation for tasting experience
document.addEventListener('keydown', (e) => {
    const options = document.querySelectorAll('.flavor-option');
    const activeIndex = Array.from(options).findIndex(opt => opt.classList.contains('active'));
    
    if (e.key === 'ArrowLeft' && activeIndex > 0) {
        options[activeIndex - 1].click();
    } else if (e.key === 'ArrowRight' && activeIndex < options.length - 1) {
        options[activeIndex + 1].click();
    } else if (e.key === 'Enter' || e.key === ' ') {
        document.getElementById('taste-button')?.click();
    }
});

// Mascot interactions and animations
const mascot = document.getElementById('gummy-mascot');
const mascotSpeech = document.getElementById('mascot-speech');
const mascotMessages = [
    "Hey there! I'm GUMMI! Ready for some tasty adventures? 🍬",
    "Try our strawberry burst! It's berry delicious! 🍓",
    "Did you know? Our gummies are made with real fruit! 🌿",
    "Join my fan club for exclusive goodies! 🎁",
    "Sweet dreams are made of gummies! ✨",
    "I'm bouncing with excitement for you! 🤸",
    "Let's make every moment sweeter! 🌈",
    "Yum! These gummies are the BOMB! 💥"
];

let messageIndex = 0;

// Change mascot speech periodically
function changeMascotSpeech() {
    if (mascotSpeech) {
        messageIndex = (messageIndex + 1) % mascotMessages.length;
        mascotSpeech.querySelector('p').textContent = mascotMessages[messageIndex];
        
        // Trigger animation
        mascotSpeech.style.animation = 'none';
        setTimeout(() => {
            mascotSpeech.style.animation = 'fadeInOut 8s ease-in-out infinite';
        }, 100);
    }
}

// Change speech every 8 seconds
setInterval(changeMascotSpeech, 8000);

// Mascot click interaction
mascot?.addEventListener('click', function() {
    // Make mascot jump
    this.style.animation = 'none';
    setTimeout(() => {
        this.style.animation = 'mascotBounce 0.5s ease-in-out 3';
    }, 100);
    
    // Show random message
    const randomMessage = mascotMessages[Math.floor(Math.random() * mascotMessages.length)];
    mascotSpeech.querySelector('p').textContent = randomMessage;
    
    // Create confetti effect
    createMascotConfetti();
    
    showNotification("GUMMI says: " + randomMessage.replace(/[🍬🍓🌿🎁✨🤸🌈💥]/g, '').trim());
});

// Mascot merchandise interactions
document.querySelectorAll('.mascot-pose').forEach((pose, index) => {
    pose.addEventListener('click', function() {
        // Make the pose spin
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'spin 0.5s ease-in-out';
        }, 100);
        
        // Update quote bubble with pose-specific message
        const quoteBubble = document.querySelector('.quote-bubble p');
        const poseMessages = [
            "I'm doing cartwheels for joy! 🤸",
            "Dancing through the candy aisle! 🕺",
            "Acting sweet for my fans! 🎭",
            "Step right up to the sweet show! 🎪"
        ];
        
        if (quoteBubble) {
            quoteBubble.textContent = poseMessages[index];
        }
        
        showNotification("GUMMI strikes a pose!");
    });
});

// Merchandise button interactions
document.querySelectorAll('.btn-merch').forEach(button => {
    button.addEventListener('click', function() {
        const merchItem = this.closest('.merch-item');
        const merchName = merchItem.querySelector('h4').textContent;
        const merchPrice = merchItem.querySelector('.merch-price').textContent;
        
        // Add to cart animation
        this.textContent = 'ADDING...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = '✅ ADDED!';
            this.style.background = 'linear-gradient(45deg, #51CF66, #37B24D)';
            
            // Update cart
            cartItems++;
            cartTotal += parseFloat(merchPrice.replace('$', ''));
            updateCartCount();
            updateCartTotal();
            
            showNotification(`${merchName} added to cart!`);
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.textContent = 'GET ' + merchName.split(' ')[1].toUpperCase();
                this.style.background = '';
                this.disabled = false;
            }, 2000);
        }, 1000);
    });
});

// Create mascot confetti effect
function createMascotConfetti() {
    const colors = ['#FF69B4', '#FFD700', '#FFB6C1', '#FF1493', '#FFA500'];
    const emojis = ['🍬', '🍓', '🌟', '💫', '⭐', '🎈'];
    
    for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 20 + 15}px;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 9999;
            left: ${mascot?.offsetLeft || 400}px;
            top: ${mascot?.offsetTop || 200}px;
            animation: mascotConfettiFall ${Math.random() * 2 + 1}s ease-out forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Add mascot confetti animation
const mascotConfettiStyle = document.createElement('style');
mascotConfettiStyle.textContent = `
    @keyframes mascotConfettiFall {
        0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720 - 360}deg) scale(0.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(mascotConfettiStyle);

// Graffiti element interactions
document.querySelectorAll('.graffiti-text').forEach(text => {
    text.addEventListener('mouseenter', function() {
        this.style.transform = `scale(1.2) rotate(${Math.random() * 30 - 15}deg)`;
        this.style.color = '#FF1493';
    });
    
    text.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.color = '';
    });
});

// Add floating graffiti animation on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const graffitiElements = document.querySelectorAll('.graffiti-splash, .graffiti-star');
    
    graffitiElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        element.style.transform = `translateY(${scrolled * speed * 0.1}px) rotate(${scrolled * speed * 0.05}deg)`;
    });
});

// Mascot follows cursor (subtle effect)
document.addEventListener('mousemove', (e) => {
    if (mascot) {
        const rect = mascot.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * 0.02;
        const deltaY = (e.clientY - centerY) * 0.02;
        
        mascot.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
});

// Add keyboard shortcut for mascot interaction (press 'M')
document.addEventListener('keydown', (e) => {
    if (e.key === 'm' || e.key === 'M') {
        mascot?.click();
    }
});

// Add slide up animation for banner
const bannerStyle = document.createElement('style');
bannerStyle.textContent = `
    @keyframes slideUp {
        to {
            transform: translateY(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(bannerStyle);
document.addEventListener('keydown', (e) => {
    // Press 'G' to trigger a random gummy animation
    if (e.key === 'g' || e.key === 'G') {
        const randomGummy = ['🍓', '🍊', '🍋', '🍇', '🍒', '🍬', '🍭'][Math.floor(Math.random() * 7)];
        const gummy = document.createElement('div');
        gummy.textContent = randomGummy;
        gummy.style.cssText = `
            position: fixed;
            font-size: 60px;
            left: ${Math.random() * window.innerWidth}px;
            top: -60px;
            z-index: 9999;
            animation: fall 2s ease-in forwards;
            pointer-events: none;
        `;
        
        document.body.appendChild(gummy);
        
        setTimeout(() => gummy.remove(), 2000);
    }
});

// Add falling animation
const fallStyle = document.createElement('style');
fallStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(fallStyle);
