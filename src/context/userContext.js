import React, { createContext, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect } from 'react/cjs/react.production.min';
import { getDoc, doc } from 'firebase/firestore';
import { db } from "../firebase";

export const UserContext = createContext([]);

export default function UserContextProvider({ children }){
    const [ user, setUser ] = useState([]);
    const [ admin, setAdmin ] = useState(false)
    
    const logIn = (emailUserLogin, passwordUserLogin, session) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, emailUserLogin, passwordUserLogin)
            .then((userCredential) => {
                // Loged in
                //session.checked === true ? localStorage.setItem(emailUserLogin, passwordUserLogin): sessionStorage.setItem(emailUserLogin, passwordUserLogin);
                const user = userCredential.user;
                setUser(user.email);
                isAdmin(userCredential.user.uid); 
                console.log("Se inició la sesion del usuario: "+user.email);
                
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
            console.log("Se registró el usuario: "+user.email)
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
    
    }

    const logOut = async () =>  {
        console.log("Se cerró la sesión del usuario")
        setAdmin(false)
        return setUser(0)
        };

    const isAdmin = (userUid) => {
            const ref = doc(db, "users", userUid);
            getDoc(ref)
                .then((snapshot) =>{
                    if(snapshot.exists()){
                        if(snapshot.data().admin){
                            setAdmin(true)
                        }
                    }              
                })
            }
            
    return ( <UserContext.Provider value={{ logIn, signIn, user, logOut, admin }}>
        {children}
        </UserContext.Provider>
    )
}