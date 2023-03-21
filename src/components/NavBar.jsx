import React, { useContext, useState } from 'react';
import { CartContext } from '../context/cartContext';
import { UserContext } from '../context/userContext';
import { AuthContext } from '../context/authContext';
//import Sonnet from 'react-bootstrap/Tab'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown'

export default function NavBar() {
  const { cartCounter } = useContext(CartContext);
  const { logOut } = useContext(UserContext);
  const { online } = useContext(AuthContext);
  const [dropDownVisible, setDropDownVisible] = useState(false)
  const onLogOut = (evt) => { return evt.preventDefault(), logOut() }
  const handleMouseEnter = (evt) => { setDropDownVisible(true) }
  const handleMouseLeave = (evt) => { setDropDownVisible(false) }

  return (
    <>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/"><img src="https://firebasestorage.googleapis.com/v0/b/tuyu-database.appspot.com/o/logo.jpeg?alt=media&token=26a1f801-65d2-4717-982e-4217c26cc451"></img></Navbar.Brand>

        <Container >
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products" >Medias</Nav.Link>
            {cartCounter > 0 ? <Nav.Link href="/cart" >Carrito ({cartCounter})</Nav.Link> : ""}
          </Nav>
            
          <Nav className="ms-auto" style={{paddingRight: "20px"}}>
                  {online ? "" : <Nav.Link href="/user/logIn"  >Iniciar Sesión</Nav.Link>}
                  {online ? "" : <Nav.Link href="/user/signIn" >Crear Cuenta</Nav.Link>}    
                  {online ?
                <NavDropdown 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                show={dropDownVisible}
                id="nav-dropdown-dark-example"
                href=""
                title="Mi Cuenta" >
                  <NavDropdown.Item  href="/account/orders" >Mis Ordenes</NavDropdown.Item>
                  <NavDropdown.Item  href="/account/profile"  >Mi Perfil</NavDropdown.Item>
                <Dropdown.Divider />
                <NavDropdown.Item href="/" onClick={onLogOut} >Cerrar Sesión</NavDropdown.Item>
                
              </NavDropdown>
              : ""}
          </Nav>
          
        </Container>
      </Navbar>
    </>
  )
}