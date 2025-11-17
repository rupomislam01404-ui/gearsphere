// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Create animated background
    createAnimatedBackground();
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-wrapper')) {
            navMenu?.classList.remove('active');
            hamburger?.classList.remove('active');
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('active');
            hamburger?.classList.remove('active');
        });
    });
});

// Smooth Scroll
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

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Add to Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function updateCartDropdown() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        if (cartFooter) cartFooter.style.display = 'none';
    } else {
        cartItemsContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price}</div>
                    <div class="cart-item-quantity">Qty: ${item.quantity}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
        
        if (cartFooter) cartFooter.style.display = 'block';
        
        // Calculate total
        const total = cart.reduce((sum, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return sum + (price * item.quantity);
        }, 0);
        
        if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDropdown();
    showNotification('Item removed from cart');
}

// Add to cart button handler
document.querySelectorAll('.btn-add-cart, .btn-add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get product info from the card
        const productCard = this.closest('.product-card') || this.closest('.product-details');
        
        if (productCard) {
            const product = {
                id: Date.now(),
                name: productCard.querySelector('h3, h1')?.textContent || 'Product',
                price: productCard.querySelector('.current-price')?.textContent || '$0.00',
                image: productCard.querySelector('img')?.src || '',
                quantity: parseInt(document.getElementById('quantity')?.textContent || '1'),
                brand: 'GearSphere',
                category: 'Mobile Accessories'
            };
            
            // Add to cart
            const existingItem = cart.find(item => item.name === product.name);
            if (existingItem) {
                existingItem.quantity += product.quantity;
            } else {
                cart.push(product);
            }
            
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart count
            updateCartCount();
            
            // Update cart dropdown
            updateCartDropdown();
            
            // Show notification
            showNotification('Product added to cart!');
        }
    });
});

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Newsletter form handler
document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            showNotification('Thanks for subscribing!');
            this.reset();
        }
    });
});

// Quick View functionality
document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Quick view coming soon!');
    });
});

// Filter functionality for shop page
if (document.querySelector('.filters')) {
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            filterProducts();
        });
    });
    
    document.querySelector('.sort-select')?.addEventListener('change', function() {
        sortProducts(this.value);
    });
}

function filterProducts() {
    // This is a placeholder for filter functionality
    console.log('Filtering products...');
}

function sortProducts(sortBy) {
    // This is a placeholder for sort functionality
    console.log('Sorting by:', sortBy);
}

// Initialize cart count on page load
updateCartCount();
updateCartDropdown();

// Intersection Observer for animations
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

// Animate elements on scroll
document.querySelectorAll('.product-card, .feature-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Image lazy loading
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Price range filter
const priceInputs = document.querySelectorAll('.price-input');
if (priceInputs.length > 0) {
    priceInputs.forEach(input => {
        input.addEventListener('input', function() {
            filterByPrice();
        });
    });
}

function filterByPrice() {
    const minPrice = parseFloat(priceInputs[0]?.value || 0);
    const maxPrice = parseFloat(priceInputs[1]?.value || Infinity);
    
    console.log('Filtering by price range:', minPrice, '-', maxPrice);
    // Add actual filtering logic here
}

// Product page color and size selection
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelector('.color-option.active')?.classList.remove('active');
        this.classList.add('active');
    });
});

document.querySelectorAll('.size-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelector('.size-option.active')?.classList.remove('active');
        this.classList.add('active');
    });
});

// Console welcome message
console.log('%cWelcome to GearSphere! 📱', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cPremium mobile accessories at unbeatable prices!', 'color: #ec4899; font-size: 14px;');

// Animated Background Creation
function createAnimatedBackground() {
    // Check if background already exists
    if (document.querySelector('.animated-bg')) return;
    
    const animatedBg = document.createElement('div');
    animatedBg.className = 'animated-bg';
    
    // Mobile accessory icons
    const icons = [
        'fa-mobile-alt',      // Phone
        'fa-headphones',      // Headphones
        'fa-charging-station', // Charger
        'fa-battery-full',    // Power bank
        'fa-plug',            // Cable
        'fa-shield-alt',      // Screen protector
        'fa-tablet-alt',      // Tablet
        'fa-bluetooth',       // Bluetooth
        'fa-wifi',            // Wireless
        'fa-camera',          // Camera
        'fa-microphone',      // Mic
        'fa-sim-card'         // SIM card
    ];
    
    // Create 12 floating icons
    for (let i = 0; i < 12; i++) {
        const floatingIcon = document.createElement('i');
        floatingIcon.className = `fas ${icons[i]} floating-icon`;
        
        // Add parallax classes randomly
        if (i % 3 === 0) {
            floatingIcon.classList.add('parallax-slow');
        } else if (i % 3 === 1) {
            floatingIcon.classList.add('parallax-fast');
        }
        
        animatedBg.appendChild(floatingIcon);
    }
    
    // Insert at the beginning of body
    document.body.insertBefore(animatedBg, document.body.firstChild);
    
    // Add scroll parallax effect
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                const floatingIcons = document.querySelectorAll('.floating-icon');
                
                floatingIcons.forEach((icon, index) => {
                    const speed = (index % 3 + 1) * 0.05;
                    const yPos = -(scrolled * speed);
                    icon.style.transform = `translateY(${yPos}px)`;
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}


