import { fetchMovies } from './api/fetchMovies';
const searchMovies = () => {
  const searchInput = document.getElementById('search');
  const searchValue = searchInput.value.trim();

  fetchMovies(searchValue)
    .then(movies => {
      console.log('Movies:', movies);
      // Tutaj możesz wyświetlić pobrane filmy w interfejsie użytkownika
    })
    .catch(error => {
      console.error('Error:', error);
      // Tutaj możesz wyświetlić informację o błędzie w interfejsie użytkownika
    });
};

const button = document.getElementById('button');
button.addEventListener('click', searchMovies);

export { searchMovies };
