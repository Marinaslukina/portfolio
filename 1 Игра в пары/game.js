(() => {

	function createAppTitle() {
		const appTitle = document.createElement("h2");
		appTitle.textContent = "Игра в пары";
		return appTitle;
	}

	function createAppForm() {
		const wrapper = document.createElement("div");
		const form = document.createElement("form");
		const input = document.createElement("input");
		const buttonWrapper = document.createElement("div");
		const button = document.createElement("button");

		buttonWrapper.classList.add("button_wrapper");
		button.classList.add("button_start_game");
		input.placeholder = "Кол-во карточек по вертикали/горизонтали";
		button.setAttribute("disabled", "disabled");
		button.textContent = "Начать игру";
		input.oninput = function () {
			button.removeAttribute("disabled");
		};

		button.addEventListener("click", () => {
			wrapper.remove();
			document.body.append(timerGameOver(numberOfElements(input.value)));
			createGame(numberOfElements(input.value));
			button.setAttribute("disabled", "disabled");
		});

		wrapper.append(form);
		wrapper.append(buttonWrapper);

		buttonWrapper.append(button);
		form.append(input);
		form.append(buttonWrapper);

		return {
			wrapper,
			form,
			input,
		};
	}

	function numberOfElements(value) {
		let number;
		if ((value >= 2) && (value <= 10) && (value % 2 == 0)) {
			number = value;
		} else {
			number = 4;
		}
		return number;
	}

	function createGame(number) {
		let button;
		const wrapper = document.createElement("div");
		wrapper.classList.add("wrapper");
		const numberArray = createArray(number);

		document.body.append(wrapper);

		numberArray.forEach(n => {
			button = createCard(n); 
			button.style.setProperty("--n", number);
			wrapper.append(button);
		})
		
		return {  
			wrapper,
			button,
		}
	}

	function createArray(number) {
		const arr = [];
		const len = number*number;
		for (let i = 0; i < len; i++) {
			(i > (len/2) - 1) ? arr[i] = len - i : arr[i] = i + 1; 
		}
		//перемешиваем
		let j, temp;
		for (let i = arr.length - 1; i > 0; i--) {
			j = Math.round(Math.random()*(i + 1));
			temp = arr[j];
			arr[j] = arr[i];
			arr[i] = temp;
		}
		return arr;
	}
	
	function createCard(content) {
		const button = document.createElement("button");
		button.classList.add("card");
		button.textContent = content;
		button.addEventListener("click", () => {
			button.classList.toggle("active");
			findCard(button);
		});
		return button;
	}

	let count = 0;
	let n = 0;
	function findCard(button) {
		let contains = button.classList.contains("active");
		let cardTimer, buttonsActive;
		if (contains) {
			count++;
			buttonsActive = document.querySelectorAll('.active');
			if (count === 2) {
				clearTimeout(cardTimer);
				if (buttonsActive[0].textContent === buttonsActive[1].textContent) {
					for (let item of buttonsActive) {
						disabledButton(item);
						item.classList.add('nonactive');
						item.classList.remove('active');
					}
				} else {
					for (let item of buttonsActive) {
						timer(item);
					}
				}
				count = 0;
			}
		}
	}

	function timer(button) {
		cardTimer = setTimeout(() => {
			button.classList.remove('active');
		}, 1000);
		return cardTimer;
	}
	
	function disabledButton(button) {
		button.setAttribute("disabled", "disabled");
	}

	function timerGameOver(count) {
		const timerText = document.createElement('h3');
		let startTimer;
		clearInterval (startTimer);
		let currentCount = 60;
		startTimer = setInterval(() => { 
			if ((currentCount == 0) || (document.querySelectorAll('.nonactive').length === (count * count))) { 
				let buttonsActive = document.querySelectorAll('.active');
				buttonsActive.forEach(button => {
					button.classList.remove('active');
				})
				let buttons = document.querySelectorAll('.card');
				buttons.forEach(button => {
					disabledButton(button);
				})
				document.body.append(gameOver());
				clearInterval (startTimer); 
			} else {
				currentCount--;
				timerText.textContent = currentCount + " сек";
			}           
	}, 1000) // в мс 
	return timerText;
	}

	function gameOver() {
		const button = document.createElement("button");
		button.classList.add("newGame");
		button.textContent = "Сыграть еще раз";
		button.addEventListener("click", () => {
			window.location.reload();
		});
		return button;
	}

	document.addEventListener('DOMContentLoaded', () => {
		const itemForm = createAppForm();
		document.body.append(createAppTitle());
		document.body.append(itemForm.wrapper);
		
		itemForm.form.addEventListener('submit', e => {
			e.preventDefault();
			if (!itemForm.input.value) {
				return;
			}
		})
	});
})();