import { useState } from 'react';
import movies from '../data/movies';
import MovieCard from '../components/MovieCard';
import styles from './Home.module.css';

function Home() {
    const [search, setSearch] = useState('');

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>🎬 Films</h1>
            <input
                type="text"
                placeholder="Rechercher un film..."
                onChange={(e) => setSearch(e.target.value)}
                className={styles.search}
            />
            <div className={styles.grid}>
                {filteredMovies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        movieId={movie.id}
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
