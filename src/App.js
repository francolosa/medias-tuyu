import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/authContext';
import { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

//COMPONENTS
import React from 'react';
//NAV BAR
import NavBar from './components/NavBar';
import NavBarAdmin from './components/Admin/NavBarAdmin';

//CART
import Cart from './components/Cart/Cart';
import CheckOut from './components/Cart/CheckOut'
//USER
//ITEM
import ItemDetail from './components/Item/ItemDetail'
import ItemListContainer from './components/Item/ItemListContainer';
import LogInUser from './components/User/LogInUser';
import AcountUser from './components/User/AcountUser'
import CreateUser from './components/User/CreateUser'
import Loader from './components/Loader'
//ADMIN
import UpLoadProduct from './components/Admin/UpLoadProduct'
import UpDateProduct from './components/Admin/UpDateProduct'
import CreateAdmin from './components/Admin/CreateAdmin'
import LogInAdmin from './components/Admin/LogInAdmin';
import ProfileAdmin from './components/Admin/ProfileAdmin'
import AdminItemListContainer from './components/Admin/AdminItems/AdminItemListContainer'
import AdminItemDetail from './components/Admin/AdminItems/AdminItemDetail'

//FUNCTION
function App() {
  const { online, admin } = useContext(AuthContext);
  //console.log(onAuthStateChanged())

  return (
    <BrowserRouter>
      <Loader/>
        {admin ? <NavBarAdmin />: ""}
      <NavBar />

      <Routes>
        <Route path="/" element={<ItemListContainer/>} />
        
        <Route path="/cart" element={<Cart/>} />
        {online ? <Route path="/cart/checkOut/:docRefId" element={<CheckOut/>}/> : ""}

        {online ? "" : <Route path="/user/logIn" element={<LogInUser/>} /> }
        {online ? "" : <Route path="/user/signIn" element={<CreateUser/>} /> }
        {online ? <Route path="/user/profile" element={<AcountUser/>} /> : "" }
        {online ? "" : <Route path="/admin/logIn" element={<LogInAdmin/>} /> }
        
        
        {online && admin ? <Route path="/admin/profile" element={<ProfileAdmin/>} /> : "" }
        {online && admin ? <Route path="/admin/signIn" element={<CreateAdmin/>} /> : "" }
        {online && admin ? <Route path="/admin/products/" element={<AdminItemListContainer/>} /> : " "}
        {online && admin ? <Route path="/admin/products/:productId" element={<AdminItemDetail/>} /> : " "}
        {online && admin ? <Route path="/admin/products/upLoad" element={<UpLoadProduct/>} /> : " "}
        {online && admin ? <Route path="/admin/products/upDate/:productId" element={<UpDateProduct/>} /> : ""}

        <Route path="/products" element={<ItemListContainer/>} />
        <Route path="/product/:productId" element={<ItemDetail/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
