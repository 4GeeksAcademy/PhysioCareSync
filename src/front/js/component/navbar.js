import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import LogInBtn from "./LogInBtn.jsx";
import NewUserBtn from "./NewUserBtn.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import ProfileDropdown from "./ProfileDropdown.jsx";
import DropdownMenu from "./DropdownMenu.jsx";



export const Navbar = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const profileImageSpecialistEmpty = "https://res-console.cloudinary.com/dxgvkwunx/thumbnails/v1/image/upload/v1703884900/UGh5c2lvQ2FyZVN5bmMvaW1hZ2VuX3Npbl9mb25kb19lbmZlcm1lcm9faG95emVp/preview"
    const profileImagePatientEmpty = "https://res-console.cloudinary.com/dxgvkwunx/thumbnails/v1/image/upload/v1703777652/UGh5c2lvQ2FyZVN5bmMvaW1hZ2VuX3Npbl90b2RvX3BlcmZpbF9hancyb2g=/preview"
    const params = useParams()

    // const limit = 5
    // // const { page } = params
    // // page=1

    const handleInicioClick = () => {
        console.log("Botón de Inicio clicado");

    };
    const handleServiciosClick = () => {
        console.log("Botón de Servicios clicado");

    };
    const handleProfesionalesClick = () => {
        console.log("Botón de Profesionales clicado");

        // navigate('/professional-view?page=$:page&limit=$:limit')
        navigate("/professionalView")
    };

    const handleLoginClick = () => {
        console.log("Botón de Iniciar Sesión clicado");

    };

    const handleRegisterClick = () => {
        console.log("Botón de Registrarse clicado");

    };

    let tokenAuthentication
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
                        (tokenPatient
                            ? <ProfileDropdown imageProfile={store.informationPatient.img ? store.informationPatient.img : profileImagePatientEmpty}>
                                <DropdownMenu />
                            </ProfileDropdown>
                            :
                            <ProfileDropdown imageProfile={store.informationSpecialist.img ? store.informationSpecialist.img : profileImageSpecialistEmpty}>
                                <DropdownMenu />
                            </ProfileDropdown>)
                }



            </div>
            <div className="brand">
                <FontAwesomeIcon icon={faHeartbeat} />
                <div className="brandname">PhysioCareSync</div>
            </div>
        </div>
    );
};
