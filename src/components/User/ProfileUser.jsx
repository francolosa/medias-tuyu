import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

export default function ProfileUser(){
    const { userData } = useContext(AuthContext);

    return <>
        <h1>Perfil</h1>
        <ul>
            <li>Nombre: </li>
            <li>Email: {userData.email}</li>
        </ul>
    </>
}