import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/authContext';
import { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


//COMPONENTS
import React from 'react';
//NAV BAR
import NavBar from './components/NavBar';

//CART
import Cart from './components/Cart/Cart';
import CheckOut from './components/Cart/CheckOut'

//ITEM
import ItemDetail from './components/Item/ItemDetail'
import ItemListContainer from './components/Item/ItemListContainer';
//USER
import LogInUser from './components/User/LogInUser';
import CreateUser from './components/User/CreateUser'
import ForgotPassword from './components/User/ForgotPassword'
import Orders from './components/User/Orders'
import ProfileUser from './components/User/ProfileUser'

//FUNCTION
function App() {
  const { online } = useContext(AuthContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setLoaded(true)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [])

  if(!loaded){
    return <div class="loader"><div></div></div>
  }

  return ( <>
    
    <BrowserRouter >
      <NavBar />

      <Routes>
        <Route path="/" element={<ItemListContainer/>} />
        
        <Route path="/cart" element={<Cart/>} />
        {online ? <Route path="/cart/checkOut/:docRefId" element={<CheckOut/>}/> : ""}

        {online ? "" : <Route path="/user/logIn" element={<LogInUser/>} /> }
        {online ? "" : <Route path="/user/signIn" element={<CreateUser/>} /> }
        <Route path="/user/forgotPassword" element={<ForgotPassword/>} />

 
        <Route path="/account/orders" element={<Orders/>} />
        <Route path="/account/profile" element={<ProfileUser/>} />

        <Route path="/products" element={<ItemListContainer/>} />
        <Route path="/product/:productId" element={<ItemDetail/>} />
      </Routes>
    </BrowserRouter>
    </>);
}

export default App;
