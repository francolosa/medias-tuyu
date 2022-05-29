import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../../context/cartContext';

//import AddToCart from '../../Cart/AddToCart';

export default function ItemInCartCounter({ item }) {
    let [counter, setCounter] = useState(item.quantity);

    const { modifyQuantInCart, cartCounter, setCartCounter } = useContext(CartContext);

    let aumentarContador = (evt) => {
        evt.preventDefault()
        if(counter < item.stock){
        setCartCounter(cartCounter+1)
        setCounter(++counter)
        modifyQuantInCart(item, counter)
        }
    }

    let disminuirContador = (evt) => {
        evt.preventDefault()
        if(counter > 0){
         setCartCounter(cartCounter-1)
         setCounter(--counter)
         modifyQuantInCart(item, counter)
        };
    }



    return (
        <>
            <div className='itemCounter'>
                <button onClick={aumentarContador}>+</button>
                {counter}
                <button onClick={disminuirContador}>-</button>
            </div>
        </>
    )

}