function updateTime() {
  const timeElement = document.getElementById("time");
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  timeElement.textContent = timeString = `${hours}:${minutes}:${seconds}`;
  timeElement.textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();
