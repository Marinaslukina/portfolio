export function createLoader() {
	const spinnerBox = document.createElement('div');
	spinnerBox.classList.add('spinner-box');
	const circleBorder = document.createElement('div');
	circleBorder.classList.add('circle-border');
	const circleCore = document.createElement('div');
	circleCore.classList.add('circle-core');

	circleBorder.append(circleCore);
	spinnerBox.append(circleBorder);
	return spinnerBox;
}

function createCatalogItem(episodeId, episodeTitle, episodeDescription) {
	const catalogItem = document.createElement('li');
	catalogItem.classList.add('catalog__item');
	const catalogItemTitle = document.createElement('h2');
	catalogItemTitle.classList.add('catalog__title');
	const catalogItemLink = document.createElement('a');
	catalogItemLink.classList.add('catalog__link');
	catalogItemLink.textContent = episodeTitle;
	// catalogItemLink.setAttribute('href', `./files/details.html?id=${episodeId}`);
  // catalogItem.addEventListener('click', () => {

  // })
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

function createCatalog({ episodeId, episodeTitle, episodeDescription }) {
	let edisodeImg = 0;
	// IV, V, VI эпизоды имеют номер 1, 2, 3; I, II, III - 4, 5, 6.
	// (episodeId < 4) ? edisodeImg = episodeId + 3 :	edisodeImg = episodeId - 3;
	const catalogList = document.querySelector('.catalog');
	const catalogItem = createCatalogItem(episodeId, episodeTitle, episodeDescription);
	catalogList.append(catalogItem);
	return catalogItem;
}

export { createCatalog };

function convertArabicToRoman(numeral) {
	switch (numeral) {
		case 1:
			numeral = '&#8544;';
			break;
		case 2:
			numeral = '&#8545;';
			break;
		case 3:
			numeral = '&#8546;';
			break;
		case 4:
			numeral = '&#8547;';
			break;
		case 5:
			numeral = '&#8548;';
			break;
		case 6:
			numeral = '&#8549;';
		break;
	}
	return numeral;
}

function createSectionItem(title, propertyName) {
	const cardWrapper = document.createElement('div');
	cardWrapper.classList.add(`${propertyName}__card`);

	const cardTitle = document.createElement('h2');
	cardTitle.classList.add(`${propertyName}__card_title`, 'card__title')
	cardTitle.textContent = title;

	const cardImgWrapper = document.createElement('div');
	cardImgWrapper.classList.add(`${propertyName}__card_img-wrapper`, 'card__img-wrapper')
	let nameOfFile = title.replace(/[^a-zA-Z0-9\s]/gi, ' '); // удаляем спец символы из названия файла заменяем на пробел
	cardImgWrapper.style.background = `url('/img/${propertyName}/${nameOfFile}.webp') center/contain no-repeat`;

	cardWrapper.append(cardTitle);
	cardWrapper.append(cardImgWrapper);
	return cardWrapper;
}

function createContent({ episodeId, episodeTitle, episodeDescription }, planets, species) {
	// create section about episode//start
	const wrapper = document.querySelector('.about-episode');
	const title = document.createElement('h1');
	title.classList.add('about-episode__title');
	title.innerHTML = 'Episode' + ' ' + convertArabicToRoman(episodeId) + '<br>' + ' ' + episodeTitle;

	const description = document.createElement('p');
	description.classList.add('about-episode__description');
	description.textContent = episodeDescription;
	const img = document.createElement('div');
	img.classList.add('about-episode__img');
	img.style.background = `url('/img/episode/det_${episodeId}.jpeg') top/contain no-repeat`;
	//end
	//create section planets//start
	wrapper.append(title);
	wrapper.append(description);
	wrapper.append(img);

	const planetsList = document.querySelector('.planets__list');

	for (let i = 0; i < Object.keys(planets).length; i++) {
		planetsList.append(createSectionItem(planets[i], 'planets'))
	};
	// end
	//create section species//start
	const speciesList = document.querySelector('.species__list');
	for (let i = 0; i < Object.keys(species).length; i++) {
		speciesList.append(createSectionItem(species[i], 'species'))
	};
	//end

  
}

export { createContent }

export function createDetails() {
  const main = document.querySelector('.main');
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }

  main.classList.add('details');

  const sectionAboutEpi = document.createElement('section');
  sectionAboutEpi.classList.add('about-episode', 'section');
  main.append(sectionAboutEpi);

  const sectionPlanets = document.createElement('section');
  sectionPlanets.classList.add('planets', 'section');
  const sectionPlanetsTitle = document.createElement('h2');
  sectionPlanetsTitle.classList.add('planets__title', 'section');
  sectionPlanetsTitle.textContent = 'Planets';
  const sectionPlanetsList = document.createElement('div');
  sectionPlanetsList.classList.add('planets__list');
  sectionPlanets.append(sectionPlanetsTitle);
  sectionPlanets.append(sectionPlanetsList);
  main.append(sectionPlanets);

  const sectionSpecies = document.createElement('section');
  sectionSpecies.classList.add('species', 'section');
  const sectionSpeciesTitle = document.createElement('h2');
  sectionSpeciesTitle.classList.add('species__title', 'section');
  sectionSpeciesTitle.textContent = 'Species';
  const sectionSpeciesList = document.createElement('div');
  sectionSpeciesList.classList.add('species__list');
  sectionSpecies.append(sectionSpeciesTitle);
  sectionSpecies.append(sectionSpeciesList);
  main.append(sectionSpecies);

  return {
    sectionAboutEpi,
    sectionPlanets,
    sectionSpecies
  }
}
