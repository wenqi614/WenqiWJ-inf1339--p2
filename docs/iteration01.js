var SEARCH_QUERY = 'godfather';

var API_KEY = '4Mk8oFV1BG6kuIVefgviyykGuzfewULo';

var URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=' + SEARCH_QUERY + '&api-key=' + API_KEY;

var TITLE_ELEMENT_ID = 'titles';


function setup() {
	noCanvas();
	loadJSON(URL, callback);
}


function callback(data) {
	var titlesElement = document.querySelector('#' + TITLE_ELEMENT_ID);

	movies = data.results;
	for (var i = 0; i < movies.length; i++) {
		var movie = movies[i];
		var titleElement = document.createElement('p');
		var rating = movie.mpaa_rating ? movie.mpaa_rating : 'no rating available'
		titleElement.textContent = movie.display_title + ': ' + rating;
		titlesElement.appendChild(titleElement);
	}
}
