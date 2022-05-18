import React, { useState } from 'react';
import Orders from './Orders';
import ProfileUser from './ProfileUser';


export default function AcountUser() {
    const [orders, setOrders] = useState(false)
    const [profile, setProfile] = useState(false)

    const onOrders = (evt) => {
        evt.preventDefault()
        setOrders(true)
        setProfile(false)
    }
    const onProfile = (evt) => {
        evt.preventDefault()
        setProfile(true)
        setOrders(false)
    }

    return <div className="AcountUser">
        <div className="navBar">
            <a href="" onClick={onOrders}>Mis Ordenes</a>
            <a href="" onClick={onProfile}>Mi Perfil</a>
        </div>
        <div className="miCuenta">
            {orders ? <Orders /> : ""}

            {profile ? <ProfileUser /> : ""}
        </div>
    </div>
}