export function click2() {
  let c = 0;
  let i = document.querySelector(".i-2");
  let de = document.querySelector(".de-2");
  let d = document.querySelector(".d-2");

  i.addEventListener("click", () => {
    c >= 10 ? (c = 10) : c++;
    d.innerHTML = c;

    console.log(`added c2 ${c}`);
  });

  de.addEventListener("click", function () {
    c <= 0 ? (c = 0) : c--;
    d.innerHTML = c;

    console.log(`decrement c2 ${c}`);
  });
}

function click() {
  let c = 0;
  let i = document.querySelector(".i");
  let de = document.querySelector(".de");
  let d = document.querySelector(".d");

  i.addEventListener("click", () => {
    c >= 10 ? (c = 10) : c++;
    d.innerHTML = c;

    console.log(`added c1 ${c}`);
  });

  de.addEventListener("click", function () {
    c <= 0 ? (c = 0) : c--;
    d.innerHTML = c;

    console.log(`decrement c1 ${c}`);
  });
}

click();
