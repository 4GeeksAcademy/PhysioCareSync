import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import LogInBtn from "./LogInBtn.jsx";
import NewUserBtn from "./NewUserBtn.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import ProfileDropdown from "./ProfileDropdown.jsx";


export const Navbar = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    let tokenAuthentication
    const handleInicioClick = () => {
        console.log("Botón de Inicio clicado");

    };

    const handleServiciosClick = () => {
        console.log("Botón de Servicios clicado");

    };

    const handleProfesionalesClick = () => {
        console.log("Botón de Profesionales clicado");

    };

    const handleLoginClick = () => {
        console.log("Botón de Iniciar Sesión clicado");

    };

    const handleRegisterClick = () => {
        console.log("Botón de Registrarse clicado");

    };

    const tokenPatient = sessionStorage.getItem('tokenPatient');
    if (!tokenPatient) {
        const tokenSpecialist = sessionStorage.getItem("tokenSpecialist")
        tokenAuthentication = tokenSpecialist
    }
    else {
        tokenAuthentication = tokenPatient
    }


    return (
        <div className="bubbleContainer">
            <div className="navLinks">
                <Link to='/'>
                    <button className="navLink" onClick={handleInicioClick}>
                        <div className="navLabel">Inicio</div>
                    </button></Link>

                <button className="navLink" onClick={handleServiciosClick}>
                    <div className="navLabel">Servicios</div>
                </button>
                <button className="navLink" onClick={handleProfesionalesClick}>
                    <div className="navLabel">Profesionales</div>
                </button>
            </div>
            <div className="navLinks1">
                {
                    !tokenAuthentication ?
                        <LogInBtn onClick={handleLoginClick}></LogInBtn> :
                        <></>
                }
                {
                    !tokenAuthentication ?
                        <NewUserBtn onClick={handleRegisterClick} ></NewUserBtn> :
                        <ProfileDropdown></ProfileDropdown>
                }



            </div>
            <div className="brand">
                <FontAwesomeIcon icon={faHeartbeat} />
                <div className="brandname">PhysioCareSync</div>
            </div>
        </div>
    );
};
