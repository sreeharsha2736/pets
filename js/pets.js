var pets = [
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


// Select the container where you want to add the pets
var $container = $('.pets-container');

// Create a new row
var $row = $('<div>').addClass('row mb-3');

// Loop through the pets array
$.each(pets, function (index, pet) {
    // Create a new div element for each pet
    var $petDiv = $('<div>').addClass('col-md-4');
    console.log(pet.title);
    var petTitle = pet.title;
    // Set the innerHTML of the div
    $petDiv.html(`
    <div class="card h-100">
      <img class="card-img" src="${pet.img}" alt="${pet.title}">
      <div class="card-body">
        <h5 class="card-title">${pet.title}</h5>
        <p class="card-text">${pet.description}</p>
        <p class="card-text"><strong>$${pet.price}</strong></p>
        <a href="#" class="btn btn-primary" onclick="handleAddCart(petTitle='${pet.title}')"><i class="bi bi-cart-plus-fill"></i> Add to Cart</a>
      </div>
    </div>
  `);

    // Append the new pet div to the row
    $row.append($petDiv);

    // Append the row to the container every 3 pets and create a new one
    if ((index + 1) % 3 === 0) {
        $container.append($row);
        $row = $('<div>').addClass('row mb-3');
    }
});

// Append the last row if it has any pets
if ($row.children().length > 0) {
    $container.append($row);
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
}

