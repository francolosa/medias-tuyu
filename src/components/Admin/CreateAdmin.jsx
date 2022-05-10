import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';

export default function CreateUser() {
    const { signIn } = useContext(UserContext);

    const [user, setUser] = useState();
    const [pwd, setPwd] = useState();

    const handleUserChange = event => setUser(event.target.value);
    const handlePwdChange = event => setPwd(event.target.value);

    const onSignIn = async (evt) => {
        evt.preventDefault();
        await signIn(user, pwd);
    }

    return <div className="createUser">
        <h1>crear cuenta</h1>
        <form onSubmit={onSignIn}>
            <label>Email</label><input type="email" name="email" id="userEmail" onChange={handleUserChange} /><br />
            <label>Contraseña</label><input type="password" name="password1" id="passwordUserCreate" onChange={handlePwdChange} /><br />
            <label>Repetir Contraseña</label><input type="password" name="password2" id="repeatPasswordUserCreate"></input><br />
            <button type="submit">Crear Usuario</button>
        </form>
    </div>
}