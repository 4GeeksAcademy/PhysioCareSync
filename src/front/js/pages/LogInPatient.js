
import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { Link, useNavigate } from 'react-router-dom';

const LogInPatient = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [clickedEmail, setClickedEmail] = useState(false);
    const [clickedPassword, setClickedPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [showEmailError, setShowEmailError] = useState(false)
    const [hideAlert, setHideAlert] = useState(true)

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handlerClickEmail = () => {
        setClickedEmail(false);
    };

    const handlerBlurEmail = () => {
        if (!email.trim()) {
            setHideAlert(true)
            setClickedEmail(true);
            setShowEmailError(false)
            setEmailError('El correo electrónico es obligatorio');
        } else if (!isEmailValid(email)) {
            setHideAlert(true)
            setClickedEmail(true);
            setShowEmailError(true)
            setEmailError('El formato del correo electrónico es incorrecto');

        } else {
            setHideAlert(true)
            setClickedEmail(false);
            setEmailError('');
        }
    };

    const handlerClickPassword = () => {
        setHideAlert(true)
        setClickedPassword(false);
    };

    const handlerBlurPassword = () => {
        if (!password.trim()) {
            setHideAlert(true)
            setClickedPassword(true);
        }
    };

    const handlerKeyPress = (event) => {
        if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)) {
            setHideAlert(false)
        }

        if (event.key === 'Enter') {
            setHideAlert(false)
            handlerLogInPatient();
        }
    };

    const handlerLogInPatient = async () => {
        try {
            if (email.trim() === '' || password.trim() === '' || clickedPassword) {
                setHideAlert(true)
                setShowEmailError(true)
                setEmailError('Debe de ingresar los datos requeridos en el campo');
                return;
            }

            const loginPatient = {
                email: email,
                password: password,
            };

            const result = await actions.loginPatient(loginPatient);

            if (result.patient && result.accessToken) {
                const token = result.accessToken;

                sessionStorage.setItem('tokenPatient', token)
                // const tokenPatient = sessionStorage.getItem('tokenPatient')
                await actions.accessConfirmationPatient();
                sessionStorage.setItem("patientId", store.informationPatient.id)
                const patientId = sessionStorage.getItem("patientId")
                navigate(`/profile/patient/${patientId}`)
                // console.log("This is your token patient", tokenPatient) //Eliminar 

            } else if (result.error) {
                setHideAlert(true)
                setShowEmailError(true)
                setEmailError('Correo electrónico o contraseña incorrectos');
                return;
            }
        } catch (error) {
            console.error('Hubo un error con la consulta', error);
        }
    };

    return (
        <div>
            <div className='patientForm'>
                <div className='title'>
                    <h1>Bienvenido paciente!</h1>
                    <p className='subTitle'>Por favor, introduce tus datos para ingresar</p>
                </div>

                <div className='mb-3'>
                    <input
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        onClick={handlerClickEmail}
                        onBlur={handlerBlurEmail}
                        onKeyDown={handlerKeyPress}
                        type='email'
                        className='form-control'
                        id='exampleFormControlInput1'
                        placeholder='Correo electrónico'
                    />
                    {clickedEmail && email.trim() === '' && !showEmailError && hideAlert && <p className='errorMsg'>{emailError}</p>}
                    {emailError && showEmailError && hideAlert && <p className='errorMsg'>{emailError}</p>}
                </div>

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    onClick={handlerClickPassword}
                    onBlur={handlerBlurPassword}
                    onKeyDown={handlerKeyPress}
                    type='password'
                    id='inputPassword5'
                    className='form-control'
                    aria-describedby='passwordHelpBlock'
                    placeholder='Contraseña'
                />
                {clickedPassword && password.trim() === '' && <p className='errorMsg'>* La contraseña es obligatoria *</p>}
                <br />

                <div className='createNewBtn'>
                    <button onClick={handlerLogInPatient} type='button' className='btn btn-success saveBtn'>
                        Ingresar
                    </button>

                    <Link to={'/login'}>
                        <button type='button' className='btn btn-outline-primary exitBtn'>
                            Salir
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LogInPatient;
