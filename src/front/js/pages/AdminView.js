import React, { useContext, useEffect, useState } from 'react'
import Loader from '../component/Loader'
import { Context } from '../store/appContext'
import InformationNewAdmin from '../component/InformationNewAdmin'

const AdminView = () => {
    const [loading, setLoading] = useState(false)
    const { store, actions } = useContext(Context)

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 2000)
    }, [])


    const checkAccess = async () => {
        await actions.accessConfirmationAdmin();
        const token = sessionStorage.getItem('tokenAdmin');
        if (!token && store.isTokenAuthentication == true) {
            navigate('/');
        }
    };

    useEffect(() => {
        checkAccess();
    }, [])

    return (
        <div>
            {!loading ? (
                <Loader />
            ) : (
                <div className='patientForm'>
                    <h1 className='formTitle'>Bienvenido a la Vista de Administrador</h1>
                    <hr />
                    <div className='adminContent'>
                        <p>Como administrador, tienes la responsabilidad de gestionar y mantener la información de los usuarios registrados en nuestra aplicación. A continuación, se detallan las acciones que puedes realizar:</p>
                        <ol>
                            <li><p><strong>Ver Pacientes</strong></p></li>
                            <ul>
                                <li>Accede a la lista completa de pacientes registrados.</li>
                                <li>Analiza la información detallada de cada paciente.</li>
                            </ul>
                            <br/>

                            <li><strong><p>Ver especialistas</p></strong></li>
                            <ul>
                                <li>Accede a la lista completa de especialistas registrados.</li>
                                <li>Analiza la información detallada de cada especialista.</li>
                            </ul>
                            <br/>
                            
                            <li><p><strong>Eliminar usuarios</strong></p></li>

                            <ul>
                                <li>Selecciona al usuario que quieres visualizar y presiona el botón para eliminar</li>
                                <li>Ten en cuenta que esta acción es irreversible, así que asegúrate de confirmar antes de proceder.</li>
                            </ul>
                        </ol>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminView
