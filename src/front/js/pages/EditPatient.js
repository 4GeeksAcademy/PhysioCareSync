import React, { useContext, useRef, useState } from 'react'
// import { v2 as cloudinary } from 'cloudinary';
import "../../styles/EditPatient.css"
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom'


const EditPatient = () => {


    const [formInformationPatient, setInformationPatient] = useState("")

    const { store, actions } = useContext(Context)
    const goToHome = useNavigate()
    // cloudinary.config({
    //     cloud_name: 'dxgvkwunx',
    //     api_key: '498479955778132',
    //     api_secret: '***************************'
    // });

    const formRef = useRef(null)


    const handleEditInformation = (nameValue, value) => {
        setInformationPatient({ ...formInformationPatient, [nameValue]: value })
    }
    const handleSubmitInformation = async (form, patientId) => {

        // console.log(form)
        console.log(patientId)
        await actions.editPatient(form, patientId)
        formRef.current.reset()
    }

    const checkAccess = async () => {
        await actions.accessConfirmationPatient()
        // console.log(store.informationPatient)
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
                    ref={formRef}
                >
                    <label className='label-edit-patient'>Nombre: </label>
                    <input
                        className="input-edit-patient" type='text' id="first_name" name="first_name"
                        placeholder={store.informationPatient.first_name}
                        defaultValue={store.informationPatient.first_name || ''}
                        onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
                    ></input>
                    <label>Apellido: </label>
                    <input
                        className="input-edit-patient" type='text' id="last_name" name="last_name"
                        placeholder={store.informationPatient.last_name}
                        defaultValue={store.informationPatient.last_name || ''}
                        onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
                    ></input>
                    <label>Correo Electronico: </label>
                    <input
                        className="input-edit-patient" type='email' id="email" name="email"
                        placeholder={store.informationPatient.email}
                        defaultValue={store.informationPatient.email || ''}
                        onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}></input>
                    <label>Imagen de perfil:</label>
                    <input
                        className="input-edit-patient" type='text' id="img" name="img"
                        placeholder={store.informationPatient.img ? store.informationPatient.img : "Ingrese la imagen"}
                        onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
                    ></input>
                    <label>Numero de celular:</label>
                    <input
                        className="input-edit-patient" type='text' id="phone_number" name="phone_number" pattern='\d*'
                        placeholder={store.informationPatient.phone_number ? store.informationPatient.phone_number : "Ingrese su numero de celular"}
                        onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
                    ></input>
                    <label>Idioma que usted sabe hablar:</label>
                    <input
                        className="input-edit-patient" type='text' id="language" name="language"
                        placeholder={store.informationPatient.language ? store.informationPatient.language : "Ingrese los idiomas que sabe hablar"}
                        onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
                    ></input>
                    <label>Pais:</label>
                    <input
                        className="input-edit-patient" type='text' id="country_origin" name="country_origin"
                        placeholder={store.informationPatient.country_origin ? store.informationPatient.country_origin : "Ingrese su pais"}
                        onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
                    ></input>

                    <button className="button-edit-patient" type="button" onClick={() => handleSubmitInformation(formInformationPatient, store.informationPatient.id)}>Guardar Cambios</button>
                </form>
            </div>

        </div >
    )
}

export default EditPatient



