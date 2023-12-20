import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext'
import { Link, useNavigate } from 'react-router-dom'

const OpenChat = () => {
    const {store, actions} = useContext(Context);

	const handlerOpenWhatsApp = () => {
	//	if(store.specialistInfo && store.specialistInfo.phoneNumber){
			const phoneNumber =  523311966153          //store.specialistInfo.phoneNumber;
			const whatsAppURL = `https://wa.me/${phoneNumber}`
			window.open(whatsAppURL)
		//}
	}
 


  return (
    <div>
        	  <button onClick={handlerOpenWhatsApp} type="button" className="btn btn-dark"><i className="fa-brands fa-whatsapp"></i> Iniciar conversación en WA</button>

        
    </div>
  )
}

export default OpenChat