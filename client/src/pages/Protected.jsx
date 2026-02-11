import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

export default function Protected({ children }) {
    const { isAuth, loading } = useAuth();

    if (loading) return <p>Loading...</p>;
    if (!isAuth) return <Navigate to="/login" />;

    return children;
}
