import React, { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useNavigate } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/api';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError('Film detayları yüklenirken bir hata oluştu.');
      }
    };
    fetchDetails();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Yükleniyor...</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go back</button>
      <h1>
        {movie.title} ({movie.release_date?.split('-')[0]})
      </h1>
      <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
      <h2>Overview</h2>
      <p>{movie.overview}</p>
      <h2>Genres</h2>
      <p>{movie.genres.map((genre) => genre.name).join(' ')}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      {/* Additional information links */}
      <h3>Additional information</h3>
      <ul>
        <li>
          <Link to="cast">Cast</Link> {/* Cast Link */}
        </li>
        <li>
          <Link to="reviews">Reviews</Link> {/* Reviews Link */}
        </li>
      </ul>

      {/* Alt rotalar burada gösterilir */}
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
