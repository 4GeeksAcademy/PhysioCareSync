import React ,{ useState, useContext } from 'react'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { Context } from '../store/appContext'


const Product = () => {

const [ preferenceIdLocal , setPreferenceIdLocal ] = useState(null)
const { store, actions } = useContext(Context)
initMercadoPago('TEST-103cbbfa-52f6-4f44-8ee5-dc8efcb53bed');

const handleBuy = async () => {
    await actions.accessConfirmationSpecialist()
    const token = sessionStorage.getItem('tokenSpecialist');

        if (token) {
    const id = await actions.createPreference()
    if(id){
        setPreferenceIdLocal(store.preferenceId)
    }
}
}

  return (
    <div>
        <div>
            <div>
                <img src='' alt='product stuff' />
                <h3>Titulo producto</h3>
                <p>$100</p>
                <button onClick={handleBuy} >Comprar con MercadoPago</button>
                {
                    preferenceIdLocal && <Wallet initialization={{ preferenceId: store.preferenceId.id }} />
                }
            </div>
        </div>
    </div>  
  )
}

export default Product