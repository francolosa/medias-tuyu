import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/cartContext';
import ItemInCart from './ItemInCart';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function Cart() {
    const { cart, generarOrden, totalPrice, clearCart } = useContext(CartContext);

    const onVaciarCarrito = async()=>{
        await clearCart();
    }

    const onGenerarOrden = async() => {
        await generarOrden()
    }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Colores</th>
          <th>Talles</th>
          <th>Cantidad</th>
          <th>Precio x Unidad</th>
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
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>$ {totalPrice}</td>
          <td> { totalPrice > 0 && <Button variant="danger" type="button" className="vaciarCarrito" onClick={onVaciarCarrito}>Vaciar carrito</Button> } </td>

        </tr>
        <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>{ totalPrice > 0 && <Button variant="success" type="button" className="" onClick={onGenerarOrden}>Generar Orden</Button> }</td>

        </tr>

      </tbody>
    </Table>
  );
}
