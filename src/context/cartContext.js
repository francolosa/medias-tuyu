import React, { createContext, useReducer, useContext, useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc, getDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from "../firebase";

export const CartContext = createContext([]);

export default function CartContextProvider({ children }) {
    const [cartCounter, setCartCounter] = useState(initCounter)
    const [cart, cartDispach] = useReducer(cartReducer, [], initCart);
    const [totalPrice, setTotalPrice] = useState()

    function initCounter() {
        console.log("initCounter")
        const session = sessionStorage.getItem('session');
        console.log("session  en initcounter => "+session)
        console.log(session)
        let localData;
        if(session == "false"){
            console.log("session  en initcounter false => "+session)

             localData = sessionStorage.getItem('cartCounter');
        } else {
            console.log("session  en initcounter else => "+session)

            localData = localStorage.getItem('cartCounter');
        }
        if (undefined != typeof localData) {
            return JSON.parse(localData)
        }
    }

    function initCart() {
        console.log("initcart")
        const session = sessionStorage.getItem('session');
        console.log("session en initcart => "+session)

        let localData;
        if(session == "false"){
            console.log("session  en initcart false => "+session)

            localData = sessionStorage.getItem('cart')
        } else {
            console.log("session en initcart else => "+session)

            localData = localStorage.getItem('cart');
        }
        if (null != localData || localData == false) {
            return JSON.parse(localData);
        }
        return [];
    }


    useEffect(() => {
        let session = sessionStorage.getItem('session')
        if (session == "false") {
            console.log("session  en useeffect false cart context => "+session)
            sessionStorage.setItem('cartCounter', JSON.stringify(cartCounter))
            sessionStorage.setItem('cart', JSON.stringify(cart))
        } else {
            console.log("session en useffect else en cart context => "+session)
            localStorage.setItem('cartCounter', JSON.stringify(cartCounter))
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }, [cart])

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

    useEffect(() => {
        let precioTotal = 0;
        if (Array.isArray(cart)) {
            cart.forEach(element => {
                precioTotal = precioTotal + element.precio * element.quantity
            });
        }
        setTotalPrice(precioTotal)
    }, [cart]);

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
        const docRef = doc(db, "orders", auth.currentUser.uid)
        const docSnap = await getDoc(docRef)
        let length = docSnap.exists() ? docSnap.data().orders.length + 1 : 1
        let orderId = auth.currentUser.uid + "-" + length;
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
        actualizarStockItems();
        clearCart()
    }
    return (<CartContext.Provider value={{ cart, cartCounter, setCartCounter, cartDispach, addToCart, deleteFromCart, clearCart, modifyQuantInCart, generarOrden, totalPrice }}>
        {children}
    </CartContext.Provider>
    )
}