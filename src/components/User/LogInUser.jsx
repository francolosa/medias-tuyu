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
        let response = await logIn(user, pwd, session)
        if (response.status == 400) {
            if (response.state == "Firebase: Error (auth/user-not-found).") {
                document.getElementById("loginStatus").innerHTML = "No existe un usuario registrado con ese email";
            }
            if (response.state == "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).") {
                document.getElementById("loginStatus").innerHTML = "El acceso a este usuario ha sido bloqueado por cantidad de intentos fallidos";
            }
            if (response.state == 'Firebase: Error (auth/wrong-password).') {
                document.getElementById("loginStatus").innerHTML = "Contraseña incorrecta";
            }
        }
        if(response.status == 200){
            window.location.assign("/");
        }
    }

    return <div className="formContainer">
        <form onSubmit={onLogin}>
            <div class="mb-3" className="inputForm" >
                <label for="email" class="form-label">Usuario</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" onChange={handleUserChange} />
            </div>
            <div class="mb-3" className="inputForm" >
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="password" onChange={handlePwdChange} />
            </div>
            <div class="mb-3 form-check" >
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Mantener sesión iniciada</label>
            </div>

            <div  className="userInfo">
                <ul>
                    <li id="loginStatus" style={{ color: 'red', fontSize: '14px' }}></li>
                </ul>
            </div>
            <button type="submit" id="submit" class="btn btn-success" >Entrar</button>
            <div className="loginOptions">
                <a href="/user/forgotPassword" style={{fontSize: '14px', color: "gray"}} >Olvidaste tu contraseña?</a>
                <a href="/user/signIn" style={{fontSize: '14px', color: "gray"}}>No estas registrado? crea tu cuenta</a>
            </div>
        </form>
    </div>
}