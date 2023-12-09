import { wish } from "./wish.js";
import { AddToCart } from "../cartSummary/cart.js";
import { getProductId, product, newArr } from "../product/AllProduct.js";
import { addComa } from "../utils/money.js";
import { deleteWish } from "./wish.js";

export function recommendHtml() {
  let rpText = "";
  let counter = 0;
  let html = "";
  newArr.forEach((element) => {
    counter++;

    let formatPrice;
    let formatdiskon;

    if (element.harga) {
      formatPrice = element.harga;
    }

    if (element.diskon) {
      formatdiskon = element.diskon;
    }

    if (!formatdiskon) {
      formatdiskon = "";
    } else {
      formatdiskon = addComa(element.diskon);
    }

    if (formatdiskon === "") {
      rpText = "";
    } else {
      rpText = "Rp. ";
    }

    html += `
    <div class="best-sell-card">
                    <div class="image-product">
                      <div class="image-product-overlay" style="background-image: url('../../src/productImg/${
                        element.foto
                      }');">
                        <div class="overlay-top">
                          <div class="action-overlay aksi-heart1">
                            <i class="fa-regular fa-eye"></i>
                          </div>
                        </div>
  
                        <div class="overlay-bottom overlayHolder2 js-holder" data-id="${
                          element.id
                        }">
                          <p>Tambah Kan Ke keranjang</p>
                        </div>
                      </div>
                    </div>
                    <p>${element.nama}</p>
                    <div class="bs-pricing">
                      <p>Rp. ${formatPrice.toLocaleString()}</p>
                      <p>${rpText}${formatdiskon}</p>
                    </div>
                    <div class="bs-rate">
                      <img src="../../src/rating/rating-4.png" alt="" />
                      <p>( 75 )</p>
                    </div>
                  </div>
    `;

    document.querySelector(".jfy-scrooling").innerHTML = html;
  });
}

export function wishTocart() {
  let counter = 0;
  const jsHold = document.querySelectorAll(`.js-holder`);

  jsHold.forEach((element) => {
    counter++;
    const dataId = element.dataset.id;

    element.addEventListener("click", () => {
      AddToCart(dataId);
    });
  });
}
