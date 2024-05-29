import { createContext, useCallback, useContext } from "react";

import { usersModel } from "../../../shared/api/usersModel.mjs";

const loginContext = createContext();

export const useLogin = () => useContext(loginContext);

export const LoginProvider = ({children}) => {

    const login = useCallback(async (body) => {
        const {status, data} = await usersModel.login(body);

        if(status === 400){
            return [false, data];
        }

        if(status === 401){
            return [false, {errors: [
                {
                    path: "password",
                    msg: "Invalid email/password"
                }
            ]}];
        }

        if(status === 500){
            throw new Error("Server side error");
        }

        return [true, data];
    }, []);

    return (
        <loginContext.Provider value={{
            login
        }}>
            {children}
        </loginContext.Provider>
    );
};
