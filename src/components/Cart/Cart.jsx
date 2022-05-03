import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/cartContext';
import ItemInCart from '../Cart/ItemInCart';

export default function Cart() {
    const { cart } = useContext(CartContext);
    return (
        <>
            <div className='itemListContainer'>
                <h1>Carrito</h1>
                {cart.map(function (item) {
                    return <ItemInCart item={item} />
                })}
            </div>
        </>
    )

}