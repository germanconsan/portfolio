import React, { useState } from "react";
import './Login.css'
import { Auth } from "../../../services/Auth";
import { useHistory } from 'react-router-dom';

function Login({ isLoading, setIsLoading, onAction }) {

    const _auth = new Auth();
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const history = useHistory();
    const [messageErrorPass, setMessageErrorPass] = useState([]);
    const [errorPass, setErrorPass] = useState(false);
    const [messageErrorEmail, setMessageErrorEmail] = useState([]);
    const [errorEmail, setErrorEmail] = useState(false);

    const verificar = (email, password) => {

        setErrorPass(false);
        setMessageErrorPass([]); // Restablecer el array de errores

        setErrorEmail(false);
        setMessageErrorEmail([]); // Restablecer el array de errores

        const verifiedEmail = _auth.verifyEmail(email);
        setMessageErrorEmail(verifiedEmail.errs);
        setErrorEmail(verifiedEmail.status);

        const verifiedPass = _auth.verifyPassword(password);
        setMessageErrorPass(verifiedPass.errs);
        setErrorPass(verifiedPass.status);

        if (!verifiedPass.status && !verifiedEmail.status) {
            sentLogin(email, password);
        }
    };

    const sentLogin = async (email, password) => {
        try {
            setIsLoading(true);


            await _auth.login(email, password);

            if (_auth.getToken()) {
                console.log('Redirigiendo...');
                history.push('/books');

            }
        } catch (error) {
            console.log("Error", error);
            setErrorPass(true);
            setMessageErrorPass(["Credenciales incorrectas."])
        } finally {
            setIsLoading(false);
            setEmailValue('');
            setPasswordValue('');
        }
    }

    const handleClick = () => {
        // Llama al callback pasado desde el componente padre
        onAction(true);
    };



    return (
        <div id="loginContainer" className="login-container">
            <fieldset className="login-input">
                <legend className="login-input__label">Iniciar Sesión</legend>
                <div className="form-login">
                    <div className="form-login-container">
                        <div className="form-login-container-input">
                            <label htmlFor="email">Correo electrónico: </label>
                            <input className="login-input__field"
                                type="email"
                                id="email"
                                placeholder="Email..."
                                value={emailValue}
                                onChange={e => setEmailValue(e.target.value)}
                                onKeyUp={e => {
                                    if (e.key === "Enter") {
                                        verificar(emailValue, passwordValue);
                                    }

                                }} />
                        </div>
                        <div className="form-login-container-input">
                            <label htmlFor="password">Contraseña: </label>
                            <input className="login-input__field"
                                type="password"
                                id="password"
                                placeholder="Contraseña..."
                                value={passwordValue}
                                onChange={e => setPasswordValue(e.target.value)}
                                onKeyUp={e => {
                                    if (e.key === "Enter") {
                                        verificar(emailValue, passwordValue);
                                    }
                                }}
                            />
                        </div>
                        <button className="login-clear" onClick={() => {

                            verificar(emailValue, passwordValue);

                        }}> Iniciar sesión</button>

                    </div>
                </div>

                {(errorEmail || errorPass) &&
                    <div className="container-error">
                        <ul>
                            {errorEmail && messageErrorEmail.map((err, index) =>
                                <li key={index} className="message-error">{err}</li>
                            )}

                            {errorPass && messageErrorPass.map((err, index) =>
                                <li key={index} className="message-error">{err}</li>
                            )}
                        </ul>
                    </div>
                }

            </fieldset>
            <div className="container-registerLink">
                <h4 className="container-registerLink-text">¿Aún no tienes una cuenta?</h4>
                <div className="container-registerLink-link" onClick={() => handleClick()} >Registrate ahora</div>
            </div>
        </div>

    )

}

export default Login;