import React from 'react';
import '../../styles/MembershipCard.css';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate



const MembershipCard = () => {
    const navigate = useNavigate(); // Inicializa useNavigate
  return (
    <div className="membershipCardContainer">
      <div className="property1defaultAlt">
        <div className="copyComponent">
          <div className="headingText">
            <h1 className="heading">
              Pago único, visibilidad ilimitada
            </h1>
            <h3 className="subheading">
              La visibilidad, tu ventaja competitiva: Realiza el pago ahora
            </h3>
          </div>
        </div>
      </div>

      <div className="newProperty1DefaultAlt">
        <div className="newCopyComponent">
          <h1 className="newTitle">
            <i className="fas fa-trophy"></i> Pago
          </h1>
          <p className="newShortDescription">Tu perfil, tu puerta a la oportunidad</p>
          <div className="newPrice1">
            <div className="newPrice2">
              <b className="newB">$100</b>
              <b className="newB2"></b>
            </div>
            <div className="newDetailsContainer">
              <div className="newPerMonth">Pago</div>
              <div className="newYearlySwitch1">
                <div className="newPerMonth">Unico</div>
                <div className="newSwitch">
                  <div className="newCircle" />
                </div>
              </div>
            </div>
          </div>
          <div className="newFeatureList1">
            <div className="newListItem">
              <i className="fas fa-check-circle newCheckcircleIcon"></i>
              <div>Clientes ilimitados</div>
            </div>
            <div className="newListItem">
              <i className="fas fa-check-circle newCheckcircleIcon5"></i>
              <div>Acceso a una amplia audiencia</div>
            </div>
            <div className="newListItem">
              <i className="fas fa-check-circle newCheckcircleIcon5"></i>
              <div>Facilidad de uso</div>
            </div>
            <div className="newListItem">
              <i className="fas fa-check-circle newCheckcircleIcon5"></i>
              <div>Integraciones personalizadas</div>
            </div>
          </div>
          <div className="newTag">
          <button className="joinNowButton" onClick={() => navigate('/signup/newSpecialist')}>
            Únete ahora
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MembershipCard;
