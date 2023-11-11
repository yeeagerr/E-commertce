const labelBank = document.querySelector(".radio-bank");
const labelCod = document.querySelector(".radio-cod");

labelBank.addEventListener("click", function () {
  labelBank.classList.add("radio-label-checked");
  labelCod.classList.remove("radio-label-checked");
});

labelCod.addEventListener("click", function () {
  labelCod.classList.add("radio-label-checked");
  labelBank.classList.remove("radio-label-checked");
});
