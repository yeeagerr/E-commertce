function RevealnUn() {
  const reveal = document.querySelector(".icon-see-pass");
  const passInput = document.querySelector(".passInput");

  reveal.addEventListener("click", () => {
    if (passInput.type === "password") {
      passInput.type = "text";
      reveal.classList.remove("fa-eye");
      reveal.classList.add("fa-eye-slash");
    } else {
      passInput.type = "password";
      reveal.classList.remove("fa-eye-slash");
      reveal.classList.add("fa-eye");
    }
  });
}

RevealnUn();
