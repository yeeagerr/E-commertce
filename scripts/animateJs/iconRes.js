export function userDrop() {
  const userHover = document.querySelector(".user-icon");
  const userDropDown = document.querySelector(".user-icon-dropdown");

  userHover.addEventListener("click", () => {
    userDropDown.classList.toggle("transition-user-icon");
  });
}

userDrop();
