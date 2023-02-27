import React, { createContext, useReducer, useContext, useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc, getDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from "../firebase";
import { AuthContext } from './authContext';

export const CartContext = createContext([]);

export default function CartContextProvider({ children }) {
    const [cartCounter, setCartCounter] = useState(initCounter)
    const [cart, cartDispach] = useReducer(cartReducer, [], initCart);
    const [totalPrice, setTotalPrice] = useState()
    const { online } = useContext(AuthContext);

    useEffect(() => {
        const auth = getAuth()
        auth.onAuthStateChanged((user) => {
            console.log("me llaman")
            if (user) {
                console.log("hay usuario")
                encontrarCartDeUsuario(user.uid);
            } else {
                console.log("no hay usuario")
            }
        })
    }, [online])

    const encontrarCartDeUsuario = async (userUid) => {
        const docRef = doc(db, "carts", userUid)
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
            setCartCounter(quant);
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
       // if(online){
            if (!isInCart(item) && (quantity > 0)) {
                setCartCounter(cartCounter + quantity)
                cartDispach({
                    type: 'add', payload: { ...item, quantity: quantity }
                });
           // }
        } else {
            window.location.assign("user/login")
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
        const docRef = doc(db, "orders", auth.currentUser.uid)
        const docSnap = await getDoc(docRef)
        let length = docSnap.exists() ? docSnap.data().orders.length+1 : 1
        let orderId = auth.currentUser.uid + "-" +length;
        let newOrder = {
            orderId: orderId,
            date: Date(),
            totalPrice: totalPrice,
            items: [...cart]
        }
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