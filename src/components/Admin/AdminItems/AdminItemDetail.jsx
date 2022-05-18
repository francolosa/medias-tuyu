import React, { useEffect, useState, useContext } from 'react';
import ItemCounter from './Counter/ItemCounter';
import { useParams } from 'react-router-dom';
import { getDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from "../../../firebase";

export default function ItemDetail() {
    const [item, setItem] = useState([]);
    const [colores, setColores] = useState([]);
    const { productId } = useParams();


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

    const onEditarItem = () => {
        window.location.assign(`/admin/products/upDate/${item.id}`)
    }

    return (
        <div className='itemDetailContainer'>
                    <h1>detalle </h1>
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
                <img src={item.img} width="150px"></img>
               
            </ul>
                <button onClick={onEditarItem}> Editar Item </button> 
            {item.stock = 0 ? <p>Articulo sin stock!</p> : <p>Stock: {item.stock}</p>}
        </div>
        </div>
    )
}

