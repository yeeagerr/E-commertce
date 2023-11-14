import { indedi } from "../utils/incNdec.js"; // parameter (increment, decrement, display);

const increase = document.querySelector(".increase");
const decrease = document.querySelector(".decrease");
const display = document.getElementById("quantity");
const boxSize = document.querySelectorAll(".boxS");

indedi(increase, decrease, display);

function boxSizePart() {
  boxSize.forEach((b) => {
    b.addEventListener("click", () => {
      b.classList.toggle("animateBoxs");
    });
  });
}
