const getImages = document.querySelectorAll('[data-bg]');

const loaded = (image, src) => {
  image.removeAttribute('data-bg');
  // image.removeAttribute('loading');
  if(src != null){ image.src = src };
  image.setAttribute('loaded', '');
}

const isViewable = (image) => {
  let cords = image.getBoundingClientRect(),
    result = cords.top >= 0 && cords.left >= 0 && cords.top <= (window.innerHeight || document.documentElement.clientHeight),
    hasImage = image.querySelector('img');
  return (result && !hasImage)
}

const loadImages = () => {
  for (let image of getImages) {
    let viewable = isViewable(image);
    if (viewable) {
      image.setAttribute('loading', '');
      let img = new Image(),
          src = image.getAttribute('data-bg');
      if(src != null){ img.src = src };
      img.addEventListener('load', () => {setTimeout(loaded(image, src), 1000)});
    }
  }
}


document.addEventListener('scroll', debounce(loadImages, 300, false));