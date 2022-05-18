import React, { useState, useEffect } from 'react';
import { db } from "../../firebase";
import { doc, getDoc } from 'firebase/firestore'
import { useParams } from 'react-router-dom';


export default function CheckOut(){
    const { docRefId } = useParams();
    const [ order, setOrder ] = useState();
    useEffect(() => {
        const ref = doc(db, "orders", docRefId);
        getDoc(ref)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setOrder({ ...snapshot.data() })
                }
            }).catch(error => {
                console.log(error)
            })
    }, [docRefId]);

    return <>
    <p>{order}</p>
    </>
}