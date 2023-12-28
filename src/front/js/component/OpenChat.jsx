import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { Link, useNavigate, useParams } from 'react-router-dom';


const OpenChat = () => {
    const {store, actions} = useContext(Context);
    const {specialistId} = useParams();

    useEffect(() => {
       
            actions.getSpecialistInfo(specialistId)
        
    },[specialistId]);

    const handlerOpenWhatsApp = () => {
        const phoneNumber = store.viewSpecialist ? store.viewSpecialist.phone_number : " ";

        if(phoneNumber){
            const whatsAppURL = `https://wa.me/${phoneNumber}`
        window.open(whatsAppURL)
        }else{
            console.error("No phone number available for this sspecialist.")
        }
        
    }


  return (
    <div>
         <button onClick={handlerOpenWhatsApp} type="button" className="btn btn-dark"><i className="fa-brands fa-whatsapp"></i> Iniciar conversación en WA</button>

    </div>
  )
}

export default OpenChat