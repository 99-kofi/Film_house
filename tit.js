const API_KEY = '57cf02accec7e41b08bda77a7b1a376f'; // Replace with your TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w300';

// Fetch Movies from TMDb API
async function fetchMovies(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
}

// Display Movies
function displayMovies(movies, container) {
  container.innerHTML = '';
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
      <img src="${IMG_URL}${poster_path}" alt="${title}" />
      <div class="movie-info">
        <div class="movie-title">${title}</div>
        <div class="movie-rating">⭐ ${vote_average}</div>
        <div class="movie-description">${overview}</div>
      </div>
    `;
    container.appendChild(movieElement);
  });
}

// Load Movies by Category
async function loadMovies() {
  const popularContainer = document.querySelector('#popular-movies .movie-container');
  const topRatedContainer = document.querySelector('#top-rated-movies .movie-container');
  const upcomingContainer = document.querySelector('#upcoming-movies .movie-container');

  const popularMovies = await fetchMovies('/movie/popular');
  const topRatedMovies = await fetchMovies('/movie/top_rated');
  const upcomingMovies = await fetchMovies('/movie/upcoming');

  displayMovies(popularMovies, popularContainer);
  displayMovies(topRatedMovies, topRatedContainer);
  displayMovies(upcomingMovies, upcomingContainer);
}

// Search Movies
async function searchMovies(query) {
  const searchContainer = document.querySelector('#search-results .movie-container');
  const movies = await fetchMovies(`/search/movie?query=${query}`);
  displayMovies(movies, searchContainer);
}

// Search Button Click Event
document.getElementById('search-button').addEventListener('click', () => {
  const searchTerm = document.getElementById('search-bar').value;
  if (searchTerm) {
    searchMovies(searchTerm);
    document.getElementById('search-results').style.display = 'block';
  }
});

// Initialize the App
loadMovies();
