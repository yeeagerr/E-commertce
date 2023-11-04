export function countDown1() {
  // Set the countdown time
  const countdownTime = new Date();
  countdownTime.setDate(countdownTime.getDate() + 5);
  countdownTime.setHours(countdownTime.getHours() + 23);
  countdownTime.setMinutes(countdownTime.getMinutes() + 54);

  // Update the countdown every second
  const daysi = document.getElementById("days");
  const hoursi = document.getElementById("hours");
  const minutesi = document.getElementById("minutes");
  const secondsi = document.getElementById("seconds");

  const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownTime - now;

    // Calculations for days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the countdown
    daysi.innerHTML = days;
    hoursi.innerHTML = hours;
    minutesi.innerHTML = minutes;
    secondsi.innerHTML = seconds;

    // Check if the countdown is finished
    if (distance < 0) {
      clearInterval(countdownInterval);
      countdownElement.innerHTML = "Countdown has ended";
    }
  }, 1000);
}
