var API_KEY = '4Mk8oFV1BG6kuIVefgviyykGuzfewULo';

var SEARCH_INPUT_ID = 'search-query-input';
var SEARCH_SUBMIT_BUTTON_ID = 'search-query-submit';
var MOVIES_ELEMENT_ID = 'movies';

var ERROR_MESSAGE_MOVIE_NOT_FOUND = 'movie not found. please verify your input';


function setup() {
	noCanvas();
	initSearch();
}


function initSearch() {
	var searchSubmitButton = document.querySelector('#' + SEARCH_SUBMIT_BUTTON_ID);
	var searchInput = document.querySelector('#' + SEARCH_INPUT_ID);
	searchSubmitButton.addEventListener('click', function(event) {
		event.preventDefault();

		fetch(buildSearchURL(searchInput.value))
			.then(function(response) {
				return response.json()
			})
			.then(function(json) {
				populateMovies(json.results);
			});
	});
}

function populateMovies(movies) {
	var moviesElement = document.querySelector('#' + MOVIES_ELEMENT_ID);

	while (moviesElement.firstChild) {
		moviesElement.removeChild(moviesElement.firstChild);
	}

	if (!movies.length) {
		var errorMessageElement = document.createElement('p');
		errorMessageElement.textContent = ERROR_MESSAGE_MOVIE_NOT_FOUND;
		errorMessageElement.style.color = 'red';
		moviesElement.appendChild(errorMessageElement);
	}

	for (var i = 0; i < movies.length; i++) {
		var movie = movies[i];
		var movieElement = document.createElement('div');

		var movieTitleElement = document.createElement('h3');
		movieTitleElement.textContent = movie.display_title;
		movieElement.appendChild(movieTitleElement);

		var moviePublishDateElement = document.createElement('span');
		moviePublishDateElement.textContent = movie.publication_date;
		moviePublishDateElement.style.marginLeft = '25px';
		movieElement.appendChild(moviePublishDateElement);

		var movieSummaryElement = document.createElement('span');
		movieSummaryElement.textContent = movie.summary_short;
		movieSummaryElement.style.marginLeft = '25px';
		movieElement.appendChild(movieSummaryElement);

		var linkElement = document.createElement('a');
		linkElement.href = movie.link.url;
		linkElement.textContent = 'click here to read more';
		linkElement.style.display = 'block';
		linkElement.style.margin = '25px';
		movieElement.appendChild(linkElement)

		moviesElement.appendChild(movieElement);
	}
}

function buildSearchURL(searchQuery) {
	return 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=' + API_KEY + '&query=' + searchQuery;
}
