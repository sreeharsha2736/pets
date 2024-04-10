$(document).ready(function () {
  // Define an array of pets with their details
  var pets = [
    {
      category: "cats",
      animals: [
        { name: "Whiskers", breed: "Siamese", age: 3, imgSrc: "../img/cats/siamese.jpg", price: 50 },
        { name: "Fluffy", breed: "Persian", age: 5, imgSrc: "../img/cats/persian.jpeg", price: 60 },
        { name: "Mittens", breed: "Maine Coon", age: 2, imgSrc: "../img/cats/maine_coon.webp", price: 55 },
        { name: "Snowball", breed: "Ragdoll", age: 4, imgSrc: "../img/cats/ragdoll.webp", price: 65 },
        { name: "Leo", breed: "Bengal", age: 1, imgSrc: "../img/cats/bengal.webp", price: 70 },
        { name: "Smokey", breed: "American Shorthair", age: 2, imgSrc: "../img/cats/american_shorthair.webp", price: 45 }
      ]
    },
    {
      category: "dogs",
      animals: [
        { name: "Max", breed: "Labrador Retriever", age: 4, imgSrc: "../img/dogs/labrador_retriever.jpeg", price: 100 },
        { name: "Buddy", breed: "German Shepherd", age: 3, imgSrc: "../img/dogs/german_shepherd.jpg", price: 110 },
        { name: "Bailey", breed: "Golden Retriever", age: 2, imgSrc: "../img/dogs/golden_retriever.jpg", price: 120 },
        { name: "Duke", breed: "Bulldog", age: 5, imgSrc: "../img/dogs/bulldog.jpeg", price: 90 },
        { name: "Cooper", breed: "Beagle", age: 1, imgSrc: "../img/dogs/beagle.jpg", price: 80 },
        { name: "Teddy", breed: "Pomeranian", age: 2, imgSrc: "../img/dogs/pomeranian.webp", price: 95 }
      ]
    },
    {
      category: "small-animals",
      animals: [
        { name: "Snowball", breed: "Rabbit", age: 2, imgSrc: "../img/small_animals/rabbit.avif", price: 30 },
        { name: "Whiskers", breed: "Hamster", age: 1, imgSrc: "../img/small_animals/hamsters.jpg", price: 20 },
        { name: "Cocoa", breed: "Guinea Pig", age: 3, imgSrc: "../img/small_animals/guinea_pig.jpg", price: 25 },
        { name: "Bandit", breed: "Ferret", age: 2, imgSrc: "../img/small_animals/ferret.jpg", price: 35 },
        { name: "Fluffy", breed: "Chinchilla", age: 4, imgSrc: "../img/small_animals/chinchilla.jpg", price: 40 },
        { name: "Squeaky", breed: "Rat", age: 1, imgSrc: "../img/small_animals/rat.jpeg", price: 15 }
      ]
    },
    {
      category: "birds",
      animals: [
        { name: "Polly", breed: "Parrot", age: 5, imgSrc: "../img/birds/parrot.jpg", price: 75 },
        { name: "Sunny", breed: "Canary", age: 2, imgSrc: "../img/birds/canary.webp", price: 65 },
        { name: "Charlie", breed: "Cockatiel", age: 3, imgSrc: "../img/birds/cockatiels.jpg", price: 55 },
        { name: "Cupid", breed: "Lovebird", age: 1, imgSrc: "../img/birds/lovebird.jpeg", price: 70 },
        { name: "Sky", breed: "Blue Budgie", age: 2, imgSrc: "../img/birds/blue_budgie.jpg", price: 60 },
        { name: "Sunny", breed: "Gold Finch", age: 2, imgSrc: "../img/birds/gold_finch.webp", price: 50 }
      ]
    },
    {
      category: "fish",
      animals: [
        { name: "Goldie", breed: "Goldfish", age: 3, imgSrc: "../img/fish/goldfish.webp", price: 10 },
        { name: "Bubbles", breed: "Betta Fish", age: 1, imgSrc: "../img/fish/betta.webp", price: 8 },
        { name: "Sushi", breed: "Guppy", age: 1, imgSrc: "../img/fish/guppy.jpg", price: 7 },
        { name: "Angel", breed: "Angelfish", age: 2, imgSrc: "../img/fish/angelfish.jpg", price: 12 },
        { name: "Tetra", breed: "Tetra", age: 1, imgSrc: "../img/fish/tetra.jpg", price: 6 },
        { name: "Blade", breed: "Swordtail", age: 2, imgSrc: "../img/fish/swordtail.jpg", price: 9 }
      ]
    },
    {
      category: "reptiles",
      animals: [
        { name: "Cammy", breed: "Chameleon", age: 1, imgSrc: "../img/reptiles/chameleon.jpg", price: 40 },
        { name: "Monty", breed: "Ball Python", age: 4, imgSrc: "../img/reptiles/ball_python.jpg", price: 50 },
        { name: "Leo", breed: "Leopard Gecko", age: 3, imgSrc: "../img/reptiles/leopard_gecko.jpg", price: 45 },
        { name: "Spike", breed: "Bearded Dragon", age: 2, imgSrc: "../img/reptiles/bearded_dragon.jpg", price: 55 },
        { name: "Shelly", breed: "Red-Eared Slider (Turtle)", age: 5, imgSrc: "../img/reptiles/red_eared_slider.jpg", price: 60 },
        { name: "Cresty", breed: "Crested Gecko", age: 1, imgSrc: "../img/reptiles/crested_gecko.jpg", price: 35 }
      ]
    }
  ];


  // Function to populate pets data into respective sections
  function populatePets() {
    pets.forEach(function (petCategory) {
      // Select the container for each category
      var $container = $("." + petCategory.category);

      // Clear previous content
      $container.empty();

      // Iterate through animals in the category
      petCategory.animals.forEach(function (animal) {
        // Create card for each animal
        var $card = $("<div>").addClass("col-md-4 mb-4");
        $card.html(`
          <div class="card">
            <img src="${animal.imgSrc}" class="card-img-top" alt="${animal.name}">
            <div class="card-body">
              <h5 class="card-title">${animal.name}</h5>
              <strong>$${animal.price}</strong>
              <p class="card-text">
                Breed: ${animal.breed}<br>
                Age: ${animal.age} years 
              </p>
              <a href="./appointment.html" class="btn btn-primary" onclick="Bookavisit(petTitle='${animal.name}')"><i class="bi bi-people"></i> Book a visit</a>
            </div>
          </div>
        `);

        // Append card to container
        $container.append($card);
      });
    });
  }

  // Call function to populate pets
  populatePets();
});
