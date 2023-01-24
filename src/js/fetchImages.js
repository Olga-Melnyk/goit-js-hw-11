import axios from 'axios';

export async function fetchImages(value, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const TOKEN = '32972281-0765619f1e89c459ff8e86751';

  const response = await axios.get(
    `${BASE_URL}?key=${TOKEN}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
  return response.data;
}
