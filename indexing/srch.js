import { product, getProductId } from "../scripts/product/AllProduct.js";
import { addComa } from "../scripts/utils/money.js";

const searching = document.querySelector(".search1");
const display = document.querySelector(".nav-ext-bot");
const cancel1 = document.querySelector(".cancel1");

let search = [];
let nama;
let keyword;
let id;
let harga;
let foto;
let rating;

product.forEach((item) => {
  nama = item.nama.toLowerCase();
  keyword = item.keywords.map((keyword) => keyword.toLowerCase());
  id = item.id.toLowerCase();
  foto = item.foto;
  rating = item.rating.bintang;
  harga = item.harga;
  search.push({
    snama: nama,
    skeyword: keyword,
    sid: id,
    foto: foto,
    rating: rating,
    harga: harga,
  });
});

searching.addEventListener("click", () => {
  display.classList.add("searchUp");
  cancel1.style.display = "block";

  let html = "";

  product.forEach((element) => {
    html += `
        <div class="product-search">
        <div class="ps-left">
          <img src="../src/productImg/${element.foto}" />
        </div>
        <div class="ps-right">
          <p>${element.nama}</p>
          <img src="../src/rating/rating-${
            element.rating.bintang
          }.png" alt="" />
          <p>Rp. ${addComa(element.harga)}</p>
        </div>
      </div>
        `;

    document.querySelector(".search-slide").innerHTML = html;
  });
});

cancel1.addEventListener("click", () => {
  display.classList.remove("searchUp");
  cancel1.style.display = "none";
  searching.value = "";
});

searching.addEventListener("keyup", () => {
  let sValue = searching.value;
  let valueLower = sValue.toLowerCase();

  let filtered = search.filter((item) => {
    return (
      item.snama.includes(valueLower) ||
      item.sid.includes(valueLower) ||
      item.skeyword.some((h) => h.includes(valueLower))
    );
  });

  let html = "";

  filtered.forEach((element) => {
    html += `
        <div class="product-search">
        <div class="ps-left">
          <img src="../src/productImg/${element.foto}" />
        </div>
        <div class="ps-right">
          <p>${element.snama}</p>
          <img src="../src/rating/rating-${element.rating}.png" alt="" />
          <p>Rp. ${addComa(element.harga)}</p>
        </div>
      </div>
        `;

    document.querySelector(".search-slide").innerHTML = html;
  });
});
