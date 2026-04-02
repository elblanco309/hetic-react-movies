import { useParams } from 'react-router';
import movies from '../data/movies';
import styles from './MovieDetail.module.css';

function MovieDetail() {
    const { id } = useParams();
    const movie = movies.find((m) => m.id === Number(id));

    if (!movie) {
        return <p>Film non trouvé</p>;
    }

    return (
        <div className={styles.container}>
            <img src={movie.image} alt={movie.title} className={styles.image} />
            <div className={styles.info}>
                <h1 className={styles.title}>{movie.title}</h1>
                <div className={styles.meta}>
                    <span>{movie.year}</span>
                    <span className={styles.genre}>{movie.genre}</span>
                    <span>{movie.duration} min</span>
                </div>
                <p className={styles.description}>{movie.description}</p>
                <div className={styles.detail}><strong>Réalisateur :</strong> {movie.director}</div>
                <div className={styles.detail}><strong>Studio :</strong> {movie.studio}</div>
                <div className={styles.rating}>{'★'.repeat(movie.rating)}{'☆'.repeat(5 - movie.rating)}</div>
            </div>
        </div>
    );
}

export default MovieDetail;
