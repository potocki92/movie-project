const fetchMovies = name => {
  const API_KEY = '64cb7e9375c055230d64b013c4bca79f';
  const API_URL = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query=' + name;

  return fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        if (response.status === 429) {
          // Too Many Requests
          console.error('Error: Too many requests to API.');
        } else {
          console.error('Error: Failed to fetch data from API. Status code:', response.status);
        }
        return Promise.reject(new Error(response.status));
      }
      return response.json();
    })
    .then(data => {
      return data.results;
    })
    .catch(error => {
      console.error(error);
      return Promise.reject(new Error('An error occurred while fetching the data.'));
    });
};

export { fetchMovies };
