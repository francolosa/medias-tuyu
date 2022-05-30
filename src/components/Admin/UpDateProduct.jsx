import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase'
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';

export default function UpDateProduct() {
    const { productId } = useParams();

    const [nombre, setNombre] = useState();
    const [color, setColor] = useState();
    const [descripcion, setDescripcion] = useState();
    const [precio, setPrecio] = useState();
    const [stock, setStock] = useState();
    const [talle, setTalle] = useState();
    const [img, setImage] = useState();
    const [cambiarImagen, setCambiarImagen] = useState(false);

    const handleNombreChange = event => setNombre(event.target.value);
    const handleColorChange = event => setColor(event.target.value);
    const handleDescripcionChange = event => setDescripcion(event.target.value);
    const handlePrecioChange = event => setPrecio(event.target.value);
    const handleStockChange = event => setStock(event.target.value);
    const handleTalleChange = event => setTalle(event.target.value);
    const handleImageChange = event => {
        setCambiarImagen(true);
        setImage(event.target.files[0]);
    }
    
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
                    setImage(snapshot.data().img)
                }
            }).catch(error => {
                console.log(error)
            })
    }, [productId]);


    const onUpdate = async (evt) => {
        evt.preventDefault()
        const item = doc(db, 'items', productId);
        let pictureURL;
        if(cambiarImagen === true){
            const storage = getStorage();
            const imageName = (+ new Date()).toString(36);
            const storageRef = ref(storage, `items/${imageName}`);
            const uploadTask = await uploadBytes(storageRef, img);    
            pictureURL = await getDownloadURL(uploadTask.ref);
        } else {
            pictureURL = img;
        }

        let newItem = {
            nombre: nombre,
            color: color,
            descripcion: descripcion,
            precio: precio,
            stock: stock,
            talle: talle,
            img: pictureURL
        }
        updateDoc(item, newItem);
        console.log("Se actualizó el item");
    }

    const onCambiarImagen = (evt) => {
        evt.preventDefault()
        setCambiarImagen(true)
    }

    return <div className="formContainer">
        <h1>modificar producto</h1>
        <form onSubmit={onUpdate}>
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" value={nombre} onChange={handleNombreChange}></input><br />
            <label for="color">Color</label>
            <input type="text" id="color" value={color} onChange={handleColorChange}></input><br />
            <label for="descripcion">Descripción</label>
            <input type="textarea" id="descripcion" value={descripcion} onChange={handleDescripcionChange}></input><br />
            <label for="precio">Precio</label>
            <input type="number" id="precio" value={precio} onChange={handlePrecioChange}></input><br />
            <label for="stock">Stock</label>
            <input type="number" id="stock" value={stock} onChange={handleStockChange}></input><br />
            <label for="talle">Talle</label>
            <input type="text" id="talle" value={talle} onChange={handleTalleChange}></input><br />
            <img src={img} width="150px" className="imgEdit"></img><br />
            {cambiarImagen ? <input type="file" id="image" onChange={handleImageChange}></input> : <button onClick={onCambiarImagen}>Cambiar Imagen</button>}
            <button type="submit">Actualizar item</button>
        </form>
    </div>
}