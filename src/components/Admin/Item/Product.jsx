import React, { useContext } from 'react';
import ItemCounter from './Counter/ItemCounter';
import { Link } from 'react-router-dom'
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
            <div className='description'> 
                <li> {item.nombre}</li>
            </div>
                <Link to={`/product/${item.id}`}><img src={item.img} alt="" /></Link>
           
            <ItemCounter item={item} />
            { admin ? <button onClick={onEliminarItem}>Eliminar item</button> : ""}
        </div>
    )
}