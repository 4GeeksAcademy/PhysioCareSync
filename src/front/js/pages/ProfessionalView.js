import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../../styles/ProfessionalView.css';
import MyPagination from '../component/MyPagination';
import Loader from '../component/Loader';

const ProfessionalView = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const limit = 10
  const [page, setPage] = useState(1)
  const history = useNavigate();

  const SkeletonLoading = () => {
    return (
      <div className='professional-view-card skeleton'>
        <div className='profile-section skeleton'>
          <div className='card-img-top-skeleton'></div>
          <div className='name-section '>
            <p className='skeleton-section'>
              <strong></strong>
            </p>
            <div className='specialist-info '>
              <p className="specialist-type skeleton-specialist" >
              </p>
              <div className='container-country'>
                <strong className='country-name'> País:</strong>
                <p className='skeleton-country'></p>
              </div>

              <div className='container-text'>
                <strong>Descripción:</strong>
                <p className='skeleton-text'></p>
              </div>
            </div>
          </div>
        </div>

      </div >
    )

  }

  const handleChangePage = useCallback((page) => {
    setPage(page)
    navigate(`/professionalView?page=${page}&limit=${limit}`)
  }, [history, limit]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        store.loadingListSpecialist = false
        await actions.loadAllSpecialists(page, limit);
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
  }, [page, handleChangePage]);

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
    return (
      <div className="professional-view-container">
        <h1 className="professional-view-title">Especialistas</h1>
        <div className="professional-view-list">
          <Loader />
        </div>
      </div>
    )
  };


  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="professional-view-container">
      <h1 className="professional-view-title">Especialistas</h1>
      <div className="professional-view-list">
        {store.loadingListSpecialist ?
          store.specialistsList.specialists.filter((specialist) => specialist.is_authorized).map((specialist) => (
            (
              < div key={specialist.id} className="professional-view-card" onClick={() => handleNavigate(specialist.id)}>
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
            )

          )) :

          (Array.from({ length: 10 }).map((_, index) => < SkeletonLoading key={index} />))}
      </div>

      {
        store.specialistsList.total_pages > 1 && (
          store.loadingListSpecialist ? < MyPagination
            total={store.specialistsList.total_pages}
            current={page}
            onChangePage={handleChangePage}
            valueDisabled={store.loadingListSpecialist}
          /> : < MyPagination
            total={store.specialistsList.total_pages}
            current={page}
            onChangePage={handleChangePage}
            valueDisabled={store.loadingListSpecialist}
          />
        )
      }

    </div >
  );
};
export default ProfessionalView;
