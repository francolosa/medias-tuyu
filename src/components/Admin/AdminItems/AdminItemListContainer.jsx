import React, { useEffect, useState } from 'react';
import AdminItem from '../AdminItems/AdminItem';
import { getDocs, collection } from 'firebase/firestore';
import { db } from "../../../firebase";

export default function AdminItemListContainer() {

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
  
        <div className='adminItemListContainer'>
            {products.map(function (item) {
                return <AdminItem item={item} />
            })}
        </div>
        </>

    )
}