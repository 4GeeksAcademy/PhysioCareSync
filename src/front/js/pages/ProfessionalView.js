import React, { useContext, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Context } from '../store/appContext';

const ProfessionalView = () => {
  const { state } = useLocation();
  const { store, actions } = useContext(Context);
  const [specialistData, setSpecialistData] = useState(state && state.specialistData);

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
    <div>
      <h1>Perfil del Especialista</h1>
      <div>
        <strong>Nombre:</strong> {first_name} {last_name}
      </div>
      <div>
        <strong>Email:</strong> {email}
      </div>
      <div>
        <strong>Descripción:</strong> {description}
      </div>
      <div>
        <strong>Idioma:</strong> {language}
      </div>
      <div>
        <strong>Certificado:</strong> {certificate}
      </div>
      <div>
        <strong>Imagen:</strong> {img}
      </div>
      <div>
        <strong>Número de Teléfono:</strong> {phoneNumber}
      </div>
      <div>
        <strong>País de Origen:</strong> {countryOrigin}
      </div>

      {/* Agregar enlaces o cualquier otra información adicional según sea necesario */}
      <Link to="/">Volver a la página principal</Link>

      {/* Botón para actualizar datos (Ejemplo, puedes eliminarlo si no es necesario) */}
      <button onClick={handlerUpdateSpecialistData}>Actualizar Datos</button>
    </div>
  );
};

export default ProfessionalView;
