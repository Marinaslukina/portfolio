function fetchJson(url) {
	return fetch(url).then(res => res.json());
}

export function getData(numberOfEpi) {
	return Promise.all([
		fetchJson(`https://swapi.dev/api/films/${numberOfEpi}`).then(res => res.episode_id),
		fetchJson(`https://swapi.dev/api/films/${numberOfEpi}`).then(res => res.title),
		fetchJson(`https://swapi.dev/api/films/${numberOfEpi}`).then(res => res.opening_crawl)
	]).then(([episodeId, episodeTitle, episodeDescription]) => {
		return { episodeId, episodeTitle, episodeDescription }
	});
}

function whatProperty() {
	
}

// функцией getPlanets можно также получить species
// getProperty(numberOfEpisode, what propery we need )
// property = planets
export async function getProperty(numberOfEpi, propertyName) {
	const result = await fetchJson(`https://swapi.dev/api/films/${numberOfEpi}`);

	const properties = {
		'planets': Object.values(result.planets),
		'species': Object.values(result.species)
	}

	function whatProperty(property) {
		return properties[property];
	}

	const calls = whatProperty(propertyName).map(url => {
		return fetchJson(url)
	})

	return Promise.all(calls).then(res => {
		return res.map(planet => planet.name);
	})
}