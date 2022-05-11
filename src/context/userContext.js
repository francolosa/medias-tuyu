import React, { createContext, useState } from 'react';
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export const UserContext = createContext([]);

export default function UserContextProvider({ children }) {

    const logIn = async (emailUserLogin, passwordUserLogin) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, emailUserLogin, passwordUserLogin)
            .then((userCredential) => {
                // Loged in
                const user = userCredential.user;
                console.log("Se inició la sesion del usuario: " + user.email);
                 window.location.assign("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    const signIn = (userEmail, passwordUserCreate) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, userEmail, passwordUserCreate)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("Se registró el usuario: " + user.email)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    const logOut = async () => {
        //Logged out
        const auth = getAuth()
        signOut(auth).then(()=>{
            console.log("Se cerró la sesión del usuario")
        })
    };

    return (<UserContext.Provider value={{ logIn, signIn, logOut }}>
        {children}
    </UserContext.Provider>
    )
}