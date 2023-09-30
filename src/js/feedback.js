import { throttle } from "throttle-debounce";

const backBtn = document.querySelector(".btn-back");

const form = document.querySelector(".js-feedback-form");

const LOCAL_KEY = "messageInput";

backBtn?.addEventListener("click", () => {
  history.back();
});

form?.addEventListener("input", throttle(500, onInputChange));
form?.addEventListener("submit", onFormSubmit);

function onInputChange(e) {
  const existingData = JSON.parse(localStorage.getItem(LOCAL_KEY)) ?? { email: "", message: "" };
  const { name, value } = e.target;
  existingData[name] = value;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(existingData));
}

function onFormSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  localStorage.removeItem(LOCAL_KEY);
  form.reset();
}

function setValuesToInputs() {
  const messageInput = JSON.parse(localStorage.getItem(LOCAL_KEY)) ?? { email: "", message: "" };
  form.querySelector(".email-input").value = messageInput.email;
  console.log((form.querySelector(".textarea-input").value = messageInput.message));
}

setValuesToInputs();
