import { fatchBreedById, fatchBreeds } from "../data/catsApi.js";
const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");

const creatCatsOptions = (optionsList) => {
  const list = optionsList.map(({ id, name }) => `<option value=${id}>${name}</option>`).join(" ");
  breedSelect.insertAdjacentHTML("beforeend", list);
};

const creatCatCard = (cat) => {
  const card = cat
    .map(
      ({ url, breeds: [{ description, name, temperament }] }) => `
       <img class="catImg" src=${url} alt=${name}>
    <div  class="infoConttent">
      <h2>${name}</h2>
      <p>${description}</p>
      <p><span>Temperament:</span> ${temperament}</p>
    
    </div>`,
    )
    .join(" ");
  catInfo.innerHTML = card;
};

const getAllOptions = () => {
  document.querySelector(".select-wrapper").classList.add("hide");
  breedSelect.classList.add("hide");
  loader.classList.remove("hide");
  fatchBreeds()
    .then((data) => {
      creatCatsOptions(data);
      document.querySelector(".select-wrapper").classList.remove("hide");
      breedSelect.classList.remove("hide");
      loader.classList.add("hide");
    })
    .catch((er) => {
      {
        error.classList.remove("hide");
        document.querySelector(".select-wrapper").classList.remove("hide");
        console.log(er);
      }
    })
    .finally(() => loader.classList.add("hide"));
};

getAllOptions();

breedSelect.addEventListener("change", onBreedSelectChange);

function onBreedSelectChange(e) {
  const { value } = e.target;
  loader.classList.remove("hide");
  catInfo.innerHTML = "";
  fatchBreedById(value)
    .then((data) => {
      creatCatCard(data);
      loader.classList.add("hide");
    })
    .catch((er) => {
      error.classList.remove("hide");
      console.log(er);
    })
    .finally(() => loader.classList.add("hide"));
}
