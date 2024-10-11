import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("cart", ".checkout-summary");
myCheckout.init();

document.querySelector("#zip");
addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if (chk_status) myCheckout.checkout();
});
