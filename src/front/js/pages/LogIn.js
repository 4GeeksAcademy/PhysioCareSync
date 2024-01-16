import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/SignUp.css';

const LogIn = () => {
  return (
    <div className="text-center mt-5">
        <Link to={'loginPatient'}>
        <button type="button" className="btn btn-outline-info">Ingresa como paciente</button>
      </Link>

      <Link to={'loginSpecialist'}>
        <button type="button" className="btn btn-outline-success">Ingresa como Especialista</button>
      </Link>


    </div>
  )
}

export default LogIn