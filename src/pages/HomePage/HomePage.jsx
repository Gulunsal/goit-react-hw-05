import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/api'; // API fonksiyonunu import ederiz.
import MovieList from '../../components/MovieList/MovieList'; // Film listeleme bileşenini import ederiz.
import styles from './HomePage.module.css'; // CSS modülünü bağlarız.

const HomePage = () => {
  const [movies, setMovies] = useState([]); // Trend filmleri saklamak için state
  const [isLoading, setIsLoading] = useState(true); // Yüklenme durumu için state
  const [error, setError] = useState(null); // Hata durumu için state

  // API'den veri çekme
  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setIsLoading(true); // Yüklenme durumu başlat
        const data = await fetchTrendingMovies(); // API'den verileri çek
        setMovies(data); // Filmleri state'e kaydet
      } catch (err) {
        setError('Trend filmler yüklenirken bir hata oluştu.'); // Hata mesajını state'e yaz
      } finally {
        setIsLoading(false); // Yüklenme tamamlandığında durumu güncelle
      }
    };
    getTrendingMovies();
  }, []);

  // Render: Yüklenme, hata ve filmlerin listelenmesi
  return (
    <div className={styles.homePage}>
      <h1>Trend Filmler</h1>
      {isLoading && <p className={styles.loading}>Yükleniyor...</p>} {/* Yüklenme mesajı */}
      {error && <p className={styles.error}>{error}</p>} {/* Hata mesajı */}
      {!isLoading && !movies.length && <p className={styles.noMovies}>Trend film bulunamadı.</p>} {/* Boş liste mesajı */}
      {!isLoading && movies.length > 0 && <MovieList movies={movies} />} {/* Filmler listelenir */}
    </div>
  );
};

export default HomePage;
