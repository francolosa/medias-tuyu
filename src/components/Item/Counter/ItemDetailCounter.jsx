import React, { useState } from 'react';
import AddToCart from '../../Cart/AddToCart';

export default function ItemDetailCounter({ item, stock }) {

    let [counter, setCounter] = useState(0);
    
    let aumentarContador = (evt) => {
        evt.preventDefault()
        return counter < stock ? setCounter(counter+1) : "";
    }
    let disminuirContador = (evt) => {
        evt.preventDefault()
        return counter > 0 ? setCounter(--counter) : "";
    }
 
    return (
        <>
            <div className='itemCounter'>
                <button onClick={aumentarContador}>+</button>
                {counter}
                <button onClick={disminuirContador}>-</button>
            <AddToCart item={item} quantity={counter} />
            </div>

        </>
    )

}