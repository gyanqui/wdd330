import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
<<<<<<< HEAD
=======
        listing: resolve(__dirname, "src/product-listing/index.html"),
>>>>>>> 4f247f43caef9dc9b4907bf7de6d7b9a1b8a8d58
      },
    },
  },
});
