import React, { useState } from 'react';
import DeleteFromCart from './DeleteFromCart';
import ItemInCartCounter from './ItemInCartCounter';

export default function ItemInCart({ item }) {

    return (
        <div className="itemInCart" id={item.id}>
            <ul>
                <li>Nombre: {item.nombre}</li>
                <li>Color: {item.color}</li>
                <li>Descripcion: {item.descripcion}</li>
                <li>Talle: {item.talle}</li>
                <li>Cantidad: <ItemInCartCounter item={item}/></li>
                <li>Precio por unidad: {item.precio}</li>
                <li>Precio total: {item.precio * item.quantity}</li>
                <img src={item.imgUrl}></img>
            </ul>
            <DeleteFromCart item={item} />
        </div>
    )
}