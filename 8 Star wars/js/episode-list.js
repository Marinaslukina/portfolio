import {
  renderPage
} from './main.js';

function createHeader() {
  const header = document.createElement('header');
  header.classList.add('header');
  const headerTitle = document.createElement('h1');
  headerTitle.classList.add('header__title');
  const headerLink = document.createElement('a');
  headerLink.classList.add('header__link');
  headerLink.setAttribute('href', '/index.html');
  headerLink.textContent = 'STAR WARS';
  headerTitle.append(headerLink);
  header.append(headerTitle);
  return header
}

function createMain() {
  const main = document.createElement('main');
  main.classList.add('main');
  const nav = document.createElement('nav');
  nav.classList.add('nav');
  const list = document.createElement('ul');
  list.classList.add('catalog');
  nav.append(list);
  main.append(nav);
  return main
}

export function createGridWrapper() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('grid-wrapper');
  wrapper.append(createHeader());
  wrapper.append(createMain());
  return wrapper
}

function createCatalogItem(episodeId, episodeTitle, episodeDescription) {
	const catalogItem = document.createElement('li');
	catalogItem.classList.add('catalog__item');
	const catalogItemTitle = document.createElement('h2');
	catalogItemTitle.classList.add('catalog__title');
	const catalogItemLink = document.createElement('a');
	catalogItemLink.classList.add('catalog__link');
	catalogItemLink.textContent = episodeTitle;
	catalogItemLink.setAttribute('href', `./index.html?id=${episodeId}`);
  catalogItemLink.addEventListener('click', (e) => {
    e.preventDefault();
    history.pushState({'page_id': episodeId}, '', `?id=${episodeId}`);
    renderPage();
  })
	catalogItemLink.setAttribute('id', episodeId);
	const catalogItemDescription = document.createElement('p');
	catalogItemDescription.classList.add('catalog__description');
	catalogItemDescription.textContent = episodeDescription;
	const catalogImg = document.createElement('div');
	catalogImg.classList.add('catalog__img');
	catalogImg.style.background = `url('/img/episode/epi_${episodeId}.jpeg') center/cover no-repeat`;

	catalogItemTitle.append(catalogItemLink);
	catalogItem.append(catalogItemTitle);
	catalogItem.append(catalogItemDescription);
	catalogItem.append(catalogImg);

	return(catalogItem);
}

export function createCatalog({ episodeId, episodeTitle, episodeDescription }) {
  const details = document.querySelector('.details');
  if (details) {
    document.querySelector('.grid-wrapper').remove();
    document.body.append(createGridWrapper());
  }
	// IV, V, VI эпизоды имеют номер 1, 2, 3; I, II, III - 4, 5, 6.
	// (episodeId < 4) ? edisodeImg = episodeId + 3 :	edisodeImg = episodeId - 3;
	const catalogList = document.querySelector('.catalog');
	const catalogItem = createCatalogItem(episodeId, episodeTitle, episodeDescription);
	catalogList.append(catalogItem);
	return catalogItem;
}
