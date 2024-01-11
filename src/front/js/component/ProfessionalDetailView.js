import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/NewProfessionalDetailView.css'; // Cambiar el nombre del archivo de estilos
import OpenChat from './OpenChat.jsx';
import Loader from './Loader.js';

const NewProfessionalDetailView = () => {
  const { actions } = useContext(Context);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specialist, setSpecialist] = useState(null);

  useEffect(() => {
    const fetchSpecialist = async () => {
      try {
        const specialistData = await actions.loadSpecialistById(id);
        setSpecialist(specialistData);
        setLoading(false);
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

  return (
    loading ? <Loader />
      : (
        <div className="new-professional-detail-container">
          <h1 className="new-professional-detail-title"></h1>
          <div className="new-professional-detail-content">
            <div className="new-profile-section">
              {specialist.img && (
                <div className="new-professional-detail-image">
                  <img src={specialist.img} alt="Perfil" className="new-profile-image" />
                </div>
              )}



              <OpenChat phone={specialist.phone_number} />



              <div className="new-name-section">
                <p>
                  <strong>{specialist.first_name} {specialist.last_name}</strong>
                </p>
                <p>
                  <strong>País:</strong> {specialist.country_origin}
                </p>
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
                <p>
                  <strong>Especialización:</strong> {specialist.is_physiotherapist ? 'Fisioterapeuta' : specialist.is_nurse ? 'Enfermero/a' : 'Otro'}
                </p>
              </div>
            </div>
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
      ));
};

export default NewProfessionalDetailView;
