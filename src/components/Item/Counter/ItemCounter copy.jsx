import React, { useState } from 'react';
import AddToCart from '../../Cart/AddToCart';

export default function ItemCounter({ item }) {

    let [counter, setCounter] = useState(0);
    
    let aumentarContador = (evt) => {
        evt.preventDefault()
        return counter < item.stock ? setCounter(++counter) : "";
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