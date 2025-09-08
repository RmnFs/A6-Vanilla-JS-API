function showLoader() {
  document.getElementById("loader").classList.remove("hidden");
}

function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
}

// ----------- Fetch and Render All Plants (initial load) -----------

async function loadAllPlants() {
  showLoader();
  try {
    const response = await fetch("https://openapi.programming-hero.com/api/plants");
    const result = await response.json();
    renderCards(result.plants);
  } catch (error) {
    console.error("Error fetching all plants:", error);
  } finally {
    hideLoader();
  }
}

// ----------- Fetch and Render Categories Sidebar -----------

async function loadCategories() {
    showLoader();
    try {
        const response = await fetch(
            "https://openapi.programming-hero.com/api/categories"
        );

        const result = await response.json();
        console.log("Categories API Result:", result);

        renderCategoryButtons(result.categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
    finally {
    hideLoader();
  }
}

// ----------- Render Category Buttons Dynamically -----------

function renderCategoryButtons(categories) {
    const container = document.getElementById("category-list");
    container.innerHTML = "";

    if (!categories || categories.length === 0) {
        container.innerHTML = "<p>No categories found.</p>";
        return;
    }

    categories.forEach((cat) => {
        const btn = document.createElement("button");
        btn.textContent = cat.category_name;
        btn.className =
            "hover:bg-green-100  py-2 rounded text-center   cursor-pointer transition sm:text-left";

        btn.addEventListener("click", () => {
            console.log("Category clicked:", cat.category_name);
            fetchCategoryPlants(cat.id);
        });

        container.appendChild(btn);
    });
}

// ----------- Fetch Plants by Category -----------

async function fetchCategoryPlants(categoryId) {

    showLoader()
    try {

        const url = `https://openapi.programming-hero.com/api/category/${categoryId}`;
        const response = await fetch(url);

        const result = await response.json();
        console.log("Category Plants API Result:", result);

        renderCards(result.plants);
    } catch (error) {
        console.error("Error fetching plants by category:", error);
    }
    finally {
    hideLoader();
  }
}

// ----------- Render Cards Function -----------

function renderCards(plants) {
    const container = document.getElementById("cards-container");
    container.innerHTML = "";

    if (!plants || plants.length === 0) {
        container.innerHTML = "<p>No plants available.</p>";
        return;
    }

    plants.forEach((plant) => {
        const card = document.createElement("div");
        card.className = "bg-white shadow rounded-lg p-4 flex flex-col space-y-3";

        // Card HTML structure
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
    `;


        const btn = document.createElement("button");
        btn.textContent = "Add to Cart";
        btn.className =
            "bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition";
        btn.addEventListener("click", () => addToCart(plant));

        card.appendChild(btn);
        container.appendChild(card);
    });
}



function addToCart(plant) {
    console.log("Adding to cart:", plant);

}




// loadCategories();
// loadAllPlants();

document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  loadAllPlants();
});