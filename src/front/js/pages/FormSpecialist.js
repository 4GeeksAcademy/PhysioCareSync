
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const EditSpecialist = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [formInformationSpecialist, setFormInformationSpecialist] = useState({});
    const [finalImageSpecialist, setFinalImageSpecialist] = useState(null);
    const [finalImageCertificates, setFinalImageCertificates] = useState(null);

    const formRef = useRef(null);
    const isMounted = useRef(true);
    const goToHome = useNavigate();

    const handleUploadImageProfile = (e) => {
        e.preventDefault();
        const imgProfile = e.target.files[0];
        setFinalImageSpecialist(imgProfile);
    };

    const handleUploadImageCertificate = (e) => {
        const imgCertificate = e.target.files;
        setFinalImageCertificates(imgCertificate);
    };

    const handleEditInformation = (nameValue, value) => {
        setFormInformationSpecialist({ ...formInformationSpecialist, [nameValue]: value });
        console.log(formInformationSpecialist);
    };

    const handleSubmitInformation = async (form, specialistId, imageSpecialist) => {
        const formData = new FormData();
        if (!form.first_name) {
            formData.append("first_name", store.informationSpecialist.first_name || "")
        }
        else {
            formData.append("first_name", form.first_name)
        }

        if (!form.last_name) {
            formData.append("last_name", store.informationSpecialist.last_name || "")
        }
        else {
            formData.append("last_name", form.last_name || "")
        }

        if (!form.email) {
            formData.append("email", store.informationSpecialist.email || "")
        }
        else {
            formData.append("email", form.email || "")
        }
        if (!form.phone_number) {
            formData.append("phone_number", store.informationSpecialist.phone_number || "")
        }
        else {
            formData.append("phone_number", form.phone_number || "")
        }
        if (!form.country_origin) {
            formData.append("country_origin", store.informationSpecialist.country_origin || "")
        }
        else {
            formData.append("country_origin", form.country_origin || "")
        }

        if (!form.language) {
            formData.append("language", store.informationSpecialist.language || "")
        }

        else {
            formData.append("language", form.language || "")

        }

        if (!form.language) {
            formData.append("description", store.informationSpecialist.description || "")
        }
        else {
            formData.append("description", form.description || "")
        }

        const finalSpecialistForm = {};


        formData.forEach((value, key) => {
            finalSpecialistForm[key] = value;
        });


        if (!finalImageCertificates) {
            store.messageUploadCertificates = "Ningún archivo ha sido seleccionado"
            // setMsg("Ningún archivo ha sido seleccionado")
            return;
        }

        const formImages = new FormData();
        const formCertificates = new FormData();
        formImages.append("img", imageSpecialist);
        let countCertificates = 0

        for (let i = 0; i < finalImageCertificates.length; i++) {
            formCertificates.append(`certificates_url_${i + 1}`, finalImageCertificates[i]);
            countCertificates = countCertificates + 1
        }


        formCertificates.append("num_certificates", countCertificates.toString())
        await actions.editSpecialistInformation(specialistId, finalSpecialistForm);
        await actions.editImagesSpecialist(formImages, specialistId);
        await actions.editCertificatesSpecialist(formCertificates, specialistId)

        if (isMounted.current && formRef.current) {
            navigate('/professional-view', { state: { specialistData: formInformationSpecialist } });
            setFinalImageCertificates(null);
            setFinalImageSpecialist(null);
            formRef.current.reset();
        }
    };

    const checkAccess = async () => {
        await actions.accessConfirmationSpecialist();
        const token = sessionStorage.getItem("tokenSpecialist");
        if (token === null) {
            console.log("El token se venció, ingrese nuevamente");
            goToHome("/");
        }
    };

    useEffect(() => {
        checkAccess();
        return () => {
            // Cuando el componente se desmonta, actualiza la ref
            isMounted.current = false;

            // Resetear el formulario si la referencia existe
            if (formRef.current) {
                formRef.current.reset();
            }
        };
    }, []);

    return (
        <div>
            <div className='container-edit-specialist'>
                <form
                    id="contact-form" className='form-edit-specialist'
                    ref={formRef}
                >
                    {/* basic info */}
                    <label className='label-edit-specialist'>Nombre: </label>
                    <input
                        className="input-edit-specialist" type='text' id="first_name" name="first_name"
                        defaultValue={store.informationSpecialist.first_name || ''}
                        onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
                    ></input>
                    <label>Apellido: </label>
                    <input
                        className="input-edit-specialist" type='text' id="last_name" name="last_name"
                        defaultValue={store.informationSpecialist.last_name || ''}
                        onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
                    ></input>
                    <label>Correo Electronico: </label>
                    <input
                        className="input-edit-specialist" type='email' id="email" name="email"
                        defaultValue={store.informationSpecialist.email || ''}
                        onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}></input>
                    <label>Imagen de perfil:</label>
                    <input
                        className="input-edit-specialist" type='file' id="img" name="img"
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={(e) => (handleUploadImageProfile(e))}
                    ></input>
                    <label>Numero de celular:</label>
                    <input
                        className="input-edit-specialist" type='text' id="phone_number" name="phone_number" pattern='\d*'
                        defaultValue={store.informationSpecialist.phone_number ? store.informationSpecialist.phone_number : ""}
                        onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
                    ></input>
                    <label>Idioma que usted sabe hablar:</label>
                    <input
                        className="input-edit-specialist" type='text' id="language" name="language"
                        placeholder="Ingrese los idiomas que sabe hablar"
                        defaultValue={store.informationSpecialist.language ? store.informationSpecialist.language : ""}
                        onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
                    ></input>
                    <label>Pais:</label>
                    <input
                        className="input-edit-specialist" type='text' id="country_origin" name="country_origin"
                        placeholder="Ingrese su pais"
                        defaultValue={store.informationSpecialist.country_origin ? store.informationSpecialist.country_origin : ""}
                        onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
                    ></input>

                    {/* specialist info application*/}

                    <label>Descripción del especialista</label>
                    <input
                        className="input-edit-specialist" type='text' id="description" name="description"
                        placeholder="Habla un poco sobre ti como profesional!"
                        defaultValue={store.informationSpecialist.description ? store.informationSpecialist.description : ""}
                        onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
                    ></input>

                    <label for="files">Certificado</label>
                    <input
                        className="input-edit-specialist" type='file' id="certificate" name="certificate"
                        accept='image/png, image/jpeg, image/jpg'
                        onChange={(e) => (handleUploadImageCertificate(e))}
                        multiple />

                    <button className="button-edit-specialist" type="button" onClick={() => handleSubmitInformation(formInformationSpecialist, store.informationSpecialist.id, finalImageSpecialist)}>Guardar Cambios</button>
                </form>

                {store.messageUploadCertificates && <span>{store.messageUploadCertificates} </span>}

            </div>

        </div >
    )
}

export default EditSpecialist