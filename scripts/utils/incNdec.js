export function indedi(increment, decrement, display) {
  let count = 1;
  increment.addEventListener("click", function () {
    count++;

    count = count <= 10 ? count++ : 10;
    display.innerHTML = count;
  });

  decrement.addEventListener("click", function () {
    count--;

    count = count <= 0 ? 0 : count--;
    display.innerHTML = count;
  });
}
