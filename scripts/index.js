fetch('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products')
    .then(response => response.json())
    .then(data => {
       
        console.log(data); 
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });
.then(data => {
    const productsContainer = document.getElementById('products-container');

   
    data.forEach(product => {
        
        const card = document.createElement('div');
        card.classList.add('product-card');

        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-brand">${product.brand}</p>
            <p class="product-category">${product.category}</p>
            <p class="product-price">$${product.price}</p>
            <button class="add-to-cart-btn">Add to Cart</button>
        `;

       
        productsContainer.appendChild(card);
    });
})

const sortingDropdown = document.getElementById('sorting-dropdown');

sortingDropdown.addEventListener('change', function() {
    const selectedOption = sortingDropdown.value;

   
    let apiUrl = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products';

    if (selectedOption === 'price_asc') {
        apiUrl += '?sort=price_asc';
    } else if (selectedOption === 'price_desc') {
        apiUrl += '?sort=price_desc';
    } 

    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
           
            displayProducts(data);
        })
        .catch(error => {
            console.error('Error fetching sorted products:', error);
        });
});

const categoryCheckboxes = document.querySelectorAll('.category-checkbox');

categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        
        const selectedCategories = [];

        
        categoryCheckboxes.forEach(cb => {
            if (cb.checked) {
                selectedCategories.push(cb.value);
            }
        });

        
        let apiUrl = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products';

        if (selectedCategories.length > 0) {
            apiUrl += `?category=${selectedCategories.join(',')}`;
        }

        
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                
                displayProducts(data);
            })
            .catch(error => {
                console.error('Error fetching filtered products:', error);
            });
    });
});

const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productId = button.dataset.productId; 
        const productTitle = button.dataset.productTitle; 
        const productPrice = button.dataset.productPrice; 

       
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart.push({ id: productId, title: productTitle, price: productPrice });

        
        localStorage.setItem('cart', JSON.stringify(cart));

        
        alert('Product added to cart!');
    });
});

localStorage.setItem('cart', JSON.stringify(updatedCart));


document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    
});

function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items-container');
    let totalCartValue = 0;

    
    cartItemsContainer.innerHTML = '';

    
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

            
            updateCartUI();
        });
    });
}


document.addEventListener('DOMContentLoaded', updateCartUI);


fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return response.json();
    })
    .then(data => {
        
    })
    .catch(error => {
        
        console.error('Fetch error:', error.message);
        
        alert('Failed to fetch products. Please try again later.');
    });

