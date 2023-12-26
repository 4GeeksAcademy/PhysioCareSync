// ProfessionalView.jsx

import React, { useContext, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/ProfessionalView.css'; 

const ProfessionalView = () => {
  const { state } = useLocation();
  const { store, actions } = useContext(Context);
  const [specialistData, setSpecialistData] = useState(state && state.specialistData);

  useEffect(() => {
    console.log('Datos del especialista:', specialistData);
  }, [specialistData]);

  // Verificar si hay datos del especialista
  if (!specialistData) {
    return <div className="error-message">No se encontraron datos del especialista. Puede ser un error.</div>;
  }

  const {
    first_name,
    last_name,
    email,
    description,
    language,
    certificate,
    img,
    phoneNumber,
    countryOrigin,
    // Agrega más propiedades según sea necesario
  } = specialistData;

  const handlerUpdateSpecialistData = () => {
    // Implementa la lógica para actualizar los datos del especialista si es necesario
    // Puedes utilizar la función actions.updateSpecialistData() del contexto
  };

  return (
    <div className="specialist-card mt-4">
      <div className="card-body">
        <h1 className="card-title">Perfil del Especialista</h1>

        {/* Información del Especialista */}
        <div className="info-item">
          <strong>Nombre:</strong> {first_name} {last_name}
        </div>
        <div className="info-item">
          <strong>Email:</strong> {email}
        </div>
        <div className="info-item">
          <strong>Descripción:</strong> {description}
        </div>
        <div className="info-item">
          <strong>Idioma:</strong> {language}
        </div>
        <div className="info-item">
          <strong>Certificado:</strong> {certificate}
        </div>
        <div className="info-item">
          <strong>Número de Teléfono:</strong> {phoneNumber}
        </div>
        <div className="info-item">
          <strong>País de Origen:</strong> {countryOrigin}
        </div>

        {/* Botones y Enlaces */}
        <div className="buttons-section">
          <Link to="/" className="btn btn-primary">
            Volver a la página principal
          </Link>
          <button onClick={handlerUpdateSpecialistData} className="btn btn-success">
            Actualizar Datos
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalView;
