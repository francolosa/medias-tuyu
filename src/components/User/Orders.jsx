import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Order from './Order';

export default function Orders() {
    const auth = getAuth()
    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        const docRef = doc(db, "orders", auth.currentUser.uid)
        const docSnap = await getDoc(docRef)
        let orders = docSnap.data().orders
        if (docSnap.exists()) {
            setOrders(orders)
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    return <>
        <h1>Mis Ordenes</h1>
        {orders.map((order) => {
            return <Order order={order} />
        })}
    </>
}