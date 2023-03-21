import React, { useContext } from 'react';
import { CartContext } from '../../context/cartContext';
import Button from 'react-bootstrap/Button';

export default function AddToCart({ item, quantity }) {

    //const { cartCounter, setCartCounter } = useContext(CartContext)
    const { addToCart } = useContext(CartContext);

    let onAddItem = () => {
        addToCart(item, quantity)
        //setCartCounter(cartCounter+quantity)
    }

    return <Button className='addOrDelete' variant="success" onClick={onAddItem}>Agregar al carrito</Button>;
    
}