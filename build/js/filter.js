const addClass = (element, element2, theClass) => {
  let x = element.className,
      y = element2.getAttribute('data-show');
  if (x.indexOf(theClass) == -1 && y == 'false') {
    element.className += ` ${theClass}`;
    element2.setAttribute('data-show', true);
    console.log(element.getAttribute('aria-expanded'));
  } else {
    element.className = element.className.replace(/\brotate\b/, " ");
    element2.setAttribute('data-show', false);
  }
}

const expand = () => {
  let thehandler = document.getElementById('checklist-btn');
  let theTarget = document.getElementsByClassName('ddl-rndl')[0];
  let thecollapser = document.getElementById('fields');
  thehandler.addEventListener('click', function(){addClass(theTarget, thecollapser, 'rotate')}, false);
  thehandler.addEventListener('keypress', function (e) {
    if(e.key == 'Spacebar' || e.key == 'Return'){
      addClass(theTarget, thecollapser, 'rotate');
    }}, false);
}

document.addEventListener('DOMContentLoaded', expand());