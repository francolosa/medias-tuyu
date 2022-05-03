import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase'

export default function UpDateProduct(){    
    const { productId } = useParams();
    
    const [ nombre, setNombre ] = useState();
    const [ color, setColor ] = useState();
    const [ descripcion, setDescripcion ] = useState();
    const [ precio, setPrecio ] = useState();
    const [ stock, setStock ] = useState();
    const [ talle, setTalle ] = useState();

    const handleNombreChange = event => setNombre(event.target.value);
    const handleColorChange = event => setColor(event.target.value);
    const handleDescripcionChange = event => setDescripcion(event.target.value);
    const handlePrecioChange = event => setPrecio(event.target.value);
    const handleStockChange = event => setStock(event.target.value);
    const handleTalleChange = event => setTalle(event.target.value);
    
    useEffect(() => {
        const ref = doc(db, "items", productId);
        getDoc(ref)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setNombre(snapshot.data().nombre)
                    setColor(snapshot.data().color)
                    setDescripcion(snapshot.data().descripcion)
                    setPrecio(snapshot.data().precio)
                    setStock(snapshot.data().stock)
                    setTalle(snapshot.data().talle)
                }
            }).catch(error => {
                console.log(error)
            })
    }, [productId]);


    const onUpdate = () => {
        const item = doc(db, 'items', productId);
        let newItem = {
            nombre: nombre,
            color: color,
            descripcion: descripcion,
            precio: precio,
            stock: stock,
            talle: talle,
        }
        updateDoc(item, newItem);
        console.log("Se actualizó el item");
    }
  
    return     <div className="updateProduct">
        <h1>Modificar producto</h1>
        <form >            
            <label for="nombre">Nombre</label>
                <input type="text" id="nombre" value={nombre} onChange={handleNombreChange}></input><br/>
            <label for="color">Color</label>
                <input type="text" id="color" value={color} onChange={handleColorChange}></input><br/>
            <label for="descripcion">Descripción</label>
                <input type="textarea" id="descripcion" value={descripcion} onChange={handleDescripcionChange}></input><br/>
            <label for="precio">Precio</label>
                <input type="number" id="precio" value={precio} onChange={handlePrecioChange}></input><br/>
            <label for="stock">Stock</label>
                <input type="number" id="stock" value={stock} onChange={handleStockChange}></input><br/>
            <label for="talle">Talle</label>
                <input type="text" id="talle" value={talle} onChange={handleTalleChange}></input><br/>
        </form>
        <button type="submit" onClick={onUpdate}>Actualizar item</button>
    </div>
}