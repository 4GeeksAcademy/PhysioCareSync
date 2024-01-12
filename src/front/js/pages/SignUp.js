import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className="text-center mt-5">
      <Link to={'newPatient'}>
        <button type="button" class="btn btn-outline-info">Registrate como paciente</button>
      </Link>

      <Link to={'newSpecialist'}>
        <button type="button" class="btn btn-outline-success">Registrate como Especialista</button>
      </Link>



    </div>
  )
}

export default SignUp