
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import "../../styles/EditSpecialist.css"
import SnackBarLogin from '../component/SnackBarLogin';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const FormSpecialist = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [formInformationSpecialist, setFormInformationSpecialist] = useState({});
    const [finalImageSpecialist, setFinalImageSpecialist] = useState(null);
    const [finalImageCertificates, setFinalImageCertificates] = useState(null);
    const [limitOfCertifications, setLimitOfCertifications] = useState(false)
    const [numCertifications, setNumCertifications] = useState(0)
    const [savingChanges, setSavingChanges] = useState(false)
    const [editSuccess, setEditSuccess] = useState(false);
    sessionStorage.setItem("specialistId", store.informationSpecialist.id)
    const specialistId = sessionStorage.getItem("specialistId")
    sessionStorage.setItem("payStatus", store.informationSpecialist.is_authorized)
    const payStatus = sessionStorage.getItem("payStatus")

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
        let limitCertificates = imgCertificate.length + store.informationSpecialist.certificates.length
        let amountOfCertificates = 5 - store.informationSpecialist.certificates.length
        setNumCertifications(amountOfCertificates)
        console.log(amountOfCertificates)

        if (imgCertificate) {
            if (imgCertificate.length > 5 || limitCertificates > 5) {
                console.log("supera")
                setLimitOfCertifications(true)
                setTimeout(() => {
                    setLimitOfCertifications(false)
                }, 9000)
            }
            else {
                console.log("no supera, si subiran mas certificados")
                setFinalImageCertificates(imgCertificate);
            }

        }
        else {
            console.log("no hay certificados escogidos")
        }

    };

    const handleEditInformation = (nameValue, value) => {
        setFormInformationSpecialist({
          ...formInformationSpecialist,
          [nameValue]: value,
        });
      };

    const handleSubmitInformation = async (form, specialistId, imageSpecialist) => {
        setSavingChanges(true)
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

        const formImages = new FormData();
        const formCertificates = new FormData();
        formImages.append("img", imageSpecialist);
        const result = await actions.editSpecialistInformation(specialistId, finalSpecialistForm);
        if (result.specialist) {
            setEditSuccess(true)
            snackRef.current.show()
        } else if (result.error) {
            console.log("Error al acualizar los datos del usuario")
            snackRef.current.show()
        }
        await actions.editImagesSpecialist(formImages, specialistId);
        let countCertificates = 0
        if (finalImageCertificates == null) {
            console.log("no hay valores!, por lo tanto no se subiran certificados!")
        }
        else {
            for (let i = 0; i < finalImageCertificates.length; i++) {
                formCertificates.append(`certificates_url_${i + 1}`, finalImageCertificates[i]);
                countCertificates = countCertificates + 1
            }

            formCertificates.append("num_certificates", countCertificates.toString())
            await actions.editCertificatesSpecialist(formCertificates, specialistId)
        }

        if (isMounted.current && formRef.current) {
            setTimeout(() => {
                navigate(`/profile/specialist/${specialistId}`, { state: { specialistData: formInformationSpecialist } });
            }, 2000)
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

    const handlerHome = () => {
        navigate(`/profile/paymentPage/${specialistId}`)
    }

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

    const snackRef = useRef(null)
    const snackBarType = {
        fail: "fail",
        success: "success"
    }

    return (
        <div>
        {editSuccess ?
        <SnackBarLogin type={snackBarType.success} ref={snackRef} message="Tu perfil se ha actualizado correctamente" /> :
      <SnackBarLogin type={snackBarType.fail} ref={snackRef} message="Hubo un error al actualizar tu perfil" />}
      {payStatus === "true" ? 
        <div className='container-edit-specialist'>
        <form
            id="contact-form" className='form-edit-specialist'
            ref={formRef}
        >
            <h1 className='formTitle'>Ventana de edición</h1>
            {/* basic info */}
            <hr />
            <h4 className='basic-information'>Información basica</h4>
            <label className='label-edit-specialist'>
  <i className="fa-regular fa-user" style={{ color: '#8afcf6' }}></i> Nombre:
</label>
            <input
                className="input-edit-specialist" type='text' id="first_name" name="first_name"
                defaultValue={store.informationSpecialist.first_name || ''}
                onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
            ></input>
            <label className='label-edit-specialist'><i className="fa-solid fa-user" style={{color: '#8afcf6'}}></i> Apellido: </label>
            <input
                className="input-edit-specialist" type='text' id="last_name" name="last_name"
                defaultValue={store.informationSpecialist.last_name || ''}
                onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
            ></input>
            <label className='label-edit-specialist'><i className="fa-solid fa-envelope" style={{color: '#8afcf6'}}></i> Correo Electronico: </label>
            <input
                className="input-edit-specialist" type='email' id="email" name="email"
                defaultValue={store.informationSpecialist.email || ''}
                onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}></input>
            <label className='label-edit-specialist'><i className="fa-regular fa-image" style={{color: '#8afcf6'}}></i> Imagen de perfil:</label>
            <input
                className="input-edit-specialist" type='file' id="img" name="img"
                accept="image/png, image/jpg, image/jpeg"
                onChange={(e) => (handleUploadImageProfile(e))}
            ></input>

            <label className='label-edit-specialist'><i className="fa-solid fa-phone-flip" style={{color: '#8afcf6'}}></i> Numero de celular:</label>
            <PhoneInput  className="input-edit-specialist"
           placeholder="Ingresa tu número de celular"
           value={formInformationSpecialist.phone_number}
           onChange={(value) => handleEditInformation('phone_number', value)}
           />
            <label className='label-edit-specialist'><i className="fa-solid fa-language"  style={{color: '#8afcf6'}}></i> Idioma que usted sabe hablar:</label>

            <input
                className="input-edit-specialist" type='text' id="language" name="language"
                placeholder="Ingrese los idiomas que sabe hablar"
                defaultValue={store.informationSpecialist.language ? store.informationSpecialist.language : ""}
                onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
            ></input>
            <label className='label-edit-specialist'><i className="fa-solid fa-earth-americas" style={{color: '#8afcf6'}}></i> Pais:</label>
            <input
                className="input-edit-specialist" type='text' id="country_origin" name="country_origin"
                placeholder="Ingrese su pais"
                defaultValue={store.informationSpecialist.country_origin ? store.informationSpecialist.country_origin : ""}
                onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
            ></input>

            <hr />
            <h4 className='profile-title'>Perfil profesional y académico</h4>
            <label className='label-edit-specialist'><i className="fa-solid fa-sheet-plastic" style={{color: '#8afcf6'}}></i> Descripción del especialista</label>
            <input
                className="input-edit-specialist" type='text' id="description" name="description"
                placeholder="Habla un poco sobre ti como profesional!"
                defaultValue={store.informationSpecialist.description ? store.informationSpecialist.description : ""}
                onChange={(e) => (handleEditInformation(e.target.name, e.target.value))}
            ></input>

            <label className='label-edit-specialist'><i class="fa-solid fa-certificate" style={{color: '#8afcf6'}}></i> Certificado</label>

            <input
                className="input-edit-specialist" type='file' id="certificate" name="certificate"
                accept='image/png, image/jpeg, image/jpg'
                onChange={(e) => (handleUploadImageCertificate(e))}
                multiple />
            {limitOfCertifications ? <span className='alert-message'> Supero la cantidad de certificaciones! {store.informationSpecialist.certificates.length == 5 ? "Ya no puede agregar más certificaciones!" : `Solo puede agregar ${numCertifications} ${numCertifications > 1 ? "certificaciones" : "certificación"} más,`} el límite son 5 certificaciones por especialista</span> : null}

            <button className={!savingChanges ? "button-edit-specialist" : "button-edit-specialist-disabled"} type="button" onClick={() => handleSubmitInformation(formInformationSpecialist, store.informationSpecialist.id, finalImageSpecialist)}>{!savingChanges ? "Guardar Cambios" : "Guardando Cambios..."}</button>
        </form>


    </div>  
    :
     <div className='conditionalMsg'>

        <h1 className='headMsg'>Importante!</h1>
        <p>No se puede editar la información del usuario porque no se ha pagado la suscripción, por favor realiza tu pago.</p>
        <h2><i className="fa-solid fa-dollar-sign fa-beat-fade"></i></h2>
        <button onClick={handlerHome} type="button" className="btn btn-primary">Ir a ventana de pago</button>

        </div>
    }
            

        </div >
    )
}

export default FormSpecialist