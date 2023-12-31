import { product, getProductId } from "../product/AllProduct.js";
import { addComa } from "./money.js";

export function showSearch() {
  const search2 = document.querySelector(".search2");

  const display2 = document.querySelector(".bot2");

  const cancel2 = document.querySelector(".cancel2");

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

  search2.addEventListener("click", () => {
    cancel2.style.display = "block";
    display2.classList.add("searchUp");
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

      document.querySelector(".search-slide2").innerHTML = html;
    });
  });

  cancel2.addEventListener("click", () => {
    display2.classList.remove("searchUp");
    cancel2.style.display = "none";
    search2.value = "";
  });

  search2.addEventListener("keyup", () => {
    let search2v = search2.value;
    let valueLower2 = search2v.toLowerCase();

    let filtered = search.filter((item) => {
      return (
        item.snama.includes(valueLower2) ||
        item.sid.includes(valueLower2) ||
        item.skeyword.some((i) => i.includes(valueLower2))
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

      document.querySelector(".search-slide2").innerHTML = html;
    });
  });
}

showSearch();
