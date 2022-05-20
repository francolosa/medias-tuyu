import React, { useEffect, useState } from 'react';
import OrderItem from './OrderItem';

export default function Order({ order }) {
    const [items, setItems] = useState([])



    return (
        <div className='Order'>
            <div className='description'>
                <li> ID: {order.id}</li>
                <li> EMAIL: {order.userEmail}</li>
                <li> FECHA: {order.fecha}</li>
                <li> PRECIO TOTAL: {order.totalPrice}</li>
                <ul>{
                    order.items.map((item)=>{
                        return <OrderItem item={item}/>
                    })
                    }
                </ul>
            </div>
        </div>
    )
}