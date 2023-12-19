import { cart, updateQuantity, deleteCart } from "./cart.js";
import { getProductId } from "../product/AllProduct.js";
import { addComa } from "../utils/money.js";
import { generatePayInfo } from "./cartPay.js";

export function generateCartHtml() {
  let generatingHtml = "";
  let counter = 0;
  let quantityHolder = 0;

  cart.forEach((cartItem) => {
    counter++;

    let cartId = cartItem.productId;
    let matchProductId = getProductId(cartId);

    let idSort =
      cartId === matchProductId.id2 ? matchProductId.id2 : matchProductId.id;

    const harga = addComa(matchProductId.harga);

    let foto = cartItem.extraData ? cartItem.extraData : matchProductId.foto;

    if (cartItem.quantity <= 0) {
      //defaul nya 0
    } else if (cartItem.quantity >= 10) {
      quantityHolder = 10;
    } else {
      quantityHolder = cartItem.quantity;
    }

    let jumlah = matchProductId.harga * quantityHolder;

    generatingHtml += `
    <div class="cart-items js-cart-items-${counter}">
    <div class="cart-produk">
      <div
        class="produk-img"
        style="
          background-image: url('../../src/productImg/${foto}');
        "
      ></div>
      <p class="name-product">${matchProductId.nama}</p>
    </div>
    <div class="harga">
      <p>Rp. ${harga}</p>
    </div>
    <div class="harga jumlah-js">
      <p class="numberQuantity">${quantityHolder}</p>
      <div class="action-pick js-pick-${counter}">
      <button class="action updating updating-js">Ubah</button>
      <button data-product-id="${idSort}" class="action deleting">Hapus</button>
      </div>

      <div class="qty-container${counter} qty-container">
        <input type="number" max="10" min="0" 
        style="text-align: center ;" class="change-quantity js-change-value${counter}" 
        value="${quantityHolder}"/>
      <button class="save-action js-save-action-${counter}" data-product-id="${idSort}">Simpan</button>
      </div>

 
    </div>
    <div class="harga ">
      <p class="totalHarga-${counter}">Rp. ${addComa(jumlah)}</p>
    </div>
  </div>
    `;

    document.querySelector(".cart-item-overflow").innerHTML = generatingHtml;
  });
}

function showAction() {
  const update = document.getElementById("update");
  const save = document.getElementById("save");
  let count = 0;
  let count2 = 0;
  let count3 = 0;

  //show action
  update.addEventListener("click", () => {
    const quantityNumber = document.querySelectorAll(".numberQuantity");
    const actionContainer = document.querySelectorAll(".action-pick");

    quantityNumber.forEach((n) => {
      n.classList.add("change-quantity-closed");
    });

    actionContainer.forEach((ac) => {
      ac.style.display = "block";
    });
    save.classList.remove("change-quantity-closed");
    update.classList.add("change-quantity-closed");

    //update
    //showing up parts
    let updating = document.querySelectorAll(".updating-js");
    updating.forEach((btnu) => {
      count++;
      const qtyContainer = document.querySelector(`.qty-container${count}`);

      const quantityInput = document.querySelector(`.js-change-value${count}`);
      const actionContainer2 = document.querySelector(`.js-pick-${count}`);
      let textTotalHarga = document.querySelector(`.totalHarga-${count}`);

      btnu.addEventListener("click", function () {
        quantityInput.classList.add("change-quantity-show");
        actionContainer2.style.display = "none";
        qtyContainer.classList.add("change-quantity-show2");
        textTotalHarga.innerHTML = `Rp. -`;
      });
    });

    //update and save it
    document.querySelectorAll(".save-action").forEach((btn) => {
      count2++;
      const qtyContainer = document.querySelector(`.qty-container${count2}`);
      const actionContainer2 = document.querySelector(`.js-pick-${count2}`);
      const iValue = document.querySelector(`.js-change-value${count2}`);

      btn.addEventListener("click", () => {
        const value = iValue.value;
        const dataId = btn.dataset.productId;

        updateQuantity(dataId, Number(value));

        qtyContainer.classList.remove("change-quantity-show2");
        actionContainer2.style.display = "block";
        generatePayInfo();
      });
    });

    //delete
    document.querySelectorAll(".deleting").forEach((btnDel) => {
      let dataId = btnDel.dataset.productId;
      count3++;
      let cartCont = document.querySelector(`.js-cart-items-${count3}`);
      btnDel.addEventListener("click", () => {
        cartCont.remove();
        deleteCart(dataId);
        generatePayInfo();
      });
    });
  });

  //close action
  document.getElementById("save").addEventListener("click", () => {
    window.location.reload();
  });
}

showAction();
