import { useState } from 'react';
import movies from '../data/movies';
import MovieCard from '../components/MovieCard';
import styles from './Home.module.css';

function Home() {
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('');

    const genres = ['', ...movies.map((m) => m.genre).filter((g, i, arr) => arr.indexOf(g) === i)];

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase()) &&
        (genre === '' || movie.genre === genre)
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
            <div className={styles.genreFilters}>
                {genres.map((g) => (
                    <button
                        key={g}
                        onClick={() => setGenre(g)}
                        className={genre === g ? styles.genreButtonActive : styles.genreButton}
                    >
                        {g === '' ? 'Tous' : g}
                    </button>
                ))}
            </div>
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
