const addClass = (element, theClass) => {
  let x = element.className;
  x.indexOf(theClass) == -1
  ?
  element.className += ` ${theClass}`
  :
  element.className = element.className.replace(/\brotate\b/, " ");
}

const expand = () => {
  let thehandler = document.getElementById('Checklist');
  let theTarget = document.getElementsByClassName('ddl-rndl')[0];
  thehandler.addEventListener('click', function(){addClass(theTarget, 'rotate')}, false)
}

document.addEventListener('DOMContentLoaded', expand());