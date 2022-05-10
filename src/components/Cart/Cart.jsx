import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/cartContext';
import ItemInCart from '../Cart/ItemInCart';

export default function Cart() {
    const { cart } = useContext(CartContext);
    return (
        <><div className="cart">
            <h1>carrito</h1>
            <div className='carritoContainer'>
                
                    {cart.map(function (item) {

                        return <ItemInCart item={item} />
                        

                    })}
                </div>
        </div></>
    )

}