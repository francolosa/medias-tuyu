import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Order from './Order';

export default function Orders() {
    const auth = getAuth()
    const [ orders, setOrders ] = useState([])

    const getOrders = async() => {

        const q = query(collection(db, 'orders'), where("userUid", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const orders = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setOrders(orders)
    }
    
    useEffect(() => {/*
        const ordersRef = query(collection(db, 'orders'));
        getDocs(ordersRef, where("userUid", "==", auth.currentUser.uid))
            .then((snapshot) => {
                const orders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setOrders(orders)
            })
        */
            getOrders()
        
        })

        return <>
            <h1>Mis Ordenes</h1>
            {orders.map((order)=>{
                return <Order order={order}/>
            })}
        </>
    }