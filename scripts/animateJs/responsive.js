export function navbarRes() {
  const dropdown = document.querySelector(".dropdown");
  const threeline = document.querySelector(".three-line");
  const body = document.body;

  threeline.addEventListener("click", () => {
    dropdown.classList.toggle("dropanimate");
    body.classList.toggle("overflow-y");
  });
}

export function userDrop() {
  const userHover = document.querySelector(".user-icon");
  const userDropDown = document.querySelector(".user-icon-dropdown");

  userHover.addEventListener("click", () => {
    userDropDown.classList.toggle("transition-user-icon");
  });
}
