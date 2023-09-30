import { fetchImages } from "../data/imagesApi";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const backBtn = document.querySelector(".btn-back");
const searchForm = document.querySelector("form#search-form");
const galleryEl = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

backBtn?.addEventListener("click", () => {
  history.back();
});

searchForm.addEventListener("submit", onSubmit);

let query = "";
let simpleLightBox;
let page = 1;
const perPage = 40;

function renderGallery(images) {
  if (!galleryEl) {
    return;
  }

  const markup = images
    .map(
      ({ id, webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
<a class="gallery__link" href="${largeImageURL}">
  <div class="gallery-item" id="${id}">
    <img src=${webformatURL} alt=${tags} loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes </b>
        <span>${likes}</span>
      </p>
      <p class="info-item">
        <b>Views </b>
        <span>${views}</span>
      </p>
      <p class="info-item">
        <b>Comments </b>
        <span>${comments}</span>
      </p>
      <p class="info-item">
        <b>Downloads</b>
        <span>${downloads}</span>
      </p>
    </div>
  </div>
</a>
  `,
    )
    .join("");
  galleryEl.insertAdjacentHTML("beforeend", markup);
}

function onSubmit(e) {
  e.preventDefault();
  query = e.target.elements["searchQuery"].value;
  page = 1;

  if (!query.trim()) {
    loadMoreBtn.classList.add("is-hiden");
    Notify.failure(`Пусто`);
    return;
  }
  galleryEl.innerHTML = "";
  fetchImages(query, page, perPage)
    .then((data) => {
      if (data.hits.length === 0) {
        loadMoreBtn.classList.add("is-hiden");
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
      } else {
        renderGallery(data.hits);
        simpleLightBox = new SimpleLightbox(".gallery a").refresh();
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        loadMoreBtn.classList.remove("is-hiden");
      }
    })
    .catch((e) => console.log(e))
    .finally(() => searchForm.reset());
}

loadMoreBtn.addEventListener("click", onLoadMore);

function onLoadMore() {
  page += 1;
  simpleLightBox.destroy();

  fetchImages(query, page, perPage)
    .then((data) => {
      renderGallery(data.hits);
      simpleLightBox = new SimpleLightbox(".gallery a").refresh();
      const totalPages = Math.ceil(data.totalHits / perPage);

      if (page >= totalPages) {
        loadMoreBtn.classList.add("is-hiden");
        Notify.failure("We're sorry, but you've reached the end of search results.", {
          timeout: 1000,
        });
      }
    })
    .catch((e) => console.log(e));
}
