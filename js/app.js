/* eslint-disable no-restricted-globals */
const addBtn = document.querySelector('.add');
const popUp = document.querySelector('.popup');
const popUpAddBtn = document.querySelector('.popup-form-btn');
const popUpCloseBtn = document.querySelector('.popup-close');
const popUpTextArea = document.querySelector('textarea');
const tasksList = document.querySelector('.tasks-list');
const tasksLists = Array.from(document.querySelectorAll('.task-list'));
const panel = document.querySelector('.tasks');
let draggedEl = null;
let ghostEl = null;
let infoEl;

function panelDragEnd() {
  if (!draggedEl) {
    return;
  }
  draggedEl.classList.remove('dragged');

  panel.removeEventListener('mouseup', panelDragEnd);
  panel.removeEventListener('mousemove', panelDrag);
}

function checkTopItem() {
  const items = Array.from(document.querySelectorAll('task-list-element'));
  items.forEach((item) => {
    if (item.style.top) {
      item.style.top = 0 + 'px';
    }
  });
}

function panelDrag(e) {
  if (!draggedEl) {
    return;
  }
  draggedEl.style.left = `${e.clientX - infoEl.offsetX}px`;
  draggedEl.style.top = `${e.clientY - infoEl.offsetY}px`;
}

function itemDragEnd(e) {
  if (!draggedEl) {
    return;
  }
  console.log(e);
  if (event.target.classList.contains('task-list')) {
    event.target.appendChild(draggedEl);
    draggedEl.style = '';
    draggedEl.classList.remove('dragged');
    document.querySelector('body').style.cursor = 'auto';
    return;
  }
  if (event.target.classList.contains('task-list-element')) {
    event.target.parentNode.insertBefore(draggedEl, event.target);
    draggedEl.style = '';
    draggedEl.classList.remove('dragged');
    document.querySelector('body').style.cursor = 'auto';
    return;
  }
  document.querySelector('body').style.cursor = 'auto';
  return;
}

tasksLists.forEach((item) => {
  item.addEventListener('click', (event) => {
    if (event.target.classList.contains('task-delete')) {
      event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    }
  });
  item.addEventListener('mouseover', (event) => {
    if (!event.target.classList.contains('task-list-element')) {
      return;
    }
    event.target.children[0].classList.remove('hide-task-delete');
  });
  item.addEventListener('mouseout', (event) => {
    if (!event.target.classList.contains('task-list-element')) {
      return;
    }
    event.target.children[0].classList.add('hide-task-delete');
  });
  item.addEventListener('mousedown', (event) => {
    event.preventDefault();
    if (!event.target.classList.contains('task-list-element')) {
      return;
    }
    const draggedWidth = event.target.offsetWidth;
    draggedEl = event.target;
    infoEl = event;

    draggedEl.classList.add('dragged');
    draggedEl.style.width = `${draggedWidth}px`;
    document.querySelector('body').style.cursor = 'grabbing';

    panel.addEventListener('mouseup', panelDragEnd);
    panel.addEventListener('mousemove', panelDrag);
    panelDrag(event);
    panel.addEventListener('mouseup', itemDragEnd);
  });
});

addBtn.addEventListener('click', () => {
  popUp.classList.remove('hide');
});

popUpAddBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (popUpTextArea.value === '') {
    document.querySelector('.popup-form-error').innerText = 'Введите пожалуйста задачу!';
    return;
  }
  const taskElement = document.createElement('li');
  const deleteTaskElement = document.createElement('div');
  deleteTaskElement.innerHTML = '&#10006';
  deleteTaskElement.classList.add('task-delete');
  deleteTaskElement.classList.add('hide-task-delete');
  taskElement.classList.add('task-list-element');
  taskElement.innerText = `${popUpTextArea.value}`;
  tasksList.appendChild(taskElement);
  taskElement.appendChild(deleteTaskElement);
  popUpTextArea.value = '';
  popUp.classList.add('hide');
});

popUpCloseBtn.addEventListener('click', () => {
  popUp.classList.add('hide');
});
