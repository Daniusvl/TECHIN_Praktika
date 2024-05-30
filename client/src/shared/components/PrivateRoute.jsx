import { useEffect } from "react";
import { useAuth } from "../../shared/hooks/useAuth";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({children, showAccessDenied, role}) => {

    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        if(isAuthenticated && role !== user.role){
            showAccessDenied();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    return (isAuthenticated ? (role === user.role ? children : <Navigate to="/" />) : <Navigate to="/login" />);
};
