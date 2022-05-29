import React, { useContext } from 'react';
import { CartContext } from '../../context/cartContext';

export default function addToCart({ item, quantity }) {

   // const { cartCounter, setCartCounter } = useContext(CartContext)
    const { addToCart } = useContext(CartContext);

    let onAddItem = () => {
        addToCart(item, quantity)
     //   setCartCounter(cartCounter+quantity)
    }

    return <button onClick={onAddItem}>Agregar al carrito</button>;
    
}