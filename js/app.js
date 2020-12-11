const addBtn = document.querySelector('.add');
const popUp = document.querySelector('.popup');
const popUpAddBtn = document.querySelector('.popup-form-btn');
const popUpCloseBtn = document.querySelector('.popup-close');
const popUpTextArea = document.querySelector('textarea');
const tasksList = document.querySelector('.tasks-list');
const taskElement;

addBtn.addEventListener('click', () => {
  popUp.classList.remove('hide');
})



popUpAddBtn.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(popUpTextArea.value);
  taskElement = document.createElement('li')
  const deleteTaskElement = document.createElement('div');
  deleteTaskElement.innerHTML = '&#10006';
  deleteTaskElement.classList.add('task-delete');
  taskElement.classList.add('task-list-element');
  taskElement.innerText = `${popUpTextArea.value}`;
  tasksList.appendChild(taskElement);
  taskElement.appendChild(deleteTaskElement);
  popUp.classList.add('hide');
})


popUpCloseBtn.addEventListener('click', () => {
  popUp.classList.add('hide');
})