import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { Link } from 'react-router-dom'

export default function CreateUser() {
    const { signIn } = useContext(UserContext);

    const [user, setUser] = useState();
    const [pwd, setPwd] = useState();

    const handleUserChange = event => setUser(event.target.value);
    const handlePwdChange = event => {
        let password = event.target.value;
        setPwd(event.target.value)
        if(password.length >= 8){
            document.getElementById("passwordCharValidation").classList.add("passwordValidationOk")
        } else {
            document.getElementById("passwordCharValidation").classList.remove("passwordValidationOk")
        }
        if((/[A-Z]/).test(password)){
            document.getElementById("passwordMayusValidation").classList.add("passwordValidationOk")
        } else {
            document.getElementById("passwordMayusValidation").classList.remove("passwordValidationOk")
        }
        if((/[0-9]/).test(password)){
            document.getElementById("passwordNumberValidation").classList.add("passwordValidationOk")
        } else {
            document.getElementById("passwordNumberValidation").classList.remove("passwordValidationOk")
        }
        if((/[/!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g).test(password)){
            document.getElementById("passwordSpecialCharValidation").classList.add("passwordValidationOk")
        } else {
            document.getElementById("passwordSpecialCharValidation").classList.remove("passwordValidationOk")
        }
    };

    const onSignIn = async (evt) => {
        evt.preventDefault();
        let response = await signIn(user, pwd);
        console.log(response)
    }

    return <div>
        <form onSubmit={onSignIn}>
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" onChange={handleUserChange} />
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" onChange={handlePwdChange} />
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <div class="mb-3">
                <ul>
                <li id="passwordCharValidation" class="">Debe contener un minimo de 8 caracteres</li>
                <li id="passwordMayusValidation" class="">Debe contener una Mayúscula</li>
                <li id="passwordNumberValidation" class="">Debe contener un número</li>
                <li id="passwordSpecialCharValidation" class="">Debe contener un caracter especial</li>
                </ul>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
}