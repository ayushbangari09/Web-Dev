let cart = [];

window.onload = function () {
cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCart();
};

function addToCart(id, name, price) {
console.log("Add clicked"); // DEBUG

```
let item = cart.find(p => p.id === id);

if (item) {
    item.quantity++;
} else {
    cart.push({ id, name, price, quantity: 1 });
}

saveCart();
updateCart();
```

}

function removeFromCart(id) {
cart = cart.filter(item => item.id !== id);
saveCart();
updateCart();
}

function updateCart() {
let cartItems = document.getElementById("cart-items");
let total = 0;

```
cartItems.innerHTML = "";

cart.forEach(item => {
    let li = document.createElement("li");
    let itemTotal = item.price * item.quantity;
    total += itemTotal;

    li.innerHTML = `
        ${item.name} (x${item.quantity}) - ₹${itemTotal}
        <button onclick="removeFromCart(${item.id})">Remove</button>
    `;

    cartItems.appendChild(li);
});

document.getElementById("total").innerText = total;
```

}

function saveCart() {
localStorage.setItem("cart", JSON.stringify(cart));
}

function goToCheckout() {
if (cart.length === 0) {
alert("Cart is empty!");
return;
}

```
window.location.href = "checkout.html";
```

}
