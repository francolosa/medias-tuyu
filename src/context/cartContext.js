import React, { createContext, useState, useEffect, useContext } from 'react';
import { addDoc, doc, collection, updateDoc, getDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from "../firebase";
import { getAuth } from 'firebase/auth';
import { UserContext } from './userContext'
export const CartContext = createContext([]);

//const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'), "[]");

export default function CartContextProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState()
    const { user } = useContext(UserContext);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('cart'));
        if (data) {
            console.log(data)
            setCart(data)
        }
    }, [])
    
    useEffect(() => {
        const cartJSON = JSON.stringify(cart)
        localStorage.setItem('cart', cartJSON)
    })

    //USER
    const addToCart = (item, quantity) => {
        if (!isInCart(item) && (quantity > 0)) { 
            //setCart([...cart, { ...item, quantity: quantity }]);
          //  setCart([...cart, item]);
            //localStorage.setItem('cart', JSON.stringify(cart));

            setCart( ( prevState)  => ({
                ...prevState,
                item
            }));
            //localStorage.setItem('cart', JSON.stringify(cart));

        }
    }


    const deleteFromCart = (item) => setCart(cart.filter(element => item.id !== element.id));

    const modifyQuantInCart = (item, counter) => {

        for (var i = 0; i < cart.length; i++) {
            if (cart[i].id == item.id) {
                cart[i].quantity = counter
            }
        }
        setCart([...cart])

    }

    const clearCart = () => setCart([]);

    const isInCart = (item) => {
        let state = false;
        console.log(typeof(cart))
        cart.find(element => item.id === element.id ? state = true : state = false);
        return state;
    }

    const actualizarStockItems = async () => {
        await cart.forEach(element => {
            const itemRef = doc(db, 'items', element.id)
            getDoc(itemRef).then((snapshot) => {
                updateDoc(itemRef, {
                    "stock": snapshot.data().stock - element.quantity
                })
            })

        });
    }

    const vincularUserConOrder = async (orderId) => {        
        const auth = getAuth()
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
            orders: arrayUnion(orderId)
        })
    }

    useEffect(() => {
        let precioTotal = 0;
        if( Array.isArray(cart)){
            cart.forEach(element => {
                precioTotal = precioTotal + element.precio * element.quantity
            });
        }
        setTotalPrice(precioTotal)

    })

    const generarOrden = () => {
        const auth = getAuth()
        const orders = collection(db, 'orders');
        let newOrder = {
            userUid: auth.currentUser.uid,
            userEmail: auth.currentUser.email,
            fecha: Date(),
            totalPrice: totalPrice,
            items: [...cart]
        }
         addDoc(orders, newOrder).then((docRef) => {
            vincularUserConOrder(docRef.id)
            })

        console.log("Se generó una nueva orden: ", newOrder)
         actualizarStockItems();
        clearCart();

    }
    console.log(cart)

    return (<CartContext.Provider value={{ cart, setCart, addToCart, deleteFromCart, clearCart, modifyQuantInCart, generarOrden, totalPrice }}>
        {children}
    </CartContext.Provider>
    )
}