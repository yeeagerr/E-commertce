export function clickSlider(counted) {
  const cardSell = document.querySelectorAll(".fs-sell-card");
  const flashCont = document.querySelector(".fs-slide");

  const offset = counted * -17;

  flashCont.style.transform = `translateX(${offset}%)`;
}

function slideKategori() {
  const alert = document.querySelector(".alert-danger");
  const leftBtn = document.querySelector(".left-kategori");
  const rightBtn = document.querySelector(".right-kategori");

  leftBtn.addEventListener("click", () => {
    alert.style.display = "flex";
    console.log("hi");

    setTimeout(() => {
      alert.style.display = "none";
    }, 1500);
  });

  rightBtn.addEventListener("click", () => {
    alert.style.display = "flex";
    console.log("hi");

    setTimeout(() => {
      alert.style.display = "none";
    }, 1500);
  });
}

slideKategori();
