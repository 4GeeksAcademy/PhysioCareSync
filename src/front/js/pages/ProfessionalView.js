// En ProfessionalView.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/ProfessionalView.css';

const ProfessionalView = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/professional-view/${store.informationSpecialist.id}`);
  };

  const truncateDescription = (description, maxLength) => {
    return description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;
  };

  return (
    <div className="professional-view-container" onClick={handleNavigate} style={{ cursor: 'pointer' }}>
      <h1 className="professional-view-title">Información del Especialista</h1>
      <div className="professional-view-card">
        <div className="professional-view-info specialist-info">
          <div className="profile-section">
            {store.informationSpecialist.img && (
              <div className="professional-view-image">
                <img src={store.informationSpecialist.img} alt="Perfil" className="profile-image" />
              </div>
            )}
            <div className="name-section no-link">
              <p>
                <strong>{store.informationSpecialist.first_name} {store.informationSpecialist.last_name}</strong>
              </p>
              <p>
                <strong>País:</strong> {store.informationSpecialist.country_origin}
              </p>
              <p>
                <strong>Descripción:</strong>{' '}
                {truncateDescription(store.informationSpecialist.description, 200)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalView;
