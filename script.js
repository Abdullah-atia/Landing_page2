import Products from "./product.js";

// Get references to DOM elements
const slideContainer = document.querySelector(".slide-container");
const searchInput = document.querySelector("#search-input");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// Function to display all products
function displayAllProducts() {
  // Clear existing products
  while (slideContainer.firstChild) {
    slideContainer.removeChild(slideContainer.firstChild);
  }

  // Display all products
  Products.forEach((product) => {
    const cardSlide = createCardSlide(product);
    slideContainer.appendChild(cardSlide);
  });

  // Reset currentIndex
  currentIndex = 0;
  slideContainer.style.transform = `translateX(0)`;
}

// Function to create a card slide
function createCardSlide(product) {
  const cardSlide = document.createElement("div");
  cardSlide.classList.add("slide");
  const card = document.createElement("div");
  card.classList.add("card");
  const img = document.createElement("img");
  img.src = product.thumbnail;
  img.alt = product.title;
  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");
  const h2 = document.createElement("h2");
  h2.textContent = product.title;
  const p = document.createElement("p");
  p.textContent = product.description;

  const span = document.createElement("span");
  span.classList.add("material-symbols-outlined");
  span.textContent = "arrow_right_alt";

  cardContent.appendChild(h2);
  cardContent.appendChild(p);

  card.appendChild(img);
  card.appendChild(cardContent);

  cardSlide.appendChild(card);

  return cardSlide;
}

// Event listener for search input
searchInput.addEventListener("input", (event) => {
  const searchTerm = event.target.value.trim().toLowerCase();
  
  if (searchTerm.length === 0) {
    displayAllProducts();
    return;
  }

  const filteredProducts = Products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  // Clear existing products
  while (slideContainer.firstChild) {
    slideContainer.removeChild(slideContainer.firstChild);
  }

  // Display filtered products
  filteredProducts.forEach((product) => {
    const cardSlide = createCardSlide(product);
    slideContainer.appendChild(cardSlide);
  });

  // Reset currentIndex
  currentIndex = 0;
  slideContainer.style.transform = `translateX(0)`;
});
let currentIndex = 0;
let totalSlides = 0;
let slidesToShow = 6; // Adjust based on the width of each slide
const slideWidth = 20; // Adjust based on the width of each slide
let intervalId;

// Function to move to the next slide
// Function to move to the next slide
function moveToNextSlide() {
  totalSlides = slideContainer.children.length;
  if (currentIndex <= totalSlides - slidesToShow) {
    currentIndex++;
    slideContainer.style.transform = `translateX(-${
      currentIndex * slideWidth
    }%)`;

    // Calculate the number of cards shown on the screen
    const cardsShown = Math.min(slidesToShow, totalSlides - currentIndex);
    console.log(`Number of cards shown: ${cardsShown}`);
  } else {
    currentIndex = 0;
    slideContainer.style.transform = `translateX(0)`;
  }
}

// Event listener for next button
nextBtn.addEventListener("click", () => {
  moveToNextSlide();
  clearInterval(intervalId); // Clear existing interval
  intervalId = setInterval(moveToNextSlide, 2000); // Set new interval
});

// Function to update slidesToShow based on screen size
function updateSlidesToShow() {
  // Update slidesToShow based on screen width
  slidesToShow = window.innerWidth >= 768 ? 6 : 1;
}
// Function to move to the previous slide
function moveToPrevSlide() {
  totalSlides = slideContainer.children.length;
  if (currentIndex > 0) {
    currentIndex--;
    slideContainer.style.transform = `translateX(-${
      currentIndex * slideWidth
    }%)`;

    // Calculate the number of cards shown on the screen
    const cardsShown = Math.min(slidesToShow, totalSlides - currentIndex);
    console.log(`Number of cards shown: ${cardsShown}`);
  } else {
    currentIndex = totalSlides - slidesToShow;
    slideContainer.style.transform = `translateX(-${
      currentIndex * slideWidth
    }%)`;
  }
}

// Event listener for previous button
prevBtn.addEventListener("click", () => {
  moveToPrevSlide();
});


// Update slidesToShow initially
updateSlidesToShow();

// Listen for window resize event to update slidesToShow
window.addEventListener("resize", updateSlidesToShow);

// Initially display all products
displayAllProducts();

// Start interval initially
intervalId = setInterval(moveToNextSlide, 2000);
