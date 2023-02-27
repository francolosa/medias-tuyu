import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc } from 'firebase/firestore';
import { CartContext } from './cartContext'

export const UserContext = createContext([]);

export default function UserContextProvider({ children }) {
    const { cart } = useContext(CartContext);
    
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

    const saveCartOnDB = async () => {
        const auth = getAuth();
        await setDoc(doc(db, "carts", auth.currentUser.uid), {
            cart: [...cart],
            updatedAt: Date()
        })
    }

    const logOut = async () => {
        const auth = getAuth();
        await saveCartOnDB();
        await signOut(auth)
        window.location.assign("/")
    };

    return (<UserContext.Provider value={{ logIn, signIn, logOut }}>
        {children}
    </UserContext.Provider>
    )
}