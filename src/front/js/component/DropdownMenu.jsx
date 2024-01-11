
import React, { useContext, useState } from 'react'
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = () => {
    const { store, actions } = useContext(Context)
    const goToProfile = useNavigate()
    const goToEditProfile = useNavigate()
    const goToHome = useNavigate()
    // let isPatient = false

    // let getTokenPatient = sessionStorage.getItem('tokenPatient')

    // if (getTokenPatient) {
    //     isPatient = false
    // }
    // else {
    //     setPatient(false)
    // }

    const profileImageSpecialistEmpty = "https://res-console.cloudinary.com/dxgvkwunx/thumbnails/v1/image/upload/v1703884900/UGh5c2lvQ2FyZVN5bmMvaW1hZ2VuX3Npbl9mb25kb19lbmZlcm1lcm9faG95emVp/preview"
    const profileImagePatientEmpty = "https://res-console.cloudinary.com/dxgvkwunx/thumbnails/v1/image/upload/v1703777652/UGh5c2lvQ2FyZVN5bmMvaW1hZ2VuX3Npbl90b2RvX3BlcmZpbF9hancyb2g=/preview"



    const DropdownItem = (props) => {
        const containerClass = props.className || "";
        return (
            <a className={`menu-item ${containerClass}`}>
                <span >{props.leftIcon}</span>
                {props.children}
                <span className='icon-right'>{props.rightIcon}</span>
            </a >
        );
    }

    const handleLogOutPatient = async () => {
        store.isTokenAuthentication == false
        await actions.deleteTokenPatient()
        store.informationPatient = {}
        goToHome('/');
    }

    const handleLogoutSpecialist = async () => {
        store.isTokenAuthentication == false
        await actions.deleteTokenSpecialist()
        store.informationSpecialist = {}
        goToHome('/');
    }




    return (
        <div className='dropdown'>
            {store.informationPatient.first_name ? <>
                <DropdownItem className="container-language-dropdown" leftIcon={"Idioma"} rightIcon={<p className='container-language'><img className='dropdown-flag' src='https://norfipc.com/img/banderas/bandera-mexico.svg' />&nbsp;  <p className='language-abb'>ESP</p></p>}></DropdownItem>
                <hr />
                <DropdownItem className="container-image-dropdown"
                    leftIcon={<img className='icon-dropdown-image' src={store.informationPatient.img ? store.informationPatient.img : profileImagePatientEmpty} />}
                > <p className='name-specialist-dropdown'> {store.informationPatient.first_name} {store.informationPatient.last_name} </p></DropdownItem>
                <hr />
                <DropdownItem className="container-my-profile"
                    leftIcon={<button className='button-navbar-profile' onClick={() => goToProfile(`/profile/patient/${store.informationPatient.id}`)}>Mi perfil</button>}
                ></DropdownItem>
                <hr />
                <DropdownItem className="container-edit-profile"
                    leftIcon={<button className='button-edit-navbar' onClick={() => goToEditProfile(`/edit/patient`)}>Editar perfil</button>}
                ></DropdownItem>
                <hr />
                <DropdownItem className="container-logout"
                    leftIcon={<button onClick={() => handleLogOutPatient()} className='button-logout-navbar'>
                        <i class="fa-solid fa-right-from-bracket"></i>  <p className='text-logout'>Cerrar Sesión</p>
                    </button>}
                > </DropdownItem>
            </> : <>
                <DropdownItem className="container-language-dropdown" leftIcon={"Idioma"} rightIcon={<p className='container-language'><img className='dropdown-flag' src='https://norfipc.com/img/banderas/bandera-mexico.svg' />&nbsp;  <p className='language-abb'>ESP</p></p>}></DropdownItem>
                <hr />
                <DropdownItem className="container-image-dropdown"
                    leftIcon={<img className='icon-dropdown-image' src={store.informationSpecialist.img ? store.informationSpecialist.img : profileImageSpecialistEmpty} />}
                > <p className='name-specialist-dropdown'> {store.informationSpecialist.first_name} {store.informationSpecialist.last_name} </p></DropdownItem>
                <hr />
                <DropdownItem className="container-my-profile"
                    leftIcon={<button className='button-navbar-profile' onClick={() => goToProfile(`/profile/specialist/${store.informationSpecialist.id}`)}>Mi perfil</button>}
                ></DropdownItem>
                <hr />
                <DropdownItem className="container-edit-profile"
                    leftIcon={<button className='button-edit-navbar' onClick={() => goToEditProfile(`/edit/formSpecialist`)}>Editar perfil</button>}
                ></DropdownItem>
                <hr />
                <DropdownItem className="container-logout"
                    leftIcon={<button onClick={() => handleLogoutSpecialist()} className='button-logout-navbar'>
                        <i class="fa-solid fa-right-from-bracket"></i>  <p className='text-logout'>Cerrar Sesión</p>
                    </button>}
                > </DropdownItem></>
            }


        </div >
    )
}

export default DropdownMenu
