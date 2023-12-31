// En FullProfile.js
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/FullProfile.css'; // Importa tu archivo de estilo

const FullProfile = () => {
  const { id } = useParams();
  const { store } = useContext(Context);

  // Verificar si specialists está definido y no está vacío
  if (!store.specialists || store.specialists.length === 0) {
    return <div className="full-profile-message">Especialistas no cargados o no encontrados</div>;
  }

  // Utilizar find solo si specialists está definido y no está vacío
  const specialist = store.specialists.find(s => s.id === parseInt(id, 10));

  if (!specialist) {
    return <div className="full-profile-message">Especialista no encontrado</div>;
  }

  return (
    <div className="full-profile-container">
      <h1 className="full-profile-title">Información del Especialista</h1>
      <div className="full-profile-details">
        <p><strong>Nombre:</strong> {specialist.first_name}</p>
        <p><strong>Apellido:</strong> {specialist.last_name}</p>
        <p><strong>Correo Electrónico:</strong> {specialist.email}</p>
        <p><strong>Número de Celular:</strong> {specialist.phone_number}</p>
        <p><strong>Idioma(s):</strong> {specialist.language}</p>
        <p><strong>País:</strong> {specialist.country_origin}</p>
        <p><strong>Descripción:</strong> {specialist.description}</p>

        {specialist.img && (
          <div className="full-profile-image-section">
            <p><strong>Imagen de Perfil:</strong></p>
            <img src={specialist.img} alt="Perfil" className="full-profile-image" />
          </div>
        )}

        {specialist.certificate && (
          <div className="full-profile-certificate-section">
            <p><strong>Certificado:</strong></p>
            <img src={specialist.certificate} alt="Certificado" className="full-profile-certificate" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FullProfile;
