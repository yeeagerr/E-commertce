export let wish = JSON.parse(localStorage.getItem("wish-test5"));

if (!wish) {
  wish = [];
}

export function addWish(id) {
  let match;

  wish.forEach((wishItem) => {
    if (id === wishItem.idProduct) {
      match = wishItem;
    }
  });

  if (!match) {
    wish.push({
      idProduct: id,
    });
  }

  localStorage.setItem("wish-test5", JSON.stringify(wish));
}

export function deleteWish(id) {
  let newWish = [];

  wish.forEach((wishItem) => {
    if (wishItem.idProduct !== id) {
      newWish.push(wishItem);
    }
  });

  wish = newWish;
  localStorage.setItem("wish-test5", JSON.stringify(wish));
}
