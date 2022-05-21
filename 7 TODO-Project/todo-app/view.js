function createAppTitle(title) {
  const appTitle = document.createElement('h2');
  appTitle.innerHTML = title;
  return appTitle;
}

//создаем и возвращаем форму для создания дела
function createTodoItemForm() {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const buttonWrapper = document.createElement('div');
  const button = document.createElement('button');

  form.classList.add('input-group', 'mb-3'); // добавляем классы: 'input-group' - содержит группу элементов формы; 'mb-3' - оставляет отступ после формы, чтобы она не слиплялась потом со списком элементов
  input.classList.add('form-control'); // добавляем класс: для правильного отображения формы
  input.placeholder = 'Введите название нового дела'; // добавляем пояснение, будет отображаться всегда, когда в поле ничего не введено
  buttonWrapper.classList.add('input-group-append'); // для позиционирования элемента в форме
  button.classList.add('btn', 'btn-primary'); // 'btn' - применить к кнопке все стили, которые нужны для КАЖДОЙ кнопки; 'btn-primary' - нарисует кнопку красивым синим цветом
  button.textContent = 'Добавить дело';

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return {
    form,
    input,
    button
  };
}

//создаем и возвращаем список элементов
function createTodoList() {
  const list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
}

//создаем дело
function createTodoItemElement(todoItem, { onDone, onDelete }) {
  const doneClass = 'list-group-item-success';

  const item = document.createElement('li');
  const buttonGroup = document.createElement('div');
  const doneButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  if(todoItem.done) {
    item.classList.add(doneClass);
  }
  item.textContent = todoItem.name;

  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Удалить';

  doneButton.addEventListener('click', () => {
    onDone({ todoItem, element: item });
    item.classList.toggle(doneClass, todoItem.done);
  });
  deleteButton.addEventListener('click', () => {
    onDelete({ todoItem, element: item });
  });

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);
  return item;
}

async function createTodoApp(container, {
  title,
  owner,
  todoItemList = [],
  onCreateFormSubmit,
  onDoneClick,
  onDeleteClick,
}) {

  const todoAppTitle = createAppTitle(title); //создаем название дела
  const todoItemForm = createTodoItemForm(); //создаем дело
  const todoList = createTodoList(); // создаем список
  const handlers = { onDone: onDoneClick, onDelete: onDeleteClick };
  
  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

	todoItemList.forEach(todoItem => {
    const todoItemElement = createTodoItemElement(todoItem, handlers);
    todoList.append(todoItemElement);
  });

  todoItemForm.form.addEventListener('submit', async e => {
    e.preventDefault();

    if (!todoItemForm.input.value) {
      return;
    }
    const todoItem = await onCreateFormSubmit({
			owner,
      name: todoItemForm.input.value.trim(),
    });

    const todoItemElement = createTodoItemElement(todoItem, handlers);

    todoList.append(todoItemElement);

    todoItemForm.input.value = '';

  });
}

export { createTodoApp };
