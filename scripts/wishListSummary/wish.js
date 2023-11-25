import { AddToCart } from "../cartSummary/cart.js";

export let wish = JSON.parse(localStorage.getItem("wish-test7"));

if (!wish) {
  wish = [];
}

// function debugg(params) {
//   console.log(wish);
// }

// debugg();

export function addWish(id, extraWish) {
  let match;

  wish.forEach((wishItem) => {
    if (id === wishItem.idProduct) {
      match = wishItem;
    }
  });

  if (!match) {
    wish.push({
      productId: id,
      extraData: extraWish,
    });
  }

  localStorage.setItem("wish-test7", JSON.stringify(wish));
}

export function deleteWish(id) {
  let newWish = [];

  wish.forEach((wishItem) => {
    if (wishItem.productId !== id) {
      newWish.push(wishItem);
    }
  });

  wish = newWish;
  localStorage.setItem("wish-test7", JSON.stringify(wish));
}

export function addAllWish(id, extraData) {
  let wishHold = [];

  wish.forEach((wishItem) => {
    wishHold.push(wishItem);
  });

  AddToCart(id, extraData);
  deleteWish(id);
  console.log();
}
