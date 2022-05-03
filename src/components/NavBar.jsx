import { arrayRemove } from 'firebase/firestore';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cartContext';
import { UserContext } from '../context/userContext';

export default function NavBar() {
  const { cart } = useContext(CartContext);
  const { user, logOut, admin } = useContext(UserContext);

  const onLogOut = (evt) => { return evt.preventDefault(), logOut() }

  return (
    <>
      <nav className="navBar">
        <Link to="/" >home</Link>
        <Link to="/products" >productos</Link>
        {cart.length > 0 ? <Link to="/cart" >cart ({cart.length})</Link> : ""}
        {admin ? <Link to="/products/upload" >cargar producto </Link> : ""}
        {user.length > 0 ? <Link to="/" onClick={onLogOut}  >Cerrar sesión</Link> : <Link to="/user/logIn"  >iniciar sesión</Link>}
        {(user.length > 0) && (localStorage.getItem('emailUserLogin') == user.password) > 0 ? "" : <Link to="/user/signIn" >crear cuenta</Link>}
      </nav>
    </>
  )
}