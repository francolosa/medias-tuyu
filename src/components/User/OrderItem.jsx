import React from 'react';

export default function OrderItem({ item }) {
    return (
        <div className=''>
            <div className=''>
                <ul style={{fontSize: "12px"}}>
                    <li> NOMBRE: {item.nombre}</li>
                    <li> COLOR: {item.color} </li>
                    <li> CANTIDAD: {item.quantity} </li>
                    <li> PRECIO: {item.precio} </li>
                </ul>
            </div>
        </div>
    )
}