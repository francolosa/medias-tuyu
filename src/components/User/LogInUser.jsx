import React, { useContext } from 'react';
import UserContextProvider, { UserContext } from '../../context/userContext';
import { Link } from 'react-router-dom';

export default function LogInUser() {
    const { logIn, user } = useContext(UserContext)

    const onLogin = async (evt) => { 
        evt.preventDefault()
        let emailUserLogin = document.getElementById('emailUserLogin').value
        let passwordUserLogin = document.getElementById('passwordUserLogin').value
        let session = document.getElementById('noCerrarSesion')
        await logIn(emailUserLogin, passwordUserLogin, session)

     }

    return <div className="userLogin">
        <form>
            <label>Email:<input type="email" name="email" id="emailUserLogin" /></label><br />
            <label>Contraseña:<input type="password" name="password" id="passwordUserLogin" /></label><br></br>
            <label>Mantener sesión iniciada<input type="checkbox" name="noCerrarSesion"  id="noCerrarSesion"></input></label><br></br>
            <button onClick={onLogin}><Link to="/">Iniciar Sesión</Link></button>
        </form>
    </div>
}