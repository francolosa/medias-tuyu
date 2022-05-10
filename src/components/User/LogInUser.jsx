import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/userContext';

export default function LogInUser() {
    const { logIn } = useContext(UserContext)

    const [user, setUser] = useState();
    const [pwd, setPwd] = useState();
    const [session, setSession] = useState();

    const handleUserChange = event => setUser(event.target.value);
    const handlePwdChange = event => setPwd(event.target.value);
    const handleSessionChange = event => setSession(event.target.value);
      
    const onLogin = async (evt) => {
        evt.preventDefault()
        logIn(user, pwd, session)
    }

    return <div className="formContainer">
        <h1>iniciar sesión</h1>
        <form onSubmit={onLogin}>
            <label>Email:</label><input type="email" name="email" id="emailUserLogin" onChange={handleUserChange} /><br />
            <label>Contraseña:</label><input type="password" name="password" id="passwordUserLogin" onChange={handlePwdChange} /><br></br>
            <label>Mantener sesión iniciada</label><input type="checkbox" name="noCerrarSesion" id="noCerrarSesion" onChange={handleSessionChange}></input><br></br>
            <button type="submit">Iniciar Sesión</button>
        </form >
    </div>
}