import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import LogInBtn from "./LogInBtn.jsx";
import NewUserBtn from "./NewUserBtn.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import ProfileDropdown from "./ProfileDropdown.jsx";
import DropdownMenu from "./DropdownMenu.jsx";


export const Navbar = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    const handleInicioClick = () => {

    };


    const handleProfesionalesClick = () => {

        navigate("/professionalView")
    };

    const handleProfesionalesAdminClick = () => {
        navigate("/professionalViewAdmin")
    };


    const handleLoginClick = () => {

    };

    const handleRegisterClick = () => {

    };

    const handlerPatientClick = () => {
        navigate("/patientViewAdmin")
    }

    let tokenAuthentication
    const tokenPatient = sessionStorage.getItem('tokenPatient');
    const tokenSpecialist = sessionStorage.getItem("tokenSpecialist")
    const tokenAdmin = sessionStorage.getItem("tokenAdmin")

    if (tokenPatient) {
        tokenAuthentication = tokenPatient

    }
    else if (tokenSpecialist) {
        tokenAuthentication = tokenSpecialist
    }
    else if (tokenAdmin) {
        tokenAuthentication = tokenAdmin
    }


    return (
        <div className="bubbleContainer">
            <div className="navLinks">
                {!tokenAuthentication
                    ?
                    (
                        <Link to='/'>
                            <button className="navLink" onClick={handleInicioClick}>
                                <div className="navLabel">Inicio</div>
                            </button></Link>
                    ) :
                    (
                        null
                    )
                }

                {
                    !tokenAuthentication ?
                        null
                        :
                        (
                            tokenAdmin ?
                                (
                                    <button className="navLink" onClick={handlerPatientClick}>
                                        <div className="navLabel">Pacientes</div>
                                    </button>

                                )
                                :

                                (
                                    null
                                )
                        )
                }

                {
                    tokenAuthentication
                        ?
                        <button className="navLink" onClick={tokenAdmin ? handleProfesionalesAdminClick : handleProfesionalesClick}>
                            <div className="navLabel">Profesionales</div>
                        </button>
                        :
                        null
                }

            </div >
            <div className="navLinks1">
                {
                    !tokenAuthentication ?
                        <LogInBtn onClick={handleLoginClick}></LogInBtn> :
                        <></>
                }
                {
                    !tokenAuthentication ?
                        <NewUserBtn onClick={handleRegisterClick} ></NewUserBtn> :
                        (tokenPatient
                            ? <ProfileDropdown imageProfile={store.informationPatient.img ? store.informationPatient.img : " https://res.cloudinary.com/dxgvkwunx/image/upload/v1703777652/PhysioCareSync/imagen_sin_todo_perfil_ajw2oh.jpg"}>
                                <DropdownMenu />
                            </ProfileDropdown>
                            :
                            (
                                tokenSpecialist ?
                                    (
                                        <ProfileDropdown imageProfile={store.informationSpecialist.img ? store.informationSpecialist.img : "https://res.cloudinary.com/dxgvkwunx/image/upload/v1703884900/PhysioCareSync/imagen_sin_fondo_enfermero_hoyzei.jpg"}>
                                            <DropdownMenu />
                                        </ProfileDropdown>
                                    )
                                    :
                                    tokenAdmin ?
                                        (
                                            <ProfileDropdown imageProfile={"https://res.cloudinary.com/dxgvkwunx/image/upload/v1705114609/PhysioCareSync/fotoadmin-transformed_znalzd.png"}>
                                                <DropdownMenu />
                                            </ProfileDropdown>
                                        )
                                        :
                                        (
                                            <>
                                                <LogInBtn onClick={handleLoginClick}></LogInBtn>
                                                <NewUserBtn onClick={handleRegisterClick} ></NewUserBtn>
                                            </>
                                        )

                            )
                        )

                }
            </div>
            <div className="brand">
                <FontAwesomeIcon icon={faHeartbeat} className="heartbeatIcon" />
                <div className="brandname">PhysioCareSync</div>
            </div>
        </div >
    );
};
