import React, { useContext } from 'react';
import ItemCounter from './Counter/ItemCounter';
import { Link } from 'react-router-dom';
import { db } from "../../firebase";
import { doc, deleteDoc } from 'firebase/firestore'
import { UserContext } from '../../context/userContext'

export default function Item({ item }) {
    const { admin } = useContext(UserContext);
    
    const onEliminarItem = async () => {
        await deleteDoc(doc(db, "items", item.id));
    }
    return (
        <div className='Item' id={item.id}>
            <ul>
                <li>Nombre: {item.nombre}</li>
                <li>Descripción: {item.descripcion}</li>
                <li>Foto: {item.imgUrl}</li>
                <li><img src={item.img} alt="" width="150px"/></li>
            </ul>
            <ItemCounter item={item} />
            <Link to={`/product/${item.id}`}>Más información</Link>
            { admin ? <button onClick={onEliminarItem}>Eliminar item</button> : ""}
        </div>
    )
}