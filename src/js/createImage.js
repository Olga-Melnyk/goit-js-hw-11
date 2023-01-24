export function createImages(arr) {
  return arr
    .map(
      item =>
        `<div class="photo-card">
        <a href="${item.largeImageURL}">
        <img src="${item.webformatURL}" alt="" loading="lazy" class="gallery-image"/>
        </a>
        <div class="info">
          <p class="info-item">${item.likes}
            <b>Likes</b>
            </p>
          <p class="info-item">${item.views}
            <b>Views</b>
            </p>
          <p class="info-item">${item.comments}
            <b>Comments</b>
          </p>
          <p class="info-item">${item.downloads}
            <b>Downloads</b>
          </p>
        </div>
      </div>`
    )
    .join('');
}
