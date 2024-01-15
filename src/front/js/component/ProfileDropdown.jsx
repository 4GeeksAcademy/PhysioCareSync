import React, { useRef, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import "../../styles/home.css"


const ProfileDropdown = (props) => {

    const dropDownRef = useRef(null)
    let userId
    let user
    const [open, setOpen] = useState(false)

    const patientId = sessionStorage.getItem("patientId")
    const specialistId = sessionStorage.getItem("specialistId")
    const adminId = sessionStorage.getItem("adminId")


    if (patientId) {
        userId = patientId
        user = "patient"
    }
    else if (specialistId) {
        userId = specialistId
        user = "specialist"
    }
    else if (adminId) {
        userId = adminId
        user = "admin"
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target) && open)
                setOpen((prevState => !prevState))
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }


    }, [dropDownRef, open])

    return (
        <div>
            {
                user == "specialist"
                    ?
                    <li className='nav-item' ref={dropDownRef} >
                        <a className='icon-button'>
                            <img className='icon-button-image' onClick={() => { setOpen((prevState) => !prevState) }} src={props.imageProfile}></img>
                        </a>
                        {open && props.children}
                    </li>
                    : (user == "patient" ?
                        <li className='nav-item' ref={dropDownRef} >
                            <a className='icon-button'>
                                <img className='icon-button-image' onClick={() => { setOpen((prevState) => !prevState) }} src={props.imageProfile}></img>
                            </a>
                            {open && props.children}
                        </li>
                        :
                        user == "admin" ?
                            (
                                <li className='nav-item' ref={dropDownRef} >
                                    <a className='icon-button'>
                                        <img className='icon-button-image' onClick={() => { setOpen((prevState) => !prevState) }} src={props.imageProfile}></img>
                                    </a>
                                    {open && props.children}
                                </li>

                            ) :
                            null
                    )

            }

        </div >
    )
}

export default ProfileDropdown
