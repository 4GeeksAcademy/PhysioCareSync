import React, { useContext, useEffect, useRef, useState } from 'react';
import "../../styles/EditPatient.css";
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Loader from '../component/Loader';

const EditPatient = () => {
    const [formInformationPatient, setInformationPatient] = useState({});
    const [finalImagePatient, setFinalImagePatient] = useState(null);
    const finalPatientForm = {};
    const { store, actions } = useContext(Context);
    const goToHome = useNavigate();
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [savingChanges, setSavingChanges] = useState(false);
    const isMounted = useRef(true);
    const [loading, setLoading] = useState(true)

    const handleEditInformation = (nameValue, value) => {
        setInformationPatient({ ...formInformationPatient, [nameValue]: value });
    };

    const handleUploadImage = (img) => {
        img.preventDefault();
        const fileImg = img.target.files[0];
        setFinalImagePatient(fileImg);
    };

    const handlePhoneNumberChange = (value) => {
        handleEditInformation('phone_number', value);
    };

    const handleSubmitInformation = async (form, patientId, finalImagePatient) => {
        setSavingChanges(true);
        const formImg = new FormData();
        formImg.append("img", finalImagePatient);

        const formData = new FormData();
        if (!form.first_name) {
            formData.append("first_name", store.informationPatient.first_name || "");
        }
        else {
            formData.append("first_name", form.first_name);
        }

        if (!form.last_name) {
            formData.append("last_name", store.informationPatient.last_name || "");
        }
        else {
            formData.append("last_name", form.last_name || "");
        }

        if (!form.email) {
            formData.append("email", store.informationPatient.email || "");
        }
        else {
            formData.append("email", form.email || "");
        }

        if (!form.phone_number) {
            formData.append("phone_number", store.informationPatient.phone_number || "");
        }
        else {
            formData.append("phone_number", form.phone_number || "");
        }

        if (!form.country_origin) {
            formData.append("country_origin", store.informationPatient.country_origin || "");
        }
        else {
            formData.append("country_origin", form.country_origin || "");
        }

        if (!form.language) {
            formData.append("language", store.informationPatient.language || "");
        }
        else {
            formData.append("language", form.language || "");
        }

        formData.forEach((value, key) => {
            finalPatientForm[key] = value;
        });

        await actions.editPatient(finalPatientForm, patientId);
        await actions.editImagePatient(formImg, patientId);

        if (isMounted.current && formRef.current) {
            const profileId = sessionStorage.getItem("patientId");
            setTimeout(() => {
                navigate(`/profile/patient/${profileId}`);
            }, 1000);
            setFinalImagePatient(null);
            formRef.current.reset();
        }
    };

    const checkAccess = async () => {
        await actions.accessConfirmationPatient();
        const token = sessionStorage.getItem("tokenPatient");
        if (token === null && store.isTokenAuthentication == true) {
            console.log("El token se venció, ingrese nuevamente");
            alert("You do not have access to this page, please log in or create an account");
            goToHome("/");
        }
    };

    useEffect(() => {
        checkAccess();
        setTimeout(() => {
            setLoading(false)
        }, 3000)
        return () => {
            isMounted.current = false;
            if (formRef.current) {
                formRef.current.reset();
            }
        };
    }, []);

    return (
        loading ? <Loader />
            :
            <div>
                <div className='container-edit-patient'>
                    <form
                        id="contact-form" className='form-edit-patient'
                        ref={formRef}
                    >
                        <h1 className='formTitle'>Ventana de edición</h1>
                        <hr />
                        <h4 className='basic-information'>Información basica</h4>
                        <label className='label-edit-patient'><i className="fa-regular fa-user" style={{ color: '#8afcf6' }}></i> Nombre: </label>
                        <input
                            className="input-edit-patient" type='text' id="first_name" name="first_name"
                            defaultValue={store.informationPatient.first_name || ''}
                            onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
                        ></input>
                        <label className='label-edit-patient'><i className="fa-solid fa-user" style={{ color: '#8afcf6' }}></i> Apellido: </label>
                        <input
                            className="input-edit-patient" type='text' id="last_name" name="last_name"
                            defaultValue={store.informationPatient.last_name || ''}
                            onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
                        ></input>
                        <label className='label-edit-patient'><i className="fa-solid fa-envelope" style={{ color: '#8afcf6' }}></i> Correo Electronico: </label>
                        <input
                            className="input-edit-patient" type='email' id="email" name="email"
                            defaultValue={store.informationPatient.email || ''}
                            onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}></input>
                        <label className='label-edit-patient'><i className="fa-regular fa-image" style={{ color: '#8afcf6' }}></i> Imagen de perfil:</label>
                        <input
                            className="input-edit-patient" type='file' id="img" name="img"
                            accept="image/png, image/jpg, image/jpeg"
                            onChange={(e) => (handleUploadImage(e))}
                        ></input>

                        <label className='label-edit-patient'><i className="fa-solid fa-phone-flip" style={{ color: '#8afcf6' }}></i> Numero de celular:</label>
                        <PhoneInput className="input-edit-patient"
                            placeholder="Ingresa tu número de celular"
                            value={formInformationPatient.phone_number}
                            onChange={handlePhoneNumberChange}
                        />
                        <label className='label-edit-patient'><i className="fa-solid fa-language" style={{ color: '#8afcf6' }}></i> Idioma que usted sabe hablar:</label>

                        <input
                            className="input-edit-patient" type='text' id="language" name="language"
                            placeholder="Ingrese los idiomas que sabe hablar"
                            defaultValue={store.informationPatient.language ? store.informationPatient.language : ""}
                            onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
                        ></input>

                        <label className='label-edit-patient'><i className="fa-solid fa-earth-americas" style={{ color: '#8afcf6' }}></i> Pais:</label>

                        <input
                            className="input-edit-patient" type='text' id="country_origin" name="country_origin"
                            placeholder="Ingrese su país"
                            defaultValue={store.informationPatient.country_origin ? store.informationPatient.country_origin : ""}
                            onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
                        ></input>

                        <button className={!savingChanges ? "button-edit-patient" : "button-edit-patient-disabled"} type="button" onClick={() => handleSubmitInformation(formInformationPatient, store.informationPatient.id, finalImagePatient)}> {!savingChanges ? "Guardar Cambios" : "Guardando Cambios..."}</button>
                    </form >
                </div >
            </div >
    );
}

export default EditPatient;

