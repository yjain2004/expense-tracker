import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    // 🔹 Runs ONLY on app load / reload
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/auth/user`,
                    {},
                    { withCredentials: true }
                );

                setUser(res.data.user);
                setIsAuth(true);
            } catch {
                // ❗ Do NOT alert here
                setUser(null);
                setIsAuth(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // 🔹 Login trusts backend response (no re-check)
    async function login(data) {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                data,
                { withCredentials: true }
            );

            // ✅ Set auth state directly
            setUser(res.data.user);
            setIsAuth(true);

            return res;
        } catch (error) {
            throw error;
        }
    }

    // 🔹 Logout explicitly clears auth
    async function logout() {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/logout`,
                {},
                { withCredentials: true }
            );
        } finally {
            setUser(null);
            setIsAuth(false);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuth, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
