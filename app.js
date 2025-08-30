const categoryList = document.getElementById("category-list");

// Render products + categories
function renderProducts() {
  productList.innerHTML = ""; 
  categoryList.innerHTML = "";

  // Render product cards
  state.products.forEach((product) => {
  const productCard = document.createElement("div");
  productCard.className = "card";
  productCard.innerHTML = `
  <div class="card-media">
    <img src="${product.media}" alt="${product.title}" 
         onerror="this.src='https://via.placeholder.com/200?text=No+Image';">
  </div>
  <div class="card-body">
    <h3>${product.title}</h3>
    <p><b>Category:</b> ${product.category}</p>
    <p><b>Price:</b> ₹${product.price}</p>
    <p><b>Quantity:</b> ${product.quantity}</p>
    <p><b>Colour:</b> ${product.colour || "N/A"}</p>
    <p><b>Quality:</b> ${product.quality}</p>
    <p><b>Age:</b> ${product.age}</p>
    <p><b>Description:</b> ${product.description || "No details provided"}</p>
    <button class="btn btn-danger delete-btn" data-id="${product.id}">Delete</button>
  </div>
`;
  productList.appendChild(productCard);
});

  // Build category list
  const categories = [...new Set(state.products.map(p => p.category))];
  categories.forEach(cat => {
    const li = document.createElement("li");
    li.textContent = cat;
    li.className = "category-item";
    li.addEventListener("click", () => {
      filterByCategory(cat);
    });
    categoryList.appendChild(li);
  });

  // Attach delete events
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      deleteProduct(id);
    });
  });
}

// Delete product by id
function deleteProduct(id) {
  state.products = state.products.filter(p => p.id != id); // loose check for safety
  save();
  renderProducts();
}

// Filter products by category
function filterByCategory(cat) {
  productList.innerHTML = "";
  state.products
    .filter(p => p.category === cat)
    .forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "card";
      productCard.innerHTML = `<h3>${product.title}</h3><p>₹${product.price}</p>`;
      productList.appendChild(productCard);
    });
}

// Initial render
renderProducts();
