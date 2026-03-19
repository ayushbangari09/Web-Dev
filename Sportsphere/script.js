let allProducts = [];
let cart = [];

// Tailwind script ready
function initTailwind() {
  // Already loaded via CDN
}

// Fetch products
async function loadProducts() {
  const res = await fetch('/api/products');
  allProducts = await res.json();
  renderProducts(allProducts);
  renderCategoryFilters();
}

// Render products
function renderProducts(products) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  
  products.forEach(p => {
    const card = `
      <div class="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition group">
        <img src="${p.img}" class="w-full h-64 object-cover group-hover:scale-105 transition">
        <div class="p-6">
          <div class="text-green-600 text-sm font-bold">${p.category}</div>
          <h3 class="font-bold text-xl mt-2">${p.name}</h3>
          <p class="text-gray-500 text-sm mt-1 line-clamp-2">${p.desc}</p>
          <div class="flex justify-between items-center mt-6">
            <span class="text-3xl font-bold">₹${p.price}</span>
            <button onclick="addToCart(${p.id})" 
                    class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-2xl font-bold transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>`;
    grid.innerHTML += card;
  });
}

// Category filters
function renderCategoryFilters() {
  const categories = ['All', ...new Set(allProducts.map(p => p.category))];
  const container = document.getElementById('category-filters');
  container.innerHTML = categories.map(cat => `
    <button onclick="filterByCategory('${cat}')" 
            class="category-btn px-8 py-3 rounded-3xl font-medium transition ${cat === 'All' ? 'bg-green-600 text-white' : 'bg-white border-2 hover:bg-green-100'}">
      ${cat}
    </button>
  `).join('');
}

function filterByCategory(category) {
  document.querySelectorAll('.category-btn').forEach(btn => {
    if (btn.textContent.trim() === category) {
      btn.classList.add('bg-green-600', 'text-white');
    } else {
      btn.classList.remove('bg-green-600', 'text-white');
    }
  });
  
  const filtered = category === 'All' ? allProducts : allProducts.filter(p => p.category === category);
  renderProducts(filtered);
}

// Search
document.getElementById('search-input').addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = allProducts.filter(p => 
    p.name.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term)
  );
  renderProducts(filtered);
});

// Add to cart
async function addToCart(id) {
  await fetch('/api/add_to_cart', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id})
  });
  updateCartCount();
  showToast("Added to cart!");
}

// Get and update cart count
async function updateCartCount() {
  const res = await fetch('/api/cart');
  const data = await res.json();
  document.getElementById('cart-count').textContent = data.count;
}

// Show cart modal
async function showCart() {
  const res = await fetch('/api/cart');
  const data = await res.json();
  cart = data.items;
  
  const container = document.getElementById('cart-items');
  container.innerHTML = cart.length === 0 ? 
    `<p class="text-center text-gray-400 py-12 text-2xl">Your cart is empty 🛒</p>` : 
    cart.map(item => `
      <div class="flex gap-6 mb-8 last:mb-0">
        <img src="${item.img}" class="w-24 h-24 object-cover rounded-2xl">
        <div class="flex-1">
          <div class="flex justify-between">
            <h4 class="font-bold">${item.name}</h4>
            <span class="font-bold">₹${item.price * item.qty}</span>
          </div>
          <div class="text-gray-500 mt-1">₹${item.price} each</div>
          
          <div class="flex items-center gap-6 mt-6">
            <div class="flex items-center border rounded-2xl">
              <button onclick="changeQty(${item.id}, -1)" class="px-4 py-2 text-xl">-</button>
              <span class="px-6 font-bold">${item.qty}</span>
              <button onclick="changeQty(${item.id}, 1)" class="px-4 py-2 text-xl">+</button>
            </div>
            <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-600">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  
  document.getElementById('cart-total').textContent = `₹${data.total}`;
  document.getElementById('cart-modal').classList.remove('hidden');
}

function hideCart() {
  document.getElementById('cart-modal').classList.add('hidden');
}

async function changeQty(id, change) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  
  const newQty = item.qty + change;
  if (newQty < 1) return;
  
  await fetch('/api/update_cart_qty', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id, qty: newQty})
  });
  showCart();  // refresh modal
  updateCartCount();
}

async function removeFromCart(id) {
  await fetch('/api/remove_from_cart', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id})
  });
  showCart();
  updateCartCount();
}

function checkout() {
  if (cart.length === 0) return;
  alert("🎉 Order placed successfully! Thank you for shopping at SportsMart.\n\n(This is a demo – no real payment taken)");
  hideCart();
  // Clear cart in real app
}

// Toast notification
function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-8 right-8 bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// Initialize everything
window.onload = () => {
  initTailwind();
  loadProducts();
  updateCartCount();
};
