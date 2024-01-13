import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import '../../styles/ProfessionalView.css';
import MyPagination from '../component/MyPagination';
import Loader from '../component/Loader';

const ViewPatientList = () => {
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
        navigate(`/patientView?page=${page}&limit=${limit}`)
    }, [history, limit]);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                store.loadingListPatient = false
                await actions.loadAllPatient(page, limit);
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


    const handleNavigate = (patientId) => {
        navigate(`/patientViewAdmin/detail/${patientId}`);
    };

    if (loading) {
        return (
            <div className="professional-view-container">
                <h1 className="professional-view-title">Pacientes</h1>
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
            <h1 className="professional-view-title">Pacientes</h1>
            <div className="professional-view-list">
                {store.loadingListPatient ?
                    store.patientList.patients.map((patient) => (
                        (
                            < div key={patient.id} className="professional-view-card" onClick={() => handleNavigate(patient.id)}>
                                <div className="profile-section">
                                    {patient.img && (
                                        <div className="professional-view-image">
                                            <img src={patient.img} alt="Perfil" className="profile-image" />
                                        </div>
                                    )}
                                    <div className="name-section">
                                        <p>
                                            <strong>{patient.first_name} {patient.last_name}</strong>
                                        </p>
                                        <div className="specialist-info">

                                            <p>
                                                <strong>País:</strong> {patient.country_origin}
                                            </p>
                                            <p>
                                                <strong>Lenguaje:</strong> {truncateDescription(patient.language, 100)}
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )

                    )) :
                    (
                        store.patientList === undefined ? null :
                            (Array.from({ length: 10 }).map((_, index) => < SkeletonLoading key={index} />))
                    )

                }
            </div>

            {
                store.patientList.total_pages > 1 && (
                    store.loadingListPatient ? < MyPagination
                        total={store.patientList.total_pages}
                        current={page}
                        onChangePage={handleChangePage}
                        valueDisabled={store.loadingListPatient}
                    /> : < MyPagination
                        total={store.patientList.total_pages}
                        current={page}
                        onChangePage={handleChangePage}
                        valueDisabled={store.loadingListPatient}
                    />
                )
            }

        </div >
    );
};
export default ViewPatientList;
