import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/NewProfessionalDetailView.css';
import Loader from '../component/Loader';
import SnackBarLogin from '../component/SnackBarLogin';


const ViewPatientDetailAdmin = () => {
    const { actions, store } = useContext(Context);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [patient, setPatient] = useState(null);
    const [checkDeleteBotton, setCheckDeleteBotton] = useState(true)
    const [deleteSuccess, setDeleteSuccess] = useState(false)


    const goToPatientView = useNavigate()
    const goToHome = useNavigate()

    const modalRef = useRef(null)
    const snackRef = useRef(null)
    const snackBarType = {
        fail: "fail",
        success: "success",
    }

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const patientData = await actions.loadPatientById(id);
                setPatient(patientData);
                setLoading(false);
                console.log(loading)
            } catch (error) {
                console.error('Error fetching patient:', error);
                setError(error.message);
            }
        };

        fetchPatient();

    }, [actions, id]);

    const handlerDeleteButton = async () => {
        try {
            setCheckDeleteBotton(false)
            const deletingPatient = await actions.deletePatient(id)

            if (deletingPatient && deletingPatient.ok) {
                setDeleteSuccess(true)
                snackRef.current.show()
            } else if (deletingPatient && deletingPatient.error) {
                snackRef.current.show()
            } else {
                console.error("Respuesta inesperada al borrar al paciente")
            }

            setTimeout(() => {
                setCheckDeleteBotton(true)
                goToPatientView("/patientViewAdmin")
                window.location.reload()
            }, 3000)
        } catch (error) {
            console.error("Hubo un error al borrar al paciente", error)
        }

    }



    const checkAccess = async () => {
        await actions.accessConfirmationAdmin();
        const token = sessionStorage.getItem('tokenAdmin');
        console.log(store.isTokenAuthentication)
        if (!token) {
            goToHome('/');
        }
    };

    useEffect(() => {
        checkAccess()
    }, [])


    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        loading ? <Loader />
            :

            <div className="new-professional-detail-container">
                <div className="new-profile-section">
                    {patient.img && (
                        <div className="new-professional-detail-image">
                            <img src={patient.img} alt="Perfil" className="new-profile-image" />
                        </div>
                    )
                    }

                    <div className="new-name-section">
                        <h1>{patient.first_name} {patient.last_name}</h1>
                        <p className="new-country-info">
                            <strong>País:</strong> {patient.country_origin}
                        </p>

                    </div>
                </div >

                <div className="new-professional-detail-content">

                    <div className="new-specialist-info">

                        <p>
                            <strong>Email:</strong> {patient.email}
                        </p>
                        <p>
                            <strong>Teléfono:</strong> {patient.phone_number}
                        </p>
                        <p>
                            <strong>Idiomas:</strong> {patient.language}
                        </p>
                        <p>
                            <strong>Fecha de registro:</strong> {patient.created_at}
                        </p>
                        <p>
                            <strong>Ultimo inicio de sesión:</strong> {patient.last_login_at}
                        </p>
                    </div>


                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteSpecialist">Eliminar Paciente</button>

                    <div class="modal fade" ref={modalRef} id="deleteSpecialist" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog ">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-titleAdmin" id="staticBackdropLabel">Estas a punto de eliminar al paciente!</h5>
                                    <button type="button" className="btn-close adminClose" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                
                                <div class="modal-bodyAdmin">
                                    <p className='bodyAdmin'>Al eliminar, el paciente debe de registrarse nuevamente ¿Estás seguro?</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" disabled={!checkDeleteBotton} class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="button" disabled={!checkDeleteBotton} onClick={() => handlerDeleteButton(id)} id="login-button" class="btn btn-primary" >Si, estoy seguro</button>
                                </div>
                              </div>
                        </div>
                        {deleteSuccess ?
                            <SnackBarLogin type={snackBarType.success} ref={snackRef} message="El usuario se ha borrado exitosamente" /> :
                            <SnackBarLogin type={snackBarType.fail} ref={snackRef} message="No se ha podido borrar el usuario por un problema interno" />
                        }
                    </div>
                </div>
            </div >
    );
};

export default ViewPatientDetailAdmin;
