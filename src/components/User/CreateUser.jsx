import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';

export default function CreateUser() {
    const { signIn } = useContext(UserContext);

    const [user, setUser] = useState();
    const [pwd, setPwd] = useState();
    const [repeatPwd, setRepeatPwd] = useState();

    const handleUserChange = event => setUser(event.target.value);
    const handlePwdChange = event => {
        setPwd(event.target.value)
        let password = event.target.value;
        let passwordLength = password.length >= 8;
        let passwordMayusValidation = (/[A-Z]/).test(password);
        let passwordNumberValidation = (/[0-9]/).test(password);
        let passwordSpecialCharValidation = (/[/!"#$%&'·()*+,-./:;<=>?@[\]^_`{|}~]/g).test(password);
        if(passwordLength){
            document.getElementById("passwordCharValidation").classList.add("passwordValidationOk")
        } else {
            document.getElementById("passwordCharValidation").classList.remove("passwordValidationOk")
        }
        if(passwordMayusValidation){
            document.getElementById("passwordMayusValidation").classList.add("passwordValidationOk")
        } else {
            document.getElementById("passwordMayusValidation").classList.remove("passwordValidationOk")
        }
        if(passwordNumberValidation){
            document.getElementById("passwordNumberValidation").classList.add("passwordValidationOk")
        } else {
            document.getElementById("passwordNumberValidation").classList.remove("passwordValidationOk")
        }
        if(passwordSpecialCharValidation){
            document.getElementById("passwordSpecialCharValidation").classList.add("passwordValidationOk")
        } else {
            document.getElementById("passwordSpecialCharValidation").classList.remove("passwordValidationOk")
        }
        if(passwordLength && passwordMayusValidation && passwordNumberValidation && passwordSpecialCharValidation){
            document.getElementById("submit").disabled = false;
        } else {
            document.getElementById("submit").disabled = true;
        }
    };
    
    const handleRepeatPwdChange = evt =>{
        setRepeatPwd(evt.target.value)
    }
    const onSignIn = async (evt) => {
        evt.preventDefault();
        let response = await signIn(user, pwd, repeatPwd);
        if(response.status == 600){
            document.getElementById("userInfo").innerHTML = "Las contraseñas deben coincidir";
        }
        if(response.status == 400){
            if(response.state == "Firebase: Error (auth/email-already-in-use)."){
                document.getElementById("userInfo").innerHTML = "Ya existe un usuario registrado con ese email";
            }
        }
        if(response.status == 200){
            window.location.assign("/")
        }
    }

    return <div className="formContainer" >
        <form onSubmit={onSignIn}>
            <div class="mb-3" className="inputForm" >
                <label for="email"  class="form-label">Usuario</label>
                <input type="email"  class="form-control" id="email" aria-describedby="emailHelp" onChange={handleUserChange} placeholder="fulanito@gmail.com"/>
            </div>
            <div class="mb-3" className="inputForm" >
                <label for="password" class="form-label">Contraseña</label>
                <input type="password"  class="form-control" id="password" onChange={handlePwdChange} />
            </div>
            <div class="mb-3" className="inputForm" >
                <label for="repeatPassword" class="form-label">Repetir Contraseña</label>
                <input type="password"  class="form-control" id="repeatPasswordValidation" onChange={handleRepeatPwdChange} />
            </div>

            <div class="mb-3">
                <ul className="userInfo">
                <li id="passwordCharValidation" class="">Debe contener un minimo de 8 caracteres</li>
                <li id="passwordMayusValidation" class="">Debe contener una Mayúscula</li>
                <li id="passwordNumberValidation" class="">Debe contener un número</li>
                <li id="passwordSpecialCharValidation" class="">Debe contener un caracter especial</li>
                <li id="userInfo" class="" style={{color: 'red'}}></li>
                </ul>
            </div>
            <button type="submit" id="submit" class="btn btn-success" disabled='true'>Registrarse</button>
        </form>
    </div>
}