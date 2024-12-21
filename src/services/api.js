import axios from 'axios';

// const API_KEY = '7592deae0445bf8c8b65b0587b32353c'; // API Anahtarı
const API_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTkyZGVhZTA0NDViZjhjOGI2NWIwNTg3YjMyMzUzYyIsIm5iZiI6MTczNDcxNDk0OS43MDg5OTk5LCJzdWIiOiI2NzY1YTY0NTg3YjkyYTQzYmU1ZGZjNWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1KD1CIna7wkL2C9RxLXBrWX1rH_Ba0agiGeF7y_8ZWQ'; // API Okuma Erişim Jetonu
const BASE_URL = 'https://api.themoviedb.org/3';

// Axios örneği oluşturuluyor
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_ACCESS_TOKEN}`, // Token doğru formatta eklendi
  },
});

// Trend filmleri çeker
export const fetchTrendingMovies = async () => {
  const response = await api.get('/trending/movie/day');
  return response.data.results;
};

// Film detaylarını çeker
export const fetchMovieDetails = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`);
  return response.data;
};

// Oyuncuları çeker
export const fetchMovieCredits = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

// İncelemeleri çeker
export const fetchMovieReviews = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};

// Arama sonuçlarını çeker
export const searchMovies = async (query) => {
  const response = await api.get('/search/movie', {
    params: { query },
  });
  return response.data.results;
};
