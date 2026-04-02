import { NavLink } from "react-router";
import styles from "./NavBar.module.css";

function NavBar() {
    return (
        <nav className={styles.nav}>
            <h1 className={styles.brand}>🎬 CinePulse</h1>
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
        </nav>
    );
}

export default NavBar;
