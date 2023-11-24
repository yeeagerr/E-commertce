import { cart } from "./cart.js";
import { getProductId } from "../product/AllProduct.js";
import { addComa } from "../utils/money.js";

export function generatePayInfo() {
  let quantityTotal = 0;
  let totalHarga = 0;
  let ongkir = 0;
  let total = 0;
  let hargaTetap = 0;
  cart.forEach((cartItem) => {
    const cartId = cartItem.productId;

    const matchId = getProductId(cartId);

    if (cartItem.quantity <= 0) {
      //defaultnya 0
    } else if (cartItem.quantity >= 10) {
      quantityTotal = 10;
    } else {
      quantityTotal += Number(cartItem.quantity);
    }

    hargaTetap += matchId.harga;

    ongkir =
      quantityTotal === 0 ? (ongkir = 0) : (ongkir = 14000 * quantityTotal);
    console.log(cartItem.quantity);
  });
  console.log(addComa(hargaTetap));

  totalHarga = hargaTetap * quantityTotal;

  total = totalHarga + ongkir;

  console.log(quantityTotal);

  document.getElementById("totalMurni").innerHTML = `Rp. ${addComa(
    totalHarga
  )}`;

  document.getElementById("ongkir").innerHTML = `Rp. ${addComa(ongkir)}`;

  document.getElementById("total").innerHTML = `Rp. ${addComa(total)}`;
}
