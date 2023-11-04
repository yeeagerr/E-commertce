export function animasiList() {
  const womanList = document.querySelector(".for-woman");
  const womanIcon = document.querySelector(".greater-icon-w");
  document.querySelector(".woman-list").addEventListener("mouseover", () => {
    womanList.classList.add("transition-list");
    womanIcon.classList.add("transition-icon-list");
  });

  document.querySelector(".for-woman").addEventListener("mouseover", () => {
    womanList.classList.add("transition-list");
    womanIcon.classList.add("transition-icon-list");
  });

  document.querySelector(".for-woman").addEventListener("mouseout", () => {
    womanList.classList.remove("transition-list");
    womanIcon.classList.remove("transition-icon-list");
  });

  document.querySelector(".woman-list").addEventListener("mouseout", () => {
    womanList.classList.remove("transition-list");
    womanIcon.classList.remove("transition-icon-list");
  });

  // MAN

  const manList = document.querySelector(".for-man");
  const manIcon = document.querySelector(".greater-icon-m");
  document.querySelector(".man-list").addEventListener("mouseover", () => {
    manList.classList.add("transition-list");
    manIcon.classList.add("transition-icon-list");
  });

  document.querySelector(".for-man").addEventListener("mouseover", () => {
    manList.classList.add("transition-list");
    manIcon.classList.add("transition-icon-list");
  });

  document.querySelector(".for-man").addEventListener("mouseout", () => {
    manList.classList.remove("transition-list");
    manIcon.classList.remove("transition-icon-list");
  });

  document.querySelector(".man-list").addEventListener("mouseout", () => {
    manList.classList.remove("transition-list");
    manIcon.classList.remove("transition-icon-list");
  });
}
