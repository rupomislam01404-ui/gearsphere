// Cart Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    renderCartPage();
});

function renderCartPage() {
    const cartContent = document.getElementById('cartContent');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <a href="shop.html" class="btn btn-primary btn-lg">Start Shopping</a>
            </div>
        `;
        return;
    }
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return sum + (price * item.quantity);
    }, 0);
    
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    cartContent.innerHTML = `
        <div class="cart-layout">
            <div class="cart-items-section">
                <div class="cart-table-header">
                    <div>Product</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div>Total</div>
                    <div></div>
                </div>
                ${cart.map((item, index) => `
                    <div class="full-cart-item">
                        <div class="cart-product-info">
                            <div class="cart-product-image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="cart-product-details">
                                <h3>${item.name}</h3>
                                <div class="cart-product-meta">
                                    <span>Category: Mobile Accessories</span><br>
                                    <span>Brand: ${item.brand || 'GearSphere'}</span>
                                </div>
                            </div>
                        </div>
                        <div class="cart-item-price">${item.price}</div>
                        <div class="cart-quantity-control">
                            <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                            <span class="qty-value">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                        <div class="cart-item-total">$${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</div>
                        <button class="remove-item-btn" onclick="removeFromCartPage(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
            
            <div class="cart-summary">
                <h2>Order Summary</h2>
                <div class="summary-row">
                    <span>Subtotal (${cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping</span>
                    <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Tax (8%)</span>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <div class="summary-total">
                    <span>Total</span>
                    <span class="price">$${total.toFixed(2)}</span>
                </div>
                <button class="checkout-btn" onclick="window.location.href='checkout.html'">
                    <i class="fas fa-lock"></i> Proceed to Checkout
                </button>
                <button class="continue-shopping" onclick="window.location.href='shop.html'">
                    <i class="fas fa-arrow-left"></i> Continue Shopping
                </button>
                ${shipping > 0 ? `
                    <div style="margin-top: 1rem; padding: 1rem; background: var(--light); border-radius: var(--radius-md); text-align: center;">
                        <small style="color: var(--success); font-weight: 600;">
                            <i class="fas fa-info-circle"></i> Add $${(50 - subtotal).toFixed(2)} more for FREE shipping!
                        </small>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartPage();
        updateCartCount();
        updateCartDropdown();
    }
}

function removeFromCartPage(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartPage();
    updateCartCount();
    updateCartDropdown();
    showNotification('Item removed from cart');
}
