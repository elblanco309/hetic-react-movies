import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import styles from './Register.module.css';

function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        const result = register(username, email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Inscription</h1>
                {error && <p className={styles.error}>{error}</p>}
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Pseudo"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        className={styles.input}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className={styles.passwordWrapper}>
                        <input
                            className={styles.input}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" className={styles.eyeButton} onClick={() => setShowPassword(!showPassword)}>👁️</button>
                    </div>
                    <button className={styles.button} type="submit">S'inscrire</button>
                </form>
                <p className={styles.link}>
                    Déjà un compte ? <Link to="/login">Se connecter</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
