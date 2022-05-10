import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from 'firebase/firestore';
import { db } from "../firebase";

export const AuthContext = createContext([]);

export default function AuthContextProvider({children}){
    const [online, setIsOnline] = useState();
    const [ admin, setAdmin ] = useState();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {  
                setIsOnline(true);
                isAdmin(user.uid);
            } else {
                setIsOnline(false);
                setAdmin(false)
            }
        });
    }, []);

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


    return <AuthContext.Provider value={{online, admin}}>
        {children}
        </AuthContext.Provider>
}