import React, { useContext } from 'react';
import { CartContext } from '../../context/cartContext';

export default function deleteFromCart({ item }) {

    const { deleteFromCart } = useContext(CartContext);

    let onDelete = () => deleteFromCart(item);

    return <button onClick={onDelete}>Quitar Del Carrito</button>;

}