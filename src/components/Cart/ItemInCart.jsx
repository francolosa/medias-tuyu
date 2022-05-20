import React from 'react';
import DeleteFromCart from './DeleteFromCart';
import ItemInCartCounter from './ItemInCartCounter';

export default function ItemInCart({ item }) {

    return (
        <tr className="itemInCart" id={item.id}>
                <td>{item.nombre}</td>
                <td>{item.color}</td>
                <td>{item.talle}</td>
                <td><ItemInCartCounter item={item}/></td>
                <td>{item.precio}</td>
                <td>{item.precio * item.quantity}</td>
                <td><DeleteFromCart item={item} /></td>
        </tr>
    )
}