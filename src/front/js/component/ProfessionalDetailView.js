import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/NewProfessionalDetailView.css';
import OpenChat from './OpenChat.jsx';
import Modal from 'react-modal';
import Loader from './Loader.js';

const NewProfessionalDetailView = () => {
  const { actions } = useContext(Context);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specialist, setSpecialist] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

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
          <OpenChat phone={specialist.phone_number} />

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
        </div>
      </div >
  );
};

export default NewProfessionalDetailView;
