// import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages, page } from './js/fetchImages';
import { createImages } from './js/createImage';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-form__input');
const btn = document.querySelector('.search-form__btn');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', onSubmit);

let searchValue = '';

async function onSubmit(e) {
  e.preventDefault();
  searchValue = input.value.trim();
  console.log(searchValue);
  const result = await fetchImages(searchValue);
  console.log(result);
  gallery.innerHTML = createImages(result.hits);
}
