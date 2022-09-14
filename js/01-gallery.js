import { galleryItems } from "./gallery-items.js";
// Change code below this line
console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
console.log(galleryContainer);

const imagesMarkap = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", imagesMarkap);

galleryContainer.addEventListener("click", onGalleryContainerClick);

let instance = null;

function createGalleryMarkup(_item) {
  return _item
    .map(({ preview, original, description }) => {
      return `
           <div class="gallery__item">
                <a class="gallery__link" href="${original}"> 
                <img 
                    class="gallery__image"
                    src="${preview}" 
                    data-source="${original}" 
                    alt="${description}"
                />                    
                </a>
            </div> `;
    })
    .join("");
};

function onGalleryContainerClick(event) {
  event.preventDefault();

  const img = event.target;
  const isGalleryImgEl = img.classList.contains("gallery__image");
  if (!isGalleryImgEl) {
    return;
  }
  const dataSource = img.dataset.source;
  instance = basicLightbox.create(`
    <img src="${dataSource}" width="800" height="600">
`);

  instance.show();
};

document.addEventListener("keydown", (event) => {
  event.preventDefault();

  if (event.key === "Escape") {
    instance.close();
  }
});
