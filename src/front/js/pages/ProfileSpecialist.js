import React from 'react'
import { Context } from '../store/appContext'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react'



const ProfileSpecialist = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    const params = useParams()

    const checkAccess = async () => {
        await actions.accessConfirmationPatient();
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

    const profileImageEmpty = "https://res-console.cloudinary.com/dxgvkwunx/thumbnails/v1/image/upload/v1703777652/UGh5c2lvQ2FyZVN5bmMvaW1hZ2VuX3Npbl90b2RvX3BlcmZpbF9hancyb2g=/preview"
    const registerSpecialistDateUTC = new Date(store.informationSpecialist.created_at)
    const registerSpecialistLocalTime = registerSpecialistDateUTC.toLocaleString()
    const [registerDate] = registerSpecialistLocalTime.split(",")




    return (
        <div>
            {
                token && isAuthenticatedSpecialistId == specialistId ? (
                    <div className='container-profile-patient'>
                        <div className='container-img-profile-patient'>
                            <img className='image-patient' src={store.informationSpecialist.img ? store.informationSpecialist.img : profileImageEmpty} />
                        </div>
                        <div className='container-information-patient'>
                            <p className='name-patient'>{store.informationSpecialist.first_name} {store.informationSpecialist.last_name}</p>
                            <h5>Información personal</h5>
                            <p className='language-patient'> Idiomas conocidos: {store.informationSpecialist.language ? store.informationSpecialist.language : "En edición de perfil ingrese los idiomas que sabe hablar"} </p>
                            <p className='country-origin-patient'> País de origen: {store.informationSpecialist.country_origin ? store.informationSpecialist.country_origin : "En edición de perfil ingrese el pais donde nacio "}</p>
                            <p className='phone-number-patient'>Número de celular: {store.informationSpecialist.phone_number ? store.informationSpecialist.phone_number : "Aún no tiene guardado un número de celular, porfavor inserte uno para que pueda comunicarse con los pacientes"} </p>
                            <h5>Información de la cuenta</h5>

                            {/* aqui toca seguir */}
                            <p className='email-patient'>Correo electrónico: {store.informationSpecialist.email} </p>
                            <p className='date-register-patient'> Fecha de registro en PhysioCareSync: {registerDate}</p>
                            <div className='container-buttons'>
                                {<Link to="/edit/specialist">
                                    <button className="button-edit-profile" type='button'>Editar Perfil </button>
                                </Link>}
                                <button type='button' className='button-logout-profile' onClick={() => handleLogOut()}>Cerrar Sesión </button>
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
