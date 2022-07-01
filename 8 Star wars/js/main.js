import {
  createGridWrapper,
  createCatalog
} from './episode-list.js';
import {
  createLoader
} from './loader.js';
import {
  createDetails,
  createContent
} from './episode-details.js';
import {
  getData,
  getProperty
} from './api.js';

window.addEventListener('popstate', renderPage);

document.body.append(createGridWrapper());

export function renderPage() {
  const pageParams = new URLSearchParams(window.location.search);
  const episodeId = Number(pageParams.get('id'));

  if (!episodeId) {
    createIndexPage();
  } else {
    createDetailsPage(episodeId);
  }
}

renderPage()

function createIndexPage() {
  const episodes = [4, 5, 6, 1, 2, 3];
  document.querySelector('.main').append(createLoader());
    Promise.all(episodes.map((num) => getData(num))
      ).then(res => {
        document.querySelector('.spinner-box').classList.add('loaded');
        res.map(cardData => createCatalog(cardData))
      })
}

function createDetailsPage(episodeId) {
  createDetails();
  document.querySelector('.main').prepend(createLoader());
  const sectionTitle = document.querySelectorAll('.section');
  for (let title of sectionTitle) {
    title.classList.add('loaded');
  }
  let numberOfEpi = 0;
  (episodeId < 4) ? numberOfEpi = episodeId + 3 :	numberOfEpi = episodeId - 3;
  Promise.all([
    getData(numberOfEpi),
    getProperty(numberOfEpi, 'planets'),
    getProperty(numberOfEpi, 'species')
  ]).then(([data, planets, spacies]) => {
    document.querySelector('.spinner-box').classList.add('loaded');
    for (let title of sectionTitle) {
      title.classList.remove('loaded');
      title.classList.add('section-border');
    }
    createContent(data, planets, spacies);
  })
}

