import React, { createContext, useState } from 'react';
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export const UserContext = createContext([]);

export default function UserContextProvider({ children }) {

    const logIn = async (emailUserLogin, passwordUserLogin) => {
        const auth = getAuth();
        let response;
        await signInWithEmailAndPassword(auth, emailUserLogin, passwordUserLogin)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Se inició la sesion del usuario: " + user.email);
                response = {
                    status: 200,
                    state: user
                }
            })
            .catch((error) => {
                console.log(error)
                response = {
                    status: 400,
                    state: error.message
                }
            });
            return response;
    }

    const signIn = async (userEmail, passwordUserCreate, repeatPassword) => {
        const auth = getAuth();
        let response;
        if (passwordUserCreate != repeatPassword) {
            response = {
                status: 600,
                state: "las contraseñas no coinciden"
            };
        }
        await createUserWithEmailAndPassword(auth, userEmail, passwordUserCreate)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log("Se registró el usuario: " + user.email)
                response = {
                    status: 200,
                    state: user
                }
            })
            .catch((error) => {
                console.log(error.message);
                response = {
                    status: 400,
                    state: error.message
                }
            });
        return response;
    }

    const logOut = async () => {
        //Logged out
        const auth = getAuth()
        signOut(auth).then(() => {
            console.log("Se cerró la sesión del usuario")
        })
        window.location.assign("/")
    };

    return (<UserContext.Provider value={{ logIn, signIn, logOut }}>
        {children}
    </UserContext.Provider>
    )
}