import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import '../../styles/footer.css';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>
            <FontAwesomeIcon icon={faHeartbeat} className="heartbeat-icon" />
            PhysioCareSync
          </h3>
          <div className="contact-info">
            <p>
              <FontAwesomeIcon icon={faEnvelope} /> physiocaresync@gmail.com
            </p>
            <p>
              <FontAwesomeIcon icon={faPhoneAlt} /> +58 424 2623311
            </p>
          </div>
        </div>
        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li>Enfermería</li>
            <li>Fisioterapia</li>
            <li>Precios</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Redes Sociales</h3>
          <div className="social-icons">
            <a href="#" className="social-icon"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#" className="social-icon"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#" className="social-icon"><FontAwesomeIcon icon={faFacebook} /></a>
          </div>
        </div>
      </div>
      <div className="footer-line"></div>
      <div className="footer-copyright">
        &copy; 2024 PhysioCareSync. <Link to={'/adminLogin'} style={{ textDecoration: 'none', color: "inherit", cursor: "default" }}>Reservados todos los derechos.</Link>
      </div>
    </footer>
  );
};

export default Footer;