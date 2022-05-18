import React, { useContext } from 'react';
import ItemCounter from './Counter/ItemCounter';
import { Link } from 'react-router-dom'
import { db } from "../../../firebase";
import { doc, deleteDoc } from 'firebase/firestore'

export default function AdminItem({ item }) {
    
    const onEditarItem = () => {
        window.location.assign(`/admin/products/upDate/${item.id}`)
    }
    const onEliminarItem = async () => {
        await deleteDoc(doc(db, "items", item.id));
    }
    return (
        <div className='adminItem' id={item.id}>
            <div className='description'> 
                <li> {item.nombre}</li>
            </div>
            
                <Link to={`/admin/products/${item.id}`}><img className="adminImg" src={item.img} alt="" /></Link>
                {item.stock === 0 ? <p>Articulo sin stock!</p> : <p>Stock:{item.stock}</p>}
                <button classname="buttonAdmin" onClick={onEditarItem}> Editar Item </button> 
                <button classname="buttonAdmin" onClick={onEliminarItem}>Eliminar Item</button> 
           
        </div>
    )
}