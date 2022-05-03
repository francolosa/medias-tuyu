import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../../context/cartContext';

//import AddToCart from '../../Cart/AddToCart';

export default function ItemInCartCounter({ item }) {
    let [counter, setCounter] = useState(item.quantity);

    const { modifyQuantInCart } = useContext(CartContext);

    let aumentarContador = (evt) => {
        evt.preventDefault()
        if(counter < item.stock){
        setCounter(++counter)
        modifyQuantInCart(item, counter)
        }
    }

    let disminuirContador = (evt) => {
        evt.preventDefault()
        if(counter > 0){
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