export function getLocalTodoList(key) {
	// key = myTodos/dadTodos/momTodos
	let list = [];
	if (localStorage.getItem(key) != null) {
		list = JSON.parse(localStorage.getItem(key));
	}
	return list;
}

function changeLocalTodoItem(newItem) {
	let oldItems = getLocalTodoList('myTodos') || [];
	// let oldItems = todoList.filter((item) => item.owner === owner);
	// let newItem = todo;
	let isReplaced = false;
	let newItemOwner = Object.values(newItem)[0];
	let newItemName = Object.values(newItem)[1];
	let newItemDone = Object.values(newItem)[2];
	for(let i = 0; i < oldItems.length; i++) {
		let oldItemOwner = Object.values(oldItems[i])[0];
		let oldItemName = Object.values(oldItems[i])[1];
		let oldItemDone = Object.values(oldItems[i])[2];
		if(oldItemOwner === newItemOwner) {
			if(oldItemName === newItemName) {
				if(oldItemDone != newItemDone) {
					oldItems[i] = newItem;
					isReplaced = true;
					break;
				}
			}
		}
	}
	if(!isReplaced) {
		oldItems.push(newItem);
	}
	return oldItems;
}

export function createLocalTodoItem({ owner, name }) {
	let todo = {
		owner,
		name,
		done: false
	};
	localStorage.setItem('myTodos', JSON.stringify(changeLocalTodoItem(todo)));
	return todo;
}

export function addToLocalStorage(todo, key) {
	//записать в локальное хранилище по ключу "todos"
	//если вам необходимо хранить в этих хранилищах массивы и объекты, то сначала вы должны их превратить в строки, например, используя метод JSON.stringify
	//Сохраним объект в LocalStorage преобразовав его в строку JSON
	// localStorage.setItem(`${length + 1} todos`, JSON.stringify(todo));
	localStorage.setItem(key, JSON.stringify(todo));
}

export function switchLocalTodoItem({ todoItem }) {
	console.log(todoItem);
	todoItem.done = !todoItem.done;
	localStorage.setItem('myTodos', JSON.stringify(changeLocalTodoItem(todoItem )));
}

export function deleteLocalTodoItem({ element, todoItem }) {
	if (!confirm('Вы уверены?')) {
		return;
	}
	element.remove();

	let oldItems = getLocalTodoList('myTodos') || [];
	let beforDeleteItem, afterDeleteItem, finalItem = [];
	let newItem = todoItem;
	let newItemOwner = Object.values(newItem)[0];
	let newItemName = Object.values(newItem)[1];
	for(let i = 0; i < oldItems.length; i++) {
		let oldItemOwner = Object.values(oldItems[i])[0];
		let oldItemName = Object.values(oldItems[i])[1];
		if(oldItemOwner === newItemOwner) {
			if(oldItemName === newItemName) {
					beforDeleteItem = oldItems.slice(0,i);
					afterDeleteItem = oldItems.slice(i+1);
					finalItem = beforDeleteItem.concat(afterDeleteItem);
					break;
			}
		}
	}
	localStorage.setItem('myTodos', JSON.stringify(finalItem));
}
