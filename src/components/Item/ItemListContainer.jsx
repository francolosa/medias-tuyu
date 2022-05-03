import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import { getDocs, collection } from 'firebase/firestore';
import { db } from "../../firebase";

export default function ItemListContainer() {

    const [products, setProducts] = useState([]);
   
    useEffect(() => {
        const ref = collection(db, "items");

        getDocs(ref)
            .then((snapshot => {
                const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setProducts(products)
            })).catch(error => { console.log(error) })
    }, []);

    return (
        <div className='itemListContainer'>
            <h1>Productos</h1>
            {products.map(function (item) {
                return <Item item={item} />
            })}
        </div>

    )
}