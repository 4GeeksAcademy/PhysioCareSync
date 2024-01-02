import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/ProfessionalView.css';

const ProfessionalView = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleNavigate = () => {
    navigate(`/professional-view/${store.informationSpecialist.id}`);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="professional-view-container" onClick={handleNavigate} style={{ cursor: 'pointer' }}>
      <h1 className="professional-view-title">Información del Especialista</h1>
      <div className="professional-view-card">
        <div className="professional-view-info specialist-info">
          <div className="profile-section">
            {/* Mostrar la imagen del especialista */}
            {store.informationSpecialist.img && (
              <div className="professional-view-image">
                <img src={store.informationSpecialist.img} alt="Perfil" className="profile-image" />
              </div>
            )}
            <div className="name-section no-link">
              {/* Mostrar el nombre y otros detalles del especialista */}
              <p>
                <strong>{store.informationSpecialist.first_name} {store.informationSpecialist.last_name}</strong>
              </p>
              <p>
                <strong>País:</strong> {store.informationSpecialist.country_origin}
              </p>
              <p>
                <strong>Descripción:</strong>{' '}
                {store.informationSpecialist.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalView;

