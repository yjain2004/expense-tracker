import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setuser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await axios.post("http://localhost:3000/api/auth/user", {}, { withCredentials: true })
                setuser(res.data.user)
                setIsAuth(true)

            } catch (error) {
                setuser(null)
                setIsAuth(false)
            } finally {
                setLoading(false)
            }
        }

        fetchUser();
    }, [])

    async function login(data) {
        try {
            const res = await axios.post("http://localhost:3000/api/auth/login", data, { withCredentials: true })
            setuser(res.data.user)
            setIsAuth(true)
            return res;
        } catch (error) {
            alert(error?.response?.data?.message)

        }

    }

    async function logout() {
        try {
            await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true })
            setuser(null)
            setIsAuth(false)
            setLoading(false)
        } catch (error) {
            alert(error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuth, loading, login, logout }} >{children}</AuthContext.Provider>
    )

}

export function useAuth() {
    return useContext(AuthContext);
}