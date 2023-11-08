let countMarginLeft = 0;
let countMarginRight = 0;
let Counter = 0;
const leftBtn = document.querySelector(".left-slider-card");
const rightBtn = document.querySelector(".right-slider-card");
const cardSell = document.querySelectorAll(".fs-sell-card");
const flashCont = document.querySelector(".fs-slide");

function clickSlider(counted) {
  if (counted < 0) {
    Counter = cardSell.length - 1;
  } else if (counted >= cardSell.length) {
    Counter = 0;
  }

  const offset = Counter * -17;
  console.log(Counter);
  flashCont.style.transform = `translateX(${offset}%)`;
}

leftBtn.addEventListener("click", () => {
  Counter--;
  clickSlider(Counter);
  console.log(`original counter = ${Counter}`);
});

rightBtn.addEventListener("click", () => {
  Counter++;
  clickSlider(Counter);
  console.log(`original counter = ${Counter}`);
});

clickSlider(Counter);

function slideKategori() {
  const alert = document.querySelector(".alert-danger");
  const leftBtn = document.querySelector(".left-kategori");
  const rightBtn = document.querySelector(".right-kategori");

  leftBtn.addEventListener("click", () => {
    alert.style.display = "flex";

    setTimeout(() => {
      location.reload();
    }, 1500);
  });

  rightBtn.addEventListener("click", () => {
    alert.style.display = "flex";

    setTimeout(() => {
      location.reload();
    }, 1500);
  });
}

slideKategori();
