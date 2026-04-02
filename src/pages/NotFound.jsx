import { Link } from 'react-router';
import styles from './NotFound.module.css';

function NotFound() {
    return (
        <div className={styles.container}>
            <h1 className={styles.code}>404</h1>
            <p className={styles.message}>Page non trouvée</p>
            <p className={styles.sub}>La page que vous cherchez n'existe pas ou a été déplacée.</p>
            <Link to="/" className={styles.button}>Retour à l'accueil</Link>
        </div>
    );
}

export default NotFound;
