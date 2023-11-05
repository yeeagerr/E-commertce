export function sliderAnimate() {
  let counter = 1;
  setInterval(function () {
    document.getElementById("radio" + counter).checked = true;
    counter++;
    if (counter >= 4) {
      counter = 1;
    }
  }, 4000);
}

export function clickSlider() {
  let countMarginLeft = 0;
  let countMarginRight = 0;
  let countClick = 0;
  const leftBtn = document.querySelector(".left-slider-card");
  const rightBtn = document.querySelector(".right-slider-card");
  const firstCard = document.querySelector(".fs-card-count1");

  rightBtn.addEventListener("click", () => {
    countClick++;
    if (countClick === 2) {
      alert("you cannot countinue");
    } else {
      countMarginLeft += 17;

      firstCard.style.marginLeft = `-${countMarginLeft}%`;
    }
  });

  leftBtn.addEventListener("click", () => {
    countClick--;
    if (countClick >= 0) {
      countMarginRight = 0;
      countMarginLeft = 0;
      firstCard.style.marginLeft = `${countMarginRight}%`;
      console.log(countMarginRight);
    } else {
      countClick = 0;
      alert("you cant ");
    }
  });
}
