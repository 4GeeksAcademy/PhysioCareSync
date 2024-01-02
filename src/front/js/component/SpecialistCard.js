import React from 'react';

const SpecialistCard = ({ specialistData }) => {
  // Verifica si specialistData está definido
  if (!specialistData) {
    return null; // o algún otro manejo de carga
  }

  return (
    <div className="specialist-card">
      <h2>{`${specialistData.first_name} ${specialistData.last_name}`}</h2>
      <p>Email: {specialistData.email}</p>
      <p>Número de teléfono: {specialistData.phone_number}</p>
      <p>País de origen: {specialistData.country_origin}</p>
      <p>Idiomas: {specialistData.language}</p>
      <p>Descripción: {specialistData.description}</p>
      <img
        alt={`${specialistData.first_name} ${specialistData.last_name}`}
        className="profile-image"
      />
      {specialistData.certificate && (
        <div>
          <p>Certificado:</p>
          <img
            alt="Certificado"
            className="certificate-image"
          />
        </div>
      )}
    </div>
  );
};

export default SpecialistCard;
