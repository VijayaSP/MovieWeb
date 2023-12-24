// Storing the themoviedb api url in the variable
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7ed2407ab72f67dd4c7decb597bceed4&page=1';
// Storing the image path that will be used to show movie image
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
// Storing the api irl for searching the movie
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=7ed2407ab72f67dd4c7decb597bceed4&query="';

// getting the id's of required html elements
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Calling the getMovie function and passing the API url in it
getMovies(API_URL);

// Defining the async function that will return a promise and fetch the data of api
async function getMovies(url) {
    const response = await fetch(url);
    const data = await response.json();
    // calling the function and passing the data to show movies data into html page
    showMovies(data.results);
}

// function that will loop through each movie result and show movies on the html page
function showMovies(movies) {
    main.innerHTML = "";

    movies.forEach((movie) => {
        // getting the required data by array destructuring
        const { title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <h1 class="h1c">Latest Release</h1>
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span>${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

// performing an input event that will get the search term from user input and call the same function getMovies() but this time it will pass the SEARCH API with the user input value.
search.addEventListener("input",()=>{
    const searchTerm = search.value
    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
    }
     else {
        window.location.reload();
    }
});
