const API_KEY = import.meta.env.VITE_API_KEY;
const baseURL = "https://api.themoviedb.org/3/";
const requests = {
  fetchTrending: `${baseURL}trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${baseURL}discover/tv?api_key=${API_KEY}&with_networks=123`,
  fetchTopRated: `${baseURL}movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchHorrorMovies: `${baseURL}discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchActionMovies: `${baseURL}discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `${baseURL}discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchRomanceMovies: `${baseURL}discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentries: `${baseURL}discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default requests;
