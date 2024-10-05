<<<<<<< HEAD
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductListing("Tents", dataSource, element);

listing.init();
=======
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
>>>>>>> 4f247f43caef9dc9b4907bf7de6d7b9a1b8a8d58
