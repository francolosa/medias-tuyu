import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext([]);

export default function AuthContextProvider({children}){
    const [online, setIsOnline] = useState();
    const [userUid, setUserUid] = useState(false);
    
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {  
                setUserUid(user.uid)
                setIsOnline(true);
            } else {
                setIsOnline(false);
                setUserUid(false)
            }
        });
    }, []);

    return <AuthContext.Provider value={{online, userUid}}>
        {children}
        </AuthContext.Provider>
}