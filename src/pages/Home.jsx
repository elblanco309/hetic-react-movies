import { useState, useEffect, useRef, useMemo } from 'react';
import { fetchPopularMovies, searchMovies, IMAGE_URL } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import styles from './Home.module.css';

function Home() {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [sortBy, setSortBy] = useState('popularity');
    const [sortOrder, setSortOrder] = useState('desc');
    const sentinelRef = useRef(null);

    const sortedMovies = useMemo(() => {
        return [...movies].sort((a, b) => {
            if (sortBy === 'popularity') return sortOrder === 'asc'
                ? (a.popularity ?? 0) - (b.popularity ?? 0)
                : (b.popularity ?? 0) - (a.popularity ?? 0);
            if (sortBy === 'rating') return sortOrder === 'asc'
                ? (a.vote_average ?? 0) - (b.vote_average ?? 0)
                : (b.vote_average ?? 0) - (a.vote_average ?? 0);
            if (sortBy === 'year') return sortOrder === 'asc'
                ? (a.release_date ?? '').localeCompare(b.release_date ?? '')
                : (b.release_date ?? '').localeCompare(a.release_date ?? '');
            if (sortBy === 'title') return sortOrder === 'asc'
                ? (a.title ?? '').localeCompare(b.title ?? '')
                : (b.title ?? '').localeCompare(a.title ?? '');
            return 0;
        });
    }, [movies, sortBy, sortOrder]);

    useEffect(() => {
        if (isFetching) return;
        setIsFetching(true);
        setLoading(true);
        const dedupe = (prev, results) =>
            [...prev, ...results].filter((m, i, arr) => arr.findIndex((x) => x.id === m.id) === i);
        if (search === '') {
            fetchPopularMovies(page).then((results) => {
                if (results.length < 20) setHasMore(false);
                setMovies((prev) => page === 1 ? results : dedupe(prev, results));
                setLoading(false);
                setIsFetching(false);
            });
        } else {
            searchMovies(search).then((results) => {
                if (results.length < 20) setHasMore(false);
                setMovies((prev) => page === 1 ? results : dedupe(prev, results));
                setLoading(false);
                setIsFetching(false);
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
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.sort}
            >
                <option value="popularity">Popularité</option>
                <option value="rating">Note</option>
                <option value="year">Année</option>
                <option value="title">Titre</option>
            </select>
            <button
                onClick={() => setSortOrder((o) => o === 'desc' ? 'asc' : 'desc')}
                className={styles.sortOrder}
            >
                {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
            <div className={styles.grid}>
                {sortedMovies.map((movie) => (
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
