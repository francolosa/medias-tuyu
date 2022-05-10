import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/adminContext';

export default function LogInAdmin() {
    const { logInAdmin } = useContext(AdminContext)

    const [user, setAdmin] = useState();
    const [pwd, setPwd] = useState();
    const [session, setSession] = useState();

    const handleAdminChange = event => setAdmin(event.target.value);
    const handlePwdChange = event => setPwd(event.target.value);
    const handleSessionChange = event => setSession(event.target.value);

    const onLogin = async (evt) => {
        evt.preventDefault()
        logInAdmin(user, pwd, session)
    }

    return <div className="formContainer">
        <h1>iniciar sesión de administrador</h1>
        <form onSubmit={onLogin}>
            <label>Email:</label><input type="email" name="email" id="adminlUserLogin" onChange={handleAdminChange} /><br />
            <label>Contraseña:</label><input type="password" name="password" id="passwordAdminLogin" onChange={handlePwdChange} /><br></br>
            <label>Mantener sesión iniciada</label><input type="checkbox" name="noCerrarSesion" id="noCerrarSesion" onChange={handleSessionChange}></input><br></br>
            <button type="submit">Iniciar Sesión</button>
        </form >
    </div>
}