import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${product.Image}"
      alt="${product.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${product.Name}</h2>
  </a>
  <p class="cart-card__color">${product.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${product.FinalPrice}</p>
</li>`;
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.getData();
        // const filteredProducts = this.filterProduct(list)
        this.renderList(list);
    }

    // filterProduct(list) {
    //     return list.slice(0,4);
    // }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}
