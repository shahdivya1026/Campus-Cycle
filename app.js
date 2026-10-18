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

function renderProducts() {
  const grid = $('#product-grid');
  grid.innerHTML = '';
  state.products.forEach((p, i) => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.media}" alt="${p.title}" />
        <h3>${p.title}</h3>
        <p>₹${p.price}</p>
        <p>Quality: ${p.quality}</p>
        <p>Age: ${p.age}</p>
        <p>Colour: ${p.colour}</p>
        <p>${p.description}</p>
        <button onclick="deleteProduct(${i})">🗑️ Delete</button>
      </div>
    `;
  });
}

function deleteProduct(index) {
  state.products.splice(index, 1);
  save();
  renderProducts();
}

function fileToBase64(file, callback) {
  const reader = new FileReader();
  reader.onload = e => callback(e.target.result);
  reader.readAsDataURL(file);
}

//Chatbot

  const chatbotBtn = document.getElementById('chatbot-btn');
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotText = document.getElementById('chatbot-text');
  const chatbotSend = document.getElementById('chatbot-send');
  const chatbotClose = document.getElementById('chatbot-close');

  // Toggle chatbot
  chatbotBtn.addEventListener('click', () => {
    chatbotContainer.style.display = chatbotContainer.style.display === 'none' ? 'flex' : 'none';
  });
  chatbotClose.addEventListener('click', () => chatbotContainer.style.display = 'none');

  // Send message
  chatbotSend.addEventListener('click', sendMessage);
  chatbotText.addEventListener('keypress', e => { if(e.key==='Enter') sendMessage(); });

  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'bot' ? 'bot-message' : 'user-message';
    msgDiv.innerHTML = text;
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function botReply(msg) {
    const typing = document.createElement('div');
    typing.className = 'typing';
    typing.innerText = 'CycleBot is typing...';
    chatbotMessages.appendChild(typing);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    setTimeout(() => {
      typing.remove();
      let reply = "I'm not sure I understood. Can you try again? 🤔";

      if (msg.includes('hello') || msg.includes('hi')) {
        reply = "👋 Hello! I'm CycleBot. How can I help you?<br>";
        addMessage(reply, 'bot');

        const quickReplies = document.createElement('div');
        quickReplies.className = 'quick-replies-container';

        const options = ['Buy', 'Sell', 'PG', 'Help'];
        options.forEach(opt => {
          const btn = document.createElement('button');
          btn.className = 'quick-reply';
          btn.innerText = opt;
          btn.onclick = () => { sendQuick(opt.toLowerCase()) };
          quickReplies.appendChild(btn);
        });

        chatbotMessages.appendChild(quickReplies);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        return;
      } 
      else if (msg.includes('buy')) {
        reply = "You can browse second-hand items here 👉 <a href='#'>Buy Page</a>";
      } 
      else if (msg.includes('sell')) {
        reply = "To sell your item, go to the Sell page 👉 <a href='#'>Sell Page</a>";
      } 
      else if (msg.includes('pg') || msg.includes('hostel')) {
        reply = "Looking for PG? Check our map 👉 <a href='#'>PG Map</a>";
      } 
      else if (msg.includes('help') || msg.includes('faq')) {
        reply = "I can help you with:<br>- Buying items<br>- Selling items<br>- Finding PGs<br>- Messaging users";
      }

      addMessage(reply, 'bot');
    }, 1000);
  }

  function sendMessage() {
    const userMsg = chatbotText.value.trim();
    if (!userMsg) return;
    addMessage(userMsg, 'user');
    chatbotText.value = '';
    botReply(userMsg.toLowerCase());
  }

  function sendQuick(msg) {
    addMessage(msg, 'user');
    botReply(msg);
  }

  // Auto greeting
  window.onload = () => { 
    setTimeout(() => { 
      addMessage("👋 Hi! I'm CycleBot. How can I assist you today?", 'bot'); 
    }, 1000); 
  };