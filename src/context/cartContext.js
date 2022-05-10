import React, { createContext, useState } from 'react';

export const CartContext = createContext([]);

export default function CartContextProvider({ children }){
    const [ cart, setCart ] = useState([]);

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

    console.log(cart)
    

    return ( <CartContext.Provider value={{ cart, setCart, addToCart, deleteFromCart, clearCart, modifyQuantInCart }}>
        {children}
        </CartContext.Provider>
    )
}