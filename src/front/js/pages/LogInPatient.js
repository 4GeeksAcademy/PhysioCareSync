
import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { Link, useNavigate } from 'react-router-dom';

const LogInPatient = () => {
    const navigate = useNavigate();
    const { actions } = useContext(Context);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [clickedEmail, setClickedEmail] = useState(false);
    const [clickedPassword, setClickedPassword] = useState(false);
    const [emailError, setEmailError] = useState('');

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handlerClickEmail = () => {
        setClickedEmail(false);
    };

    const handlerBlurEmail = () => {
        if (!email.trim()) {
            setClickedEmail(true);
            setEmailError('El correo electrónico es obligatorio');
        } else if (!isEmailValid(email)) {
            setClickedEmail(true);
            setEmailError('El formato del correo electrónico es incorrecto');
        } else {
            setClickedEmail(false);
            setEmailError('');
        }
    };

    const handlerClickPassword = () => {
        setClickedPassword(false);
    };

    const handlerBlurPassword = () => {
        if (!password.trim()) {
            setClickedPassword(true);
        }
    };

    const handlerKeyPress = (event) => {
        if (event.key === 'Enter') {
            handlerLogInPatient();
        }
    };

    const handlerLogInPatient = async () => {
        try {
            if (email.trim() === '' || emailError || password.trim() === '' || clickedPassword) {
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

            } else {
                setEmailError('Correo electrónico o contraseña incorrectos');
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
                    <p className='subTitle'>Por favor, introduce tus datos para ingresar a tu cuenta</p>
                </div>

                <div className='mb-3'>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        onClick={handlerClickEmail}
                        onBlur={handlerBlurEmail}
                        onKeyPress={handlerKeyPress}
                        type='email'
                        className='form-control'
                        id='exampleFormControlInput1'
                        placeholder='Correo electrónico'
                    />
                    {clickedEmail && email.trim() === '' && <p className='errorMsg'>* El correo electrónico es obligatorio *</p>}
                    {emailError && <p className='errorMsg'>{emailError}</p>}
                </div>

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    onClick={handlerClickPassword}
                    onBlur={handlerBlurPassword}
                    onKeyPress={handlerKeyPress}
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
