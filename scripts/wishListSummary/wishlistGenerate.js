import { wish } from "./wish.js";
import { getProductId } from "../product/AllProduct.js";
import { addComa } from "../utils/money.js";
import { deleteWish } from "./wish.js";

export function generateWish() {
  let html = "";
  let count = 0;

  wish.forEach((wishItem) => {
    const wishId = wishItem.idProduct;
    const matching = getProductId(wishId);

    console.log(wishItem);
    count++;

    html += `
    <div class="best-sell-card js-sell-deleted-${count}">
    <div class="image-product" style="background-image: url('../../src/productImg/${
      matching.foto
    }');">
      <div class="image-product-overlay">
        <div class="overlay-top">
          <div class="action-overlay deleting" data-id="${matching.id}">
            <i class="fa-solid fa-trash-can"></i>
          </div>
        </div>

        <div class="overlay-bottom overlayHolder1">
          <p>Tambah Kan Ke keranjang</p>
        </div>
      </div>
    </div>
    <p>${matching.nama}</p>
    <div class="bs-pricing">
      <p>Rp. ${addComa(matching.harga)}</p>
    </div>
  </div>
    `;

    document.querySelector(".scrooling-wc").innerHTML = html;
  });
}

export function delWish() {
  let count = 0;
  const deleting = document.querySelectorAll(`.deleting`);

  deleting.forEach((element) => {
    count++;

    let parent = document.querySelector(`.js-sell-deleted-${count}`);

    element.addEventListener("click", () => {
      const id = element.dataset.id;
      deleteWish(id);
      parent.remove();
    });
  });
}

delWish();
