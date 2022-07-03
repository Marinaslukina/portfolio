function convertArabicToRoman(numeral) {
  const data = [
    '&#8544;',
    '&#8545;',
    '&#8546;',
    '&#8547;',
    '&#8548;',
    '&#8549;'
  ]
	return data[numeral-1];
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
	cardImgWrapper.style.background = `url('./img/${propertyName}/${nameOfFile}.webp') center/contain no-repeat`;

	cardWrapper.append(cardTitle);
	cardWrapper.append(cardImgWrapper);
	return cardWrapper;
}

export function createContent({ episodeId, episodeTitle, episodeDescription }, planets, species) {
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
	img.style.background = `url('./img/episode/det_${episodeId}.jpeg') top/contain no-repeat`;
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
