
let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        count += item.quantity;

        const li = document.createElement("li");
        li.append(
            document.createTextNode(
                `${item.name} × ${item.quantity} — ₹${item.price * item.quantity} `
            )
        );

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";
        removeButton.onclick = () => removeFromCart(index);

        li.appendChild(removeButton);
        cartItems.appendChild(li);
    });

    cartCount.textContent = count;
    cartTotal.textContent = total.toLocaleString("en-IN");
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

document.getElementById("clear-cart").addEventListener("click", () => {
    cart = [];
    updateCart();
});

document.getElementById("search").addEventListener("input", event => {
    const searchText = event.target.value.toLowerCase();

    document.querySelectorAll(".product-card").forEach(card => {
        const productName = card.dataset.name.toLowerCase();

        card.style.display = productName.includes(searchText)
            ? ""
            : "none";
    });
});

