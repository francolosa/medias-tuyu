import { collection, addDoc } from 'firebase/firestore';
import React from 'react';
import { db } from '../../firebase'
export default function UpLoadProduct(){

    const items = collection(db, 'items');

    const onUpload = () => {
        let nombre = document.getElementById('nombre').value
        let color = document.getElementById('color').value
        let descripcion = document.getElementById('descripcion').value
        let precio = document.getElementById('precio').value
        let stock = document.getElementById('stock').value
        let talle = document.getElementById('talle').value
    
        let newItem = {
            nombre: nombre,
            color: color,
            descripcion: descripcion,
            precio: precio,
            stock: stock,
            talle: talle,
        }
        addDoc(items, newItem);
        console.log("Se creó el item");

    }
    
    return     <div className="cargarProducto">
        <h1>Cargar producto</h1>
        <form >
            <label>Nombre<input type="text" id="nombre"></input></label><br/>
            <label>Color<input type="text" id="color"></input></label><br/>
            <label>Descripción<input type="textarea" id="descripcion"></input></label><br/>
            <label>Precio<input type="number" id="precio"></input></label><br/>
            <label>Stock<input type="number" id="stock"></input></label><br/>
            <label>Talle<input type="text" id="talle"></input></label><br/>
        </form>
        <button type="submit" onClick={onUpload}>Subir item</button>
    </div>
}