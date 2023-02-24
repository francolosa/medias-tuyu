import React, { createContext, useReducer, useState, useEffect, useContext } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc, getDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from "../firebase";

export const CartContext = createContext([]);

export default function CartContextProvider({ children }) {
    const [cartCounter, setCartCounter] = useState(initCounter)
    const [cart, cartDispach] = useReducer(cartReducer, [], initCart);
    const [totalPrice, setTotalPrice] = useState()

    useEffect(() => {
        const auth = getAuth()
        auth.onAuthStateChanged((user) => {
            if (user) {
                encontrarCartDeUsuario();
            } else {
                localStorage.removeItem('cart')
                localStorage.removeItem('cartCounter')
            }
        })
    }, [])

    const encontrarCartDeUsuario = async () => {
        const auth = getAuth()
        const docRef = doc(db, "carts", auth.currentUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            let cart = docSnap.data().cart
            let quant = 0
            console.log(cart)
            cart.forEach(item => {
                quant += item.quantity
            })
            let counterJSON = JSON.stringify(quant)
            let cartJSON = JSON.stringify(cart)
            localStorage.setItem('cartCounter', counterJSON);
            localStorage.setItem('cart', cartJSON)
        }
    }

    function initCounter() {
        const localData = localStorage.getItem('cartCounter');
        if (undefined != typeof localData) {
            return JSON.parse(localData)
        }
    }
    function initCart() {
        const localData = localStorage.getItem('cart');
        if (null != localData || localData == false) {
            return JSON.parse(localData);
        }
        return [];
    }

    function cartReducer(cart, action) {
        switch (action.type) {
            case 'add':
                return [...cart, action.payload];
            case 'delete':
                return cart.filter(element => action.item_id !== element.id);
            case 'updateQuantity':
                for (var i = 0; i < cart.length; i++) {
                    if (cart[i].id == action.item_id) {
                        cart[i].quantity = action.quantity;
                        return [...cart];
                    }
                }
            case 'clear':
                return [];
        }
    }
    // guarda la info de cantidad y items en local storage para conservarla durante la sesion
    useEffect(() => {
        const cartCounterJSON = JSON.stringify(cartCounter)
        const cartJSON = JSON.stringify(cart)
        localStorage.setItem('cartCounter', cartCounterJSON)
        localStorage.setItem('cart', cartJSON)

    }, [cart]);

    useEffect(() => {
        let precioTotal = 0;
        if (Array.isArray(cart)) {
            cart.forEach(element => {
                precioTotal = precioTotal + element.precio * element.quantity
            });
        }
        setTotalPrice(precioTotal)
    });

    function addToCart(item, quantity) {
        if (!isInCart(item) && (quantity > 0)) {
            setCartCounter(cartCounter + quantity)
            cartDispach({
                type: 'add', payload: { ...item, quantity: quantity }
            });
        }
    }

    function deleteFromCart(item) {
        setCartCounter(cartCounter - item.quantity)
        cartDispach({ type: 'delete', item_id: item.id });
    }


    function modifyQuantInCart(item, newQuantity) {

        cartDispach({
            type: 'updateQuantity',
            item_id: item.id,
            quantity: newQuantity
        });

    }

    function clearCart() {
        setCartCounter(0)
        const emptyCart = [];
        cartDispach({ type: 'clear' });
    }

    function isInCart(item) {
        if (Array.isArray(cart) && cart.length > 0) {
            return cart.find(element => item.id === element.id) ? true : false;
        } else {
            return false;
        }
    }

    const actualizarStockItems = async () => {
        await cart.forEach(element => {
            const itemRef = doc(db, 'items', element.id);
            getDoc(itemRef).then((snapshot) => {
                updateDoc(itemRef, {
                    "stock": snapshot.data().stock - element.quantity
                });
            });
        });
    }
    const saveOrderOnDB = async () => {
        const auth = getAuth();
        let newOrder = {
            date: Date(),
            totalPrice: totalPrice,
            items: [...cart]
        }
        const docRef = doc(db, "orders", auth.currentUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            await updateDoc(doc(db, "orders", auth.currentUser.uid), {
                orders: arrayUnion(newOrder),
                updatedAt: Date()
            })
        } else {
            await setDoc(doc(db, "orders", auth.currentUser.uid), {
                orders: [newOrder],
                updatedAt: Date()
            })
        }
    }

    const generarOrden = async () => {
        const auth = getAuth()
        if (auth.currentUser == null) {
            return window.location.assign("user/logIn")
        }
        await saveOrderOnDB()
        //actualizarStockItems();
        clearCart()
    }
    return (<CartContext.Provider value={{ cart, cartCounter, setCartCounter, cartDispach, addToCart, deleteFromCart, clearCart, modifyQuantInCart, generarOrden, totalPrice }}>
        {children}
    </CartContext.Provider>
    )
}