import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContextProvider from './context/userContext';
import AdminContextProvider from './context/adminContext';
import CartContextProvider from './context/cartContext';
import AuthContextProvider from './context/authContext';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
  <AdminContextProvider>
  <CartContextProvider>

    <UserContextProvider>
    <App />
    </UserContextProvider>
    </CartContextProvider>

    </AdminContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
