import React, { useReducer, useContext } from 'react';
import AddToCart from '../../Cart/AddToCart';
import { CartContext } from '../../../context/cartContext';

export default function ItemCounter({ item }) {
//    const { cartCounter, setCartCounter } = useContext(CartContext)
    const [counter, setCounterReducer ] = useReducer( counterReducer, 0);

    let aumentarContador = (evt) => {
        evt.preventDefault()
        return counter < item.stock ? setCounterReducer({ type:'plus', payload: counter })        : "";
    }
    let disminuirContador = (evt) => {
        evt.preventDefault()
        return counter > 0 ? setCounterReducer({ type:'minus', payload: counter}) : "";
    }
 
    function counterReducer( counter, action ) {
        switch( action.type ) {
            case 'plus':
//                setCartCounter(cartCounter+1)
                return (counter+1);
            case 'minus':
//                setCartCounter(cartCounter-1)
                return (counter-1);
        }  
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