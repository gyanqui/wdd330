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
        discountAmount = ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice * 100).toFixed(0);
    }

    return `<li class="product-card"> 
    <a href="product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="Image of "> 
        <h3 class="card_brand">${product.Brand.Name}</h3>
        <h2 class="card_name">${product.Name}</h2>
        <p class="product-card_price">$${product.FinalPrice}</p>
        ${isDiscounted ? `<p class="product-card_original_price">Was: $${product.SuggestedRetailPrice}</p>` : ""}
        ${isDiscounted ? `<p class="product-card_percentage">${discountAmount}% off</p>` : ""}
        </a>
        </li>`
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderList(list);
    }


    renderList(list) {
        if (list.length > 4) {
            list.length = 4
            renderListWithTemplate(productCardTemplate, this.listElement, list);
        }
    }

}
