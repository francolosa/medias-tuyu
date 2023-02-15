import React, { useState } from 'react';
import AddToCart from '../../Cart/AddToCart';
import Button from 'react-bootstrap/Button';

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
            <Button variant="light" onClick={aumentarContador}>+</Button>
            <Button variant="light" disabled>{counter}</Button>
                <Button variant="light" onClick={disminuirContador}>-</Button>
            <AddToCart item={item} quantity={counter} />
            </div>

        </>
    )

}