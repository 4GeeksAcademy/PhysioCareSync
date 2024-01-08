
import React, { useContext, useRef, useState } from 'react';
import { Context } from '../store/appContext';
import { Link, useNavigate } from 'react-router-dom';
import SnackBarLogin from '../component/SnackBarLogin';

const LogInSpecialist = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [clickedEmail, setClickedEmail] = useState(false);
    const [clickedPassword, setClickedPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [showEmailError, setShowEmailError] = useState(false)
    const [hideAlert, setHideAlert] = useState(true)
    const [loginSuccess, setLoginSuccess] = useState(false)
    const [checkLoginBotton, setCheckLoginBotton] = useState(true)
    const goLogin = useNavigate()



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
        }
        else {
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

    const handlerLogOutSpecialist = () => {
        goLogin("/login")
    }

    const handlerLogInSpecialist = async () => {
        setCheckLoginBotton(false)
        try {

            if (email.trim() === '' || password.trim() === '') {
                setHideAlert(true)
                setShowEmailError(true)
                setCheckLoginBotton(true)
                setEmailError('Debe de ingresar los datos requeridos en el campo');

                return;
            }

            let loginSpecialist = {
                email: email,
                password: password,
            };

            const result = await actions.loginSpecialist(loginSpecialist);
            if (result.specialist && result.accessToken) {
                setLoginSuccess(true)
                const token = result.accessToken;
                console.log('Este es el resultado:', result.specialist);
                sessionStorage.setItem('tokenSpecialist', token)
                await actions.accessConfirmationSpecialist();
                sessionStorage.setItem("specialistId", store.informationSpecialist.id)
                const specialistId = sessionStorage.getItem("specialistId")

                snackRef.current.show()
                setTimeout(() => {
                    navigate(`/profile/specialist/${specialistId}`)
                }, 2000)

            } else if (result.error) {
                setHideAlert(true)
                setShowEmailError(true)
                setEmailError('Correo electrónico o contraseña incorrectos');
                snackRef.current.show()
                setCheckLoginBotton(true)
                return;

                sessionStorage.setItem("payStatus", store.informationSpecialist.is_authorized)
                const payStatus = sessionStorage.getItem("payStatus")
                console.log("Este es el estatus del pago de suscripción", payStatus)
                if (payStatus === "true") {
                    alert("Hola")
                    navigate(`/profile/specialist/${specialistId}`)
                    
                } else {
                    alert("Chau")
                    navigate(`/profile/paymentPage/${specialistId}`)
                }
         
            }
        } catch (error) {
            console.error('Hubo un error con la consulta', error);
        }
    };

    const snackRef = useRef(null)
    const snackBarType = {
        fail: "fail",
        success: "success",
    }

    return (
        <div>
            {loginSuccess ?
                <SnackBarLogin type={snackBarType.success} ref={snackRef} message="Usted inicio sesión correctamente!" /> :
                <SnackBarLogin type={snackBarType.fail} ref={snackRef} message="Intente nuevamente ingresando sus datos correctamente!" />}

            <div className="patientForm">
                <div className="title">
                    <h1>Bienvenido especialista!</h1>
                    <p className="subTitle">Por favor, introduce tus datos para ingresar a tu cuenta</p>
                </div>

                <div className="mb-3">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        onClick={handlerClickEmail}
                        onBlur={handlerBlurEmail}
                        onKeyDown={handlerKeyPress}
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Correo electrónico"
                    />
                    {clickedEmail && email.trim() === '' && !showEmailError && hideAlert && <p className='errorMsg'>{emailError}</p>}
                    {emailError && showEmailError && hideAlert && <p className='errorMsg'>{emailError}</p>}
                </div>

                <input
                    onChange={(e) => setPassword(e.target.value)}
                    onClick={handlerClickPassword}
                    onBlur={handlerBlurPassword}
                    onKeyDown={handlerKeyPress}
                    type="password"
                    id="inputPassword5"
                    className="form-control"
                    aria-describedby="passwordHelpBlock"
                    placeholder="Contraseña"
                />
                {clickedPassword && password.trim() === '' && <p className='errorMsg'>La contraseña es obligatoria</p>}
                <br></br>

                <div className="createNewBtn">
                    <button disabled={!checkLoginBotton} onClick={handlerLogInSpecialist} type="button" className="btn btn-success saveBtn">
                        Ingresar
                    </button>

                    <button disabled={!checkLoginBotton} onClick={handlerLogOutSpecialist} type="button" className="btn btn-outline-primary exitBtn">
                        Salir
                    </button>

                </div>
            </div>
        </div>
    );
};

export default LogInSpecialist;
