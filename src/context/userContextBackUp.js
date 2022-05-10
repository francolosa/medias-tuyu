import React, { createContext, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from 'firebase/firestore';
import { db } from "../firebase";
import Cookies from 'universal-cookie'
import { firebase } from '../firebase'

export const UserContext = createContext([]);

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState([]);
    const [admin, setAdmin] = useState(false)

    const logIn = async (emailUserLogin, passwordUserLogin, session) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, emailUserLogin, passwordUserLogin)
            .then((userCredential) => {
                // Loged in
                const user = userCredential.user;
                setUser(user.email);
                isAdmin(userCredential.user.uid);
                if(session){saveSession(userCredential)}
                console.log("Se inició la sesion del usuario: " + user.email);

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
        console.log("Se cerró la sesión del usuario")
        setAdmin(false)
        return setUser(0)
    };

    const isAdmin = (userUid) => {
        const ref = doc(db, "users", userUid);
        getDoc(ref)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    if (snapshot.data().admin) {
                        setAdmin(true)
                    }
                }
            })
    }

    const saveSession = (userCredential) => {
        const cookies = new Cookies();
        console.log(userCredential)
        cookies.set('userId', userCredential.user.uid, { path: '/' })
        cookies.set('userName', userCredential.user.email, { path: '/' })
        //cookies.set('admin', admin, { path: '/' })
    }

    return (<UserContext.Provider value={{ logIn, signIn, user, logOut, admin }}>
        {children}
    </UserContext.Provider>
    )
}