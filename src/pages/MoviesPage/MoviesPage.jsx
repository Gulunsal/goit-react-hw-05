import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchMovies } from '../../services/api'; // API fonksiyonunu import edilir
import styles from './MoviesPage.module.css'; // CSS modülünü bağlanır

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(searchParams.get('query') || '');

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const data = await searchMovies(query);
        setMovies(data); // Filmleri state'e kaydedin
      } catch (error) {
        console.error('Film arama sırasında bir hata oluştu:', error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuery = e.target.elements.search.value.trim();

    if (!newQuery) return;

    setSearchParams({ query: newQuery }); // URL'yi güncelle
    setQuery(newQuery); // Query state'ini güncelle
  };

  return (
    <div className={styles.container}>
      {/* Arama motoru */}
      <form onSubmit={handleSubmit} className={styles.searchBar}>
        <input
          type="text"
          name="search"
          defaultValue={query}
          placeholder="Film arayın..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>

      {/* Film listesi */}
      <div className={styles.movieList}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={styles.movieImage}
            />
            <div className={styles.movieTitle}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
