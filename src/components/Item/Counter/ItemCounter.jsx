import React, { useReducer, useContext } from 'react';
import AddToCart from '../../Cart/AddToCart';
import { CartContext } from '../../../context/cartContext';
import Button from 'react-bootstrap/Button';

export default function ItemCounter({ item }) {
    //    const { cartCounter, setCartCounter } = useContext(CartContext)
    const [counter, setCounterReducer] = useReducer(counterReducer, 0);

    let aumentarContador = (evt) => {
        evt.preventDefault()
        return counter < item.stock ? setCounterReducer({ type: 'plus', payload: counter }) : "";
    }
    let disminuirContador = (evt) => {
        evt.preventDefault()
        return counter > 0 ? setCounterReducer({ type: 'minus', payload: counter }) : "";
    }

    function counterReducer(counter, action) {
        switch (action.type) {
            case 'plus':
                //                setCartCounter(cartCounter+1)
                return (counter + 1);
            case 'minus':
                //                setCartCounter(cartCounter-1)
                return (counter - 1);
        }
    }

    return (
        <>
            <div className='itemCounter'>
                <Button variant="light" onClick={disminuirContador}>-</Button>

                <Button variant="light" disabled> {counter}</Button>
                <Button variant="light" onClick={aumentarContador}>+</Button>
            </div>
            <AddToCart className='itemCounter' item={item} quantity={counter} />


        </>
    )

}