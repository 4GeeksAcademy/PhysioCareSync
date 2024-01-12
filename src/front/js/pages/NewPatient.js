import React, { useContext, useRef, useState } from 'react';
import { Context } from '../store/appContext';
import { Link, useNavigate } from 'react-router-dom';
import zxcvbn from 'zxcvbn'; // Importa la biblioteca de fortaleza de contraseña
import '../../styles/NewPatient.css';
import SnackBarLogin from '../component/SnackBarLogin';
import Footer from '../component/footer';

const NewPatient = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false)


  // Estados de dinamización
  const [clickedFirstName, setClickedFirstName] = useState(false);
  const [clickedLastName, setClickedLastName] = useState(false);
  const [clickedEmail, setClickedEmail] = useState(false);
  const [clickedPassword, setClickedPassword] = useState(false);

  // Estado de fortaleza de contraseña
  const [passwordStrength, setPasswordStrength] = useState({ score: 0 });

  // Funciones de dinamización de inputs
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
    } else if (!isEmailValid(email)) {
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

  // Actualiza la fortaleza de la contraseña mientras el usuario la escribe
  const handlerChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  // Comprobación de fortaleza de contraseña
  const checkPasswordStrength = (password) => {
    const strength = zxcvbn(password);
    const score = strength.score;
  
    // Asegúrate de que la puntuación esté en el rango de 0 a 4
    const adjustedScore = Math.min(Math.max(score, 0), 4);
    setPasswordStrength({ score: adjustedScore, feedback: strength.feedback });
  };

  // Validación del formato del correo electrónico
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Función para crear el paciente
  const handlerCreatePatient = async () => {
    try {
      if (
        firstName === '' ||
        lastName === '' ||
        email === '' ||
        password === '' ||
        !isEmailValid(email)
      ) {
        snackRef.current.show();
        return;
      }

      let newInputPatient = {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
      };

      const result = await actions.createNewPatient(newInputPatient);
      if(result.patient_id && result.email){
      setSignupSuccess(true)
      snackRef.current.show()
      setTimeout(() => {
        navigate('/login/loginPatient'); 

      }, 3000)
      } else if(result.error){
        console.log("Error al crear el paciente", result.error)
        snackRef.current.show();
        return;
      }
    } catch (error) {
      console.error('Hubo un error al crear el paciente', error);
    }
  };

  const snackRef = useRef(null)
  const snackBarType = {
      fail: "fail",
      success: "success",
  }

  return (
    <div>
      {signupSuccess ? 
      <SnackBarLogin type={snackBarType.success} ref={snackRef} message="El usuario paciente se ha creado correctamente" /> :
      <SnackBarLogin type={snackBarType.fail} ref={snackRef} message="No se puede crear el usuario paciente correctamente" />}
    <div className='patientForm'>
      <div className='title'>
        <h1>Bienvenido paciente!</h1>
        <p className='subTitle'>Por favor, introduce tus datos para registrarte</p>
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
        {clickedFirstName && <p className='errorMsg'>* El nombre es obligatorio *</p>}
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
        {clickedLastName && <p className='errorMsg'>* El apellido es obligatorio *</p>}
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
        {clickedEmail && <p className='errorMsg'>* El correo electrónico es obligatorio y debe tener el formato correcto *</p>}
      </div>

      <div>
        <input
          onChange={handlerChangePassword}
          onClick={handlerClickPassword}
          onBlur={handlerBlurPassword}
          placeholder='Contraseña'
          type="password"
          id="inputPassword5"
          className="form-control"
          aria-describedby="passwordHelpBlock"
        />
        <div id="passwordHelpBlock" className="form-text">
          {passwordStrength.feedback && (
            <div className="password-strength">
              <progress
                className={`progress-strength progress-strength-${passwordStrength.score}`}
                value={passwordStrength.score}
                max="4"
              ></progress>
              <p className={`password-feedback password-feedback-${passwordStrength.score}`}>
                {passwordStrength.feedback.suggestions.join(' ')}
              </p>
            </div>
          )}
        </div>
      </div>

      <br />

      <div className='createNewBtn'>
        <button onClick={handlerCreatePatient} type="button" className="btn btn-success">
          Crear
        </button>

        <Link to={'/signup'}>
          <button type="button" className="btn btn-outline-primary exitBtn">
            Salir
          </button>
        </Link>
      </div>
    </div>
    <br></br>
    <br></br>
    <br></br>
    <Footer/>
    </div>
  );
};

export default NewPatient;
