// Store total price
let total = 0;

// Get elements
const cart = document.getElementById("cart");
const totalPrice = document.getElementById("total");

// FUNCTION: Add product to booking
function addToCart(productName, productPrice) {

  // Create list item
  const li = document.createElement("li");

  li.innerHTML = `
    <span>${productName}</span>
    <span>Rs. ${productPrice}</span>
    <button class="remove-btn">✖</button>
  `;

  // Add remove functionality
  li.querySelector(".remove-btn").addEventListener("click", function () {
    cart.removeChild(li);
    total -= productPrice;
    totalPrice.innerText = total;
  });

  // Add to cart
  cart.appendChild(li);

  // Update total
  total += productPrice;
  totalPrice.innerText = total;

  // Scroll to booking section
  document.getElementById("booking").scrollIntoView({
    behavior: "smooth"
  });
}

// PAYMENT BUTTON ACTION
document.querySelector(".pay-btn").addEventListener("click", function () {

  // Get form fields
  const name = document.querySelector(".customer-form input[type='text']").value;
  const email = document.querySelector(".customer-form input[type='email']").value;
  const phone = document.querySelector(".customer-form input[type='tel']").value;
  const address = document.querySelector(".customer-form textarea").value;

  // Simple validation
  if (name === "" || email === "" || phone === "" || address === "") {
    alert("Please fill all customer details before proceeding.");
    return;
  }

  if (cart.children.length === 0) {
    alert("Your cart is empty. Please select a product.");
    return;
  }

  // Dummy payment confirmation
  alert(
    "Order placed successfully!\n\n" +
    "Customer: " + name + "\n" +
    "Total Amount: Rs. " + total + "\n\n" +
    "Payment page coming soon."
  );

  // Reset booking
  cart.innerHTML = "";
  total = 0;
  totalPrice.innerText = total;

  document.querySelector(".customer-form form").reset();
});

