import React from 'react';
import ItemCounter from './Counter/ItemCounter';
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';

export default function Item({ item }) {

    return (
    <Card className="itemCard" style={{ width: '18rem' }} id={item.id}>
        <Link to={`/product/${item.id}`}>
      <Card.Img variant="top" src={item.img} />
      </Link>
      <Card.Body className='itemCounterText'>
        <Card.Title className="">{item.nombre}</Card.Title>
        {item.stock === 0 ? <p className="deleteFromCart">Articulo sin stock!</p> : <ItemCounter item={item} />}
      </Card.Body>
    </Card>
  );
}