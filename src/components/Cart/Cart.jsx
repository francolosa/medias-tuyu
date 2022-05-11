import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/cartContext';
import ItemInCart from '../Cart/ItemInCart';

export default function Cart() {
    const { cart, generarOrden, totalPrice, clearCart } = useContext(CartContext);

    const onVaciarCarrito = async()=>{
        await clearCart();
    }

    const onGenerarOrden = async() => {
        await generarOrden()
    }
    return (
        <><div className="cart">
            <h1>carrito</h1>
            <div className='carritoContainer'>
                
                    {cart.map(function (item) {

                        return <ItemInCart item={item} />
                        

                    })}
                    <h3>precio total: {totalPrice}</h3>
                    <button type="button" className="vaciarCarrito" onClick={onVaciarCarrito}>Vaciar carrito</button>
                    <button type="button" className="generarOrden" onClick={onGenerarOrden}>Generar Orden</button>
                </div>
        </div></>
    )

}