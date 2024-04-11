var products = [];

// Initialize products in local storage if not already present
if (!localStorage.getItem('products')) {
  // If products are not present, set default products and save them to local storage
  products = [
    { title: 'Dog Food', images: ['../img/dog_food.jpg', '../img/dog_food2.jpg', '../img/dog_food3.jpg'], description: 'Premium dog food made with natural ingredients.', price: 49.99, inventory: 3, actualInventory: 3, },
    { title: 'Cat Litter', images: ['../img/cat_litter.png', '../img/cat_litter2.png', '../img/cat_litter3.png'], description: 'Clumping cat litter for easy cleanup.', price: 19.99, inventory: 10, actualInventory: 10 },
    { title: 'Cat Tree', images: ['../img/cat_tree.jpg', '../img/cat_tree2.jpg', '../img/cat_tree3.jpg'], description: 'Large cat tree with multiple levels.', price: 99.99, inventory: 15 , actualInventory: 15 },
    { title: 'Fish Tank', images: ['../img/fish_tank.jpg', '../img/fish_tank2.jpg', '../img/fish_tank3.jpg'], description: 'Stylish aquarium for your aquatic pets.', price: 99.99, inventory: 8 , actualInventory: 8 },
    { title: 'Bird Cage', images: ['../img/bird_cage.jpeg', '../img/bird_cage2.jpeg', '../img/bird_cage3.jpeg'], description: 'Spacious cage for your feathered friend.', price: 79.99, inventory: 12 , actualInventory: 12 },
    { title: 'Hamster Wheel', images: ['../img/hamster_wheel.jpg', '../img/hamster_wheel2.jpg', '../img/hamster_wheel3.jpg'], description: 'Exercise wheel for your hamster.', price: 9.99, inventory: 25 , actualInventory: 25 },
    { title: 'Rabbit Hutch', images: ['../img/rabbit_hutch.jpg', '../img/rabbit_hutch2.jpg', '../img/rabbit_hutch3.jpg'], description: 'Outdoor hutch for your pet rabbit.', price: 129.99, inventory: 5 , actualInventory: 5 },
    { title: 'Guinea Pig Bedding', images: ['../img/guinea_pig_bedding.jpg', '../img/guinea_pig_bedding2.jpg', '../img/guinea_pig_bedding3.jpg'], description: 'Soft bedding for your guinea pig.', price: 14.99, inventory: 18, actualInventory: 18 },
    { title: 'Turtle Tank', images: ['../img/turtle_tank.jpg', '../img/turtle_tank2.jpg', '../img/turtle_tank3.jpg'], description: 'Large tank for your pet turtle.', price: 149.99, inventory: 3 , actualInventory: 3 }
  ];
  localStorage.setItem('products', JSON.stringify(products));
} else {
  // If products are already present in local storage, use them
  products = JSON.parse(localStorage.getItem('products'));
}

function displayProducts(products) {
  var $container = $('.products-container');
  var $row;

  $.each(products, function (index, product) {
    if (index % 3 === 0) {
      $row = $('<div>').addClass('row mb-3');
    }

    var $productDiv = $('<div>').addClass('col-md-4');
    $productDiv.html(`
      <div class="card h-100">
          <div class="carousel">
              <img class="card-img" src="${product.images[0]}" alt="${product.title}">
              <img class="card-img" src="${product.images[1]}" alt="${product.title}">
              <img class="card-img" src="${product.images[2]}" alt="${product.title}">
          </div>
          <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text"><strong>$${product.price}</strong></p>
              <p class="card-text">Available: <span class="available-count">${product.inventory}</span></p>
              <button type="button" class="btn btn-primary more-details-btn" data-toggle="modal" data-target="#productModal" data-title="${product.title}">More Details</button>
              <a href="#" class="btn btn-primary add-to-cart-btn" data-title="${product.title}"><i class="bi bi-cart-plus-fill"></i> Add to Cart</a>
          </div>
      </div>
    `);

    $row.append($productDiv);

    if (((index + 1) % 3 === 0) || (index === products.length - 1)) {
      $container.append($row);
    }
  });

  $('.carousel').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000
  });
}

function handleAddCart(productTitle, button) {
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  var product = products.find(p => p.title === productTitle);

  if (product && product.inventory > 0) {
    // Decrement the inventory count of the product
    product.inventory--;

    // Update the product data in local storage
    localStorage.setItem('products', JSON.stringify(products));

    // Check if the product already exists in the cart
    var existingItemIndex = cartItems.findIndex(item => item.petTitle === productTitle);

    if (existingItemIndex !== -1) {
      // If the product exists in the cart, increment its count
      cartItems[existingItemIndex].count++;
    } else {
      // If the product is not in the cart, add it with count 1
      cartItems.push({ 
        petTitle: productTitle, 
        price: product.price, 
        count: 1, 
        inventory: product.inventory,
        actualInventory:product.actualInventory,
        description: product.description
      });
    }

    // Update the cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Update the inventory displayed on the page for the specific card
    var $card = button.closest('.card');
    $card.find('.available-count').text(product.inventory); // Update inventory count

    // Update the available products count
    updateAvailableProductsCount();
    alert('Item added to cart!');
    // No need to redirect to cart page immediately
  } else {
    alert('Product is out of stock!');
  }
}


function updateAvailableProductsCount() {
  var totalCount = 0;
  products.forEach(function(product) {
    totalCount += product.inventory;
  });
  $('#availableProductsCount').text(totalCount);
}

$(document).ready(function () {
  displayProducts(products);
  updateAvailableProductsCount();
});

$(document).on('click', '.more-details-btn', function () {
  var productTitle = $(this).data('title');
  var product = products.find(p => p.title === productTitle);

  if (product) {
    $('#productTitle').text(product.title);
    $('#productDescription').text(product.description);
    $('#productPrice').text('$' + product.price);

    $('#productImages').empty();
    $.each(product.images, function (index, imageUrl) {
      $('#productImages').append('<img class="lazyload" data-src="' + imageUrl + '" alt="' + product.title + '">');
    });

    $('.lazyload').lazyLoadXT();
  } else {
    console.log('Product not found');
  }
});

$(document).on('click', '.add-to-cart-btn', function () {
  var productTitle = $(this).data('title');
  handleAddCart(productTitle, $(this));
});

function handleSearch() {
  var searchQuery = document.getElementById("searchInput").value.toLowerCase();
  var filteredProducts = products.filter(function (product) {
    return product.title.toLowerCase().includes(searchQuery);
  });

  $("#searchResults").empty();

  $.each(filteredProducts, function (index, product) {
    var $productDiv = $('<div>').addClass('search-result');
    $productDiv.html(`
          <img class="searched-image" src="${product.images[0]}" alt="${product.title}">
          <h5>${product.title}</h5>
          <p>${product.description}</p>
          <p><strong>$${product.price}</strong></p>
          <button type="button" class="btn btn-primary more-details-btn" data-toggle="modal" data-target="#productModal" data-title="${product.title}">More Details</button>
          <a href="#" class="btn btn-primary add-to-cart-btn" data-title="${product.title}"><i class="bi bi-cart-plus-fill"></i> Add to Cart</a>
      `);
    $("#searchResults").append($productDiv);
  });

  $("#searchDialog").dialog("open");
}

$(document).ready(function () {
  $("#searchDialog").dialog({
    autoOpen: false,
    modal: true,
    width: 900
  });
});
