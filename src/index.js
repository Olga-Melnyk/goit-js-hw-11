import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/fetchImages';
import { createImages } from './js/createImage';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-form__input');
const btn = document.querySelector('.js-load');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', onSubmit);
btn.addEventListener('click', onClick);

let searchValue = '';
let currentPage = 1;
let perPage = 40;

let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

async function onSubmit(e) {
  e.preventDefault();
  searchValue = input.value.trim();
  try {
    const result = await fetchImages(searchValue, currentPage);
    if (result.hits.length === 0) {
      btnIsHidden(true);
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      clear();
      return;
    }
    if (perPage >= result.totalHits) {
      btnIsHidden(true);
      gallery.innerHTML = createImages(result.hits);
      lightbox.refresh();
      Notify.info("We're sorry, but you've reached the end of search results.");
      return;
    } else {
      gallery.innerHTML = createImages(result.hits);
      lightbox.refresh();
      btnIsHidden(false);
    }
  } catch (err) {
    console.log(err);
  }
}

async function onClick() {
  currentPage += 1;
  try {
    const result = await fetchImages(searchValue, currentPage);
    console.log(currentPage);
    console.log(result.totalHits);
    console.log(result);
    gallery.insertAdjacentHTML('beforeend', createImages(result.hits));
    lightbox.refresh();
    perPage += result.hits.length;
    if (perPage === result.totalHits) {
      btnIsHidden(true);
      Notiflix.Report.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (err) {
    console.log(err);
  }
}

function clear() {
  gallery.innerHTML = '';
}

function btnIsHidden(status) {
  btn.hidden = status;
}
