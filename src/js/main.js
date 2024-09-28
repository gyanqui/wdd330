import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const data = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const list = new ProductListing(category, dataSource, listElement);
