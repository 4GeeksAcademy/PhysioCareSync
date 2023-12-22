import React from 'react'
import { Link } from "react-router-dom";

const FormSpecialistBtn = () => {
    return (
        <div>
            <Link to={'/SpecialistForm'}>
                <button type="button" className="navLink">Regístrate</button>
            </Link>

        </div>
    )
}

export default FormSpecialistBtn