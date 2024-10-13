import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p> 
    <div class="qty-input">
      <button class="minusBtn" data-id=${item.Id} type="button">-</button>
      <input class="product-qty" type="number" name="product-qty" min="0" max="10" value="${item.quantity}">
      <button class="addBtn" data-id=${item.Id} type="button">+</button>
  </div>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <span class="remove" data-id="${item.Id}">X<span>
  
  </li>`;

  return newItem;
}

function removeFromCart(targetElement) {
  const clickedElement = targetElement.dataset.id;
  const cart = getLocalStorage("cart");
  var filtered = cart.filter(function (el) {
    return el.Id != clickedElement;
  });
  setLocalStorage("cart", filtered);
  renderCartContents();
  totalCart();
  updateCartCount();
}

function addQuantity(targetElement) {
  const cart = getLocalStorage("cart");
  const clickedItem = targetElement.dataset.id;
  var inputQuantity = targetElement.previousElementSibling;
  var add = parseInt(inputQuantity.value) + 1;
  inputQuantity.value = add;

  var itemLocated = cart.findIndex((obj) => obj.Id == clickedItem);
  cart[itemLocated].quantity = add;

  setLocalStorage("cart", cart);
  totalCart();
}

function minusQuantity(targetElement) {
  const cart = getLocalStorage("cart");
  const clickedItem = targetElement.dataset.id;
  var quantity = targetElement.nextElementSibling;
  var minus = parseInt(quantity.value);
  minus -= 1;

  if (minus <= 0) {
    minus = 1;
  }
  quantity.value = minus;

  var itemLocated = cart.findIndex((obj) => obj.Id == clickedItem);
  cart[itemLocated].quantity = minus;

  setLocalStorage("cart", cart);
  totalCart();
}

function totalCart() {
  var items = getLocalStorage("cart");
  var total = 0.0;

  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total");
  if (items.length != 0) {
    items.forEach((item) => {
      total += parseFloat(item.FinalPrice) * item.quantity;
    });

    cartTotal.textContent = `total: $${total.toFixed(2)}`;
    cartFooter.removeAttribute("hidden");
  }

  if (items.length == 0) {
    cartFooter.hidden = true;
  }
}

function renderCartContents() {
  const cartItems = getLocalStorage("cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  var remove = document.getElementsByClassName("remove");
  var add = document.getElementsByClassName("addBtn");
  var minus = document.getElementsByClassName("minusBtn");

  Array.from(remove).forEach(function (element) {
    element.addEventListener("click", function (event) {
      const targetElement = event.target;
      removeFromCart(targetElement);
    });
  });

  Array.from(add).forEach(function (element) {
    element.addEventListener("click", function (event) {
      const targetElement = event.target;
      addQuantity(targetElement);
    });
  });

  Array.from(minus).forEach(function (element) {
    element.addEventListener("click", function (event) {
      const targetElement = event.target;
      minusQuantity(targetElement);
    });
  });
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  displaycart() {
    renderCartContents();
    totalCart();
  }
}
