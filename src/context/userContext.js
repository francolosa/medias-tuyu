import React, { createContext, useState, useContext } from 'react';
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { addDoc, doc, query, createDoc, where, collection, updateDoc, getDoc, getDocs, arrayUnion, setDoc, DocumentReference } from 'firebase/firestore';
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
    /*
    if(auth.currentUser == null){
        return window.location.assign("user/logIn")
    } */
    const encontrarCartDeUsuario = async () => {
        const auth = getAuth();
        let oldCart = { "exist": false };
        const userCart = query(collection(db, "carts"), where("userUid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(userCart);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
            oldCart = {
                "exist": true,
                "cartUId": doc.id,
                "content": doc.data()
            }    
          return oldCart;
        });
        return oldCart;
    }

    const vincularCartConUser = async () => {
        const auth = getAuth();
        let cartRef = collection(db, 'carts')
        let oldCart = await encontrarCartDeUsuario();
        if(oldCart.exist == false){
            await addDoc(cartRef, {
                userUid: auth.currentUser.uid,
                cart: [...cart]
            }).then((response) => {
                console.log(response)
            }) 
        } 
        if(oldCart.exist == true) {
            cartRef = doc(db, 'carts', oldCart.cartUId)
            await updateDoc(cartRef, {
                cart: [...cart]
            }).then((response) => {
                console.log(response)
            }) 
        }
    }

    const logOut = async () => {
        console.log("cerrando sesion")
        const auth = getAuth();

        await vincularCartConUser();
        
        //Logged out
        signOut(auth).then(() => {
            console.log("Se cerró la sesión del usuario")
        })
        window.location.assign("/")
        
    };

    return (<UserContext.Provider value={{ logIn, signIn, logOut, encontrarCartDeUsuario }}>
        {children}
    </UserContext.Provider>
    )
}