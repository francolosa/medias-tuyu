import React, { useEffect, useState } from 'react';
import ItemCounter from './Counter/ItemCounter';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from "../../firebase";
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';

export default function ItemDetail() {
    const [item, setItem] = useState([]);
    const [colores, setColores] = useState([]);
    const [stock, setStock] = useState()
    const [colorSelected, setColorSelected] = useState()
    const { productId } = useParams();


    useEffect(() => {
        const ref = doc(db, "items", productId);
        getDoc(ref)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setItem({ id: snapshot.id, ...snapshot.data() })
                    setColores(snapshot.data().color.split(","))
                    setStock(snapshot.data().stock)
                }
            }).catch(error => {
                console.log(error)
            })
    }, [productId]);

    const handleColorChange = color => {
        setColorSelected(color)
    }

    return (
        <div className="detailContainer">
        <Card style={{width: "50%"}} id={item.id}>
            <Card.Body className='itemDetailContainer'>
                <Card.Title className="">Nombre: {item.nombre}</Card.Title>
                <Card.Text> 
                    <Dropdown>
                        <Dropdown.Toggle variant="disabled" id="dropdown-basic">
                            {colorSelected ? colorSelected : "seleccionar color"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu >
                            {colores.map(function (color) {
                                return <Dropdown.Item value={color} onClick={function () { handleColorChange(color) }} > {color} </Dropdown.Item>
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Text>
                <Card.Text>Descripcion: {item.descripcion}</Card.Text>
                <Card.Text>Talle: {item.talle}</Card.Text>
                <Card.Img variant="top" src={item.img} style={{paddingBottom:"15px"}}/>
                {item.stock === 0 ? <p className="itemCounter">Articulo sin stock!</p> : <ItemCounter item={item} />}
            </Card.Body>
        </Card>
        </div>
    )
}

