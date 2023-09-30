const btnGroup = document.querySelector(".button-wrapper");
const startBttn = document.querySelector('[data-action="start"]');
const stopBtn = document.querySelector('[data-action="stop"]');
const backBtn = document.querySelector(".btn-back");

backBtn?.addEventListener("click", () => {
  history.back();
});

let timerId = null;
stopBtn.disabled = true;

btnGroup.addEventListener("click", (e) => {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }

  if (e.target.dataset.action !== "stop") {
    timerId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 500);
    startBttn.disabled = true;
    stopBtn.disabled = false;
  } else {
    clearInterval(timerId);
    startBttn.disabled = false;
    stopBtn.disabled = true;
  }
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
