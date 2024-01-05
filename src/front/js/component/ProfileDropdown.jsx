import React, { useState } from 'react'
import { Link } from "react-router-dom";
import "../../styles/home.css"


const ProfileDropdown = (props) => {

    let userId
    let user
    const [open, setOpen] = useState(false)

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
                    <li className='nav-item'>
                        <a className='icon-button'>
                            <img className='icon-button-image' onClick={() => { setOpen((prevState) => !prevState) }} src={props.imageProfile}></img>
                        </a>
                        {open && props.children}
                    </li>
                    // <button type="button" className="navBar-ProfileImage">{props.imageProfile}</button>
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
