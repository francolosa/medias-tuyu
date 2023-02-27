import React, { useState, useEffect, useContext } from 'react';
import { getAuth } from 'firebase/auth';
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Order from './Order';
import { AuthContext } from '../../context/authContext';

export default function Orders() {
    const [orders, setOrders] = useState([])
    const { online, userUid } = useContext(AuthContext);

    const getOrders = async () => {    
        const docRef = doc(db, "orders", userUid)
        const docSnap = await getDoc(docRef)
        console.log("docsnap data => " +docSnap.data())
        let orders = docSnap.data().orders
        if (docSnap.exists()) {
            setOrders(orders)
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    return <>
        <h1 class="navbar navbar-expand navbar-light bg-light">Mis Ordenes</h1>
        {orders.map((order) => {
            return <Order order={order} />
        })}
    </>
}