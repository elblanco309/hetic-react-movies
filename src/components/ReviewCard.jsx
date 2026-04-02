import styles from './ReviewCard.module.css';

function ReviewCard({ review, onDelete, onEdit, editingId, editComment, editRating, setEditComment, setEditRating, setEditingId }) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <strong>{review.username}</strong>
                <span className={styles.stars}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
            </div>
            <p className={styles.comment}>{review.comment}</p>
            <div className={styles.actions}>
                <button className={styles.btnDelete} onClick={() => onDelete(review.id)}>Supprimer</button>
                <button className={styles.btnEdit} onClick={() => { setEditingId(review.id); setEditComment(review.comment); setEditRating(review.rating); }}>Modifier</button>
            </div>
            {editingId === review.id && (
                <div className={styles.editForm}>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={editRating}
                        onChange={(e) => setEditRating(Number(e.target.value))}
                    />
                    <textarea
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                    />
                    <button className={styles.btnValidate} onClick={() => onEdit(review.id)}>Valider</button>
                    <button className={styles.btnCancel} onClick={() => setEditingId(null)}>Annuler</button>
                </div>
            )}
        </div>
    );
}

export default ReviewCard;
