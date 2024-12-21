import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/api';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams(); // URL'deki movieId'yi alıyoruz
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        setError('Failed to fetch reviews.');
      }
    };

    getMovieReviews();
  }, [movieId]);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!reviews.length) {
    return <p className={styles.noData}>No reviews available.</p>;
  }

  return (
    <ul className={styles.reviewsList}>
      {reviews.map((review) => (
        <li key={review.id} className={styles.reviewItem}>
          <h3>Author: {review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
