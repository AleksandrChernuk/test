import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { padStart } from "lodash";

const backBtn = document.querySelector(".btn-back");
const input = document.querySelector("input#datetime-picker");
const btnStart = document.querySelector("[data-start]");
const LOCAL_KEY = "Data";
const spanRefs = {
  daysRef: document.querySelector("[data-days]"),
  hoursRef: document.querySelector("[data-hours]"),
  minutesRef: document.querySelector("[data-minutes]"),
  secondsRef: document.querySelector("[data-seconds]"),
};

let intervalId = null;
reloadPage();

function reloadPage() {
  let selectedDate = Number(JSON.parse(localStorage.getItem(LOCAL_KEY))) ?? 0;
  const currentData = new Date().getTime();
  btnStart.disabled = true;
  if (selectedDate < currentData) {
    return alert("Please choose a date in the future");
  }
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    const currentData = new Date().getTime();
    const nextDate = selectedDate - currentData;
    localStorage.setItem(LOCAL_KEY, JSON.stringify(selectedDate));
    const { seconds, minutes, hours, days } = convertMs(nextDate);
    const { secondsRef, minutesRef, hoursRef, daysRef } = spanRefs;

    secondsRef.innerHTML = padStart(seconds, 2, "0");
    minutesRef.innerHTML = padStart(minutes, 2, "0");
    hoursRef.innerHTML = padStart(hours, 2, "0");
    daysRef.innerHTML = padStart(days, 2, "0");

    if (currentData > selectedDate) {
      clearInterval(intervalId);
      secondsRef.innerHTML = "00";
      minutesRef.innerHTML = "00";
      hoursRef.innerHTML = "00";
      daysRef.innerHTML = "00";
    }
  }, 1000);
}

backBtn?.addEventListener("click", () => {
  history.back();
  console.log(history.back());
});

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onOpen() {
    btnStart.disabled = false;
  },
  onClose(selectedDates) {
    let selectedDate = selectedDates[0].getTime();
    localStorage.setItem(LOCAL_KEY, JSON.stringify(selectedDate));
    const currentData = new Date().getTime();
    btnStart.disabled = true;
    if (selectedDate < currentData) {
      return alert("Please choose a date in the future");
    }
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      const currentData = new Date().getTime();
      const nextDate = selectedDate - currentData;
      const { seconds, minutes, hours, days } = convertMs(nextDate);
      const { secondsRef, minutesRef, hoursRef, daysRef } = spanRefs;

      secondsRef.innerHTML = padStart(seconds, 2, "0");
      minutesRef.innerHTML = padStart(minutes, 2, "0");
      hoursRef.innerHTML = padStart(hours, 2, "0");
      daysRef.innerHTML = padStart(days, 2, "0");

      if (currentData > selectedDate) {
        clearInterval(intervalId);
        secondsRef.innerHTML = "00";
        minutesRef.innerHTML = "00";
        hoursRef.innerHTML = "00";
        daysRef.innerHTML = "00";
      }
    }, 1000);
  },
};

flatpickr(input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
