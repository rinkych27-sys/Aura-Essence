// =============================================
// Aura Essence Perfumes - Premium JS
// Handles Add to Cart, Order Summary, Order ID
// =============================================

let cart = [];

// Load cart from localStorage if exists
if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'));
}

// Add to Cart buttons
const addCartButtons = document.querySelectorAll('.add-cart');
addCartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const price = parseFloat(btn.dataset.price);
        cart.push({name, price});
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${name} added to cart!`);
    });
});

// Load Order Summary
const orderSummary = document.getElementById('orderSummary');
if(orderSummary){
    if(cart.length === 0){
        orderSummary.innerHTML = '<p>No items in cart.</p>';
    } else {
        let html = '<h3>Order Summary</h3><ul>';
        let total = 0;
        cart.forEach(item => {
            html += `<li>${item.name} - ₹${item.price}</li>`;
            total += item.price;
        });
        html += `</ul><p><strong>Total: ₹${total}</strong></p>`;
        orderSummary.innerHTML = html;
    }
}

// Checkout Form Submit
function submitPayment(e){
    e.preventDefault();
    if(cart.length === 0){
        alert('Your cart is empty!');
        return;
    }
    // Generate Order ID
    const orderId = 'AE' + Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem('lastOrderId', orderId);
    // Clear cart
    localStorage.removeItem('cart');
    cart = [];
    // Redirect to Thank You page with orderId in query param
    window.location.href = `thankyou.html?orderId=${orderId}`;
}

// Display Order ID on Thank You Page
const orderIdBox = document.getElementById('orderIdBox');
if(orderIdBox){
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId') || localStorage.getItem('lastOrderId') || 'XXXX';
    orderIdBox.textContent = orderId;
}
