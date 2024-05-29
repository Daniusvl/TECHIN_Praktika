import { createContext, useCallback, useContext } from "react";

import { usersModel } from "../../../shared/api/usersModel.mjs";

const registrationContext = createContext();

export const useRegistration = () => useContext(registrationContext);

export const RegistrationProvider = ({children}) => {

    const registration = useCallback(async (body) => {
        if(body.password !== body.repeatPassword){
            const errors = [{
                path: "repeatPassword",
                msg: "Passwords do not match"
            }];
            return [false, {errors}];
        }

        const response = await usersModel.register(body);

        if(response.status === 400){
            return [false, response.data];
        }

        if(response.status === 409){
            const errors = [{
                path: "email",
                msg: "Email already taken"
            }];
            return [false, {errors}];
        }

        if(response.status === 500){
            const errors = [{
                path: "email",
                msg: "Server side error"
            }];
            return [false, {errors}];
        }
        return [true, response.data];
    }, []);

    return (
        <registrationContext.Provider value={{
            registration
        }}
        >
            {children}
        </registrationContext.Provider>
    );
};
