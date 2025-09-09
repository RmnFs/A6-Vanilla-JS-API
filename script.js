let cart = [];

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
            "py-2 px-1 rounded text-center cursor-pointer transition sm:text-left hover:bg-green-100";

        btn.addEventListener("click", () => {
            console.log("Category clicked:", cat.category_name);

            //Remove active class from all category buttons
            document.querySelectorAll("#category-list button").forEach((b) => {
                b.classList.remove("bg-green-600", "text-white");
                b.classList.add("hover:bg-green-100");
            });

            //Add active class to current clicked button
            btn.classList.add("bg-green-600", "text-white");
            btn.classList.remove("hover:bg-green-100");

            // Fetch plants by category
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
        card.className =
            "bg-white shadow rounded-lg p-4 flex flex-col space-y-3 cursor-pointer";
        
       
        card.addEventListener("click", () => {
            loadPlantDetails(plant.id);
        });

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

        //Add to Cart button to (prevent modal trigger)
        const btn = document.createElement("button");
        btn.textContent = "Add to Cart";
        btn.className =
            "bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition";
        btn.addEventListener("click", (event) => {
            event.stopPropagation();
            addToCart(plant);
        });

        card.appendChild(btn);
        container.appendChild(card);
    });
}



async function loadPlantDetails(plantId) {
    showLoader();
    try {
        const response = await fetch(
            `https://openapi.programming-hero.com/api/plant/${plantId}`
        );
        const result = await response.json();
        console.log("Plant details API result:", result);

        const plant = result.plants;

        if (plant) {
            renderPlantModal(plant);

            
            const modal = document.getElementById("my_modal_5");
            if (modal && modal.showModal) {
                modal.showModal();
            } else {
                console.error("Modal element not found");
            }
        } else {
            console.warn("No plant details found in response.", result);
        }
    } catch (error) {
        console.error("Error fetching plant details:", error);
    } finally {
        hideLoader();
    }
}
function renderPlantModal(plant) {
    const modalBox = document.querySelector("#my_modal_5 .modal-box");

    modalBox.innerHTML = `
        <h3 class="text-lg font-bold mb-2">${plant.name}</h3>

        <img src="${plant.image}" 
             alt="${plant.name}" 
             class="w-full h-48 object-cover rounded mb-3" />


        <div class="flex-col  mb-4">
          <div>
            <span class="text-gray-700 text-xs py-1 rounded font-bold">
                Category: ${plant.category}
            </span>
         </div>
            <span class="font-bold text-lg">Price: ৳${plant.price}</span>
             <p class="text-gray-600 mb-2">
           <span class="font-bold text-black">Description:</span> ${plant.description}
        </p>
        </div>

        <div class="modal-action">
            <form method="dialog">
                <button class="btn">Close</button>
            </form>
        </div>
    `;
}


function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.className = "bg-green-50 p-2 rounded flex justify-around";

        div.innerHTML = `
            <div class="text-left">
            <h4 class="font-semibold">${item.name}</h4>
            <p class="text-gray-600 text-sm">৳${item.price} × ${item.quantity}</p>
            </div>
            <button class="text-red-800 hover:text-red-600 text-2xl">X</button>
            `;

        // Remove button
        div.querySelector("button").addEventListener("click", () => {
            removeFromCart(item.id);
        });

        cartContainer.appendChild(div);
    });

    totalContainer.textContent = `৳${total}`;
}

function addToCart(plant) {
    const existingItem = cart.find((item) => item.id === plant.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: plant.id,
            name: plant.name,
            price: plant.price,
            quantity: 1,
        });
    }

    renderCart();

}

function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    renderCart();
}






document.addEventListener("DOMContentLoaded", () => {
    loadCategories();
    loadAllPlants();
});