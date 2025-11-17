// Checkout Page Functionality
let deliveryCost = 9.99;

document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    renderOrderSummary();
    initializeCheckoutForm();
});

function renderOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const summaryContainer = document.getElementById('orderSummaryItems');
    
    const subtotal = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return sum + (price * item.quantity);
    }, 0);
    
    const tax = subtotal * 0.08;
    const total = subtotal + deliveryCost + tax;
    
    // Render items
    summaryContainer.innerHTML = cart.map(item => `
        <div class="summary-item">
            <div class="summary-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="summary-item-details">
                <div class="summary-item-name">${item.name}</div>
                <div class="summary-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="summary-item-price">
                $${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
            </div>
        </div>
    `).join('');
    
    // Update totals
    document.getElementById('summarySubtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('summaryShipping').textContent = '$' + deliveryCost.toFixed(2);
    document.getElementById('summaryTax').textContent = '$' + tax.toFixed(2);
    document.getElementById('summaryTotal').textContent = '$' + total.toFixed(2);
}

function selectDelivery(element, type, cost) {
    // Remove selection from all options
    document.querySelectorAll('.delivery-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Select clicked option
    element.classList.add('selected');
    element.querySelector('input[type="radio"]').checked = true;
    
    // Update delivery cost
    deliveryCost = cost;
    renderOrderSummary();
}

function selectPayment(element, type) {
    // Remove selection from all options
    document.querySelectorAll('.payment-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Select clicked option
    element.classList.add('selected');
    element.querySelector('input[type="radio"]').checked = true;
    
    // Hide all payment details
    document.querySelectorAll('.payment-details').forEach(detail => {
        detail.classList.remove('show');
    });
    
    // Show relevant payment details
    if (type === 'card') {
        document.getElementById('cardDetails').classList.add('show');
    } else if (type === 'bkash') {
        document.getElementById('bkashDetails').classList.add('show');
    }
}

function initializeCheckoutForm() {
    const form = document.getElementById('checkoutForm');
    
    // Format card number
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    // Format expiry date
    const cardExpiry = document.getElementById('cardExpiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleCheckout();
    });
}

function handleCheckout() {
    const form = document.getElementById('checkoutForm');
    const formData = new FormData(form);
    const paymentMethod = formData.get('payment');
    
    // Validate payment-specific fields
    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value;
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCVV = document.getElementById('cardCVV').value;
        
        if (!cardNumber || !cardExpiry || !cardCVV) {
            alert('Please fill in all card details');
            return;
        }
    } else if (paymentMethod === 'bkash') {
        const bkashNumber = document.getElementById('bkashNumber').value;
        if (!bkashNumber) {
            alert('Please enter your bKash number');
            return;
        }
    }
    
    // Generate order number
    const orderNumber = 'GS' + Date.now().toString().slice(-8);
    
    // Get order data
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return sum + (price * item.quantity);
    }, 0);
    
    const orderData = {
        orderNumber: orderNumber,
        date: new Date().toISOString(),
        customer: {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        },
        shipping: {
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zip: document.getElementById('zip').value,
            country: document.getElementById('country').value
        },
        items: cart,
        payment: {
            method: paymentMethod,
            subtotal: subtotal,
            shipping: deliveryCost,
            tax: subtotal * 0.08,
            total: subtotal + deliveryCost + (subtotal * 0.08)
        }
    };
    
    // Save order to localStorage
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    localStorage.removeItem('cart');
    
    // Redirect to confirmation page
    localStorage.setItem('currentOrder', JSON.stringify(orderData));
    window.location.href = 'order-confirmation.html';
}
