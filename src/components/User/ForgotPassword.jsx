import React, { useState, useEffect } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


export default function ForgotPassword(){
    const auth = getAuth();

      
    const [user, setUser] = useState();
    const handleUserChange = event => setUser(event.target.value);

    const onSubmit = (evt) =>{
        evt.preventDefault();
        sendPasswordResetEmail(auth, user)
        .then(() => {
            document.getElementById("passwordCharValidation").innerHTML = "Se te ha enviado un email con instrucciónes para recuperar tu contraseña";
            document.getElementById("submit").remove();
            document.getElementById("loginStatus").remove();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if(errorMessage == "Firebase: Error (auth/user-not-found).")
          document.getElementById("loginStatus").innerHTML = "No existe un usuario registrado con ese email";
        });
    }


    return <div className="formContainer">
        <form onSubmit={onSubmit}>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" onChange={handleUserChange} />
            </div>
            <div  className="userInfo">
                <ul>
                    <li id="passwordCharValidation" class="">Ingresá el email con el cual te registraste</li>
                    <li id="loginStatus" style={{ color: 'red', fontSize: '14px' }}></li>
                </ul>
            </div>
            <button type="submit" id="submit" class="btn btn-primary"  >Enviar</button>
        </form>
    </div>
    
}