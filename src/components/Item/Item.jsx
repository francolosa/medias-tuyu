import React from 'react';
import ItemCounter from './Counter/ItemCounter';
import { Link } from 'react-router-dom';

export default function Item({ item }) {
    return (
        <div className='Item' id={item.id}>
            <ul>
                <li>Nombre: {item.nombre}</li>
                <li>Descripción: {item.descripcion}</li>
                <li>Foto: {item.imgUrl}</li>
            </ul>
            <ItemCounter item={item} />
            <Link to={`/product/${item.id}`}>Más información</Link>
        </div>
    )
}