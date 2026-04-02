import { Link } from 'react-router';
import styles from './MovieCard.module.css';

function MovieCard({ movieId, title, year, genre, description, image, rating }) {
  console.log('id reçu:', movieId, 'type:', typeof movieId);
  return (
    <div className={styles.cardWrapper}>
      <Link to={'/movies/' + String(movieId)}>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.body}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.meta}>
            <span>{year}</span>
            <span className={styles.genre}>{genre}</span>
          </div>
          <p className={styles.description}>{description}</p>
          <div className={styles.rating}>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
