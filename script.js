// Function to fetch and render cards
async function loadPlants() {
  const url = "https://openapi.programming-hero.com/api/plants";
  try {
    const response = await fetch(url);
    const result = await response.json();

    // use `result.plants` instead of `result.data`
    const plants = result.plants; 

    renderCards(plants);
  } catch (error) {
    console.error("Error loading plants:", error);
  }
}

// Function to render an array of plants into the DOM
function renderCards(plants) {
  const container = document.getElementById("cards-container");
  container.innerHTML = ""; // Clear old cards

  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.className =
      "bg-white shadow rounded-lg p-4 flex flex-col space-y-3";

    card.innerHTML = `
      <img src="${plant.image}" alt="${plant.name}" 
           class="w-full h-40 object-cover rounded-md" />
      
      <h3 class="font-semibold text-lg">${plant.name}</h3>
      <p class="text-gray-600 text-sm line-clamp-2">
        ${plant.description}
      </p>

      <div class="flex items-center justify-between">
        <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
          ${plant.category}
        </span>
        <span class="font-bold">৳${plant.price}</span>
      </div>

      <button 
        class="bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition">
        Add to Cart
      </button>
    `;

    container.appendChild(card);
  });
}

// Load plants on page load
loadPlants();




// Fetch categories API
async function loadCategories() {
  const url = "https://openapi.programming-hero.com/api/categories";
  try {
    const response = await fetch(url);
    const result = await response.json();
    const categories = result.categories; // array of 10 categories
    renderCategoryButtons(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// Render category buttons dynamically
function renderCategoryButtons(categories) {
  const container = document.getElementById("category-list");
  container.innerHTML = "";

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.id = `cat-${cat.id}`; // ex: cat-1, cat-2
    btn.textContent = cat.category_name; // "Fruit Tree", etc
    btn.className =
      "hover:bg-green-100 px-3 py-2 rounded text-left cursor-pointer transition";

    // On click → fetch plants by category id
    btn.addEventListener("click", () => {
      console.log("Clicked category:", cat.category_name);
      fetchCategoryPlants(cat.id); // call your category fetch function
    });

    container.appendChild(btn);
  });
}

// Fetch plants for category
async function fetchCategoryPlants(id) {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Plants for category", id, ":", data.plants);

    // You can now call renderCards(data.plants) here
  } catch (error) {
    console.error("Error fetching plants:", error);
  }
}

// Init: load categories on page load
loadCategories();