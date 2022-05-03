import React, { useEffect, useState, useContext } from 'react';
import ItemCounter from './Counter/ItemCounter';
import { useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from "../../firebase";
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext'

export default function ItemDetail() {
    const [item, setItem] = useState([]);
    const [colores, setColores] = useState([]);
    const { productId } = useParams();
    const { admin } = useContext(UserContext);


    useEffect(() => {
        const ref = doc(db, "items", productId);
        getDoc(ref)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setItem({ id: snapshot.id, ...snapshot.data() })
                    setColores(snapshot.data().color.split(","))
                }
            }).catch(error => {
                console.log(error)
            })
    }, [productId]);

    return (
        <div className="itemDetail" id={item.id}>
            <ul>
                <li>Nombre: {item.nombre}</li>
                <li>Color: <select>
                    {colores.map(function (color) {
                        return <option value={color}>{color}</option>
                    })}
                </select></li>
                <li>Descripcion: {item.descripcion}</li>
                <li>Talle: {item.talle}</li>
                <img src={item.imgUrl}></img>
            </ul>
                { admin ? <Link to={`/products/upDate/${item.id}`}> Editar Producto </Link>  : ""}
            <ItemCounter item={item} />
        </div>
    )
}

