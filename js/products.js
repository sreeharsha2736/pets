var products = [
    { title: 'Dog Food', img: '../img/dog_food.jpg', description: 'Premium dog food made with natural ingredients.' },
    { title: 'Cat Litter', img: '../img/cat_litter.png', description: 'Clumping cat litter for easy cleanup.' },
    { title: 'Fish Tank', img: '../img/fish_tank.jpg', description: 'Stylish aquarium for your aquatic pets.' },
    { title: 'Bird Cage', img: '../img/bird_cage.jpeg', description: 'Spacious cage for your feathered friend.' },
];

// Select the container where you want to add the products
var $container = $('.products-container');

// Create a new row
var $row = $('<div>').addClass('row mb-3');

// Loop through the products array
$.each(products, function (index, product) {
    // Create a new div element for each product
    var $productDiv = $('<div>').addClass('col-md-4');

    // Set the innerHTML of the div
    $productDiv.html(`
    <div class="card h-100">
      <img class="card-img" src="${product.img}" alt="${product.title}">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
        <a href="#" class="btn btn-primary"><i class="bi bi-cart-plus-fill"></i> Add to Cart</a>
      </div>
    </div>
  `);

    // Append the new product div to the row
    $row.append($productDiv);

    // Append the row to the container every 3 products and create a new one
    if ((index + 1) % 3 === 0) {
        $container.append($row);
        $row = $('<div>').addClass('row mb-3');
    }
});

// Append the last row if it has any products
if ($row.children().length > 0) {
    $container.append($row);
}