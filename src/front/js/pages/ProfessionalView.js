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
    let isMounted = true;

    const fetchData = async () => {
      try {
        await actions.loadAllSpecialists();

        if (isMounted) {
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [actions]);

  const truncateDescription = (description, maxLength) => {
    if (!description) return ''; 
    if (description.length <= maxLength) {
      return description;
    } else {
      return description.substring(0, maxLength) + '...';
    }
  };

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
      <h1 className="professional-view-title">Especialistas</h1>
      <div className="professional-view-list">
        {store.specialistsList.map((specialist) => (
          <div key={specialist.id} className="professional-view-card" onClick={() => handleNavigate(specialist.id)}>
            <div className="profile-section">
              {specialist.img && (
                <div className="professional-view-image">
                  <img src={specialist.img} alt="Perfil" className="profile-image" />
                </div>
              )}
              <div className="name-section">
                <p>
                  <strong>{specialist.first_name} {specialist.last_name}</strong>
                </p>
                <div className="specialist-info">
                  <span className="specialist-type">
                    {specialist.is_physiotherapist ? 'Fisioterapeuta' : specialist.is_nurse ? 'Enfermero/a' : 'Otro'}
                  </span>
                  <p>
                    <strong>País:</strong> {specialist.country_origin}
                  </p>
                  <p>
                    <strong>Descripción:</strong> {truncateDescription(specialist.description, 100)}
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
