import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './context/userContext';
import { useContext } from 'react';

//COMPONENTS
import React from 'react';
//NAV BAR
import NavBar from './components/NavBar';
//ITEM
import ItemDetail from './components/Item/ItemDetail'
import ItemListContainer from './components/Item/ItemListContainer';
//CART
import Cart from './components/Cart/Cart';
//USER
import LogInUser from './components/User/LogInUser';
import ProfileUser from './components/User/ProfileUser'
import CreateUser from './components/User/CreateUser'
//ADMIN
import UpLoadProduct from './components/Admin/UpLoadProduct'
import UpDateProduct from './components/Admin/UpDateProduct'

//FUNCTION
function App() {
  const { admin } = useContext(UserContext)

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/user/logIn" element={<LogInUser/>} />
        <Route path="/user/signIn" element={<CreateUser/>} />
        <Route path="/user/profile" element={<ProfileUser/>} />
        <Route path="/products" element={<ItemListContainer/>} />
        { admin ? <Route path="/products/upLoad" element={<UpLoadProduct/>}  /> : console.log("Ruta invalida") }
         <Route path="/products/upDate/:productId" element={<UpDateProduct/>} /> 
        <Route path="/product/:productId" element={<ItemDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
