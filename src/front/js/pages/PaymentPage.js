import React from 'react';
import MembershipCard from '../component/MembershipCard.js';
import '../../styles/PaymentPage.css';
import { FaCheckCircle } from 'react-icons/fa';
import Footer from '../component/footer.js';

const PaymentPage = () => {
  return (
    <div className="paymentPageContainer">
      <div className="paymentContentContainer">
        <div className="paymentInfoContainer">
          <MembershipCard />
          <div className="paymentTextContainer">
            <header className="paymentHeader">
              <h1>Únete a nuestra plataforma de especialistas en fisioterapia y enfermería</h1>
            </header>
            <p className="paymentNote">
              ¡Bienvenido a [Nombre de la Plataforma]! Donde la excelencia en la salud se encuentra con la tecnología moderna. Conviértete en parte de nuestra comunidad de profesionales comprometidos con el cuidado de los demás.
            </p>
            <p className="paymentNote">
              <FaCheckCircle className="icon" /> Destaca con visibilidad exclusiva y oportunidades para expandir tu práctica.
            </p>
            <p className="paymentNote">
              <FaCheckCircle className="icon" /> Pago único para garantizar tu presencia perpetua sin tarifas mensuales.
            </p>
            <p className="paymentNote">
              <FaCheckCircle className="icon" /> Haz que tu perfil destaque y llega a más pacientes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
