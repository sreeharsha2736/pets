$(document).ready(function() {
    function displayCartItems() {
        var cartItems = JSON.parse(localStorage.getItem("cartItems"));

        var $cartContainer = $('.cart-container');
        $cartContainer.empty();

        if (cartItems && cartItems.length > 0) {
            cartItems.forEach(function(item) {
                var product = products.find(product => product.title === item.petTitle);
                if (product) {
                    var $productDiv = $('<div>').addClass('product-card');
                    $productDiv.html(`
                        <div class="card h-100">
                            <div class="image-container">
                                <a href="./pets.html"><img class="card-img"  src="${product.images[0]}" alt="${product.title}"></a>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="card-text"><strong>$${product.price}</strong></p>
                                <p class="card-text">Count: ${item.count}</p>
                                <button class="btn btn-danger delete-btn" data-title="${product.title}">Delete</button>
                                <button class="btn btn-primary reduce-btn" data-title="${product.title}">Reduce Count</button>
                                <button class="btn btn-success increase-btn" data-title="${product.title}">Increase Count</button>
                            </div>
                        </div>
                    `);
                    $cartContainer.append($productDiv);
                }
            });
        } else {
            $cartContainer.html('<h1>Cart is empty</h1>');
        }

        // Add event listeners for delete, reduce count, and increase count buttons
        $('.delete-btn').on('click', function() {
            var title = $(this).data('title');
            removeFromCart(title);
        });

        $('.reduce-btn').on('click', function() {
            var title = $(this).data('title');
            reduceItemCount(title);
        });

        $('.increase-btn').on('click', function() {
            var title = $(this).data('title');
            increaseItemCount(title);
        });
    }

    function removeFromCart(title) {
        var cartItems = JSON.parse(localStorage.getItem("cartItems"));
        var updatedCartItems = cartItems.filter(item => item.petTitle !== title);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    
        // Update inventory in products array
        var product = products.find(p => p.title === title);
        if (product) {
            product.inventory += cartItems.find(item => item.petTitle === title).count;
            localStorage.setItem('products', JSON.stringify(products));
        }
    
        displayCartItems();
    }
    
    function reduceItemCount(title) {
        var cartItems = JSON.parse(localStorage.getItem("cartItems"));
        var itemIndex = cartItems.findIndex(item => item.petTitle === title);
        if (itemIndex !== -1) {
            cartItems[itemIndex].count--;
            if (cartItems[itemIndex].count === 0) {
                removeFromCart(title); // Remove item if count becomes zero
            } else {
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                // Update inventory in products array
                var product = products.find(p => p.title === title);
                if (product) {
                    product.inventory++;
                    localStorage.setItem('products', JSON.stringify(products));
                }
                displayCartItems();
            }
        }
    }
    
    function increaseItemCount(title) {
        var cartItems = JSON.parse(localStorage.getItem("cartItems"));
        var itemIndex = cartItems.findIndex(item => item.petTitle === title);
        if (itemIndex !== -1) {
            cartItems[itemIndex].count++;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            // Update inventory in products array
            var product = products.find(p => p.title === title);
            if (product && product.inventory > 0) {
                product.inventory--;
                localStorage.setItem('products', JSON.stringify(products));
            }
            displayCartItems();
        }
    }
    
    displayCartItems();
});
