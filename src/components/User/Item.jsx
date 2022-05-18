import React from 'react';

export default function Item({ item }) {
    return (
        <div className='Item'>
            <div className='description'> 
                <li> NOMBRE: {item.nombre}</li>
                <li> COLOR: {item.color} </li>
                <li> CANTIDAD: {item.quantity} </li>
                <li> PRECIO: {item.precio} </li>
            </div>           
        </div>
    )
}