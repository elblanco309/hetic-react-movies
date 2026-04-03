import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { fetchMovieDetails, IMAGE_URL } from '../services/tmdb';
import styles from './MovieDetail.module.css';
import ReviewCard from '../components/ReviewCard';
import { useAuth } from '../context/AuthContext';

function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovieDetails(id).then((data) => {
            setMovie(data);
            setLoading(false);
        });
    }, [id]);

    const [reviews, setReviews] = useState(() => {
        const saved = localStorage.getItem('reviews-' + id);
        return saved ? JSON.parse(saved) : [];
    });
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [editingId, setEditingId] = useState(null);
    const [editComment, setEditComment] = useState('');
    const [editRating, setEditRating] = useState(5);

    useEffect(() => {
        localStorage.setItem('reviews-' + id, JSON.stringify(reviews));
    }, [reviews]);

    if (loading) return <p>Chargement...</p>;
    if (!movie) return <p>Film non trouvé</p>;

    function handleDeleteReview(reviewId) {
        setReviews(reviews.filter((r) => r.id !== reviewId));
    }

    function handleEditReview(reviewId) {
        setReviews(reviews.map((r) =>
            r.id === reviewId ? { ...r, comment: editComment, rating: editRating } : r
        ));
        setEditingId(null);
    }

    function handleAddReview() {
        const newReview = {
            id: Date.now(),
            username: user.username,
            comment,
            rating,
        };
        setReviews([...reviews, newReview]);
        setComment('');
        setRating(5);
    }

    return (
        <div className={styles.container}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>← Retour</button>
            <img src={IMAGE_URL + movie.poster_path} alt={movie.title} className={styles.image} />
            <div className={styles.info}>
                <h1 className={styles.title}>{movie.title}</h1>
                <div className={styles.meta}>
                    <span>{movie.release_date?.slice(0, 4)}</span>
                    <span className={styles.genre}>{movie.genres?.[0]?.name}</span>
                    <span>{movie.runtime} min</span>
                </div>
                <p className={styles.description}>{movie.overview}</p>
                <div className={styles.ratingImdb}>
                    <span className={styles.ratingLabel}>Note TMDB</span>
                    <span className={styles.stars}>{movie.vote_average?.toFixed(1)} / 10</span>
                </div>
                <div className={styles.ratingUsers}>
                    <span className={styles.ratingLabelBlue}>
                        {reviews.length > 0 ? `Note utilisateurs (${reviews.length} avis)` : 'Note utilisateurs'}
                    </span>
                    {reviews.length > 0 ? (
                        <span className={styles.starsBlue}>
                            {(() => {
                                const avg = Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length);
                                return '★'.repeat(avg) + '☆'.repeat(5 - avg);
                            })()}
                        </span>
                    ) : (
                        <span className={styles.noReviews}>Aucun avis pour l'instant</span>
                    )}
                </div>

                {user ? (
                    <div className={styles.reviewForm}>
                        <h2>Ajouter une review</h2>
                        <input
                            type="text"
                            value={user.username}
                            readOnly
                        />
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                        />
                        <textarea
                            placeholder="Votre commentaire"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <button onClick={handleAddReview}>Ajouter une review</button>
                    </div>
                ) : (
                    <div className={styles.reviewForm}>
                        <p><Link to="/login">Connectez-vous</Link> pour laisser une review.</p>
                    </div>
                )}

                <div className={styles.reviewList}>
                    {reviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            onDelete={handleDeleteReview}
                            onEdit={handleEditReview}
                            editingId={editingId}
                            editComment={editComment}
                            editRating={editRating}
                            setEditComment={setEditComment}
                            setEditRating={setEditRating}
                            setEditingId={setEditingId}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
