import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Link } from 'react-router-dom'

export default function CreateUser() { 
    const { signIn } = useContext(UserContext);

    const onSignIn = async (evt) => {
        evt.preventDefault();
        let userEmail = document.getElementById('userEmail').value
        let passwordUserCreate = document.getElementById('passwordUserCreate').value
        await signIn(userEmail, passwordUserCreate);
    }


    return <div className="createUser">
        <form>
            <label>Email<input type="email" name="email" id="userEmail" /></label><br />
            <label>Contraseña<input type="password" name="password1" id="passwordUserCreate"></input></label><br />
            <label>Repetir Contraseña<input type="password" name="password2" id="repeatPasswordUserCreate"></input></label>
            <button onClick={onSignIn}><Link to="/user/logIn">Crear Usuario</Link></button>
        </form>
    </div>
}