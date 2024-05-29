import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const authContext = createContext();

export const useAuth = () => useContext(authContext);

export const AuthProvider = ({children}) => {

    const [cookies, setCookies, removeCookies] = useCookies();
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = cookies.token;
        if (token) {
            const payload = jwtDecode(token);
            const user = payload.user;
            setUser(user);
            setIsAuthenticated(true);
        }
        else {
            setUser(null);
            setIsAuthenticated(false);
        }
    }, [cookies.token]);

    const authenticate = useCallback((token) => {
        const payload = jwtDecode(token);
        const user = payload.user;

        setCookies("token", token, {
            expires: new Date(payload.exp * 1000),
        });

        setIsAuthenticated(true);
        setUser(user);
    }, [setCookies]);

    const logout = useCallback(() => {
        removeCookies("token");
        setUser(null);
        setIsAuthenticated(false);
    }, [removeCookies]);

    return (
        <authContext.Provider value={{
            user,
            isAuthenticated,
            authenticate,
            logout,
        }}>
            {children}
        </authContext.Provider>
    );
};
