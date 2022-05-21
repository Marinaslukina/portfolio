//имена
//	pagination
//		footerList - список ul
//		footerItem - элемент списка li
//		footerButtonToBegin - кнопка <<
//		footerButtonPrevious - кнопка <
//		footerButtonNext - кнопка >
//		footerButtonToEnd - кнопка >>
//	list-group
//		titleList - список ul
//		titleItem - элемент списка li (list-group-item)
//		currentPage - текущая страница


(() => {

	//получение данных
	async function getData(numberOFpage) {
		const response = await fetch(`https://gorest.co.in/public-api/posts?page=${numberOFpage}`, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer dea5147011a70557e807a29cd88bf8127ca1d65f5f200745c16d6ce4e56d0c5e',
				'Content-Type': 'application/json'
			},
		})
		const data =  await response.json();
		return data;
	}

	//создание списка заголовкой статей
	function getList(data) {
		const list = document.querySelector('.list-group');
		data.forEach(elem => {
			const li = document.createElement('li');
			li.classList.add('list-group-item');
			const a = document.createElement('a');
			a.setAttribute('href', `post.html?id=${elem.id}`);
			a.setAttribute('id', elem.id);
			a.textContent = elem.title;
			li.appendChild(a);
			list.appendChild(li);
		});

		return list;
	}

	//создание списка для навигации
	function createFooterList() {
		const footer = document.createElement('footer');
		footer.classList.add('footer');
		const nav = document.createElement('nav');
		nav.setAttribute('aria-label', 'page navigation');
		const list = document.createElement('ul');
		list.classList.add('pagination', 'justify-content-center');

		return {
			footer,
			nav,
			list
		}
	}

	//создает элемент навигации
	function createFooterItem(pageNumber) {
		const li = document.createElement('li');
		(Number(getPage()) === pageNumber) ? li.classList.add('page-item', 'active') : li.classList.add('page-item');
		const a = document.createElement('a');
		a.classList.add('page-link');
		a.textContent = pageNumber;
		(pageNumber === 1) ? (a.setAttribute('href', `index.html`)) : (a.setAttribute('href', `index.html?page=${pageNumber}`));
		li.appendChild(a);
		return li;
	}

	function createFooterButton(text, text2) {
		const li = document.createElement('li');
		li.classList.add('page-item', 'button');

		const a = document.createElement('a');
		a.classList.add('page-link');
		a.setAttribute('aria-label', text2);

		const span = document.createElement('span');
		span.setAttribute('aria-hidden', 'true');
		span.textContent = text;

		const span2 = document.createElement('span');
		span2.classList.add('sr-only');
		span2.textContent = text2;

		a.appendChild(span);
		a.appendChild(span2);
		li.appendChild(a);

		return li;
	}

	function createFooter(pageNumber) {
		const footerList = createFooterList();

		let footerItem;

		for(let i = 1; i < 21; i++) {
			footerItem = createFooterItem(pageNumber);
			footerList.list.append(footerItem);
			pageNumber++;
		}

		const buttonBegin = createFooterButton('<<', 'Previous');
		const buttonPrevious = createFooterButton('<', 'Previous');
		const buttonNext = createFooterButton('>', 'Next');
		const buttonEnd = createFooterButton('>>', 'Next');

		buttonBegin.classList.add('begin');
		buttonPrevious.classList.add('previous');
		buttonNext.classList.add('next');
		buttonEnd.classList.add('end');

		footerList.list.prepend(buttonPrevious);
		footerList.list.prepend(buttonBegin);
		footerList.list.append(buttonNext);
		footerList.list.append(buttonEnd);

		return {
			footerList,
			buttonNext,
			buttonPrevious,
			buttonBegin,
			buttonEnd
		}
	}

	function getElementIndex(parent, currentElem) {
		for(let i = 2; i < 22; i++) {
			if(parent.children[i].textContent === currentElem.textContent) {
				return i;
			}
		}
	}

	// Удаление всех дочерних элементов
	function removingChildren(list) {
		while (list.firstChild) {
			list.removeChild(list.firstChild);
		}
	}

	//ищет какой элемент активный, удаляет класс
	function getActiveButton(list, remove) {
		let activeElem;
		let elems = list.children;
		for (let elem of elems) {
			if(elem.classList.contains('active')) {
				activeElem = elem;
				if (remove) {
					elem.classList.remove('active');
				}
			}
		}
		return activeElem
	}

	//клик на кнопки назад и вперед
	async function clickOnBtn(elem, sibling, titleList, data) {
		//currentElem = elem
		//next/previous = sibling
		//titleList = titleList
		//Number(currentElem.textContent) = data
		switch(sibling){
			case 'next':
				elem.classList.remove('active');
				elem.nextElementSibling.classList.add('active');
				break;

			case 'previous':
				elem.classList.remove('active');
				elem.previousElementSibling.classList.add('active');
				break;

			case 'begin':
				elem.classList.add('active');
				break;

			case 'end':
				elem.classList.add('active');
				break;
		}

		setPage(data);
		removingChildren(titleList);
		articles = await getData(data);
		titleList = getList(articles.data);

		return titleList;
	}

	function getPage(){
		const pageParams = new URLSearchParams(window.location.search);
		(pageParams.has('page')) ? currentPage = pageParams.get('page') : currentPage = 1;
		return currentPage;
	}

	function setPage(page) {
		const pageParams = new URLSearchParams(window.location.search);
		pageParams.set('page', page);
		pageParams.toString();
		if(page === 1) { window.location.assign('index.html') } else {window.location.assign('index.html?'+ pageParams.toString());}
	}

	document.addEventListener('DOMContentLoaded', async (e) => {
		e.preventDefault;

		let currentPage = Number(getPage());
		console.log(currentPage);

		let articles = await getData(currentPage);

		const FIRST_PAGE = 1;
		const LAST_PAGE = articles.meta.pagination.pages;
		console.log(LAST_PAGE);

		let titleList = getList(articles.data);

		// let elements = titleList.children;
		// for(let element of elements){
		// 	element.addEventListener('click', () => {
		// 		href = element.getAttribute('href');
		// 		window.location.assign(href);
		// 	})
		// }

		let footer;
		if(currentPage <= 15){
			footer = createFooter(FIRST_PAGE);
		} else if((currentPage === LAST_PAGE) || (LAST_PAGE - currentPage <= 5)) {
			footer = createFooter(LAST_PAGE - 19);
		} else {
			footer = createFooter(currentPage - 14);
		}

		let footerList = footer.footerList;

		footerList.nav.append(footerList.list);
		footerList.footer.append(footerList.nav);
		document.body.append(footerList.footer);

		let items = footerList.list.children;
		let index;
		for(let item of items) {
			item.addEventListener('click', async (e) => {
				e.preventDefault;
				switch (true) {
					case item.classList.contains('button'):

						switch (true) {

							case item.classList.contains('begin'):
								currentElem = getActiveButton(footerList.list, true);
								if (Number(items[2].textContent) === FIRST_PAGE){
									titleListNew = clickOnBtn(items[2], 'begin', titleList, FIRST_PAGE);
								} else {
									elems = footerList.list.children;
									for(let i = 2; i < 22; i++) {
										elems[i].firstChild.textContent = i - 1;
									}
									titleListNew = clickOnBtn(elems[2], 'begin', titleList, FIRST_PAGE);
								}
								break;

							case (item.classList.contains('previous')):
								currentElem = getActiveButton(footerList.list, false);
								index = getElementIndex(footerList.list, currentElem);
								count = true;

								switch (count) {
									case (index > 7) || (((index > 2) && (index <= 7)) && (Number(items[2].textContent) === FIRST_PAGE)):
										titleListNew = clickOnBtn(currentElem, 'previous', titleList, Number(currentElem.textContent) - 1);
										break;

									case ((index > 2) && (index <= 7)) && (Number(items[2].textContent) != FIRST_PAGE):
										titleListNew = clickOnBtn(currentElem, 'previous', titleList, Number(currentElem.textContent) - 1);
										items[21].remove();
										items[1].after(createFooterItem(Number(items[2].textContent) - 1, false));
										break;

									case (Number(currentElem.textContent) === FIRST_PAGE):
										item.classList.toggle('disable');
										break;
								}
								break;

							case item.classList.contains('end'):
								currentElem = getActiveButton(footerList.list, true);
								if (Number(items[21].textContent) === LAST_PAGE){
									titleListNew = clickOnBtn(items[21], 'end', titleList, LAST_PAGE);
								} else {
									elems = footerList.list.children;
									for(let i = 2; i < 22; i++) {
										elems[i].firstChild.textContent = LAST_PAGE - 21 + i;
									}
									titleListNew = clickOnBtn(elems[21], 'end', titleList, LAST_PAGE);
								}
								break;

							case item.classList.contains('next'):
								currentElem = getActiveButton(footerList.list, false);
								index = getElementIndex(footerList.list, currentElem);
								count = true;
								switch (count) {

									case (index < 16) || (((index >= 16) && (index <= 22)) && (Number(items[21].textContent) === LAST_PAGE)):
										titleListNew = clickOnBtn(currentElem, 'next', titleList, Number(currentElem.textContent) + 1);
										break;

									case ((index >= 16) && (index <= 22)) && (Number(items[21].textContent) != LAST_PAGE):
										titleListNew = clickOnBtn(currentElem, 'next', titleList, Number(currentElem.textContent) + 1);
										items[2].remove();
										items[20].after(createFooterItem(Number(items[20].textContent) + 1, false));
										break;

									case (Number(currentElem.textContent) === LAST_PAGE):
										item.classList.toggle('disable');
										break;
								}
								break;
					}

					break;

					default:
						currentElem = getActiveButton(footerList.list, true);
						index = getElementIndex(footerList.list, item);
						count = true;
						switch(count) {

							case (((index > 2) && (index <= 7)) && (Number(items[2].textContent) === FIRST_PAGE)) ||
							(((index >= 16) && (index <= 22)) && (Number(items[21].textContent) === LAST_PAGE)) ||
							((index > 7) && (index < 16)):
								item.classList.add('active');
								removingChildren(titleList);
								articles = await getData(item.textContent);
								titleListNew = getList(articles.data);
								break;

							case ((index > 2) && (index <= 7)) && (Number(items[2].textContent) != FIRST_PAGE):
								elems = footerList.list.children;
								for(let i = 2; i < 22; i++) {
									elems[i].firstChild.textContent = Number(item.textContent) - index + i;
								}
								item.classList.add('active');
								removingChildren(titleList);
								articles = await getData(item.textContent);
								titleListNew = getList(articles.data);
								break;

							case ((index >= 16) && (index <= 22)) && (Number(items[21].textContent) != LAST_PAGE):
								elems = footerList.list.children;
								for(let i = 2; i < 22; i++) {
									elems[i].firstChild.textContent = Number(item.textContent) + index + i;
								}
								item.classList.add('active');
								removingChildren(titleList);
								articles = await getData(item.textContent);
								titleListNew = getList(articles.data);
								break;

						}
						break;

						break;
				}
			})
		}
	})

})();
