import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBarAdmin() {

  return (
    <>
      <nav className="navBar">
        <Link to="/admin/products/" >administrar productos</Link>
        <Link to="/admin/products/upLoad" >cargar producto </Link>
      </nav>
    </>
  )
}