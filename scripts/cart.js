
document.addEventListener('DOMContentLoaded', function() {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    
    const cartItemsContainer = document.getElementById('cart-items-container');
    let totalCartValue = 0;

    cart.forEach(item => {
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <p>${item.title} - $${item.price}</p>
                <button class="remove-from-cart-btn" data-product-id="${item.id}">Remove</button>
            </div>
        `;
        totalCartValue += parseFloat(item.price);
    });


    document.getElementById('total-cart-value').textContent = `$${totalCartValue.toFixed(2)}`;

 
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart-btn');

    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = button.dataset.productId;
            
            
            const updatedCart = cart.filter(item => item.id !== productId);

           
            localStorage.setItem('cart', JSON.stringify(updatedCart));

            
            location.reload();
        });
    });
});
