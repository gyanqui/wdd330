<<<<<<< HEAD
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
=======
import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();
>>>>>>> 4f247f43caef9dc9b4907bf7de6d7b9a1b8a8d58

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
<<<<<<< HEAD
=======

>>>>>>> 4f247f43caef9dc9b4907bf7de6d7b9a1b8a8d58
product.init();
