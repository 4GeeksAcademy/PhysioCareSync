import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/ProfessionalView.css';

const ProfessionalView = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await actions.loadAllSpecialists();
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [actions]);

  const handleNavigate = (specialistId) => {
    navigate(`/professional-view/${specialistId}`);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="professional-view-container">
      <h1 className="professional-view-title">Información de los Especialistas</h1>
      <div className="professional-view-list">
        {store.specialistsList.map((specialist) => (
          <div key={specialist.id} className="professional-view-card" onClick={() => handleNavigate(specialist.id)}>
            <div className="professional-view-info specialist-info">
              <div className="profile-section">
                {specialist.img && (
                  <div className="professional-view-image">
                    <img src={specialist.img} alt="Perfil" className="profile-image" />
                  </div>
                )}
                <div className="name-section no-link">
                  <p>
                    <strong>{specialist.first_name} {specialist.last_name}</strong>
                  </p>
                  <p>
                    <strong>País:</strong> {specialist.country_origin}
                  </p>
                  <p>
                    <strong>Descripción:</strong> {specialist.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalView;
