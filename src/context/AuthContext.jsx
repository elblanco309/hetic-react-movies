import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('cinepulse_user');
        return saved ? JSON.parse(saved) : null;
    });

    function register(username, email, password) {
        const existing = localStorage.getItem('cinepulse_accounts');
        const accounts = existing ? JSON.parse(existing) : [];
        if (accounts.find((a) => a.email === email)) {
            return { success: false, error: 'Cet email est déjà utilisé.' };
        }
        const newUser = { username, email, password };
        accounts.push(newUser);
        localStorage.setItem('cinepulse_accounts', JSON.stringify(accounts));
        const sessionUser = { username, email };
        localStorage.setItem('cinepulse_user', JSON.stringify(sessionUser));
        setUser(sessionUser);
        return { success: true };
    }

    function login(email, password) {
        const existing = localStorage.getItem('cinepulse_accounts');
        const accounts = existing ? JSON.parse(existing) : [];
        const found = accounts.find((a) => a.email === email && a.password === password);
        if (!found) {
            return { success: false, error: 'Email ou mot de passe incorrect.' };
        }
        const sessionUser = { username: found.username, email: found.email };
        localStorage.setItem('cinepulse_user', JSON.stringify(sessionUser));
        setUser(sessionUser);
        return { success: true };
    }

    function logout() {
        localStorage.removeItem('cinepulse_user');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
