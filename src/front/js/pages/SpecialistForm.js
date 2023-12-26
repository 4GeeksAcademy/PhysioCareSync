import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/SpecialistForm.css'; 

const NewSpecialist = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPhysio, setIsPhysio] = useState(false);
  const [isNurse, setIsNurse] = useState(false);
  const [certificate, setCertificate] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('');
  const [img, setImg] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryOrigin, setCountryOrigin] = useState('');

  const [clickedFristName, setClickedFirstName] = useState(false);
  const [clickedLastName, setClickedLastName] = useState(false);
  const [clickedEmail, setClickedEmail] = useState(false);
  const [clickedPassword, setClickedPassword] = useState(false);

  const handlerClickFirstName = () => {
    setClickedFirstName(false);
  };

  const handlerBlurFirstName = () => {
    if (!firstName.trim()) {
      setClickedFirstName(true);
    }
  };

  const handlerClickLastName = () => {
    setClickedLastName(false);
  };

  const handlerBlurLastName = () => {
    if (!lastName.trim()) {
      setClickedLastName(true);
    }
  };

  const handlerClickEmail = () => {
    setClickedEmail(false);
  };

  const handlerBlurEmail = () => {
    if (!email.trim()) {
      setClickedEmail(true);
    }
  };

  const handlerClickPassword = () => {
    setClickedPassword(false);
  };

  const handlerBlurPassword = () => {
    if (!password.trim()) {
      setClickedPassword(true);
    }
  };

  const handlerPhysioChange = () => {
    setIsPhysio(true);
    setIsNurse(false);
  };

  const handlerNurseChange = () => {
   setIsNurse(true);
  };

  const handlerCreateSpecialist = async () => {
    try {
      if (
        firstName === '' ||
        lastName === '' ||
        email === '' ||
        password === '' ||
        (!isPhysio && !isNurse)
      ) {
        alert('Todos los campos son requeridos');
        return;
      }
  
      let newInputSpecialist = {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        is_physiotherapist: isPhysio,
        is_nurse: isNurse,
        certificate,
        description,
        language,
        img,
        phone_number: phoneNumber,
        country_origin: countryOrigin,
      };
       
       await actions.createNewSpecialist(newInputSpecialist);

       
       navigate('/ProfessionalView', { state: { specialistData: newInputSpecialist } });

   } catch (error) {
       console.error('Hubo un error creando el usuario especialista', error);
       // Puedes manejar el error de alguna manera si es necesario
   }
};

  // Llamada directa a useEffect
  useEffect(() => {
    // Lógica que deseas ejecutar después de cada renderizado
  }, [/* Dependencias aquí si es necesario */]);
  

  return (
    <div className="patientForm">
      <div className="title">
        <h1>Bienvenido especialista!</h1>
        <p className="subTitle">Por favor, introduce tus datos para registrarte</p>
      </div>

      <div className="mb-3">
        <input
          onChange={(e) => setFirstName(e.target.value)}
          onClick={handlerClickFirstName}
          onBlur={handlerBlurFirstName}
          type="firstName"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Nombre"
        />
        {clickedFristName && <p className="errorMsg">* El nombre es obligatorio *</p>}
      </div>

      <div className="mb-3">
        <input
          onChange={(e) => setLastName(e.target.value)}
          onClick={handlerClickLastName}
          onBlur={handlerBlurLastName}
          type="lastName"
          className="form-control"
          id="exampleFormControlInput2"
          placeholder="Apellido"
        />
        {clickedLastName && <p className="errorMsg">* El apellido es obligatorio *</p>}
      </div>

      <div className="mb-3">
        <input
          onChange={(e) => setEmail(e.target.value)}
          onClick={handlerClickEmail}
          onBlur={handlerBlurEmail}
          type="email"
          className="form-control"
          id="exampleFormControlInput3"
          placeholder="Correo electrónico"
        />
        {clickedEmail && <p className="errorMsg">* El correo electrónico es obligatorio *</p>}
      </div>

      <div>
        <input
          onChange={(e) => setPassword(e.target.value)}
          onClick={handlerClickPassword}
          onBlur={handlerBlurPassword}
          placeholder="Contraseña"
          type="password"
          id="inputPassword5"
          className="form-control"
          aria-describedby="passwordHelpBlock"
        />
        <div id="passwordHelpBlock" className="form-text"></div>
      </div>

    
      <div className="mb-3">
        <input
          onChange={(e) => setCertificate(e.target.value)}
          type="text"
          className="form-control"
          id="exampleFormControlInput4"
          placeholder="Certificado"
        />
      </div>

      

      <div className="mb-3">
        <input
          onChange={(e) => setLanguage(e.target.value)}
          type="text"
          className="form-control"
          id="exampleFormControlInput5"
          placeholder="Idioma"
        />
      </div>
      <div className="mb-3">
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Descripción"
        ></textarea>
      </div>


      <div className="mb-3">
        <input
          onChange={(e) => setImg(e.target.value)}
          type="text"
          className="form-control"
          id="exampleFormControlInput6"
          placeholder="Imagen (URL o texto)"
        />
      </div>

      <div className="mb-3">
        <input
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="tel"
          className="form-control"
          id="exampleFormControlInput7"
          placeholder="Número de teléfono"
        />
      </div>

      <div className="mb-3">
        <input
          onChange={(e) => setCountryOrigin(e.target.value)}
          type="text"
          className="form-control"
          id="exampleFormControlInput8"
          placeholder="País de origen"
        />
      </div>

      <div className="speciality">
        <div className="form-check form-check-inline">
          <input
            onChange={handlerPhysioChange}
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="option1"
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            Fisioterapeuta
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            onChange={handlerNurseChange}
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="option2"
          />
          <label className="form-check-label" htmlFor="inlineRadio2">
            Enfermero/a
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio3"
            value="option3"
            disabled
          />
          <label className="form-check-label" htmlFor="inlineRadio3">
            Psicólogo (Próximamente)
          </label>
        </div>
      </div>
      <br></br>

      <div className="createNewBtn">
        <button onClick={handlerCreateSpecialist} type="button" className="btn btn-success">
          Crear
        </button>

        <Link to={'/signup'}>
          <button type="button" className="btn btn-outline-primary exitBtn">
            Salir
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NewSpecialist;