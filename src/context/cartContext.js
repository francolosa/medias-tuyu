import React, { createContext, useReducer, useState, useEffect, useContext } from 'react';
import { addDoc, doc, collection, updateDoc, getDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { db } from "../firebase";
import { getAuth } from 'firebase/auth';
import { UserContext } from './userContext'
export const CartContext = createContext([]);

export default function CartContextProvider({ children }) {
    
    const [cart, cartDispach ] = useReducer( cartReducer, [], initCart);
    const [cartCounter, setCartCounter ] = useState(initCounter)
    const [totalPrice, setTotalPrice] = useState()
    const { user } = useContext(UserContext);

    function initCart() {
        const localData = localStorage.getItem('cart');
        console.log(localData)
        if( 'null' != localData ) {
            return JSON.parse( localData );
        }
        return [];
    }  
    function initCounter(){
        const localData = localStorage.getItem('cartCounter');
        if( 'undefined ' != typeof localData ){
            return JSON.parse( localData )
        }
    }

    function cartReducer( cart, action ) {
        switch( action.type ) {
            case 'add':
                return [...cart,action.payload];
            case 'delete':
                return cart.filter( element => action.item_id !== element.id );
            case 'updateQuantity':
                for (var i = 0; i < cart.length; i++) {
                    if (cart[i].id == action.item_id ) {
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
        const cartJSON = JSON.stringify(cart)
        localStorage.setItem('cart', cartJSON)
        const cartCounterJSON = JSON.stringify(cartCounter)
        localStorage.setItem('cartCounter', cartCounterJSON)
    },[cart]);

    useEffect(() => {
        let precioTotal = 0;
        if( Array.isArray(cart)){
            cart.forEach(element => {
                precioTotal = precioTotal + element.precio * element.quantity
            });
        }
        setTotalPrice(precioTotal)

    });


    /*
    * Function addToCart
    *
    */
    function addToCart( item, quantity ) {
        if ( ! isInCart( item ) && ( quantity > 0) ) {
            setCartCounter(cartCounter+quantity)
            cartDispach( {
                type:'add', payload: { ...item, quantity: quantity } } );
        }
    }

    /*
    * Function deleteFromCart
    *
    */
    function deleteFromCart( item ) {
        setCartCounter(cartCounter-item.quantity)
        cartDispach( {type:'delete',item_id: item.id } );
    }

    /*
    * Function deleteFromCart
    *
    */
   function modifyQuantInCart(item, newQuantity ) {

        cartDispach({ 
            type: 'updateQuantity', 
            item_id: item.id,
            quantity: newQuantity
         });

    }

    /*
    * Function deleteFromCart
    *
    */
   function clearCart() {
        setCartCounter(0)
        const emptyCart = [];
        cartDispach({ type: 'clear' });
    }

    /*
    * Function isInCart
    *
    */
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

    const vincularUserConOrder = async (orderId) => {        
        const auth = getAuth()
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
            orders: arrayUnion(orderId)
        })
    }

    
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
    return (<CartContext.Provider value={{ cart, cartCounter, setCartCounter, cartDispach, addToCart, deleteFromCart, clearCart, modifyQuantInCart, generarOrden, totalPrice }}>
        {children}
    </CartContext.Provider>
    )
}