// Filter
// Bind event listeners to inputs

const fields = document.querySelectorAll('.form_field'),
      cards = document.querySelectorAll(".row"),
      inputs = document.querySelectorAll('input[type="checkbox"]'),
      apply = document.querySelector("#apply-filter"),
      remove = document.querySelector("#remove-filter"),
      targets = [...cards],
      elements = [...fields];

let selected = [];

const getEvents = () => {
  for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click",(function(e) {
      if (inputs[i].checked == false) {
        selected.push(e.target.id);
        inputs[i].checked = true;
      } else {
        let index = selected.indexOf(e.target.id);
        selected.splice(index, 1);
        inputs[i].checked = false;
      }
    }));
  elements[i].addEventListener("keypress",(function(e) {
    if(e.keyCode == 32 || e.keyCode == 13 || e.charCode == 32 || e.charCode == 13) {
      if (inputs[i].checked == false) {
        selected.push(e.target.id);
        inputs[i].checked = true;
      } else {
        let index = selected.indexOf(e.target.id);
        selected.splice(index, 1);
        inputs[i].checked = false;
      }
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
      if(e.keyCode == 32 || e.keyCode == 13 || e.charCode == 32 || e.charCode == 13){
        hideSections();
      }}, false);
    apply.addEventListener('touch', hideSections);
    remove.addEventListener('click', showSections);
    remove.addEventListener('keypress', function (e) {
      if(e.keyCode == 32 || e.keyCode == 32 || e.charCode == 32 || e.charCode == 13){
        showSections();
      }}, false);
    remove.addEventListener('touch', showSections);
}

document.addEventListener('DOMContentLoaded', getEvents);