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
        <div className="cart">
            <h1>carrito</h1>
            <div className='carritoContainer'>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Colores</th>
                            <th>Talles</th>
                            <th>Cantidad</th>
                            <th>Precio Unidad</th>
                            <th>Precio Total</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        Array.isArray(cart) ? 
                            cart.map(function (item) {
                            return <ItemInCart item={item} />
                        }) : ""}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <h3>$ {totalPrice}</h3>
                            </td>
                            <td> { totalPrice > 0 && <button type="button" className="vaciarCarrito" onClick={onVaciarCarrito}>Vaciar carrito</button> } </td>
                        </tr>
                    </tfoot>
                </table>
                    
                { totalPrice > 0 && <button type="button" className="generarOrden" onClick={onGenerarOrden}>Generar Orden</button> }

            </div>
        </div>
    )

}