import React, { useContext } from 'react'
// import { v2 as cloudinary } from 'cloudinary';
import "../../styles/EditPatient.css"
import { Context } from '../store/appContext'
import { Navigate, useNavigate } from 'react-router-dom'


const EditPatient = () => {

    const { store, actions } = useContext(Context)
    const goToHome = useNavigate()
    // cloudinary.config({
    //     cloud_name: 'dxgvkwunx',
    //     api_key: '498479955778132',
    //     api_secret: '***************************'
    // });

    const checkAccess = async () => {
        await actions.accessConfirmationPatient()
        console.log(store.informationPatient)

        if (store.informationPatient === "") {
            console.log("El token se vencio, ingrese nuevamente")
            goToHome("/")
        }

    }


    checkAccess()
    return (
        <div>
            <div className='container-edit-patient'>
                <form
                    id="contact-form" className='form-edit'
                >

                    <label>Nombre: </label>
                    <input></input>
                    <label>Apellido: </label>
                    <input></input>
                    <label>Correo Electronico: </label>
                    <input></input>
                    <label>Imagen de perfil:</label>
                    <input></input>
                    <label>Numero de celular:</label>
                    <input></input>
                    <label>Idioma que usted sabe hablar:</label>
                    <input></input>
                    <label>Numero de celular:</label>
                    <input></input>
                    <button>Guardar Cambios</button>
                </form>
            </div>

        </div>
    )
}

export default EditPatient
