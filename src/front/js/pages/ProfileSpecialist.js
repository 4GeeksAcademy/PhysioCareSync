import React from 'react'
import { Context } from '../store/appContext'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react'



const ProfileSpecialist = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    const params = useParams()

    const checkAccess = async () => {
        await actions.accessConfirmationSpecialist();
        const token = sessionStorage.getItem('tokenSpecialist');
        if (!token && store.isTokenAuthentication == true) {
            alert("You do not have access to this page, please log in or create an account");
            navigate('/');
        }
    };


    checkAccess();

    const handleLogOut = async () => {

        const confirm = window.confirm('¿Estás seguro de que quieres cerrar sesión?');
        if (confirm) {
            navigate('/');
            store.isTokenAuthentication == false
            await actions.deleteTokenSpecialist()
        }
    }

    const token = sessionStorage.getItem('tokenSpecialist');
    const specialistId = sessionStorage.getItem("specialistId")
    const { theid } = params





    const isAuthenticatedSpecialistId = store.informationSpecialist.length ? store.informationSpecialist.id : parseInt(theid)
    console.log(isAuthenticatedSpecialistId)

    const profileImageEmpty = "https://res-console.cloudinary.com/dxgvkwunx/thumbnails/v1/image/upload/v1703884900/UGh5c2lvQ2FyZVN5bmMvaW1hZ2VuX3Npbl9mb25kb19lbmZlcm1lcm9faG95emVp/preview"
    const registerSpecialistDateUTC = new Date(store.informationSpecialist.created_at)
    const registerSpecialistLocalTime = registerSpecialistDateUTC.toLocaleString()
    const [registerDate] = registerSpecialistLocalTime.split(",")
    const handleInformationProfesional = store.informationSpecialist.is_physiotherapist == true ? "Fisioterapia" : "Enfermeria"



    return (
        <div>
            {
                token && isAuthenticatedSpecialistId == specialistId ? (
                    <div className='container-profile-specialist'>
                        <div className='container-img-profile-specialist'>
                            <img className='image-specialist' src={store.informationSpecialist.img ? store.informationSpecialist.img : profileImageEmpty} />
                        </div>
                        <div className='container-information-specialist'>
                            <p className='name-specialist'>{store.informationSpecialist.first_name} {store.informationSpecialist.last_name}</p>
                            <h5>Información personal</h5>
                            <p className='isphysiotherapist-specialist'> Especialista en la rama de: {store.informationSpecialist.is_physiotherapist ? handleInformationProfesional : ""} </p>
                            <p className='decription-specialist'> Breve Introducción del profesional en  {handleInformationProfesional}:  <br /> {store.informationSpecialist.description ? store.informationSpecialist.description : "En edición de perfil ingrese una breve descripción para que los clientes sepan un poco más de usted como profesional"} </p>

                            <p className='certification-specialist'> Certificación del profesional en {handleInformationProfesional}:  <br />   {store.informationSpecialist.certificate ?
                                <img className='image-certificate-specialist' src={store.informationSpecialist.certificate} />
                                : <img className='image-certificate-specialist' src={profileImageEmpty} />} </p>
                            <p className='language-specialist'> Idiomas conocidos: {store.informationSpecialist.language ? store.informationSpecialist.language : "En edición de perfil ingrese los idiomas que sabe hablar"} </p>
                            <p className='country-origin-specialist'> País de origen: {store.informationSpecialist.country_origin ? store.informationSpecialist.country_origin : "En edición de perfil ingrese el pais donde nacio "}</p>
                            <p className='phone-number-specialist'>Número de celular: {store.informationSpecialist.phone_number ? store.informationSpecialist.phone_number : "Aún no tiene guardado un número de celular, porfavor inserte uno para que pueda comunicarse con los pacientes"} </p>

                            <h5>Información de la cuenta</h5>

                            {/* aqui toca seguir */}
                            <p className='email-specialist'>Correo electrónico: {store.informationSpecialist.email} </p>
                            <p className='date-register-specialist'> Fecha de registro en PhysioCareSync: {registerDate}</p>
                            <div className='container-buttons-specialist'>
                                {<Link to="/edit/specialist">
                                    <button className="button-edit-profile-specialist" type='button'>Editar Perfil </button>
                                </Link>}
                                <button type='button' className='button-logout-profile-specialist' onClick={() => handleLogOut()}>Cerrar Sesión </button>
                            </div>
                        </div>

                    </div>) :
                    (<div>
                        <h1>No puede acceder a la información porque no existe un inicio de sesión</h1>
                    </div>)
            }



        </div>
    )
}

export default ProfileSpecialist
