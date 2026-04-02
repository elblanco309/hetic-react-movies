import styles from './About.module.css';

function About() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>À propos</h1>
            <p className={styles.intro}>
                Bienvenue sur <strong>CineReview</strong>, l'application de reviews de films créée dans le cadre du cours React à HETIC.
            </p>

            <div className={styles.section}>
                <h2>Fonctionnalités</h2>
                <ul className={styles.list}>
                    <li>Parcourir une sélection de films classiques</li>
                    <li>Consulter les détails de chaque film</li>
                    <li>Ajouter, modifier et supprimer des reviews</li>
                    <li>Rechercher un film par son titre</li>
                    <li>Sauvegarde automatique des reviews dans le navigateur</li>
                </ul>
            </div>

            <div className={styles.section}>
                <h2>Technologies utilisées</h2>
                <ul className={styles.list}>
                    <li>React</li>
                    <li>React Router</li>
                    <li>CSS Modules</li>
                    <li>localStorage</li>
                </ul>
            </div>

            <div className={styles.section}>
                <h2>École</h2>
                <p>Projet réalisé à <strong>HETIC</strong> — Montreuil, France.</p>
            </div>
        </div>
    );
}

export default About;
