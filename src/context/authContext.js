import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext([]);

export default function AuthContextProvider({children}){
    const [online, setIsOnline] = useState();
    const [userData, setUserData] = useState(false);
   
    useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
            if (user) {  
                setUserData({
                    uid: user.uid,
                    email: user.email
                })
                setIsOnline(true);
                return;
            } else {
                setIsOnline(false);
                setUserData(false)
            }
    });
   }, [])


    return <AuthContext.Provider value={{online, userData}}>
        {children}
        </AuthContext.Provider>
}