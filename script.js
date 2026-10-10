// When the button is clicked, scroll down to the About section.
document.getElementById("explore-btn").addEventListener("click", function () {
  document.getElementById("about").scrollIntoView();
});

// ----- Order form -----
var form = document.getElementById("order-form");
var nameInput = document.getElementById("customer-name");
var productSelect = document.getElementById("product");
var quantityInput = document.getElementById("quantity");
var totalPrice = document.getElementById("total-price");
var nameError = document.getElementById("name-error");
var quantityError = document.getElementById("quantity-error");
var confirmation = document.getElementById("order-confirmation");

function getPrice() {
  return Number(productSelect.options[productSelect.selectedIndex].dataset.price);
}

function getQuantity() {
  var qty = Number(quantityInput.value);
  return Number.isInteger(qty) && qty >= 1 ? qty : 0;
}

function updateTotal() {
  totalPrice.textContent = "₹" + getPrice() * getQuantity();
}

productSelect.addEventListener("change", updateTotal);
quantityInput.addEventListener("input", updateTotal);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  var name = nameInput.value.trim();
  var quantity = getQuantity();
  var valid = true;

  nameError.textContent = "";
  quantityError.textContent = "";
  nameInput.classList.remove("invalid");
  quantityInput.classList.remove("invalid");

  if (name === "") {
    nameError.textContent = "Please enter your name.";
    nameInput.classList.add("invalid");
    valid = false;
  }

  if (quantity < 1) {
    quantityError.textContent = "Quantity must be a whole number of at least 1.";
    quantityInput.classList.add("invalid");
    valid = false;
  }

  if (!valid) {
    confirmation.hidden = true;
    return;
  }

  document.getElementById("confirm-message").textContent =
    "Thank you, " + name + "! Your order has been received.";
  document.getElementById("summary-name").textContent = name;
  document.getElementById("summary-product").textContent = productSelect.value;
  document.getElementById("summary-quantity").textContent = quantity;
  document.getElementById("summary-total").textContent = "₹" + getPrice() * quantity;
  confirmation.hidden = false;
  confirmation.scrollIntoView();
});

// ----- Contact form (demo only: nothing is sent anywhere) -----
var contactForm = document.getElementById("contact-form");
var contactConfirmation = document.getElementById("contact-confirmation");

function setFieldError(inputId, message) {
  document.getElementById(inputId + "-error").textContent = message;
  document.getElementById(inputId).classList.toggle("invalid", message !== "");
}

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var name = document.getElementById("contact-name").value.trim();
  var email = document.getElementById("contact-email").value.trim();
  var message = document.getElementById("contact-message").value.trim();
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var nameMsg = name === "" ? "Please enter your name." : "";
  var emailMsg = email === "" ? "Please enter your email."
    : !emailPattern.test(email) ? "Please enter a valid email address." : "";
  var messageMsg = message === "" ? "Please write a message." : "";

  setFieldError("contact-name", nameMsg);
  setFieldError("contact-email", emailMsg);
  setFieldError("contact-message", messageMsg);

  if (nameMsg || emailMsg || messageMsg) {
    contactConfirmation.hidden = true;
    return;
  }

  document.getElementById("contact-confirm-message").textContent =
    "Thank you, " + name + "! Your message has been received. (Demo only: it was not sent to a real inbox.)";
  contactConfirmation.hidden = false;
  contactForm.reset();
});
