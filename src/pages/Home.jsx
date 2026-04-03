import { useState, useEffect, useRef } from 'react';
import { fetchPopularMovies, searchMovies, IMAGE_URL } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import styles from './Home.module.css';

function Home() {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const sentinelRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        if (search === '') {
            fetchPopularMovies(page).then((results) => {
                if (results.length < 20) setHasMore(false);
                setMovies((prev) => page === 1 ? results : [...prev, ...results]);
                setLoading(false);
            });
        } else {
            searchMovies(search).then((results) => {
                if (results.length < 20) setHasMore(false);
                setMovies((prev) => page === 1 ? results : [...prev, ...results]);
                setLoading(false);
            });
        }
    }, [search, page]);

    useEffect(() => {
        setPage(1);
        setMovies([]);
        setHasMore(true);
    }, [search]);

    useEffect(() => {
        if (!hasMore) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prev) => prev + 1);
            }
        });
        const sentinel = sentinelRef.current;
        if (sentinel) observer.observe(sentinel);
        return () => { if (sentinel) observer.unobserve(sentinel); };
    }, [hasMore, movies]);

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
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        movieId={movie.id}
                        year={movie.release_date?.slice(0, 4)}
                        genre={movie.genre}
                        description={movie.overview}
                        image={IMAGE_URL + movie.poster_path}
                        rating={movie.vote_average / 2}
                    />
                ))}
            </div>
            {loading && <p>Chargement...</p>}
            <div ref={sentinelRef} />
        </div>
    );
}

export default Home;
