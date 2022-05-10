import React, { createContext } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const AdminContext = createContext([]);

export default function AdminContextProvider({ children }) {

    const logInAdmin = async (emailUserLogin, passwordUserLogin, session) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, emailUserLogin, passwordUserLogin)
            .then((userCredential) => {
                // Loged in
                const user = userCredential.user;
                console.log("Se inició la sesion del administrador: " + user.email);
                window.location.assign("/admin/products")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    
    return (<AdminContext.Provider value={{ logInAdmin }}>
        {children}
    </AdminContext.Provider>
    )
}