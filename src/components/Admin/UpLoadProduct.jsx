import { collection, addDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../firebase';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';

export default function UpLoadProduct() {
    const [nombre, setNombre] = useState("");
    const [color, setColor] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState(0);
    const [talle, setTalle] = useState("");
    const [image, setImage] = useState();

    const handleNombreChange = event => setNombre(event.target.value);
    const handleColorChange = event => setColor(event.target.value);
    const handleDescripcionChange = event => setDescripcion(event.target.value);
    const handlePrecioChange = event => setPrecio(event.target.value);
    const handleStockChange = event => setStock(event.target.value);
    const handleTalleChange = event => setTalle(event.target.value);
    const handleImageChange = event => setImage(event.target.files[0]);

    const items = collection(db, 'items');

    const onUpload = async (evt) => {
        evt.preventDefault()

        const storage = getStorage();
        const imageName = (+ new Date()).toString(36);
        const storageRef = ref(storage, `items/${imageName}`);

        const uploadTask = await uploadBytes(storageRef, image);
        const pictureURL = await getDownloadURL(uploadTask.ref);

        let newItem = {
            nombre: nombre,
            color: color,
            descripcion: descripcion,
            precio: precio,
            stock: stock,
            talle: talle,
            img: pictureURL
        }
        addDoc(items, newItem);
        console.log("Se creó el item");

    }

    return (
        <div className='formContainer'>
        <div className="cargarProducto">
        <h1>Cargar producto</h1>
        <form onSubmit={onUpload}>
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" onChange={handleNombreChange}></input><br />
            <label for="color">Color</label>
            <input type="text" id="color" onChange={handleColorChange}></input><br />
            <label for="descripcion">Descripción</label>
            <input type="textarea" id="descripcion" onChange={handleDescripcionChange}></input><br />
            <label for="precio">Precio</label>
            <input type="number" id="precio" onChange={handlePrecioChange}></input><br />
            <label for="stock">Stock</label>
            <input type="number" id="stock" onChange={handleStockChange}></input><br />
            <label for="talle">Talle</label>
            <input type="text" id="talle" onChange={handleTalleChange}></input><br />
            <label for="image">Imagen</label>
            <input type="file" id="image" onChange={handleImageChange}></input><br />
            <button type="submit" >Subir item</button>
        </form>
    </div>
    </div>
    )
}