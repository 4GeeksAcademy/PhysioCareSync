import React, { useContext, useEffect, useState } from 'react'
import Loader from '../component/Loader'
import { Context } from '../store/appContext'
import InformationNewAdmin from '../component/InformationNewAdmin'

const AdminLogin = () => {
    const [loading, setLoading] = useState(false)
    const { store, actions } = useContext(Context)
    

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 2000)
    }, [])
    console.log(store.informationAdministration)

    return (
        !loading ? (<Loader />) :
            (
                <InformationNewAdmin />


            )

    )
}

export default AdminLogin
