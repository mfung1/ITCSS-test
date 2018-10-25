const getImages = document.querySelectorAll('[data-bg]'),
      images = [...getImages];

const detect_location = (images) => {
  let x = Math.max(document.documentElement.clientWidth, window.innerWidth | 0),
      y = Math.max(document.documentElement.clientHeight, window.innerHeight | 0);
  for (let image of images) {
    let cords = image.getBoundingClientRect();
    let result = cords.top >= 0 && cords.left >= 0 && cords.top <= (window.innerHeight || document.documentElement.clientHeight);
    
    if (result && !image.className.includes('loaded')) {
      let bg = image.getAttribute('data-bg'),
          img = new Image();

      img.loading = () => {
        image.className.add('loaded');
      }
      img.onload = () => {
          image.src = `${bg}`;
          !image.className.includes('loading') ? image.classList.remove('loading') : '';
          image.className.includes('loaded') ? '' : image.classList.add('loaded');
      }
      image.src = bg;
      if(img.complete == false) {img.loading()} else {img.onload()}
    }
  }
}
// console.log(images);
document.addEventListener('scroll', e => {debounce(detect_location(images), 100, false)});