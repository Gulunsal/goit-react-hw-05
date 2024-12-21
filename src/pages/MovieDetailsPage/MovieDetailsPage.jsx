import React, { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useNavigate } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        console.error('Failed to fetch movie details:', err);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className={styles.movieDetails}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        Go back
      </button>
      <div className={styles.movieHeader}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div>
          <h1>{movie.title}</h1>
          <p>Rating: {Math.round(movie.vote_average * 10)}%</p>
          <p>{movie.overview}</p>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <h3>Additional Information</h3>
        <div className={styles.buttonGroup}>
          <Link to={`/movies/${movieId}/cast`} className={styles.button}>
            Cast
          </Link>
          <Link to={`/movies/${movieId}/reviews`} className={styles.button}>
            Reviews
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
