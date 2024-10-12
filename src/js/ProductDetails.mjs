import { setLocalStorage, getLocalStorage, updateCartCount } from "./utils.mjs";

function productDetailsTemplate(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  let discountAmount = 0;

  if (isDiscounted) {
    discountAmount = (
      ((product.SuggestedRetailPrice - product.FinalPrice) /
        product.SuggestedRetailPrice) *
      100
    ).toFixed(0);
  }

  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img class="divider" src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}"/>
    <p class="product-card_price">$${product.FinalPrice}
    ${isDiscounted ? `<span class="product-card_original_price">Was: $${product.SuggestedRetailPrice}</span>` : ""}
    ${isDiscounted ? `<p class="product-card_percentage">${discountAmount}% off</p>` : ""}
    <p class="product_color">${product.Colors[0].ColorName}</p>
    <p class="product_description">${product.DescriptionHtmlSimple}</p>
    <div class="product-detail_add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div><section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails("main");
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    const shoppingCart = getLocalStorage("so-cart");
    const item = this.product;
    var itemLocated = shoppingCart.findIndex((obj) => obj.Id == item.Id);
    if (itemLocated == -1) {
      item["quantity"] = 1;
      shoppingCart.push(item);
      setLocalStorage("so-cart", shoppingCart);
      updateCartCount();
      alert("added to cart");
    }
    // Animate the cart icon
    this.animateCartIcon();
  }

  animateCartIcon() {
    const cartElement = document.querySelector("div.cart");
    if (cartElement) {
      cartElement.style.animation = "none"; // Reset animation
      // Trigger reflow to restart the animation
      cartElement.offsetHeight; // This is a hack to force reflow
      cartElement.style.animation = "shoppingCart 0.35s 5";
    }
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product),
    );
  }
}
