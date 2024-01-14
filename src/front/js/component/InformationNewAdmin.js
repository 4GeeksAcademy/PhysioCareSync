import "../../styles/InformationNewAdmin.css"
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import SnackBarLogin from '../component/SnackBarLogin';

const InformationNewAdmin = () => {
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
    const modalRef = useRef(null)
    let timeOutId

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
            handlerLoginAdmin();
        }
    };

    const handlerLogOutAdmin = () => {
        goLogin("/adminLogin")
    }

    useEffect(() => {
        return () => {
            clearTimeout(timeOutId)
        }
    }, [])

    const handlerLoginAdmin = async () => {
        setCheckLoginBotton(false)
        try {

            if (email.trim() === '' || password.trim() === '') {
                setHideAlert(true)
                setShowEmailError(true)
                setCheckLoginBotton(true)
                setEmailError('Debe de ingresar los datos requeridos en el campo');
                return;
            }

            let loginAdmin = {
                email: email,
                password: password,
            };

            const result = await actions.loginAdmin(loginAdmin);
            if (result.admin && result.accessToken) {
                setLoginSuccess(true)
                const token = result.accessToken;
                sessionStorage.setItem('tokenAdmin', token)
                await actions.accessConfirmationAdmin();
                console.log(store.informationAdministration)
                sessionStorage.setItem("adminId", store.informationAdministration.admin.id)
                const adminId = sessionStorage.getItem("adminId")

                snackRef.current.show()
                if (modalRef.current) {
                    const modal = new bootstrap.Modal(modalRef.current)
                    modal.hide()
                }

                timeOutId = setTimeout(() => {
                    navigate(`/adminView/${adminId}`)
                    window.location.reload()
                }, 2000)



            } else if (result.error) {
                setHideAlert(true)
                setShowEmailError(true)
                setEmailError('Correo electrónico o contraseña incorrectos');
                snackRef.current.show()
                setCheckLoginBotton(true)
                return;
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
        <div className="adminCardContainer">
            <div className="adminProperty1defaultAlt">
                <div className="adminCopyComponent">
                    <div className="adminHeadingText">
                        <h1 className="adminHeading">
                            Bienvenido administrador
                        </h1>
                        <h3 className="adminSubheading">Al iniciar sesión como administrador tendras total control de los pacientes y especialistas registrados!</h3>
                        <h3 className="adminSubheading">Esto en caso de que exista conflictos en algún paciente o especialista</h3>
                        <h5 className="adminSubheading">Casos que pueden ocurrir debido a un mal vocabulario, mal comportamiento, etc.</h5>
                    </div>
                </div>
            </div>

            <div className="adminNewProperty1DefaultAlt">
                <div className="adminNewCopyComponent">
                    <h1 className="adminNewTitle">
                        <i class="fa-solid fa-user-tie"></i> Cuenta del administrador
                    </h1>
                    <button id="newButton1" type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginAdmin">
                        <div className="newTextContainer">
                            <div className="newCta1" >Iniciar sesión</div>
                        </div>
                    </button>
                    <div class="modal fade" ref={modalRef} id="loginAdmin" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="staticBackdropLabel">Inicie sesión por favor</h5>
                                    <button type="button" className="btn-close adminClose" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    {loginSuccess ?
                                        <SnackBarLogin type={snackBarType.success} ref={snackRef} message="Inicio Sesión como administrador!" /> :
                                        <SnackBarLogin type={snackBarType.fail} ref={snackRef} message="Datos incorrectos, intente nuevamente" />}
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
                                </div>
                                <div class="modal-footer">
                                    <button type="button" disabled={!checkLoginBotton} onClick={() => handlerLogOutAdmin()} class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="button" disabled={!checkLoginBotton} onClick={() => handlerLoginAdmin()} id="login-button" class="btn btn-primary" >Iniciar sesión</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    )
}

export default InformationNewAdmin
