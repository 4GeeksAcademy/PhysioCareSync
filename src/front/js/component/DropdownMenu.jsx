
import React, { useContext } from 'react'
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = () => {

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

    const handleLogOut = async () => {
        store.isTokenAuthentication == false
        await actions.deleteTokenSpecialist()
        goToHome('/');
    }

    const { store, actions } = useContext(Context)
    return (
        <div className='dropdown'>
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
                leftIcon={<button onClick={() => handleLogOut()} className='button-logout-navbar'>
                    <i class="fa-solid fa-right-from-bracket"></i>  <p className='text-logout'>Cerrar Sesión</p>
                </button>}
            > </DropdownItem>

        </div >
    )
}

export default DropdownMenu
