import { Notify } from "notiflix/build/notiflix-notify-aio";

const form = document.querySelector(".form");
const backBtn = document.querySelector(".btn-back");

backBtn?.addEventListener("click", () => {
  history.back();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.currentTarget;

  const amount = Number(e.currentTarget.elements["amount"].value);
  let delayValue = Number(e.currentTarget.elements["delay"].value);
  let stepValue = Number(e.currentTarget.elements["step"].value);

  let curAmount = 0;
  let isFirstIteration = true;

  do {
    if (!isFirstIteration) {
      delayValue += stepValue;
    }
    isFirstIteration = false;

    curAmount += 1;
    console.log(delayValue);
    createPromise(curAmount, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  } while (curAmount < amount);

  form.reset();
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
