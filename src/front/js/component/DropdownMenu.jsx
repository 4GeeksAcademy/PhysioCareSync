
import React, { useContext, useState } from 'react'
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = () => {
    const { store, actions } = useContext(Context)
    const goToProfile = useNavigate()
    const goToEditProfile = useNavigate()
    const goToHome = useNavigate()

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

    //revisar los accesstokendelpaciente! y setearlo en el navbar
    const patientId = sessionStorage.getItem("patientId")
    const specialistId = sessionStorage.getItem("specialistId")
    const adminId = sessionStorage.getItem("adminId")


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

    const handleLogoutAdmin = async () => {
        store.isTokenAuthentication == false
        await actions.deleteTokenAdmin()
        store.informationAdministration = {}
        goToHome('/');
    }

    return (
        <div className='dropdown'>
            {patientId ? <>
                <DropdownItem className="container-language-dropdown" leftIcon={"Idioma"} rightIcon={<p className='container-language'><img className='dropdown-flag' src='https://norfipc.com/img/banderas/bandera-mexico.svg' />&nbsp;  <p className='language-abb'>ESP</p></p>}></DropdownItem>
                <hr />
                <DropdownItem className="container-image-dropdown"
                    leftIcon={<img className='icon-dropdown-image' src={store.informationPatient.img} />}
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
            </>
                : specialistId ?
                    <>
                        <DropdownItem className="container-language-dropdown" leftIcon={"Idioma"} rightIcon={<p className='container-language'><img className='dropdown-flag' src='https://norfipc.com/img/banderas/bandera-mexico.svg' />&nbsp;  <p className='language-abb'>ESP</p></p>}></DropdownItem>
                        <hr />
                        <DropdownItem className="container-image-dropdown"
                            leftIcon={<img className='icon-dropdown-image' src={store.informationSpecialist.img} />}
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
                        > </DropdownItem>

                    </>
                    : adminId ?

                        <>
                            <DropdownItem className="container-language-dropdown" leftIcon={"Idioma"} rightIcon={<p className='container-language'><img className='dropdown-flag' src='https://norfipc.com/img/banderas/bandera-mexico.svg' />&nbsp;  <p className='language-abb'>ESP</p></p>}></DropdownItem>
                            <hr />
                            <DropdownItem className="container-image-dropdown"
                                leftIcon={<img className='icon-dropdown-image' src={"https://res.cloudinary.com/dxgvkwunx/image/upload/v1705114609/PhysioCareSync/fotoadmin-transformed_znalzd.png"} />}
                            > <p className='name-specialist-dropdown'> Administrador </p></DropdownItem>
                            <hr />
                            <DropdownItem className="container-my-profile"
                                leftIcon={<button className='button-navbar-profile' onClick={() => goToProfile(`/adminView/${store.informationAdministration.admin.id}`)}>Mi perfil</button>}
                            ></DropdownItem>
                            <hr />

                            <DropdownItem className="container-logout"
                                leftIcon={<button onClick={() => handleLogoutAdmin()} className='button-logout-navbar'>
                                    <i class="fa-solid fa-right-from-bracket"></i>  <p className='text-logout'>Cerrar Sesión</p>
                                </button>}
                            > </DropdownItem>
                        </>
                        :
                        null
            }


        </div >
    )
}

export default DropdownMenu
