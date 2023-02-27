import React from 'react';
import OrderItem from './OrderItem';
import Table from 'react-bootstrap/Table';

export default function Order({ order }) {

    return (
        <>
            {1 > 0 ? (
                <div className="tableContainer">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Items</th>
                                <th>Precio Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{order.orderId}</td>
                                <td>{order.date}</td>
                                <td>{
                                order.items.map((item) => {
                                    return <OrderItem item={item} />
                                })
                            }</td>
                                <td>{order.totalPrice}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>

                    </Table>
                </div>
            ) : <h1 style={{ padding: "25px" }}>Nada por aquí...</h1>}
        </>
    )
    return (
        <div className='Order'>
            <div className='description'>
                <li> ID: {order.orderId}</li>
                <li> FECHA: {order.date}</li>
                <li> PRECIO TOTAL: {order.totalPrice}</li>
                <ul>{
                    order.items.map((item) => {
                        return <OrderItem item={item} />
                    })
                }
                </ul>
            </div>
        </div>
    )
}