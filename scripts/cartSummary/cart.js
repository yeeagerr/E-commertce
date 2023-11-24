export let cart = JSON.parse(localStorage.getItem("cart-test-10"));

if (!cart) {
  cart = [];
}

// export function Debugger() {
//   console.log(cart);
// }
// Debugger();

export function AddToCart(theProductId, Tambahan) {
  let matchingProduct;

  cart.forEach((cartItem) => {
    if (theProductId === cartItem.productId) {
      matchingProduct = cartItem;
    }
  });

  if (matchingProduct) {
    matchingProduct.quantity += 1;
  } else {
    cart.push({
      productId: theProductId,
      quantity: 1,
      extraData: Tambahan,
    });
  }

  saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
  let matching;

  cart.forEach((c) => {
    if (productId === c.productId) {
      matching = c;
    }

    if (matching) {
      matching.quantity = newQuantity;
    }

    saveToStorage();
  });
}

export function deleteCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("cart-test-10", JSON.stringify(cart));
}
