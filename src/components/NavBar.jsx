import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cartContext';
import { UserContext } from '../context/userContext';
import { AuthContext } from '../context/authContext';
import { AdminContext } from '../context/adminContext';

export default function NavBar() {
  const { cart, cartCounter } = useContext(CartContext);
  const { logOut } = useContext(UserContext);
  const { online } = useContext(AuthContext);
  const { admin } = useContext(AdminContext);
  const onLogOut = (evt) => { return evt.preventDefault(), logOut() }

  return (
     
    
      <nav className="navBar">
      
        <Link to="/" >home</Link>
        <Link to="/products" >productos</Link>
        {cartCounter > 0 ? <Link to="/cart" >carrito ({cartCounter})</Link> : ""}
        {online ? <Link to="/user/profile/" >mi cuenta</Link> : ""}
        {online ? <Link to="/" onClick={onLogOut}  >Cerrar sesión</Link> : <Link to="/user/logIn"  >iniciar sesión</Link>}
        {online ? "" : <Link to="/user/signIn" >crear cuenta</Link>}
      </nav>
    
  )
}