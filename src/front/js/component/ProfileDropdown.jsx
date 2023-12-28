import React from 'react'
import { Link } from "react-router-dom";



const ProfileDropdown = () => {
    const patientId = sessionStorage.getItem("patientId")
    return (
        <div>
            <Link to={`/profile/patient/${patientId}`}>
                <button type="button" className="navBar-ProfileImage">Perfil</button>
            </Link>
        </div >
    )
}

export default ProfileDropdown
