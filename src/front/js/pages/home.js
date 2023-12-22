import React from "react";
import "../../styles/home.css";
import LogInBtn from "../component/LogInBtn.jsx";
import NewUserBtn from "../component/NewUserBtn.jsx";
import FormSpecialistBtn from "../component/FormSpecialistBtn";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";



export const Home = () => {



    const handleLoginClick = () => {
      console.log("Botón de iniciar sesión clicado");
    };

    const handleLearnMoreClick = () => {
      console.log("Botón de aprender más clicado");
    };
   
    const handleSignUpClick = () => {
      console.log("Botón de registrarse clicado");
    };
  
  return (
    <div className="mushoChoiceDrivenUserExpe">
      <section className="typefullSize">
        <div className="copyContainer">
          <div className="copyComponent">
            <div className="headingText">
              <h1 className="heading">Bienvenido a PhysioCareSync</h1>
              <h3 className="subheading">
                Su hogar para servicios profesionales de atención médica.
              </h3>
            </div>
            <LogInBtn className="ctaButton"></LogInBtn>
          </div>
        </div>
        <img
          className="imageContainerIcon"
          alt=""
          src="https://www.kolabtree.com/blog/wp-content/uploads/2021/08/instructor-assisting-senior-woman-exercising.jpg"
        />
      </section>
      <section className="property1comprehensive">
        <div className="headingWrapper">
          <div className="headingContainer">
            <div className="copyComponent1">
              <div className="headingText">
                <h1 className="howItWorks">Proceso simple</h1>
                <div className="howItWorks1">
                  Atención médica a tu alcance en tres sencillos pasos.
                </div>
              </div>
              <button className="ctaButton1" onClick={handleLearnMoreClick}>
                <div className="textContainer">
                  <b className="howItWorks2">Aprende más</b>
                </div>
              </button>
            </div>
            <img className="imageDalle" alt="" src="" />
          </div>
        </div>
        <div className="stepsWrapper">
          <div className="howItWorksGrid">
            <div className="step">
              <i className="fa-regular fa-comment"></i>
              <b className="featureTitle">Inicio de sesión del paciente</b>
              <div className="stepDescription">
                Inicie sesión como paciente y busque profesionales.
              </div>
            </div>
            <div className="step">
              <i className="fa-solid fa-camera"></i>
              <b className="featureTitle">Inicio de sesión profesional</b>
              <div className="stepDescription">
                Inicia sesión como profesional y encuentra trabajo.
              </div>
            </div>
            <div className="step">
              <i className="fa-solid fa-plus"></i>
              <b className="featureTitle">Crea una cuenta</b>
              <div className="stepDescription">
                ¿Nuevo en PhysioCareSync? Comience creando una cuenta.
              </div>
            </div>
            <div className="step">
              <i className="fa-solid fa-magnifying-glass-chart"></i>
              <b className="featureTitle">Contratar a un profesional</b>
              <div className="stepDescription">
                Encuentre y contrate fisioterapeutas y enfermeras cerca de usted.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="typesimpleCta">
        <div className="container">
          <div className="textContent">
            <div className="copy">
              <h1 className="heading1">"¡Regístrate como Especialista Ahora!"</h1>
            </div>
              <FormSpecialistBtn></FormSpecialistBtn>
            <button className="buttonCombo" onClick={handleSignUpClick}>
              <div className="button2">
                <div className="textContainer">
                  <b className="howItWorks2">Regístrate hoy</b>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>


  <div className="typesimpleSquare">
  <section className="copyComponent">
    <div className="headingText">
      <h1 className="heading">Profesionales mejor calificados</h1>
      <h3 className="subheading">
        Navega a través de nuestros profesionales registrados.
      </h3>
    </div>
  </section>
  <section className="teamList">
          <div className="teamMember">
            <img
              className="avatarAisplashavatarsIcon"
              alt=""
              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            />
            <div className="info">
              <div className="name">Dr. Alejandro Ramirez</div>
              <div className="jobTitle">Especialista en Fisioterapia</div>
            </div>
          </div>
          <div className="teamMember">
            <img
              className="avatarAisplashavatarsIcon"
              alt=""
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uYXxlbnwwfHwwfHx8MA%3D%3D"
            />
            <div className="info">
              <div className="name">Dr. Isabella Rodriguez</div>
              <div className="jobTitle">Fisioterapeuta Ortopédico</div>
            </div>
          </div>
          <div className="teamMember">
            <img
              className="avatarAisplashavatarsIcon"
              alt=""
              src="https://covalto-production-website.s3.amazonaws.com/Hero_Mobile_Cuenta_Personas_V1_1_8046e424ea.webp"
            />
            <div className="info">
              <div className="name">Dr. Juan Carlos Martinez</div>
              <div className="jobTitle">Fisioterapeuta pediátrico</div>
            </div>
          </div>
          <div className="teamMember">
            <img
              className="avatarAisplashavatarsIcon"
              alt=""
              src="https://pymstatic.com/5844/conversions/personas-emocionales-wide.jpg"
            />
            <div className="info">
              <div className="name">Dr. Sofia Fernandez</div>
              <div className="jobTitle">Fisioterapeuta Geriátrico</div>
            </div>
          </div>
        </section>
      </div>

<div className="property1defaultAlt">
  <div className="copyComponent">
    <div className="headingText">
      <h1 className="heading">Membership Plans</h1>
      <h3 className="subheading">Choose the best plan for you.</h3>
    </div>
  </div>
  <section className="pricePlans">
          <div className="plan">
            <div className="heading1">
              <img className="iconIcon" alt="" src="/icon--icon@2x.png" />
              <h1 className="title">Basic</h1>
              <div className="shortDescription">
                For individual healthcare specialists
              </div>
            </div>
            <div className="price">
              <b className="b">$20</b>
              <div className="detailsContainer">
                <div className="perMonth">per month</div>
                <div className="yearlySwitch">
                  <div className="perMonth">yearly</div>
                  <div className="switch">
                    <div className="circle" />
                  </div>
                </div>
              </div>
            </div>
            <div className="featureList">
              <div className="price">
                <img
                  className="checkcircleIcon"
                  alt=""
                  src="/checkcircle--icon@2x.png"
                />
                <div className="listItem">Profile Listing</div>
              </div>
              <div className="price">
                <img
                  className="checkcircleIcon"
                  alt=""
                  src="/checkcircle--icon@2x.png"
                />
                <div className="listItem">5 Client Limit</div>
              </div>
              <div className="price">
                <img
                  className="checkcircleIcon"
                  alt=""
                  src="/checkcircle--icon@2x.png"
                />
                <div className="listItem">Basic Support</div>
              </div>
              <div className="price">
                <img
                  className="checkcircleIcon"
                  alt=""
                  src="/checkcircle--icon@2x.png"
                />
                <div className="listItem">Community Access</div>
              </div>
            </div>
            <button className="button">
              <div className="textContainer">
                <div className="cta">Join Now</div>
              </div>
            </button>
          </div>
          <div className="plan1">
            <div className="heading2">
              <img className="iconIcon" alt="" src="/icon--icon@2x.png" />
              <h1 className="title">Pro</h1>
              <div className="shortDescription">
                For small healthcare businesses
              </div>
            </div>
            <div className="price1">
              <div className="price2">
                <b className="b">$50</b>
                <b className="b2">99</b>
              </div>
              <div className="detailsContainer">
                <div className="perMonth">per month</div>
                <div className="yearlySwitch1">
                  <div className="perMonth">yearly</div>
                  <div className="switch">
                    <div className="circle" />
                  </div>
                </div>
              </div>
            </div>
            <div className="featureList1">
              <div className="price">
                <img
                  className="checkcircleIcon"
                  alt=""
                  src="/checkcircle--icon@2x.png"
                />
                <div className="listItem">Unlimited Clients</div>
              </div>
              <div className="price">
                <img
                  className="checkcircleIcon"
                  alt=""
                  src="/checkcircle--icon@2x.png"
                />
                <div className="listItem">Unlimited Storage</div>
              </div>
              <div className="price">
                <img
                  className="checkcircleIcon"
                  alt=""
                  src="/checkcircle--icon@2x.png"
                />
                <div className="listItem">24/7 Dedicated Support</div>
              </div>
              <div className="price">
                <img
                  className="checkcircleIcon"
                  alt=""
                  src="/checkcircle--icon@2x.png"
                />
                <div className="listItem">Custom Integrations</div>
              </div>
            </div>
            <div className="tag">
              <div className="bestDeal">Best Deal</div>
            </div>
            <button className="button1">
              <div className="textContainer">
                <div className="cta1">Join Now</div>
              </div>
            </button>
          </div>
          <div className="plan">
            <div className="heading1">
              <img className="iconIcon" alt="" src="/icon@2x.png" />
              <h1 className="title">Enterprise</h1>
              <div className="shortDescription">
                For large healthcare companies
              </div>
            </div>
            <div className="price">
              <b className="b">$100</b>
              <div className="detailsContainer">
                <div className="perMonth">per month</div>
                <div className="yearlySwitch">
                  <div className="perMonth">yearly</div>
                  <div className="switch">
                    <div className="circle" />
                  </div>
                </div>
              </div>
            </div>
            <div className="featureList">
              <div className="price">
                <img
                  className="checkcircleIcon"
                  alt=""
                  src="/checkcircle--icon@2x.png"
                />
                <div className="listItem">Premium Listing</div>
              </div>
              <div className="price">
                <img
                  className="checkcircleIcon"
                  alt=""
                  src="/checkcircle--icon@2x.png"
                />
                <div className="listItem">Unlimited Clients</div>
              </div>
              <div className="price">
                <img
                  className="checkcircleIcon"
                  alt=""
                  src="/checkcircle--icon@2x.png"
                />
                <div className="listItem">Priority Support</div>
              </div>
              <div className="price">
                <img
                  className="checkcircleIcon"
                  alt=""
                  src="/checkcircle--icon@2x.png"
                />
                <div className="listItem">Community Access</div>
              </div>
            </div>
            <button className="button2">
              <div className="textContainer">
                <div className="cta">Join Now</div>
              </div>
            </button>
            </div>
        </section>
      </div>
    </div>
  );
};

export default Home;