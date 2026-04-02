import styles from './MovieCard.module.css';

function MovieCard({ title, year, genre, description, image, rating }) {
  return (
    <div className={styles.card}>
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
    </div>
  );
}

export default MovieCard;
