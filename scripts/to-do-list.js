const toDoListArray = [];

function addToList() {

  let inputToDoElementValue = document.querySelector('.js-input-todo').value;

  let inputDateElementValue = document.querySelector('.js-date-todo').value;

  const newTodo = {};

  newTodo.name = inputToDoElementValue;
  newTodo.date = inputDateElementValue;


  toDoListArray.push(newTodo);

  document.querySelector('.js-input-todo').value = '';
  document.querySelector('.js-date-todo').value = '';

  return toDoListArray;
}
const addTodoButtonElement = document.querySelector('.js-add-todo-button');
addTodoButtonElement.addEventListener('click', () => {
  const toDoListArray = addToList();
  showList(toDoListArray);
});

function showList(toDoListArray) {
  let htmlCode = '';
  
  toDoListArray.forEach((value, index) => {
    htmlCode += `
      <p>${value.name}</p>
      <p>${value.date}</p>
      <button class="delete-button js-delete-button">Delete</button>`;
  });

  const listElement = document.querySelector('.js-list');
  listElement.innerHTML = htmlCode;

  const deleteButtonElementsList = document.querySelectorAll('.js-delete-button');
  deleteButtonElementsList.forEach((button, index) => {
    button.addEventListener('click', () => {
      toDoListArray.splice(index, 1);
      showList(toDoListArray);
    });
  });
}
