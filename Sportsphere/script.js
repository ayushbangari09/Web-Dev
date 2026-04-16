let allProducts = [];
let cart = [];

// LOAD PRODUCTS
async function loadProducts() {
  let res = await fetch("http://localhost:5000/products");
  allProducts = await res.json();

  displayProducts(allProducts);
}

// DISPLAY PRODUCTS
function displayProducts(data) {
  let container = document.getElementById("products");
  container.innerHTML = "";

  data.forEach(p => {
    let div = document.createElement("div");

    div.innerHTML = `
      <div class="product-card">
        <img src="images/${p.name.toLowerCase().replace(/\s/g,'')}.jpg">
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>

        <div class="qty">
          <button onclick="removeFromCart('${p.name}')">-</button>
          <span>${getQty(p.name)}</span>
          <button onclick='addToCart(${JSON.stringify(p)})'>+</button>
        </div>
      </div>
    `;

    container.appendChild(div);
  });
}

// FILTER PRODUCTS (SIDEBAR)
function filterProducts(category) {
  if (category === "all") {
    displayProducts(allProducts);
  } else {
    let filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(category)
    );
    displayProducts(filtered);
  }
}

// ADD ITEM
function addToCart(p) {
  let item = cart.find(i => i.name === p.name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ ...p, qty: 1 });
  }

  renderCart();
  displayProducts(allProducts); // refresh qty
}

// REMOVE ITEM
function removeFromCart(name) {
  let item = cart.find(i => i.name === name);

  if (!item) return;

  item.qty--;

  if (item.qty <= 0) {
    cart = cart.filter(i => i.name !== name);
  }

  renderCart();
  displayProducts(allProducts);
}

// GET QTY
function getQty(name) {
  let item = cart.find(i => i.name === name);
  return item ? item.qty : 0;
}

// RENDER CART
function renderCart() {
  let ul = document.getElementById("cart");
  ul.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.name} x${item.qty} = ₹${item.price * item.qty}`;
    ul.appendChild(li);

    total += item.price * item.qty;
  });

  document.getElementById("total").textContent = "Total: ₹" + total;
}

// LOGIN
async function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  let data = await res.json();
  alert(data.message);

  if (data.message === "Login successful") {
    document.getElementById("login").style.display = "none";
    document.getElementById("mainApp").style.display = "block";

    loadProducts();
  }
}

// CHECKOUT
function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "checkout.html";
}
