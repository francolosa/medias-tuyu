import React, { createContext, useState, useEffect, useContext } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from "../firebase";
import { getAuth } from 'firebase/auth';
import { UserContext } from './userContext'
export const CartContext = createContext([]);

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') , "[]");

export default function CartContextProvider({ children }){
    const [ cart, setCart ] = useState(cartFromLocalStorage);
    const [ totalPrice, setTotalPrice ] = useState()
    const { user } = useContext(UserContext);

    useEffect(()=>{
        const data = localStorage.getItem('cart');
        if(data){
            setCart(JSON.parse(data))
        }
    }, [])

    useEffect(()=>{
        const cartJSON = JSON.stringify(cart)
        localStorage.setItem('cart', cartJSON)
    })  

    //USER
    const addToCart = (item, quantity) => {
         if(!isInCart(item) && (quantity > 0)){ setCart([...cart, {...item, quantity: quantity }])}
    }

    const deleteFromCart = (item) => setCart(cart.filter(element =>  item.id !== element.id  ));
    
    const modifyQuantInCart = (item, counter) => {
        
        for(var i=0;i<cart.length;i++){
            if(cart[i].id == item.id){
                 cart[i].quantity = counter
            }
        }
        setCart([...cart])

    }

    const clearCart = () => setCart([]);

    const isInCart = (item) => {
        let state = false;
        cart.find(element => item.id === element.id ? state = true: state = false );
        return state;
    }

    useEffect(()=>{
        let precioTotal = 0;
        cart.forEach(element => {
            precioTotal = precioTotal+element.precio*element.quantity
        });
        setTotalPrice(precioTotal)

    })

    const generarOrden = () => {
        const orders = collection(db, 'orders');
        const auth = getAuth()
        console.log(user)
        let newOrder = {
            userUid: auth.currentUser.uid,
            userEmail: auth.currentUser.email,
            fecha: Date(),
            totalPrice: totalPrice,
            items: [...cart]
        }

        addDoc(orders, newOrder);
        console.log("Se generó una nueva orden: ",newOrder)

        // esto debería ocurrir una vez acreditado el pago:
        


    }
    console.log(cart)

    return ( <CartContext.Provider value={{ cart, setCart, addToCart, deleteFromCart, clearCart, modifyQuantInCart, generarOrden, totalPrice }}>
        {children}
        </CartContext.Provider>
    )
}