import { cart } from "../cartSummary/cart.js";
import { getProductId } from "../product/AllProduct.js";
import { addComa } from "../utils/money.js";

function checkoutMain() {
  let generate = "";

  let quantityHolder = 0;
  let subtotal = 0;
  let subtotal2 = 0;
  let ongkir = 0;
  let totalQuantity = 0;
  let total = 0;

  cart.forEach((cartItem) => {
    console.log(cartItem);

    let cartId = cartItem.productId;
    let matching = getProductId(cartId);

    if (cartItem.quantity <= 0) {
      //defaul nya 0
      quantityHolder = 0;
    } else if (cartItem.quantity >= 10) {
      quantityHolder = 10;
    } else {
      quantityHolder = cartItem.quantity;
    }

    let jumlah = matching.harga * quantityHolder;

    generate += `
    <div class="checkout-line-holder">
    <div class="product-sell-checkout">
    <p style="margin-right: 10px;">${quantityHolder}x</p>
      <div class="image-holder">
        <img
          src="../src/productImg/${matching.foto}"
          alt="${matching.id}"
        />
      </div>
      <p class="text-overflow">${matching.nama}</p>
    </div>

    <p>Rp. ${addComa(jumlah)}</p>
  </div>
    `;

    document.querySelector(".product-checkout").innerHTML = generate;

    //total part
    subtotal += matching.harga;
    totalQuantity += cartItem.quantity;
  });
  subtotal2 = subtotal * totalQuantity;
  ongkir =
    totalQuantity === 0 ? (ongkir = 0) : (ongkir = 14000 * totalQuantity);
  total = subtotal2 + ongkir;

  document.getElementById("subtotal").innerHTML = `Rp. ${addComa(subtotal2)}`;
  document.getElementById("ongkir").innerHTML = `Rp. ${addComa(ongkir)}`;
  document.getElementById("total").innerHTML = `Rp. ${addComa(total)}`;
}

checkoutMain();
