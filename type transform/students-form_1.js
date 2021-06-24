(() => {

	function getData() {
		const fields = document.querySelectorAll('input');
		const student = {};

		fields.forEach(field => {
			const {name, value, type} = field;
			student[name] = whatIsAtype(type, value);
		})

		student.currentAge = getCurrentAge(student.date);

		const currentCourse = getCurrentCourse(student.year);
		Object.assign(student, currentCourse);

		return student;
	}

	function whatIsAtype(type, value) {
		if (type === 'text') {
			return ucFirst(value.trim().toLowerCase());
		} else if (type === 'number') {
			return Number(value);
		} else if (type === 'date') {
			return value.split('-');
		}
	}

	function ucFirst(str) {
		if (!str) return str;
		return str[0].toUpperCase() + str.slice(1);
	}

	function getCurrentAge(birthDate) {
		const now = new Date();
		const birth = new Date(birthDate[0], birthDate[1] - 1, birthDate[2]);
		const diff = now - birth;
		return currentAge = Math.floor(diff/31557600000); //1000*60*60*24*365.25 milliseconds
	}

	function getCurrentCourse(currentDate) {
		const now = new Date();
		const today = now.getFullYear();
		let thisYear = 0, course;
		let done = false;
		if (today < currentDate) {
			thisYear = 1;
		} else if (today === currentDate) {
			course = 1;
		}
		course = today - currentDate - thisYear;
		if (course >= 4) {
			done = true;
		}
		const endDate = currentDate + 4;
		return {
			course,
			endDate,
			done
		};
	}

	function sorting(table) {
		
		const th = document.querySelectorAll('th');

		th[0].addEventListener('click', () => {
			th[0].style.cursor = "pointer";
			sortTable(table, 0);
		});

		th[1].addEventListener('click', () => {
			th[1].style.cursor = "pointer";
			sortTable(table, 1);
		});

		th[2].addEventListener('click', () => {
			th[2].style.cursor = "pointer";
			sortTableNumber(table, 2);
		});

		th[3].addEventListener('click', () => {
			th[3].style.cursor = "pointer";
			sortTableNumber(table, 3);
		});

	}

	function addItem(student) {

		const tbody = document.createElement('tbody');
		const tr = document.createElement('tr');
		const td1 = document.createElement('td');
		const td2 = document.createElement('td');
		const td3 = document.createElement('td');
		const td4 = document.createElement('td');

		td1.innerHTML = student.surname + ' ' + student.name + ' ' + student.middlename;
		td2.innerHTML = student.faculty;
		td3.innerHTML = student.date[2] + '.' + student.date[1] + '.' + student.date[0] + ' (' + student.currentAge + ' лет' + ')';
		(student.done === true) ? td4.innerHTML = student.year + '-' + student.endDate + ' (закончил)' : td4.innerHTML = student.year + '-' + student.endDate + ' (' + student.course + ' курс)';
	
		tr.append(td1);
		tr.append(td2);
		tr.append(td3);
		tr.append(td4);
		tbody.append(tr);

		return tbody;
	
	}

	function sortTable(table, n) {
		let rows, switching, i, x, y, shouldSwitch, switchcount = 0;
		switching = true;
		while (switching) {
			switching = false;
			rows = table.rows;
			for (i = 1; i < (rows.length - 1); i++) {
				shouldSwitch = false;
				x = rows[i].getElementsByTagName("td")[n].innerHTML.toLowerCase();
	  			y = rows[i + 1].getElementsByTagName("td")[n].innerHTML.toLowerCase();
				if (x > y) {
					shouldSwitch = true;
					break;
				}  
			}
			if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
				switchcount ++;
			}
		}
	}

	function sortTableNumber(table, n) {
		let rows, switching, i, x, y, shouldSwitch, switchcount = 0;
		switching = true;
		while (switching) {
			switching = false;
			rows = table.rows;
			for (i = 1; i < (rows.length - 1); i++) {
				shouldSwitch = false;
				x = Number(rows[i].getElementsByTagName("td")[n].innerHTML.substr(6,4));
	  			y = Number(rows[i + 1].getElementsByTagName("td")[n].innerHTML.substr(6,4));
				if (x > y) {
					shouldSwitch = true;
					break;
				} 
			}
			if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
				switchcount ++;
			} 
		}
	}
	
	function tableSearch(input, table, cell, end) {
		const val = new RegExp(input.value,'i');
		
		if(val != '') {
			for (let i = 1; i < table.rows.length; i++) {
				(table.rows[i].cells[cell].innerText.search(val) == -1) ? table.rows[i].style.display = "none" : table.rows[i].style.display = "";
				
				if(cell === 3) {

					const first = table.rows[i].cells[3].innerText.substr(0,4);
					const second = table.rows[i].cells[3].innerText.substr(0,4);

					if(end === false){ //год начала обучения
						(first.search(val) == -1) ? table.rows[i].style.display = "none" : table.rows[i].style.display = "";
					} else if(end === true) { //год окончания обучения
						(second.search(val) == -1) ? table.rows[i].style.display = "none" :	table.rows[i].style.display = "";
					}
				}
			}
		} else {
			for (let i = 1; i < table.rows.length; i++) {
				table.rows[i].style.display = "";
			}
		}
	}

	function keyUp(input) {
		const now = new Date();
		
		if (input.type === "text") {
			if (ucFirst(input.value.trim().toLowerCase()).match(/^[А-Яа-я]+$/)) {
				input.classList.add('is-valid');
				input.classList.remove('is-invalid');
			} 
			
			if (ucFirst(input.value.trim().toLowerCase()).match(/^[A-Za-z]+$/)) {
				input.classList.add('is-invalid');
				input.classList.remove('is-valid');
				input.nextElementSibling.textContent = "Необходимо использовать буквы русского алфавита";
			}
		}

		if (input.type === "number") {
			
			if (Number(input.value) < 2000) {
				input.classList.add('is-invalid');
				input.classList.remove('is-valid');
				input.nextElementSibling.textContent = "Пожалуйста, введите дату начиная с 2000 года";
			} else if (Number(input.value) > now.getFullYear()) {
				input.classList.add('is-invalid');
				input.classList.remove('is-valid');
				input.nextElementSibling.textContent = "Пожалуйста, введите корректную дату";
			} else {
				input.classList.add('is-valid');
				input.classList.remove('is-invalid');
			}
		} 

		if (input.type === "date") {

			const date = input.value.split('-');
			const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
			const fullDate = new Date(date[0], date[1]-1, date[2]);
			const year = date[0];

			if (year < 1900) {
				input.classList.add('is-invalid');
				input.classList.remove('is-valid');
				input.nextElementSibling.textContent = "Пожалуйста, выберете дату начиная с 01.01.1900 года";
			} else if ((fullDate > today) || isNaN(fullDate))	 {
				input.classList.add('is-invalid');
				input.classList.remove('is-valid');
				input.nextElementSibling.textContent = "Пожалуйста, введите корректную дату";
			} else {
				input.classList.add('is-valid');
				input.classList.remove('is-invalid');
			}
		}

		return input;
	}

	document.addEventListener('DOMContentLoaded', () => {

		const form = document.querySelector('form');
		const inputs = document.querySelectorAll('.validation');
		const table = document.querySelector('table');
		const search = document.querySelectorAll('.search');
		
		inputs.forEach(input => {
			input.addEventListener('input', () => keyUp(input))
		});

		sorting(table);

		search[0].addEventListener('input', () => {
			tableSearch(search[0], table, 0);	
		});
		search[1].addEventListener('input', () => {
			tableSearch(search[1], table, 1);	
		});
		search[2].addEventListener('input', () => {
			tableSearch(search[2], table, 3, false);	
		});
		search[3].addEventListener('input', () => {
			tableSearch(search[3], table, 3, true);	
		});
	
		
		form.addEventListener('submit', (even) => {

			even.preventDefault();

			let isValidate = 0;		
			inputs.forEach(input => {

				if (input.value == '') {
					input.nextElementSibling.textContent = "Это поле обязательно для заполнения";
					input.classList.add('is-invalid');
				}

				if(input.classList.contains('is-valid')) {
					isValidate++;
				}
			})

			if (isValidate === inputs.length) {

				const student = getData(); 

				document.querySelector('table').append(addItem(student));

				inputs.forEach(input => {
					input.value = '';
					input.classList.remove('is-valid');
				});
			}	

		});
	});

}) ();