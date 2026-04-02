import styles from './Logo.module.css';

function Logo() {
    return (
        <div className={styles.logo}>
            <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Outer circle */}
                <circle cx="18" cy="18" r="17" fill="#E50914" />
                {/* Inner circle */}
                <circle cx="18" cy="18" r="8" fill="white" />
                {/* Center hole */}
                <circle cx="18" cy="18" r="3" fill="#E50914" />
                {/* Film holes - 6 small circles around the reel */}
                <circle cx="18" cy="4" r="2.2" fill="white" />
                <circle cx="18" cy="32" r="2.2" fill="white" />
                <circle cx="4" cy="18" r="2.2" fill="white" />
                <circle cx="32" cy="18" r="2.2" fill="white" />
                <circle cx="7.5" cy="7.5" r="2.2" fill="white" />
                <circle cx="28.5" cy="28.5" r="2.2" fill="white" />
                <circle cx="28.5" cy="7.5" r="2.2" fill="white" />
                <circle cx="7.5" cy="28.5" r="2.2" fill="white" />
            </svg>
            <span className={styles.text}>
                <span className={styles.cine}>Cine</span>
                <span className={styles.pulse}>Pulse</span>
            </span>
        </div>
    );
}

export default Logo;
