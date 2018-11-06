// Filter
// Bind event listeners to inputs

const inputs = document.querySelectorAll('input[type="checkbox"]'),
      apply = document.querySelector("#apply-filter"),
      remove = document.querySelector("#remove-filter"),
      targets = [].slice.call(document.getElementsByClassName("row")),
      elements = [].slice.call(document.getElementsByClassName('form_field'));

let selected = [];

const isChecked = (i, e) => {
  if (inputs[i].checked == false) {
    selected.push({tag: e.target, index: i});
    console.log(selected);
    inputs[i].checked = true;
  } else {
    let index = selected.indexOf(e.target);
    selected.splice(index, 1);
    // inputs[i].checked = false;
  }
}

const getEvents = () => {
  for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", function (e) {isChecked(i, e)});
  elements[i].addEventListener("touch", function (e) {isChecked(i, e)});
  inputs[i].addEventListener("click", function (e)  {isChecked(i, e)});
  elements[i].addEventListener("touch", function (e) {isChecked(i, e)});
  inputs[i].addEventListener("keypress", function (e) {
    if(e.keyCode == 32 || e.keyCode == 13 || e.charCode == 32 || e.charCode == 13) {
      isChecked(i, e);
    }
  });
  }
  addBtnEvents();
}

const hideSections = () => {
  for (let select in selected) {
    let index = selected[select].index;
    targets[index].setAttribute('data-visible', 'false');
    targets[index].setAttribute("style", "margin: 0!important");
  }
}

const showSections = () => {
  for (let select in selected) {
    let index = selected[select].index;
    targets[index].setAttribute('data-visible', 'true');
    inputs[index].checked = false;
    targets[index].setAttribute("style", "");
  }
  selected = [];
}

const addBtnEvents = () => {

    apply.addEventListener('click', function () {hideSections()});
    apply.addEventListener('keypress', function (e) {
      if(e.keyCode == 32 || e.keyCode == 13 || e.charCode == 32 || e.charCode == 13){
        hideSections();
      }}, false);
    apply.addEventListener('touch', function () {hideSections()});
    remove.addEventListener('click', function () {showSections()});
    remove.addEventListener('keypress', function (e) {
      if(e.keyCode == 32 || e.keyCode == 13 || e.charCode == 32 || e.charCode == 13){
        showSections();
      }}, false);
    remove.addEventListener('touch', function () {showSections()});
}

document.addEventListener('DOMContentLoaded', getEvents);