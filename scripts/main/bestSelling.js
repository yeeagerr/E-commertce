import { bestSell } from "../product/product.js";
import { addComa } from "../utils/money.js";
import { AddToCart } from "../cartSummary/cart.js";

export function generateBestSelling() {
  let bsHtml = "";
  let rpText = "";
  let counter = 0;

  bestSell.forEach((bsproduk) => {
    const formatPrice = addComa(bsproduk.harga);
    const formatdiskon = addComa(bsproduk.diskon);
    counter++;

    if (formatdiskon === "") {
      rpText = "";
    } else {
      rpText = "Rp. ";
    }

    bsHtml += `
    <div class="best-sell-card transition-${bsproduk.bsPart}">
        <div class="image-product">
            <div class="image-product-overlay">
                <div class="overlay-top">
                <div class="action-overlay aksi-heart-${bsproduk.bsPart}">
                    <i class="fa-regular fa-heart hearticon"></i>
                </div>
                <div class="action-overlay aksi-lihat">
                    <i class="fa-regular fa-eye"></i>
                </div>
                </div>

                <div class="overlay-bottom overlayHolder-${bsproduk.bsPart}" data-product-id="${bsproduk.id}">
                <p class="js-sukses2-${counter}">Tambah Kan Ke keranjang</p>
                </div>
            </div>
            <img src="../src/bestSelling/${bsproduk.foto}" alt="Gucci Bag" />
        </div>
        <p>${bsproduk.nama}</p>
        <div class="bs-pricing">
            <p>Rp. ${formatPrice}</p>
            <p>${rpText}${formatdiskon}</p>
        </div>

        <div class="bs-rate">
            <img src="../src/rating/rating-${bsproduk.rating.bintang}.png" alt="" />
            <p>( ${bsproduk.rating.jumlah} )</p>
        </div>
    </div>
  
    `;

    document.querySelector(".best-produk-sale").innerHTML = bsHtml;
  });
}

export function AnimateProduct() {
  let count = 0;
  bestSell.forEach((element) => {
    const aksiheart = document.querySelector(`.aksi-heart-${element.bsPart}`);
    const domBs = document.querySelector(`.transition-${element.bsPart}`);
    const overlayBottom = document.querySelector(
      `.overlayHolder-${element.bsPart}`
    );

    count++;
    const suksesText = document.querySelector(`.js-sukses2-${count}`);

    aksiheart.addEventListener("click", () => {
      aksiheart.classList.toggle("aksianimate");

      // local storage SET
      const isaksianimate = aksiheart.classList.contains("aksianimate");
      // Use local storage to store the state
      localStorage.setItem(`aksianimate-${element.bsPart}`, isaksianimate);
    });

    domBs.addEventListener("mouseover", () => {
      overlayBottom.classList.add("animate-ovrbottom");
    });

    domBs.addEventListener("mouseout", () => {
      overlayBottom.classList.remove("animate-ovrbottom");
    });

    overlayBottom.addEventListener("click", () => {
      const productId = overlayBottom.dataset.productId;
      AddToCart(productId);

      suksesText.innerHTML = "Produk Berhasil Di Tambah";

      setTimeout(() => {
        suksesText.innerHTML = "Tambahkan Ke Keranjang";
      }, 600);
    });

    //local storage get from set
    const isAksianimate = localStorage.getItem(`aksianimate-${element.bsPart}`);
    // Apply the class if the state is true
    if (isAksianimate === "true") {
      aksiheart.classList.add("aksianimate");
    }
  });
}
