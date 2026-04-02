import movies from '../data/movies';
import MovieCard from '../components/MovieCard';
import styles from './Home.module.css';

function Home() {
    return (
        <div>
            <h1>🎬 Films</h1>
            <div className={styles.grid}>
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        year={movie.year}
                        genre={movie.genre}
                        description={movie.description}
                        image={movie.image}
                        rating={movie.rating}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
