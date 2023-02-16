import React, { useContext } from 'react';
import { CartContext } from '../../context/cartContext';
import Button from 'react-bootstrap/Button';

export default function DeleteFromCart({ item }) {

    const { deleteFromCart } = useContext(CartContext);

    let onDelete = () => deleteFromCart(item);

    return <Button variant="secondary" className="addOrDelete" onClick={onDelete}>Quitar Del Carrito</Button>;

}