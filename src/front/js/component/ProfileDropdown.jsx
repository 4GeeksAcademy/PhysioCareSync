import React from 'react'
import { Link } from "react-router-dom";



const ProfileDropdown = () => {

    let userId
    let user

    const patientId = sessionStorage.getItem("patientId")
    if (patientId == null) {
        const specialistId = sessionStorage.getItem("specialistId")
        userId = specialistId
        user = "specialist"

    }
    else {
        userId = patientId
        user = "patient"
    }


    return (
        <div>
            {
                user == "specialist"
                    ?
                    <Link to={`/profile/specialist/${userId}`}>
                        <button type="button" className="navBar-ProfileImage">Perfil</button>
                    </Link>
                    : (user == "patient" ?
                        <Link to={`/profile/patient/${userId}`}>
                            <button type="button" className="navBar-ProfileImage">Perfil</button>
                        </Link>
                        : null
                    )

            }

        </div >
    )
}

export default ProfileDropdown
