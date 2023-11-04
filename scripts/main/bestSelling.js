import { bestSell } from "../product/product.js";
import { addComa } from "../utils/money.js";

export function generateBestSelling() {
  let bsHtml = "";
  let rpText = "";
  let counter = 0;

  bestSell.forEach((bsproduk) => {
    const formatPrice = addComa(bsproduk.harga);
    const formatdiskon = addComa(bsproduk.diskon);

    if (formatdiskon === "") {
      rpText = "";
    } else {
      rpText = "Rp. ";
    }

    counter++;

    bsHtml += `
    <div class="best-sell-card transition-${bsproduk.bsPart}">
        <div class="image-product">
            <div class="image-product-overlay">
                <div class="overlay-top">
                <div class="action-overlay aksi-heart${counter}">
                    <i class="fa-regular fa-heart hearticon"></i>
                </div>
                <div class="action-overlay aksi-lihat">
                    <i class="fa-regular fa-eye"></i>
                </div>
                </div>

                <div class="overlay-bottom overlayHolder${counter}">
                <p>Tambah Kan Ke keranjang</p>
                </div>
            </div>
            <img src="src/bestSelling/${bsproduk.foto}" alt="Gucci Bag" />
        </div>
        <p>${bsproduk.nama}</p>
        <div class="bs-pricing">
            <p>Rp. ${formatPrice}</p>
            <p>${rpText}${formatdiskon}</p>
        </div>

        <div class="bs-rate">
            <img src="src/rating/rating-${bsproduk.rating.bintang}.png" alt="" />
            <p>( ${bsproduk.rating.jumlah} )</p>
        </div>
    </div>
  
    `;

    document.querySelector(".best-produk-sale").innerHTML = bsHtml;
  });
}

export function AnimateProduct() {
  let counter = 0;

  bestSell.forEach((element) => {
    counter++;

    const aksiheart = document.querySelector(`.aksi-heart${counter}`);
    const domBs = document.querySelector(`.transition-${element.bsPart}`);
    const overlayBottom = document.querySelector(`.overlayHolder${counter}`);

    aksiheart.addEventListener("click", () => {
      aksiheart.classList.toggle("aksianimate");
    });

    domBs.addEventListener("mouseover", () => {
      overlayBottom.classList.add("animate-ovrbottom");
    });

    domBs.addEventListener("mouseout", () => {
      overlayBottom.classList.remove("animate-ovrbottom");
    });

    overlayBottom.addEventListener("mouseover", () => {
      overlayBottom.classList.add("animate-ovrbottom");
    });

    overlayBottom.addEventListener("click", () => {
      alert("added");
    });
  });
}
