// Define products array
var products = [
  { title: 'Dog Food', images: ['../img/dog_food.jpg', '../img/dog_food2.jpg', '../img/dog_food3.jpg'], description: 'Premium dog food made with natural ingredients.', price: 49.99 },
  { title: 'Cat Litter', images: ['../img/cat_litter.png', '../img/cat_litter2.png', '../img/cat_litter3.png'], description: 'Clumping cat litter for easy cleanup.', price: 19.99 },
  { title: 'Cat Tree', images: ['../img/cat_tree.jpg', '../img/cat_tree2.jpg', '../img/cat_tree3.jpg'], description: 'Large cat tree with multiple levels.', price: 99.99 },
  { title: 'Fish Tank', images: ['../img/fish_tank.jpg', '../img/fish_tank2.jpg', '../img/fish_tank3.jpg'], description: 'Stylish aquarium for your aquatic pets.', price: 99.99 },
  { title: 'Bird Cage', images: ['../img/bird_cage.jpeg', '../img/bird_cage2.jpeg', '../img/bird_cage3.jpeg'], description: 'Spacious cage for your feathered friend.', price: 79.99 },
  { title: 'Hamster Wheel', images: ['../img/hamster_wheel.jpg', '../img/hamster_wheel2.jpg', '../img/hamster_wheel3.jpg'], description: 'Exercise wheel for your hamster.', price: 9.99 },
  { title: 'Rabbit Hutch', images: ['../img/rabbit_hutch.jpg', '../img/rabbit_hutch2.jpg', '../img/rabbit_hutch3.jpg'], description: 'Outdoor hutch for your pet rabbit.', price: 129.99 },
  { title: 'Guinea Pig Bedding', images: ['../img/guinea_pig_bedding.jpg', '../img/guinea_pig_bedding2.jpg', '../img/guinea_pig_bedding3.jpg'], description: 'Soft bedding for your guinea pig.', price: 14.99 },
  { title: 'Turtle Tank', images: ['../img/turtle_tank.jpg', '../img/turtle_tank2.jpg', '../img/turtle_tank3.jpg'], description: 'Large tank for your pet turtle.', price: 149.99 }
];

// Function to display products
function displayProducts(products) {
  // Select the container where you want to add the products
  var $container = $('.products-container');
  var $row; // Declare $row variable outside the loop

  // Loop through the products array
  $.each(products, function (index, product) {
    // If index is divisible by 3, start a new row
    if (index % 3 === 0) {
      $row = $('<div>').addClass('row mb-3');
    }

    // Create a new div element for each product
    var $productDiv = $('<div>').addClass('col-md-4');

    debugger

    // Set the innerHTML of the div
    $productDiv.html(`
          <div class="card h-100">
              <div class="carousel">
                  <img class="card-img" src="${product.images[0]}" alt="${product.title}">
                  <img class="card-img" src="${product.images[1]}" alt="${product.title}">
                   <img class="card-img" src="${product.images[2]}" alt="${product.title}">
                  <!-- Add more images here if needed -->
              </div>
              <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">${product.description}</p>
                  <p class="card-text"><strong>$${product.price}</strong></p>
                  <button type="button" class="btn btn-primary more-details-btn" data-toggle="modal" data-target="#productModal" data-title="${product.title}">More Details</button>
                  <a href="#" class="btn btn-primary add-to-cart-btn" data-title="${product.title}"><i class="bi bi-cart-plus-fill"></i> Add to Cart</a>
              </div>
          </div>
      `);

    // Append the product div to the current row
    $row.append($productDiv);

    // If index+1 is divisible by 3 or it's the last product, append the row to the container
    if (((index + 1) % 3 === 0) || (index === products.length - 1)) {
      $container.append($row);
    }
  });

  // Initialize Slick Carousel for each product card
  $('.carousel').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000
  });
}

function handleAddCart(petTitle) {
  // Retrieve cartItems from localStorage and parse it as JSON
  var cartItems = JSON.parse(localStorage.getItem("cartItems"));

  if (cartItems) {
    // If cartItems exists in localStorage
    var existingPetIndex = cartItems.findIndex(item => item.petTitle === petTitle);
    if (existingPetIndex !== -1) {
      // If item already exists, increase the count
      cartItems[existingPetIndex].count++;
    } else {
      // Otherwise, add new item to the list
      cartItems.push({ petTitle: petTitle, count: 1 });
    }
  } else {
    // If cartItems doesn't exist in localStorage, initialize it with a new array
    cartItems = [{ petTitle: petTitle, count: 1 }];
  }

  // Save updated cartItems to localStorage after converting it to JSON
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  console.log(localStorage);
  alert('Item added to cart!')
  // redirect to cart page
  window.location.href = 'cart.html';
}

$(document).ready(function () {
  displayProducts(products);
});

$(document).on('click', '.more-details-btn', function () {
  // Get the title of the product associated with the clicked button
  var productTitle = $(this).data('title');

  // Find the product in the products array by title
  var product = products.find(p => p.title === productTitle);

  if (product) {
    // Populate modal with product details
    $('#productTitle').text(product.title);
    $('#productDescription').text(product.description);
    $('#productPrice').text('$' + product.price);

    // Clear existing images in the carousel
    $('#productImages').empty();

// Add product images to the carousel
$.each(product.images, function (index, imageUrl) {
  $('#productImages').append('<img class="lazyload" data-src="' + imageUrl + '" alt="' + product.title + '">');
});

// Initialize Lazy Load for images
$('.lazyload').lazyLoadXT();

  } else {
    console.log('Product not found');
  }
});

// click event listener to "Add to Cart" buttons
$(document).on('click', '.add-to-cart-btn', function () {
  // Get the title of the product associated with the clicked button
  var productTitle = $(this).data('title');
  // Call the handleAddCart function with the product title
  handleAddCart(productTitle);
});

function handleSearch() {
  var searchQuery = document.getElementById("searchInput").value.toLowerCase();
  var filteredProducts = products.filter(function (product) {
    return product.title.toLowerCase().includes(searchQuery);
  });

  // Clear existing search results
  $("#searchResults").empty();

  // Display search results in dialog box
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

  // Open dialog box with search results
  $("#searchDialog").dialog("open");
}

// Initialize Dialog Widget
$(document).ready(function () {
  $("#searchDialog").dialog({
    autoOpen: false,
    modal: true,
    width: 900
  });
});
