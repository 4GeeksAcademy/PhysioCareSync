import React from 'react'
import { Link } from 'react-router-dom'

const LogInBtn = () => {
  return (
    <div>
         <Link to={'/login'}>
                <button type="button" className="navLink">Inicia sesión</button>
            </Link>

    </div>
  )
}

export default LogInBtn