import { exploreProduct1, exploreProduct2 } from "../product/product.js";
import { addComa } from "../utils/money.js";
import { AddToCart } from "../cartSummary/cart.js";
import { addWish, deleteWish } from "../wishListSummary/wish.js";

export function exploreSellTop() {
  let exploreHTML = "";
  let counter = 0;
  let counter2 = 4;

  exploreProduct1.forEach((expProduk) => {
    counter2++;

    const harga = addComa(expProduk.harga);
    counter++;

    exploreHTML += `
    <div class="best-sell-card transition-count${expProduk.bsPart}">
    <div class="image-product">
      <div class="image-product-overlay">
        <div class="overlay-top">
          <div class="action-overlay aksi-heart-${counter2}" data-extra-foto="${expProduk.foto}" data-id="${expProduk.id}">
            <i class="fa-regular fa-heart hearticon"></i>
          </div>
          <div class="action-overlay aksi-lihat">
            <i class="fa-regular fa-eye"></i>
          </div>
        </div>

        <div class="overlay-bottom overlayHolder2${counter}" data-product-id="${expProduk.id}">
          <p class="js-sukses-${counter}">Tambah Kan Ke keranjang</p>
        </div>
      </div>
      <img src="../src/exploreimg/${expProduk.foto}" alt="Gucci Bag" />
    </div>
    <p>${expProduk.nama}</p>
    <div class="pricingAndRate">
      <p>Rp. ${harga}</p>

      <div class="mrate">
        <img src="../src/rating/rating-${expProduk.rating.bintang}.png" alt="" />
        <p>( ${expProduk.rating.jumlah} )</p>
      </div>
    </div>
  </div>
    `;

    document.querySelector(".mproductTop").innerHTML = exploreHTML;
  });
}

export function exploreSellBottom() {
  let expHTML = "";

  let counter = 0;
  exploreProduct2.forEach((element) => {
    let formatMoney = addComa(element.harga);

    counter++;

    expHTML += `
    <div class="best-sell-card transition-count2${element.bsPart}">
    <div class="image-product">
      <div class="image-product-overlay">
        <div class="overlay-top">
          <div class="action-overlay aksi-hearts${counter}" >
            <i class="fa-regular fa-heart hearticon"></i>
          </div>
          <div class="action-overlay aksi-lihat">
            <i class="fa-regular fa-eye"></i>
          </div>
        </div>

        <div class="overlay-bottom overlayHolder3${element.bsPart}"  >
          <p>Tambah Kan Ke keranjang</p>
        </div>
      </div>
      <img src="../src/exploreimg/${element.foto}" alt="Gucci Bag" class="imgHolder${counter} color1"/>
    </div>
    <p>${element.nama}</p>
    <div class="pricingAndRate">
      <p>Rp. ${formatMoney}</p>

      <div class="mrate">
        <img src="../src/rating/rating-${element.rating.bintang}.png" alt="" />
        <p>(${element.rating.jumlah})</p>
      </div>
    </div>
    <div class="colorProduct">
      <div class="defaultColor outlineTransition color1${counter}" style="background-color: ${element.color1};"></div>
      <div class="defaultColor color2${counter}" style="background-color: ${element.color2};"></div>
    </div>
  </div>
    `;

    document.querySelector(".mproductBottom").innerHTML = expHTML;
  });
}

export function transition() {
  //top
  let count = 0;
  let counter2 = 4;
  exploreProduct1.forEach((element) => {
    count++;

    counter2++;

    const parent = document.querySelector(`.transition-count${element.bsPart}`);
    const overbtm = document.querySelector(`.overlayHolder2${count}`);
    const suksesText = document.querySelector(`.js-sukses-${count}`);

    let heartbtn = document.querySelector(`.aksi-heart-${counter2}`);

    heartbtn.addEventListener("click", () => {
      heartbtn.classList.toggle("aksianimate");

      const isaksianimate = heartbtn.classList.contains("aksianimate");
      let { id, extraFoto } = heartbtn.dataset;

      if (!isaksianimate) {
        deleteWish(id);
      } else {
        addWish(id, extraFoto);
      }
    });

    parent.addEventListener("mouseover", () => {
      overbtm.classList.add("animate-ovrbottom");
    });

    parent.addEventListener("mouseout", () => {
      overbtm.classList.remove("animate-ovrbottom");
    });

    overbtm.addEventListener("click", () => {
      const overTopId = overbtm.dataset.productId;
      AddToCart(overTopId);
      suksesText.innerHTML = "Produk Berhasil Di Tambah";

      setTimeout(() => {
        suksesText.innerHTML = "Tambahkan Ke Keranjang";
      }, 600);
    });
  });

  //bottom
  let anothercount = 0;

  exploreProduct2.forEach((element2) => {
    anothercount++;

    let heartbtn = document.querySelector(`.aksi-hearts${anothercount}`);
    const color1 = document.querySelector(`.color1${anothercount}`);
    const color2 = document.querySelector(`.color2${anothercount}`);
    const imgHolder = document.querySelector(`.imgHolder${anothercount}`);
    const parent2 = document.querySelector(
      `.transition-count2${element2.bsPart}`
    );
    const overbtm2 = document.querySelector(
      `.overlayHolder3${element2.bsPart}`
    );
    let dataTambah = overbtm2.dataset.tambahan;

    color1.addEventListener("click", () => {
      color2.classList.remove("outlineTransition");
      color1.classList.add("outlineTransition");
      imgHolder.setAttribute("src", `../../src/exploreimg/${element2.foto}`);
      imgHolder.classList.add("color1");
      imgHolder.classList.remove("color2");
      dataTambah = "foto";
    });

    color2.addEventListener("click", () => {
      color2.classList.add("outlineTransition");
      color1.classList.remove("outlineTransition");
      imgHolder.setAttribute("src", `../../src/exploreimg/${element2.foto2}`);
      imgHolder.classList.remove("color1");
      imgHolder.classList.add("color2");
      dataTambah = "foto2";
    });

    heartbtn.addEventListener("click", () => {
      heartbtn.classList.toggle("aksianimate");

      const isaksianimate = heartbtn.classList.contains("aksianimate");
      let idProduct = heartbtn.dataset.id;

      let warnaWish = "";

      if (imgHolder.classList.contains("color1")) {
        warnaWish = element2.foto;
        idProduct = element2.id;
      } else if (imgHolder.classList.contains("color2")) {
        warnaWish = element2.foto2;
        idProduct = element2.id2;
      }

      if (!isaksianimate) {
        deleteWish(idProduct, warnaWish);
        console.log(idProduct);
      } else {
        addWish(idProduct, warnaWish);
        console.log(idProduct);
      }
    });

    parent2.addEventListener("mouseover", () => {
      overbtm2.classList.add("animate-ovrbottom");
    });

    parent2.addEventListener("mouseout", () => {
      overbtm2.classList.remove("animate-ovrbottom");
    });

    overbtm2.addEventListener("click", () => {
      let productId = overbtm2.dataset.productId;

      let pickWarna = "";

      if (imgHolder.classList.contains("color1")) {
        pickWarna = element2.foto;
        productId = element2.id;
      } else if (imgHolder.classList.contains("color2")) {
        pickWarna = element2.foto2;
        productId = element2.id2;
      }

      AddToCart(productId, pickWarna);
    });
  });
}
