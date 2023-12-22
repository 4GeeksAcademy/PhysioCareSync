import React, { useContext, useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Context } from '../store/appContext';

const ProfessionalView = () => {
  const { state } = useLocation();
  const { store, actions } = useContext(Context);
  const [specialistData, setSpecialistData] = useState(state && state.specialistData);

  useEffect(() => {
    console.log('Datos del especialista:', specialistData);
  }, [specialistData]);

  // Verificar si hay datos del especialista
  if (!specialistData) {
    return <div>No se encontraron datos del especialista. Puede ser un error.</div>;
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
    <div className="card mt-4">
      <div className="card-body">
        <h1 className="card-title">Perfil del Especialista</h1>

        {/* Aquí debes asegurarte de que los datos se están recibiendo y mostrando correctamente */}
        <div className="card-text">
          <strong>Nombre:</strong> {first_name} {last_name}
        </div>
        <div className="card-text">
          <strong>Email:</strong> {email}
        </div>
        <div className="card-text">
          <strong>Descripción:</strong> {description}
        </div>
        <div className="card-text">
          <strong>Idioma:</strong> {language}
        </div>
        <div className="card-text">
          <strong>Certificado:</strong> {certificate}
        </div>
        <div className="card-text">
          <strong>Imagen:</strong> {img}
        </div>
        <div className="card-text">
          <strong>Número de Teléfono:</strong> {phoneNumber}
        </div>
        <div className="card-text">
          <strong>País de Origen:</strong> {countryOrigin}
        </div>

        {/* Agregar enlaces o cualquier otra información adicional según sea necesario */}
        <Link to="/" className="btn btn-primary mt-3">
          Volver a la página principal
        </Link>

        {/* Botón para actualizar datos (Ejemplo, puedes eliminarlo si no es necesario) */}
        <button onClick={handlerUpdateSpecialistData} className="btn btn-success mt-3">
          Actualizar Datos
        </button>
      </div>
    </div>
  );
};

export default ProfessionalView;
