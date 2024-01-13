import React, { useState, useContext } from 'react'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { Context } from '../store/appContext'
import "../../styles/Product.css"
import { useParams } from 'react-router-dom'

const Product = () => {

    const [preferenceIdLocal, setPreferenceIdLocal] = useState(null)
    const { store, actions } = useContext(Context)
    initMercadoPago('APP_USR-afa20cc4-0476-4a1d-859e-4730240c1b8e');
    const { theid } = useParams()
    console.log("Aquita tu user id:", theid)
    const handleBuy = async () => {
       
        const id = await actions.createPreference(theid)
        if (id) {
            sessionStorage.setItem('specialistId', theid)
            setPreferenceIdLocal(store.preferenceId)
            console.log(store.preferenceId)
        }
    }

    return (
        <div className='suscriptionBox'>
            <p>Suscribete para ser encontrado por los pacientes!</p>
            <p className='price'></p>
            <button onClick={handleBuy} type="button" className="btn btn-outline-info payButton">Pagar suscripción</button>
            {
                preferenceIdLocal && <Wallet initialization={{ preferenceId: store.preferenceId.id }} />
            }
        </div>
    )
}

export default Product