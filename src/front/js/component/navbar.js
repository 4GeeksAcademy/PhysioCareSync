import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import LogInBtn from "./LogInBtn.jsx";
import NewUserBtn from "./NewUserBtn.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../store/appContext';

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

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

    const handleLogoutClick = async () => {
        const confirm = window.confirm('¿Estás seguro de que quieres cerrar sesión?');
        if (confirm) {
            await actions.logout(navigate);
        }
    };

    return (
        <div className="bubbleContainer">
            <div className="navLinks">
                <Link to='/'>
                    <button className="navLink" onClick={handleInicioClick}>
                        <div className="navLabel">Inicio</div>
                    </button>
                </Link>
                <button className="navLink" onClick={handleServiciosClick}>
                    <div className="navLabel">Servicios</div>
                </button>
                <Link to="/ProfessionalView">
                    <button className="navLink" onClick={handleProfesionalesClick}>
                        <div className="navLabel">Profesionales</div>
                    </button>
                </Link>
            </div>
            <div className="navLinks1">
                {store.isAuthenticatedPatient || store.isAuthenticatedSpecialist ? (
                    <button className="navLink" onClick={handleLogoutClick}>
                        <div className="navLabel">Cerrar Sesión</div>
                    </button>
                ) : (
                    <>
                        <LogInBtn onClick={handleLoginClick}></LogInBtn>
                        <NewUserBtn onClick={handleRegisterClick}></NewUserBtn>
                    </>
                )}
            </div>
            <div className="brand">
                <FontAwesomeIcon icon={faHeartbeat} />
                <div className="brandname">PhysioCareSync</div>
            </div>
        </div>
    );
};
