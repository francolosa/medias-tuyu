import React from 'react';
import { getAuth } from 'firebase/auth'
export default function ProfileUser(){
    const auth = getAuth()

    return <>
        <h1>Perfil</h1>
        <ul>
            <li>Nombre: ???</li>
            <li>Email: {auth.currentUser.email}</li>
        </ul>
    </>
}