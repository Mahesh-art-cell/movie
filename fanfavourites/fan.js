// const url = 'https://imdb188.p.rapidapi.com/api/v1/getFanFavorites?country=US';
//     const options = {
//         method: 'GET',
//         headers: {
//             'x-rapidapi-key': '37f175010emsh42db384d0db98c8p1bd910jsne5a261e2ee69',
//             'x-rapidapi-host': 'imdb188.p.rapidapi.com'
//         }
//     };

// // Function to fetch and display Fan Favorites
// const container = document.getElementById('fan-favorites-results');
// async function fetchFanFavorites() {
//         const response = await fetch(url, options);
        
//         // Check if the response is OK (status 200-299)

//         const result = await response.json();

//         // Ensure the data exists and is an arra

//         const res = result.data.list;
//         console.log("Fan Favorites Response Data:", res);  

//         container.innerHTML = ''; // Clear any previous results

//         res.forEach(movie => {
//             const movieCard = createFanFavoriteCard(movie);
//             container.appendChild(movieCard);
//         });
// }

// // Function to create a movie card for Fan Favorites
// function createFanFavoriteCard(movie) {
//     const card = document.createElement('div');
//     card.classList.add('movie-card');

//     // Poster Image
//     const img = document.createElement('img');
//     img.src = movie.primaryImage?.imageUrl || 'https://via.placeholder.com/150'; // Default image if no poster
//     img.alt = `${movie.titleText?.text || 'Movie'} Poster`;
//     img.style.width = "150px";
//     card.appendChild(img);

//     // Title
//     const title = document.createElement('h3');
//     title.textContent = movie.titleText?.text || 'N/A';
//     card.appendChild(title);

//     // Rating
//     const rating = document.createElement('p');
//     rating.innerHTML = `Rating: ${movie.ratingsSummary?.aggregateRating || 'N/A'} <span style="color: gold;">&#9733;</span>`;
//     card.appendChild(rating);

//     // Add click functionality to show details on click
//     // card.onclick = () => {
//     //     showMovieDetails(movie);
//     // };
    

//     return card;
// }

// // Function to show movie details in a modal
// function showMovieDetails(movie) {
//     const modal = document.getElementById('movie-modal');
//     const movieDetails = document.getElementById('movie-details');

//     // Clear any previous details
//     movieDetails.innerHTML = '';

//     // Title
//     const title = document.createElement('h2');
//     title.textContent = movie.titleText?.text || 'N/A';

//     // Poster Image
//     const poster = document.createElement('img');
//     poster.src = movie.primaryImage?.imageUrl || 'https://via.placeholder.com/150';
//     poster.alt = movie.titleText?.text || 'Movie Poster';

//     // Plot
//     const plot = document.createElement('p');
//     plot.textContent = movie.plot?.plotText?.plainText || 'Plot not available.';

//     // Release Date
//     const releaseDate = document.createElement('p');
//     releaseDate.textContent = `Release Date: ${movie.releaseYear?.year || 'Unknown'}`;

//     // Rating
//     const rating = document.createElement('p');
//     rating.textContent = `Rating: ${movie.ratingsSummary?.aggregateRating || 'N/A'}`;

//     // Runtime
//     const runtime = document.createElement('p');
//     runtime.textContent = `Runtime: ${movie.runtime?.display || 'N/A'}`;

//     // Add details to the modal
//     movieDetails.appendChild(title);
//     movieDetails.appendChild(poster);
//     movieDetails.appendChild(plot);
//     movieDetails.appendChild(releaseDate);
//     movieDetails.appendChild(rating);
//     movieDetails.appendChild(runtime);

//     // Show the modal
//     // modal.style.display = 'block';

//     // Add close functionality
//     // const closeModal = document.getElementById('close-modal');
//     // closeModal.onclick = () => {
//     //     modal.style.display = 'none';
//     // };

//     // // Close modal when clicked outside the modal
//     // window.onclick = (event) => {
//     //     if (event.target === modal) {
//     //         modal.style.display = 'none';
//     //     }
//     // };
    
// }

// // Call the fetch function when the page loads
// fetchFanFavorites();

// URL and API configuration


// URL and API configuration
const url = 'https://imdb188.p.rapidapi.com/api/v1/getFanFavorites?country=US';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '37f175010emsh42db384d0db98c8p1bd910jsne5a261e2ee69',
        'x-rapidapi-host': 'imdb188.p.rapidapi.com'
    }
};

// Fetch and display Fan Favorites
async function fetchFanFavorites() {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Failed to fetch fan favorites. Status: ${response.status}`);
        }

        const result = await response.json();
        const movies = result.data?.list || [];

        if (movies.length > 0) {
            displayMovies(movies);
        } else {
            displayError('No fan favorites available.');
        }
    } catch (error) {
        displayError('Error fetching fan favorites. Please try again later.');
        console.error(error);
    }
}

// Display the movies on the page
function displayMovies(movies) {
    const container = document.getElementById('fan-favorites-results');
    container.innerHTML = ''; // Clear any previous content

    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        container.appendChild(movieCard);
    });
}

// Create a movie card
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.addEventListener('click', () => redirectToMovieDetails(movie));

    const img = document.createElement('img');
    img.src = movie.primaryImage?.imageUrl || 'https://via.placeholder.com/150';
    img.alt = `${movie.titleText?.text || 'Movie'} Poster`;
    img.style.width = "150px";
    card.appendChild(img);

    const title = document.createElement('h3');
    title.textContent = movie.titleText?.text || 'N/A';
    card.appendChild(title);

    const rating = document.createElement('p');
    rating.innerHTML = `Rating: ${movie.ratingsSummary?.aggregateRating || 'N/A'} <span style="color: gold;">&#9733;</span>`;
    card.appendChild(rating);

    return card;
}

// Redirect to the movie details page with the movie ID
function redirectToMovieDetails(movie) {
    // Using movie.id or movie.titleText.text as a query parameter
    const movieId = movie.id || movie.titleText?.text;
    window.location.href = `movie-details.html?id=${movieId}`;
}

// Display error message
function displayError(message) {
    const container = document.getElementById('fan-favorites-results');
    container.innerHTML = `<p>${message}</p>`;
}

// Call the function to fetch fan favorites when the page loads
fetchFanFavorites();
