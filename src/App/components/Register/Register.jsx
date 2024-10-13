import React, { useState } from "react";
import './Register.css'
import { Auth } from "../../../services/Auth";


function Register({ isLoading, setIsLoading, onAction }) {

    const _auth = new Auth();

    const [nameValueR, setNameValueR] = useState("");
    const [emailValueR, setEmailValueR] = useState("");
    const [passwordValueR, setPasswordValueR] = useState("");
    const [passRepeatValueR, setPassRepeatValueR] = useState("");


    const [messagecheckedR, setMessagecheckedR] = useState("");

    const [statusErrorR, setStatusErrorR] = useState(false);
    const [messageErrorR, setMessageErrorR] = useState([]);

    const verificar = (nameR, emailR, passwordR, passRepeatR) => {

        setStatusErrorR(false);
        setMessageErrorR([]); // Restablecer el array de errores

        // Confirmar que el nombre es más largo de 0
        const nameRLenght = (nameR.length > 0);
        if (!nameRLenght) {
            setMessageErrorR(pre => [...pre, "Debes introducir un nombre."]);
        }

        const verifiedEmail = _auth.verifyEmail(emailR);
        if (verifiedEmail.errs) {
            // Si errs es un array, propágalo, si no, solo añádelo
            setMessageErrorR(pre => [...pre, ...(Array.isArray(verifiedEmail.errs) ? verifiedEmail.errs : [verifiedEmail.errs])]);
        }

        const verifiedPass = _auth.verifyPassword(passwordR);
        if (verifiedPass.errs) {
            setMessageErrorR(pre => [...pre, ...(Array.isArray(verifiedPass.errs) ? verifiedPass.errs : [verifiedPass.errs])]);
        }

        // Confirmar que las contraseñas son diferentes
        const diferentPass = (passwordR !== passRepeatR);
        if (diferentPass) {
            setMessageErrorR(pre => [...pre, "La contraseña no coincide."]);
        }



        // Ajustar estado de error si hay algún error
        if (verifiedPass.errs || verifiedEmail.errs || diferentPass || !nameRLenght) {
            setStatusErrorR(true);
        } else {
            setStatusErrorR(false);
        }

        // Verificar si todos los campos son válidos antes de enviar
        if (!verifiedPass.status && !verifiedEmail.status && !diferentPass && nameRLenght) {
            setStatusErrorR(false);
            sentRegister(nameR, emailR, passwordR, passRepeatR);


        }
    };




    const sentRegister = async (nameR, emailR, passwordR) => {
        try {
            setIsLoading(true);


            let register = await _auth.register(nameR, emailR, passwordR);
            if (register.name) {
                setStatusErrorR(true);
                setMessagecheckedR(`<p class="message-successful"> &#10004; Usuario creado correctamente.</p>`);
            }


        } catch (error) {

            if (error.response.numberError === 422) {
                setStatusErrorR(true);
                setMessagecheckedR(`<p  class="message-error"> &#10006; El usuario con el email <strong>${emailR}</strong> ya existe.</p>`);
            }


        } finally {
            setIsLoading(false);
            setNameValueR('');
            setEmailValueR('');
            setPasswordValueR('');
            setPassRepeatValueR('');
        }
    }

    const handleClick = () => {
        // Llama al callback pasado desde el componente padre
        onAction(false);
    };



    return (
        <div id="loginContainer" className="register-container">
            <fieldset className="register-input">
                <legend className="login-input__label">Registrarse</legend>
                <div className="form-register">
                    <div className="form-register-container">


                        {/*Name*/}
                        <div className="form-login-container-input">
                            <label htmlFor="nameR">Nombre: </label>
                            <input className="login-input__field"
                                type="text"
                                id="nameR"
                                placeholder="Nombre..."
                                value={nameValueR}
                                onChange={e => setNameValueR(e.target.value)}
                                onKeyUp={e => {
                                    if (e.key === "Enter") {
                                        verificar(nameValueR, emailValueR, passwordValueR, passRepeatValueR);
                                    }
                                }}
                            />
                        </div>



                        {/*Email*/}
                        <div className="form-login-container-input">
                            <label htmlFor="emailR">Correo electrónico: </label>
                            <input className="login-input__field"
                                type="email"
                                id="emailR"
                                placeholder="Email..."
                                value={emailValueR}
                                onChange={e => setEmailValueR(e.target.value)}
                                onKeyUp={e => {
                                    if (e.key === "Enter") {
                                        verificar(nameValueR, emailValueR, passwordValueR, passRepeatValueR);
                                    }

                                }} />
                        </div>

                        {/*Password*/}
                        <div className="form-login-container-input">
                            <label htmlFor="passwordR">Contraseña: </label>
                            <input className="login-input__field"
                                type="password"
                                id="passwordR"
                                placeholder="Contraseña..."
                                value={passwordValueR}
                                onChange={e => setPasswordValueR(e.target.value)}
                                onKeyUp={e => {
                                    if (e.key === "Enter") {
                                        verificar(nameValueR, emailValueR, passwordValueR, passRepeatValueR);
                                    }
                                }}
                            />
                        </div>


                        {/*Repeat password*/}
                        <div className="form-login-container-input">
                            <label htmlFor="passwordRepeatR">Repetir contraseña: </label>
                            <input className="login-input__field"
                                type="password"
                                id="passwordRepeatR"
                                placeholder="Repetir contraseña..."
                                value={passRepeatValueR}
                                onChange={e => setPassRepeatValueR(e.target.value)}
                                onKeyUp={e => {
                                    if (e.key === "Enter") {
                                        verificar(nameValueR, emailValueR, passwordValueR, passRepeatValueR);
                                    }
                                }}
                            />
                        </div>


                        <label>
                            <input
                                type="checkbox"
                                className="register-input__field"
                            // checked={isChecked}
                            // onChange={handleCheckboxChange}
                            />
                            Acepto los términos y condiciones
                        </label>



                        <button className="login-clear" onClick={() => {

                            verificar(nameValueR, emailValueR, passwordValueR, passRepeatValueR);

                        }}>Registrarse</button>

                    </div>
                </div>

                {statusErrorR &&
                    <div className="container-error-register">
                        <ul>
                            {messageErrorR.map((err, index) =>
                                <li key={index} className="message-error">{err}</li>
                            )}
                        </ul>
                        {messagecheckedR.length > 0 &&
                            <ul dangerouslySetInnerHTML = {{__html: messagecheckedR }}>
                                
                            </ul>
                        }




                    </div>
                }

            </fieldset>
            <div className="container-registerLink">
                <h4 className="container-registerLink-text">¿Ya tienes una cuenta?</h4>
                <div className="container-registerLink-link" onClick={() => handleClick()} >Inicia sesión ahora</div>
            </div>
        </div>

    )

}

export default Register;