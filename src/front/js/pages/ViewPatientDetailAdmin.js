import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/NewProfessionalDetailView.css';
import Loader from '../component/Loader';

const ViewPatientDetailAdmin = () => {
    const { actions, store } = useContext(Context);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [patient, setPatient] = useState(null);
    const [checkDeleteBotton, setCheckDeleteBotton] = useState(true)


    const goToPatientView = useNavigate()
    const goToHome = useNavigate()

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
        checkAccess();

    }, [actions, id]);

    const handlerDeleteButton = (patientId) => {
        setCheckDeleteBotton(false)
        const deletingPatient = actions.deletePatient(patientId)
        setTimeout(() => {
            setCheckDeleteBotton(true)
            goToPatientView("/patientViewAdmin")
            window.location.reload()
        }, 2000)
    }



    const checkAccess = async () => {
        await actions.accessConfirmationAdmin();
        const token = sessionStorage.getItem('tokenAdmin');
        console.log(store.isTokenAuthentication)
        if (!token) {
            goToHome('/');
        }
    };


    if (error) {
        return <p>Error: {error}</p>;
    }

    // const openModal = (certificate) => {
    //     setSelectedCertificate(certificate);
    //     setModalIsOpen(true);
    // };

    // const closeModal = () => {
    //     setSelectedCertificate(null);
    //     setModalIsOpen(false);
    // };

    const modalRef = useRef(null)
    const snackRef = useRef(null)
    const snackBarType = {
        fail: "fail",
        success: "success",
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

                                    {/* {DeletedSuccess ?
                                        <SnackBarLogin type={snackBarType.success} ref={snackRef} message="Inicio Sesión como administrador!" /> :
                                        null
                                    } */}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" disabled={!checkDeleteBotton} class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="button" disabled={!checkDeleteBotton} onClick={() => handlerDeleteButton(id)} id="login-button" class="btn btn-primary" >Si, estoy seguro</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
    );
};

export default ViewPatientDetailAdmin;
