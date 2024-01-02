
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const EditSpecialist = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [formInformationSpecialist, setFormInformationSpecialist] = useState({});
  const [finalImageSpecialist, setFinalImageSpecialist] = useState(null);
  const [finalImageCertificate, setFinalImageCertificate] = useState(null);

  const formRef = useRef(null);
  const isMounted = useRef(true);
  const goToHome = useNavigate();

  useEffect(() => {
    const storedSpecialistsList = localStorage.getItem('specialistsList');
    const initialSpecialistsList = storedSpecialistsList ? JSON.parse(storedSpecialistsList) : [];
    actions.setSpecialistsList(initialSpecialistsList);
  }, [actions]);

  const handleUploadImageProfile = (e) => {
    e.preventDefault();
    const imgProfile = e.target.files[0];
    setFinalImageSpecialist(imgProfile);
  };

  const handleUploadImageCertificate = (e) => {
    e.preventDefault();
    const imgCertificate = e.target.files[0];
    setFinalImageCertificate(imgCertificate);
  };

  const handleEditInformation = (nameValue, value) => {
    setFormInformationSpecialist({ ...formInformationSpecialist, [nameValue]: value });
    console.log(formInformationSpecialist);
  };

  const handleSubmitInformation = async (form, specialistId, imageSpecialist, imageCertificate) => {
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
       formImages.append("img", imageSpecialist);
       formImages.append("certificate", imageCertificate);

       await actions.editSpecialistInformation(specialistId, finalSpecialistForm);
       await actions.editImagesSpecialist(formImages, specialistId);
       localStorage.setItem('specialistsList', JSON.stringify(updatedSpecialistsList));

       if (isMounted.current && formRef.current) {
         // Nueva implementación: Agregar al nuevo especialista a la lista
         actions.addSpecialist({ ...formInformationSpecialist, id: specialistId });
   
         navigate('/professional-view', { state: { specialistData: formInformationSpecialist } });
         setFinalImageCertificate(null);
         setFinalImageSpecialist(null);
         formRef.current.reset();
  }
};

const handleSpecialistRegistration = async (newSpecialist) => {
    try {
      const response = await actions.createNewSpecialist(newSpecialist);
  
      // Verifica si la respuesta es exitosa
      if (response.success) {
        // Almacena la información del especialista en el estado global
        actions.setSpecialistInformation(response.data);
  
        // Otras acciones después del registro exitoso, si es necesario
      } else {
        // Maneja el caso en que el registro no fue exitoso
        console.error('Error en el registro del especialista:', response.error);
      }
    } catch (error) {
      console.error('Error en el registro del especialista:', error);
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

                    <label>Certificado</label>
                    <input
                        className="input-edit-specialist" type='file' id="certificate" name="certificate"
                        accept='image/png, image/jpeg, image/jpg'
                        onChange={(e) => (handleUploadImageCertificate(e))}
                    ></input>

                    <button className="button-edit-specialist" type="button" onClick={() => handleSubmitInformation(formInformationSpecialist, store.informationSpecialist.id, finalImageSpecialist, finalImageCertificate)}>Guardar Cambios</button>
                </form>


            </div>

        </div >
    )
}

export default EditSpecialist