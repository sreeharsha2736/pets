var products = [
    { title: 'Dog Food', img: '../img/dog_food.jpg', description: 'Premium dog food made with natural ingredients.', price: 49.99 },
    { title: 'Cat Litter', img: '../img/cat_litter.png', description: 'Clumping cat litter for easy cleanup.', price: 19.99 },
    { title: 'Cat Tree', img: '../img/cat_tree.jpg', description: 'Large cat tree with multiple levels.', price: 99.99 },
    { title: 'Fish Tank', img: '../img/fish_tank.jpg', description: 'Stylish aquarium for your aquatic pets.', price: 99.99 },
    { title: 'Bird Cage', img: '../img/bird_cage.jpeg', description: 'Spacious cage for your feathered friend.', price: 79.99 },
    { title: 'Hamster Wheel', img: '../img/hamster_wheel.jpg', description: 'Exercise wheel for your hamster.', price: 9.99 },
    { title: 'Rabbit Hutch', img: '../img/rabbit_hutch.jpg', description: 'Outdoor hutch for your pet rabbit.', price: 129.99 },
    { title: 'Guinea Pig Bedding', img: '../img/guinea_pig_bedding.jpg', description: 'Soft bedding for your guinea pig.', price: 14.99 },
    { title: 'Turtle Tank', img: '../img/turtle_tank.jpg', description: 'Large tank for your pet turtle.', price: 149.99 },

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
        <p class="card-text"><strong>$${product.price}</strong></p>
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