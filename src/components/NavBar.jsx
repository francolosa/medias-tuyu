import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cartContext';
import { UserContext } from '../context/userContext';
import { AuthContext } from '../context/authContext';
import { AdminContext } from '../context/adminContext';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
//import Sonnet from 'react-bootstrap/Tab'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar() {
  const { cart, cartCounter } = useContext(CartContext);
  const { logOut } = useContext(UserContext);
  const { online } = useContext(AuthContext);
  const { admin } = useContext(AdminContext);
  const onLogOut = (evt) => { return evt.preventDefault(), logOut() }

  return (
    <>
      <Navbar bg="light" variant="light">
      <Navbar.Brand href="/"><img src="https://firebasestorage.googleapis.com/v0/b/tuyu-database.appspot.com/o/logo.jpeg?alt=media&token=26a1f801-65d2-4717-982e-4217c26cc451"></img></Navbar.Brand>

        <Container style={{ width: "auto", paddingRight: "180px"}}>
          <Nav >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Productos</Nav.Link>
            {cartCounter > 0 ? <Nav.Link href="/cart" >Carrito ({cartCounter})</Nav.Link> : ""}
            {online ? <Nav.Link href="/user/profile/" >Mi cuenta</Nav.Link> : ""}
            {online ? <Nav.Link href="/" onClick={onLogOut}  >Cerrar sesión</Nav.Link> : <Nav.Link href="/user/logIn"  >Iniciar Sesión</Nav.Link>}
            {online ? "" : <Nav.Link href="/user/signIn" >Crear Cuenta</Nav.Link>}

          </Nav>
        </Container>
      </Navbar>
    </>
  )
}