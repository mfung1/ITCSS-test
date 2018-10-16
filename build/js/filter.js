// Filter
// Bind event listeners to inputs

const fields = document.querySelectorAll('.checkbox input[type=checkbox]'),
      cards = document.querySelectorAll(".row"),
      apply = document.querySelector("#apply-filter"),
      remove = document.querySelector("#remove-filter"),
      targets = [...cards],
      elements = [...fields];

let selected = [];

const getEvents = () => {
  for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click",(function(e) {
      if (this.checked) {
        selected.push(e.target.id);
      } else {
        let index = selected.indexOf(e.target.id);
        selected.splice(index, 1);
      }
    }));
  }
  addBtnEvents();
}

const hideSections = () => {
  for (let select in selected) {
    let index = selected[select];
    targets[index].setAttribute('data-visible', 'false');
    targets[index].setAttribute("style", "margin: 0!important");
  }
}

const showSections = () => {
  for (let select in selected) {
    let index = selected[select];
    targets[index].setAttribute('data-visible', 'true');
    elements[index].checked = false;
    targets[index].setAttribute("style", "");
  }
  selected = [];
}

const addBtnEvents = () => {

    apply.addEventListener('click', hideSections);
    apply.addEventListener('keypress', function (e) {
      if(e.key == 'Spacebar' || e.key == 'Return'){
        hideSections();
      }}, false);
    apply.addEventListener('touch', hideSections);
    remove.addEventListener('click', showSections);
    remove.addEventListener('keypress', function (e) {
      if(e.key == 'Spacebar' || e.key == 'Return'){
        showSections();
      }}, false);
    remove.addEventListener('touch', showSections);
}

document.addEventListener('DOMContentLoaded', getEvents);