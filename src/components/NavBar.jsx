import { NavLink, Link } from "react-router";
import styles from "./NavBar.module.css";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

function NavBar() {
    const { user, logout } = useAuth();

    return (
        <nav className={styles.nav}>
            <Link to="/"><Logo /></Link>
             <div className={styles.links}>
                <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? styles.linkActive : styles.link}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => isActive ? styles.linkActive : styles.link}
                >
                    About
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) => isActive ? styles.linkActive : styles.link}
                >
                    Contact
                </NavLink>
             </div>
             <div className={styles.auth}>
                {user ? (
                    <>
                        <span className={styles.username}>{user.username}</span>
                        <button className={styles.authButton} onClick={logout}>Déconnexion</button>
                    </>
                ) : (
                    <Link to="/login" className={styles.authButton}>Connexion</Link>
                )}
             </div>
        </nav>
    );
}

export default NavBar;
