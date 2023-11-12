const box = document.querySelectorAll(".box");

box.forEach((element) => {
  element.addEventListener("mouseover", function () {
    element.classList.add("boxHover");
    iconSide.classList.add("icon-offer-con-hover");
  });

  element.addEventListener("mouseout", function () {
    element.classList.remove("boxHover");
  });
});

function link(number) {
  switch (number) {
    case 1:
      window.location.href =
        "https://www.facebook.com/profile.php?id=100070693682879";
      break;

    case 2:
      window.location.href =
        "https://www.instagram.com/19habib_abdillah/?hl=id";
      break;

    case 3:
      window.location.href = "https://twitter.com/NezSeco";
      break;

    case 4:
      window.location.href = "https://www.roblox.com/users/440176932/profile";
      break;

    default:
      alert("SOMETHING WENT WRONG !!!");
      break;
  }
}
