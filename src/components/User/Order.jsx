import React from 'react';
import OrderItem from './OrderItem';

export default function Order({ order }) {

    return (
        <div className='Order'>
            <div className='description'>
                <li> ID: {order.orderId}</li>
                <li> FECHA: {order.date}</li>
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