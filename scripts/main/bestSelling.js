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
    console.log(`generate : ${counter}`);

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

                <div class="overlay-bottom overlayHolder-${bsproduk.bsPart}">
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
  bestSell.forEach((element) => {
    const aksiheart = document.querySelector(`.aksi-heart-${element.bsPart}`);
    const domBs = document.querySelector(`.transition-${element.bsPart}`);
    const overlayBottom = document.querySelector(
      `.overlayHolder-${element.bsPart}`
    );

    aksiheart.addEventListener("click", () => {
      aksiheart.classList.toggle("aksianimate");

      // local storage SET
      const isaksianimate = aksiheart.classList.contains("aksianimate");
      // Use local storage to store the state
      localStorage.setItem(`aksianimate-${element.bsPart}`, isAksianimate);
    });

    domBs.addEventListener("mouseover", () => {
      overlayBottom.classList.add("animate-ovrbottom");
    });

    domBs.addEventListener("mouseout", () => {
      overlayBottom.classList.remove("animate-ovrbottom");
    });

    overlayBottom.addEventListener("click", () => {
      alert(`added : bagian ${element.bsPart}`);
    });

    //local storage get from set
    // Retrieve the state from local storage
    const isAksianimate = localStorage.getItem(`aksianimate-${element.bsPart}`);
    // Apply the class if the state is true
    if (isAksianimate === "true") {
      aksiheart.classList.add("aksianimate");
    }
  });
}
