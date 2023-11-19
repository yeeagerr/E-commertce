import { flashSale } from "../product/product.js";
import { addComa } from "../utils/money.js";
import { clickSlider } from "../animateJs/sliderClick.js";
let counter2 = 0;

export function fSale() {
  let generatingFs = "";
  let counter = 0;
  let rpText = "";

  const fsSlide = document.querySelector(".fs-slide");
  flashSale.forEach((element) => {
    let hargaAsli = addComa(element.harga);
    let hargaDiskon = addComa(element.diskon);
    counter++;

    if (hargaDiskon === "") {
      rpText = "";
    } else {
      rpText = "Rp. ";
    }

    generatingFs += `
    <div class="fs-sell-card counting${counter}">
    <div class="fs-sell-top" style="background-image: url('/src/flashSale/${element.foto}');">
      <div class="overlay-top">
        <div class="action-overlay aksi-heart1">
          <i class="fa-regular fa-heart hearticon"></i>
        </div>
        <div class="action-overlay aksi-lihat">
          <i class="fa-regular fa-eye"></i>
        </div>
      </div>

      <div class="overlay-bottom overlayHolder1">
        <p>Tambah Kan Ke keranjang</p>
      </div>
    </div>
    <div class="fs-sell-bottom">
      <p>${element.nama}</p>
      <div class="fs-pricing">
        <p>Rp. ${hargaAsli} </p>
        <p>${rpText} ${hargaDiskon}</p>
      </div>
      <div class="bs-rate">
        <img src="src/rating/rating-${element.rating.bintang}.png" alt="">
        <p>( ${element.rating.jumlah} )</p>
      </div>
    </div>
  </div>`;

    fsSlide.innerHTML = generatingFs;
  });

  clickSlider(counter2);

  const leftBtn = document.querySelector(".left-slider-card");
  const rightBtn = document.querySelector(".right-slider-card");
  const cardSell = document.querySelectorAll(".fs-sell-card");

  leftBtn.addEventListener("click", () => {
    if (counter2 < 1) {
      counter2 = cardSell.length - 1;
    } else {
      counter2--;
    }
    clickSlider(counter2);
  });

  rightBtn.addEventListener("click", () => {
    counter2 > cardSell.length - 2 ? (counter2 = 0) : counter2++;
    clickSlider(counter2);
  });
}
