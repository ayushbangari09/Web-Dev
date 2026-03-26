let cart = [];
let total = 0;

// LOAD PRODUCTS
async function loadProducts() {
  let res = await fetch("http://localhost:5000/products");
  let data = await res.json();

  let container = document.getElementById("products");
  container.innerHTML = "";

  data.forEach(p => {
    let div = document.createElement("div");

    div.innerHTML = `
      <img src="images/${p.name.toLowerCase().replace(/\s/g, '')}.jpg" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick='addToCart(${JSON.stringify(p)})'>Add</button>
    `;

    container.appendChild(div);
  });
}
// ADD TO CART
function addToCart(p) {
  cart.push(p);
  total += p.price;
  renderCart();
}

// RENDER CART
function renderCart() {
  let ul = document.getElementById("cart");
  ul.innerHTML = "";

  cart.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item.name + " - ₹" + item.price;
    ul.appendChild(li);
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
    // Hide login box
    document.getElementById("login").style.display = "none";

    // Show products + cart
    document.getElementById("productSection").style.display = "block";
    document.getElementById("cartSection").style.display = "block";

    // Load products
    loadProducts();
  }
}

// CHECKOUT
async function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  await fetch("http://localhost:5000/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart })
  });

  alert("Order placed successfully!");
  cart = [];
  total = 0;
  renderCart();
}


