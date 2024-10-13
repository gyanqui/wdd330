import { renderListWithTemplate } from "./utils.mjs";

//function renderList() {
//    const htmlStrings = list.map(productCardTemplate);
//    this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
//}

function productCardTemplate(product) {
  // Added visual discount if any
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  let discountAmount = 0;

  if (isDiscounted) {
    discountAmount = (
      ((product.SuggestedRetailPrice - product.FinalPrice) /
        product.SuggestedRetailPrice) *
      100
    ).toFixed(0);
  }

  return `<div class="product-card"> 
    <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="Image of "> 
        <h3 class="card_brand">${product.Brand.Name}</h3>
        <h2 class="card_name">${product.Name}</h2>
        <p class="product-card_price">$${product.FinalPrice}</p>
        ${isDiscounted ? `<p class="product-card_original_price">Was: $${product.SuggestedRetailPrice}</p>` : ""}
        ${isDiscounted ? `<p class="product-card_percentage">${discountAmount}% off</p>` : ""}
        </a>
        </div>`;
}

function renderCar() {
  document.querySelectorAll(".product-list").forEach((carousel) => {
    const items = carousel.querySelectorAll(".product-card");
    const buttonsHtml = Array.from(items, () => {
      return `<span class="carousel__button"></span>`;
    });

    carousel.insertAdjacentHTML(
      "beforeend",
      `
              <div class="carousel__nav">
                  ${buttonsHtml.join("")}
              </div>
          `,
    );

    const buttons = carousel.querySelectorAll(".carousel__button");

    buttons.forEach((button, i) => {
      button.addEventListener("click", () => {
        // un-select all the items
        items.forEach((item) =>
          item.classList.remove("carousel__item--selected"),
        );
        buttons.forEach((button) =>
          button.classList.remove("carousel__button--selected"),
        );

        items[i].classList.add("carousel__item--selected");
        button.classList.add("carousel__button--selected");
      });
    });

    // Select the first item on page load
    items[0].classList.add("carousel__item--selected");
    buttons[0].classList.add("carousel__button--selected");
  });
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector(".title").innerHTML = this.category;
  }

  renderList(list) {
    if (list.length > 4) {
      list.length = 4;
      renderListWithTemplate(productCardTemplate, this.listElement, list);
      renderCar();
    }
  }
}
