import React, { createContext, useReducer, useContext, useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc, getDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from "../firebase";
import { AuthContext } from './authContext';

export const CartContext = createContext([]);

export default function CartContextProvider({ children }) {
    const [cartCounter, setCartCounter] = useState([]);

    useEffect(()=> {
        // SE FIJA SI HAY GUARDADO
        let cartCounter = JSON.parse(localStorage.getItem('cartCounter'));
        if(cartCounter != undefined){
            setCartCounter(cartCounter)
        } else {
            setCartCounter(0)
        }
    },[])

    useEffect(()=> {
        // AGARRA EL GUARDADO Y LO REESCRIBE
        localStorage.setItem('cartCounter', JSON.stringify(cartCounter))
    },[cartCounter])


    const addToCart = () => {
        console.log("adding to cart")
        setCartCounter(cartCounter+1)
    }
    
    return (<CartContext.Provider value={{ cartCounter, addToCart }}>
        {children}
    </CartContext.Provider>
    )
}