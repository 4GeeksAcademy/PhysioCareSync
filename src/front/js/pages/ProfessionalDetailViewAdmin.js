import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/NewProfessionalDetailView.css';
import Modal from 'react-modal';
import Loader from '../component/Loader';

const NewProfessionalDetailViewAdmin = () => {
    const { actions, store } = useContext(Context);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [specialist, setSpecialist] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [checkDeleteBotton, setCheckDeleteBotton] = useState(true)


    const goToProfesionalView = useNavigate()
    const goToHome = useNavigate()

    useEffect(() => {
        const fetchSpecialist = async () => {
            try {
                const specialistData = await actions.loadSpecialistById(id);
                setSpecialist(specialistData);
                setLoading(false);
                console.log(loading)
            } catch (error) {
                console.error('Error fetching specialist:', error);
                setError(error.message);
            }
        };

        fetchSpecialist();
    }, [actions, id]);

    const handlerDeleteButton = (specialistId) => {
        setCheckDeleteBotton(false)
        const deletingSpecialist = actions.deleteSpecialist(specialistId)
        setTimeout(() => {
            setCheckDeleteBotton(true)
            goToProfesionalView("/professionalViewAdmin")
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

    useEffect(() => {
        checkAccess();
    }, [])


    if (error) {
        return <p>Error: {error}</p>;
    }

    const openModal = (certificate) => {
        setSelectedCertificate(certificate);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedCertificate(null);
        setModalIsOpen(false);
    };

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
                    {specialist.img && (
                        <div className="new-professional-detail-image">
                            <img src={specialist.img} alt="Perfil" className="new-profile-image" />
                        </div>
                    )
                    }

                    <div className="new-name-section">
                        <h1>{specialist.first_name} {specialist.last_name}</h1>
                        <p className="new-country-info">
                            <strong>País:</strong> {specialist.country_origin}
                        </p>
                        <p className="new-specialist-type">
                            <strong>Especialización:</strong> {specialist.is_physiotherapist ? 'Fisioterapeuta' : specialist.is_nurse ? 'Enfermero/a' : 'Otro'}
                        </p>
                    </div>
                </div >

                <div className="new-professional-detail-content">

                    <div className="new-specialist-info">
                        <p>
                            <strong>Descripción:</strong> {specialist.description}
                        </p>
                        <p>
                            <strong>Email:</strong> {specialist.email}
                        </p>
                        <p>
                            <strong>Teléfono:</strong> {specialist.phone_number}
                        </p>
                        <p>
                            <strong>Idiomas:</strong> {specialist.language}
                        </p>
                    </div>

                    {specialist.certificates && specialist.certificates.length > 0 && (
                        <div className="new-certification-section">
                            <p>
                                <strong>Certificados:</strong>
                            </p>
                            <div className="certificates-container">
                                {specialist.certificates.map((certificate) => (
                                    <img
                                        key={certificate.id}
                                        src={certificate.certificates_url}
                                        alt={`Certificado ${certificate.id}`}
                                        className="new-certification-image"
                                        onClick={() => openModal(certificate)}
                                    />
                                ))}
                            </div>

                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                contentLabel="Certificado Modal"
                            >
                                {selectedCertificate && (
                                    <img
                                        src={selectedCertificate.certificates_url}
                                        alt={`Certificado ${selectedCertificate.id}`}
                                        className="modal-certification-image"
                                    />
                                )}
                                <button onClick={closeModal}>Cerrar</button>
                            </Modal>
                        </div>
                    )}

                    {specialist.certification_img && (
                        <div className="new-certification-section">
                            <p>
                                <strong>Certificado:</strong>
                            </p>
                            <img src={specialist.certification_img} alt="Certificado" className="new-certification-image" />
                        </div>
                    )}

                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteSpecialist">Eliminar Especialista</button>

                    <div class="modal fade" ref={modalRef} id="deleteSpecialist" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog ">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-titleAdmin" id="staticBackdropLabel">Estas a punto de eliminar al especialista!</h5>
                                    <button type="button" className="btn-close adminClose" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-bodyAdmin">
                                    <p className='bodyAdmin'>Al eliminar el especialista debe de registrarse nuevamente y realizar un nuevo pago para poder ser visible para los pacientes ¿Estás seguro?</p>

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

export default NewProfessionalDetailViewAdmin;
