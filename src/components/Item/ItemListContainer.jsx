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

    return (<>            <h1>productos</h1>
  
        <div className='itemListContainer'>
            {products.map(function (item) {
                return <Item item={item} />
            })}
        </div>
        </>

    )
}