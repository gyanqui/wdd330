export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
    }
  
    calculateItemSummary(list) {
      // calculate and display the total amount of the items in the cart, and the number of items.
        list.array.forEach(item => {
            var quantity =+ parseInt(item.quantity)
            var total =+ parseFloat(item.FinalPrice) * item.quantity
            return total;
        });
    }
  
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        var tax = 0.06
        var shipping = 10 + (quantity - 1) * 2
        var calculatedTax = total * tax
        var subtotal = total
        var finalTotal = total + shipping + calculatedTax
      // display the totals.
      this.displayOrderTotals();
    }
  
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
        const shipping = document.querySelector("#shipping");
        const tax = document.querySelector("#tax");
        const orderTotal = document.querySelector("#orderTotal")
        const subtotal = document.querySelector("#subtotal")

        shipping.innerContent = `shipping $${shipping}`;
        shipping.innerContent = `tax $${tax}`;
        shipping.innerContent = `orderTotal $${orderTotal}`;
        shipping.innerContent = `subtotal $${subtotal}`;

    }
    
  }