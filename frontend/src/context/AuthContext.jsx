import { createContext, useState } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [CurrentUser, SetCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const updateUser = (data) => {
        if (!data) {
            SetCurrentUser(null);
            return;
        }
        const { token, ...user } = data;
        SetCurrentUser(user);
    }

    const logout = () => {
        SetCurrentUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    useEffect(() => {
        localStorage.setItem("user",JSON.stringify(CurrentUser))
    

    }, [CurrentUser]);

    return (
    <AuthContext.Provider value={{ CurrentUser, updateUser, logout }}>
        {children}
        </AuthContext.Provider>
        );
}
