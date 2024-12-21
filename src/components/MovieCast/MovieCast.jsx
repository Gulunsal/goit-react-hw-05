import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../services/api';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams(); // URL'deki movieId'yi alıyoruz
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieCredits = async () => {
      try {
        const data = await fetchMovieCredits(movieId);
        setCast(data);
      } catch (err) {
        setError('Failed to fetch cast information.');
      }
    };

    getMovieCredits();
  }, [movieId]);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!cast.length) {
    return <p className={styles.noData}>No cast information available.</p>;
  }

  return (
    <ul className={styles.castList}>
      {cast.map((actor) => (
        <li key={actor.id} className={styles.castItem}>
          <img
            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
            alt={actor.name}
            className={styles.castImage}
          />
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
