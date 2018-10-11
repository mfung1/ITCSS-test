// Filter
// Bind event listeners to inputs

const fields = document.querySelectorAll('[type=checkbox]'),
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
        console.log(selected);
      } else {
        let index = selected.indexOf(e.target.id);
        selected.splice(index, 1);
        console.log(selected);
      }
    }));
  }
  addBtnEvents();
}

const addBtnEvents =  () => {

    apply.addEventListener('click', function () {
      for (let select in selected) {
        let index = selected[select];
        targets[index].setAttribute('data-visible', 'false');
      }
    });
    remove.addEventListener('click', function () {
      for (let select in selected) {
        let index = selected[select];
        targets[index].setAttribute('data-visible', 'true');
        elements[select].checked = false;
      }
      selected = [];
    });
}

document.addEventListener('DOMContentLoaded', getEvents());