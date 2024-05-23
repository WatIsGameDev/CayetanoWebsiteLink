let cart = {
    items: [],
    totalPrice: 0
};

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Document loaded");

    const cartButton = document.getElementById('cart-button');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartButton = document.getElementById('close-cart');
    const checkoutButton = document.getElementById('checkout-btn');
    const modal = document.getElementById('checkout-modal');
    const closeModal = document.querySelector('.haha');
    const confirmCheckoutButton = document.getElementById('confirm-checkout');
    const checkoutSummary = document.getElementById('checkout-summary');

    cartButton.addEventListener('click', () => {
        cartSidebar.classList.add("open");
    });

    closeCartButton.addEventListener('click', () => {
        cartSidebar.classList.remove("open");
    });

    loadCartFromStorage();

    checkoutButton.addEventListener('click', () => {
        // Display modal
        modal.style.display = 'block';

        checkoutSummary.innerHTML = '';

        // Iterate through cart items and display details
        cart.items.forEach(item => {
            const summaryItem = document.createElement('div');
            
            const productName = document.createElement('div');
            productName.textContent = `${item.productName}`;
            
            const quantity = document.createElement('div');
            quantity.textContent = `Quantity: ${item.quantity}`;
            
            const price = document.createElement('div');
            price.textContent = `Price: $${item.price}`;
            
            summaryItem.appendChild(productName);
            summaryItem.appendChild(quantity);
            summaryItem.appendChild(price);
            
            checkoutSummary.appendChild(summaryItem);
        });
    
        // Display total price
        const totalPrice = document.createElement('div');
        totalPrice.textContent = `Total Price: $${cart.totalPrice}`;
        checkoutSummary.appendChild(totalPrice);
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    confirmCheckoutButton.addEventListener('click', () => {
        alert('Confirmed Checkout');
        clearCartData();
    });

   
});

function clearCartData() {
    // Reset cart object
    cart = {
        items: [],
        totalPrice: 0
    };
    
    // Clear cart data from localStorage
    localStorage.removeItem('cart');
    
    // Update cart display
    updateCartDisplay();
}


function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        
        const imageElement = document.createElement('img');
        imageElement.classList.add('cart-img');
        imageElement.src = item.image;
        imageElement.alt = item.productName;
        itemElement.appendChild(imageElement);

        const detailsElement = document.createElement('span');
        detailsElement.classList.add('cart-span');
        detailsElement.textContent = `${item.productName} - Quantity: ${item.quantity} - Price: $${item.price}`;
        itemElement.appendChild(detailsElement);

        cartItemsContainer.appendChild(itemElement);
    });

    document.getElementById('total-price').textContent = `Total Price: $${cart.totalPrice}`;
}

function addToCart(productName, price, image, quantity) {
    let item = cart.items.find(item => item.productName === productName);
    if (item) {
        item.quantity += quantity;
    } else {
        item = { productName, quantity, price, image };
        cart.items.push(item);
    }
    cart.totalPrice += quantity * price;
    updateCartDisplay();
    saveCartToStorage();
}

document.querySelectorAll('.addCartButton').forEach(button => {
    button.addEventListener('click', (event) => {
        const productName = event.target.getAttribute('data-product-name');
        const price = parseFloat(event.target.getAttribute('data-price'));
        const image = event.target.getAttribute('data-image');
        const quantity = parseInt(document.getElementById('quantity-input').value);
        alert("Item Added to Cart.");
        addToCart(productName, price, image, quantity);
    });
});


// search
javascript:
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-bar input[type="text"]');
    const searchButton = document.querySelector('.search-bar button[type="submit"]');
    const suggestionsContainer = document.querySelector('.search-suggestions');

    const productData = [
        {
            image: 'images/case1.svg',
            productName: 'Future GlaciAir PC Case',
            quantity: 0,
            description: 'Futuristic GlaciAir PC Case Future ',
            price: '$79',
            link: 'sproduct.html'
        },
        {
            image: 'images/case2.svg',
            productName: 'Mesh GlaciAir PC Case',
            quantity: 0,
            description: 'Mesh GlaciAir PC Case Gaming',
            price: '$79',
            link: 'sproduct.html'
        },
        {
            image: 'images/case3.svg',
            productName: 'Future GlaciAir PC Case',
            quantity: 0,
            description: 'Futuristic GlaciAir PC Case Future ',
            price: '$79',
            link: 'sproduct.html'
        },
        {
            image: 'images/case4.svg',
            productName: 'Mesh GlaciAir PC Case',
            quantity: 0,
            description: 'Mesh GlaciAir PC Case Gaming',
            price: '$79',
            link: 'sproduct.html'
        }
    ];

    searchButton.addEventListener('click', function(event) {
        event.preventDefault();
        const searchText = searchInput.value.trim().toLowerCase();

        const matchedProduct = productData.find(product => 
            product.productName.toLowerCase().includes(searchText)
        );

        if (matchedProduct) {
            window.location.href = matchedProduct.link;
        } else {
            alert('No matching product found.');
        }
    });

    searchInput.addEventListener('input', function() {
        const searchText = searchInput.value.trim().toLowerCase();
        suggestionsContainer.innerHTML = ''; // Clear previous suggestions

        if (searchText) {
            const matchedProducts = productData.filter(product => 
                product.productName.toLowerCase().includes(searchText) || 
                product.description.toLowerCase().includes(searchText)
            );

            matchedProducts.forEach(product => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('search-suggestion');
                suggestionItem.textContent = product.productName;
                suggestionItem.addEventListener('click', () => {
                    window.location.href = product.link;
                });

                suggestionsContainer.appendChild(suggestionItem);
            });
            
            if (matchedProducts.length > 0) {
                suggestionsContainer.style.display = 'block';
            } else {
                suggestionsContainer.style.display = 'none';
            }
        } else {
            suggestionsContainer.style.display = 'none';

        }
    });
});
//end of search