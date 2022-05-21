(function () {
  function createAppTitle(title) {
    let appTitle = document.createElement("h2");
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoItemForm() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let buttonWrapper = document.createElement("div");
    let button = document.createElement("button");

    form.classList.add("input-group", "mb-3"); 
    input.classList.add("form-control"); 
    input.placeholder = "Введите название нового дела"; 
    buttonWrapper.classList.add("input-groupappend"); 
    button.classList.add("btn", "btn-primary"); 
    button.textContent = "Добавить дело";
    button.setAttribute("disabled", "disabled");

    input.oninput = function () {
      button.removeAttribute("disabled");
    };

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button
    };
  }

  function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  }

  function createTodoItem(name, key) {
    let item = document.createElement("li");
    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    item.textContent = name;

    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn", "btn-success");
    doneButton.textContent = "Готово";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Удалить";

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    doneButton.addEventListener("click", function () {
      item.classList.toggle("list-group-item-success");
      addToTodos(item);
      addToLocalStorage(todos, key);
    });
    deleteButton.addEventListener("click", function () {
      if (confirm("Вы уверены?")) {
        item.remove();
      }
      deleteFromTodos(item, key);
    });

    return {
      item
    };
  }

  let todos = [];
  let todo = {};

  function addToTodos(item) {
    let checked = item.classList.contains("list-group-item-success"); 
    let itemInTodos = false; 
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].name === item.firstChild.textContent) {
        if (todos[i].done !== checked) {
          todos[i].done = !todos[i].done;
        }
        itemInTodos = true; 
        break; 
      }
    }

    if (!itemInTodos) {
      todo = {
        name: item.firstChild.textContent,
        done: checked,
      };
      todos.push(todo);
    }
    return todos;
  }

  function deleteFromTodos(item, key) {
    let checked = item.classList.contains("list-group-item-success");
    for (let i = 0; i < todos.length; i++) {
      if ((todos[i].name === item.firstChild.textContent) && (todos[i].done === checked)) {
        todos.splice(i, 1); 
      }
    }
    localStorage.setItem(key, JSON.stringify(todos));
    return todos;
  }

  function addToLocalStorage(todo, key) {
    localStorage.setItem(key, JSON.stringify(todo));
  }

  function createTodoApp(container, title = "Список дел", key) {
    let data = []; 
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm(); 
    let todoList = createTodoList(); 

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);
    
    if (localStorage.getItem(key) === null) {
      addToLocalStorage(todos, key);
    } else {
      data = JSON.parse(localStorage.getItem(key));
    }

    for (let i = 0; i < data.length; i++) {
      let todoItem = createTodoItem(data[i].name, key);
      if (data[i].done) {
        todoItem.item.classList.add("list-group-item-success");
      }
      addToTodos(todoItem.item);
      todoList.append(todoItem.item);
    }

    todoItemForm.form.addEventListener("submit", function (e) {
      e.preventDefault(); 

      if (!todoItemForm.input.value) {
        return;
      }

      let todoItem = createTodoItem(todoItemForm.input.value, key);
      addToTodos(todoItem.item);
      addToLocalStorage(todos, key);
      todoList.append(todoItem.item);
      todoItemForm.input.value = "";
    });
  }

  window.createTodoApp = createTodoApp;
})();
