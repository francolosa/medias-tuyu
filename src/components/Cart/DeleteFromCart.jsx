import React, { useContext } from 'react';
import { CartContext } from '../../context/cartContext';
import Button from 'react-bootstrap/Button';

export default function deleteFromCart({ item }) {

    const { deleteFromCart } = useContext(CartContext);

    let onDelete = () => deleteFromCart(item);

    return <Button variant="secondary" onClick={onDelete}>Quitar Del Carrito</Button>;

}