import { wish, addAllWish } from "./wish.js";
import { getProductId, product, newArr } from "../product/AllProduct.js";
import { addComa } from "../utils/money.js";
import { deleteWish } from "./wish.js";
import { AddToCart } from "../cartSummary/cart.js";

export function generateWish() {
  let html = "";
  let count = 0;

  wish.forEach((wishItem) => {
    const wishId = wishItem.productId;
    const matching = getProductId(wishId);

    let sortId = matching.id2 ? matching.id2 : matching.id;
    // let foto = wishItem.extraData ? wishItem.extraData : matching.foto;

    console.log(wishId);

    count++;

    html += `
    <div class="best-sell-card js-sell-deleted-${count} ">
    <div class="image-product" style="background-image: url('../../src/productImg/${
      wishItem.extraData
    }');">
      <div class="image-product-overlay js-overlayWish-${count}">
        <div class="overlay-top">
          <div class="action-overlay deleting" data-id="${sortId}">
            <i class="fa-solid fa-trash-can"></i>
          </div>
        </div>

        <div class="overlay-bottom overlayHolder1-${count}" data-id="${sortId}">
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

export function wishAdd() {
  let count = 0;

  wish.forEach((item) => {
    count++;
    const imageOverlay = document.querySelector(`.js-overlayWish-${count}`);
    const overlayHolder1 = document.querySelector(`.overlayHolder1-${count}`);

    imageOverlay.addEventListener("mouseover", () => {
      overlayHolder1.classList.add("animate-ovrbottom");
    });

    imageOverlay.addEventListener("mouseout", () => {
      overlayHolder1.classList.remove("animate-ovrbottom");
    });

    overlayHolder1.addEventListener("click", () => {
      const dataId = overlayHolder1.dataset.id;
      let extra = item.extraData ? item.extraData : matching.foto;

      console.log(dataId, extra);
      AddToCart(dataId, extra);
      // const sortId = matching.id2 ? matching.id2 : matching.id;
    });
  });
}

export function addAll() {
  wish.forEach((wishItem) => {
    let wishId = wishItem.productId;
    let wishExtra = wishItem.extra;
    document.querySelector(".js-move").addEventListener("click", () => {
      console.log(wishId);
      addAllWish(wishId, wishExtra);

      window.location.reload();
    });
  });
}
