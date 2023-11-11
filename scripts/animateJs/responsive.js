export function navbarRes() {
  const dropdown = document.querySelector(".dropdown");
  const threeline = document.querySelector(".three-line");
  const body = document.body;

  threeline.addEventListener("click", () => {
    dropdown.classList.toggle("dropanimate");
    body.classList.toggle("overflow-y");
  });
}



navbarRes();
