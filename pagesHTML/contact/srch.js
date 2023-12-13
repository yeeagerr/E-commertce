import { product, getProductId } from "../../scripts/product/AllProduct.js";
import { addComa } from "../../scripts/utils/money.js";

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

const search3 = document.querySelector(".search3");
const display3 = document.querySelector(".bot3");
const cancel3 = document.querySelector(".cancel3");

search3.addEventListener("click", () => {
  cancel3.style.display = "block";
  display3.classList.add("searchUp");
  let html = "";

  product.forEach((element) => {
    html += `
        <div class="product-search">
        <div class="ps-left">
          <img src="../../src/productImg/${element.foto}" />
        </div>
        <div class="ps-right">
          <p>${element.nama}</p>
          <img src="../../src/rating/rating-${
            element.rating.bintang
          }.png" alt="" />
          <p>Rp. ${addComa(element.harga)}</p>
        </div>
      </div>
        `;

    document.querySelector(".search-slide3").innerHTML = html;
  });
});

cancel3.addEventListener("click", () => {
  display3.classList.remove("searchUp");
  cancel3.style.display = "none";
  search3.value = "";
});

search3.addEventListener("keyup", () => {
  let search3v = search3.value;
  let valueLower3 = search3v.toLowerCase();

  let filtered = search.filter((item) => {
    return (
      item.snama.includes(valueLower3) ||
      item.sid.includes(valueLower3) ||
      item.skeyword.some((i) => i.includes(valueLower3))
    );
  });

  let html = "";

  filtered.forEach((element) => {
    html += `
        <div class="product-search">
        <div class="ps-left">
          <img src="../../src/productImg/${element.foto}" />
        </div>
        <div class="ps-right">
          <p>${element.snama}</p>
          <img src="../../src/rating/rating-${element.rating}.png" alt="" />
          <p>Rp. ${addComa(element.harga)}</p>
        </div>
      </div>
        `;

    document.querySelector(".search-slide3").innerHTML = html;
  });
});
