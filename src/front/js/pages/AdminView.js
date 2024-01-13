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
        !loading ? (<Loader />) :
            (
                <p>Bienvenido a la vista del admin!</p>
            )

    )
}

export default AdminView
