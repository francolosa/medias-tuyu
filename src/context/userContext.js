import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth,  signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserSessionPersistence, } from "firebase/auth";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { CartContext } from './cartContext'

export const UserContext = createContext([]);

export default function UserContextProvider({ children }) {
    const { cart } = useContext(CartContext);

    const logIn = async (emailUserLogin, passwordUserLogin, session) => {
        const auth = getAuth();       
        console.log("session el logIn =>" + session)
        sessionStorage.setItem('session', session)
        if(session == false){
            console.log("setpersistence")
            await setPersistence(auth, browserSessionPersistence)
        }
        let response;
        await signInWithEmailAndPassword(auth, emailUserLogin, passwordUserLogin)
            .then((userCredential) => {
                const user = userCredential.user;
                if(session == false){
                    setCartToSessionStorage(user.uid).then(()=>{
                        window.location.assign("/")
                    })
                } else {
                    setCartToLocalStorage(user.uid).then(()=>{
                        window.location.assign("/")
                    })
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
    async function setCartToLocalStorage(useruid) {
        console.log("setCartToLocalStorage")
        console.log("userData.uid => " + useruid)
        const docRef = doc(db, "carts", useruid)
        const docSnap = await getDoc(docRef)
        let cartSnap = docSnap.data().cart
        console.log("cartSnap =>" +cartSnap)
        let cartCounter = 0
        cartSnap.forEach(element => {
            cartCounter = cartCounter+element.quantity
        });
        console.log("cartCounter =>" +cartCounter)
        localStorage.setItem('cartCounter', JSON.stringify(cartCounter))
        localStorage.setItem('cart', JSON.stringify(cartSnap))
    }
    
    async function setCartToSessionStorage(useruid) {
        console.log("setCartToSessionStorage")

        console.log("userData.uid => " + useruid)
        const docRef = doc(db, "carts", useruid)
        const docSnap = await getDoc(docRef)
        let cartSnap = docSnap.data().cart
        console.log("cartSnap =>" +cartSnap)
        let cartCounter = 0
        cartSnap.forEach(element => {
            cartCounter = cartCounter+element.quantity
        });
        console.log("cartCounter =>" +cartCounter)
        sessionStorage.setItem('cartCounter', JSON.stringify(cartCounter))
        sessionStorage.setItem('cart', JSON.stringify(cartSnap))
    }

    const saveCartOnDB = async () => {
        console.log("savecartondb")
        const auth = getAuth();
        await setDoc(doc(db, "carts", auth.currentUser.uid), {
            cart: [...cart],
            updatedAt: Date()
        })
    }

    useEffect(()=> {
        let session = sessionStorage.getItem('session')
        console.log("session en useeffect 110 =>"+ session)
        if(session == "false"){
            console.log("sesion false")
            saveCartOnDB();
        }
    }, [cart])

    const removeCartFromStorage = async () => {
        localStorage.clear();
        sessionStorage.clear();
    }

    const logOut = async () => {
            const auth = getAuth();
            await saveCartOnDB();
            await removeCartFromStorage()
            signOut(auth).then(()=>{
                window.location.assign("/")
            })
    };


    return (<UserContext.Provider value={{ logIn, signIn, logOut }}>
        {children}
    </UserContext.Provider>
    )
}