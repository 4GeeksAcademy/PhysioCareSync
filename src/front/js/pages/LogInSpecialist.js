import React, { useContext, useState } from 'react'
import { Context } from '../store/appContext'
import { Link, useNavigate } from 'react-router-dom'

const LogInSpecialist = () => {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [clickedEmail, setClickedEmail] = useState(false)
    const [clickedPassword, setClickedPassword] = useState(false)


    const handlerClickEmail = () => {
        setClickedEmail(false)
    }
    const handlerBlurEmail = () => {
        if (!email.trim()) {
            setClickedEmail(true);
        }
    }

    const handlerClickPassword = () => {
        setClickedPassword(false)
    }
    const handlerBlurPassword = () => {
        if (!password.trim()) {
            setClickedPassword(true);
        }
    }

    const handlerLogInSpecialist = async () => {
        try {
            if (email == "" || password == "") {
                alert("All fields are required")
                return
            }

            let loginSpecialist = {
                email: email,
                password: password
            }

            const result = await actions.loginSpecialist(loginSpecialist)
            console.log("This is the result:", result.specialist)
            if (result && result.accessToken) {
                const token = result.accessToken;
                sessionStorage.setItem('tokenSpecialist', token)
                await actions.accessConfirmationSpecialist();
                sessionStorage.setItem("specialistId", store.informationSpecialist.id)
                const specialistId = sessionStorage.getItem("specialistId")
                navigate(`/profile/specialist/${specialistId}`)


            } else {
                alert("email or password incorrect");
            }
        } catch (error) {
            console.error("There was an error with the query", error)
        }

    }
    return (
        <div>

            <div className='patientForm'>
                <div className='title'>
                    <h1>Bienvenido especialista!</h1>
                    <p className='subTitle'>Por favor, introduce tus datos para ingresar a tu cuenta</p>
                </div>

                <div className="mb-3">
                    <input onChange={(e) => setEmail(e.target.value)} onClick={handlerClickEmail} onBlur={handlerBlurEmail} type="email" className="form-control" id="exampleFormControlInput1" placeholder=" Correo electrónico" />
                    {clickedEmail && (<p className='errorMsg'>* El correo electrónico es obligatorio *</p>)}

                </div>

                <input onChange={(e) => setPassword(e.target.value)} onClick={handlerClickPassword} onBlur={handlerBlurPassword} type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" placeholder='Contraseña' />
                {clickedPassword && (<p className='errorMsg'>* La contraseña es obligatoria *</p>)}
                <br></br>

                <div className='createNewBtn'>
                    <button onClick={handlerLogInSpecialist} type="button" className="btn btn-success saveBtn">Ingresar</button>

                    <Link to={'/login'}>
                        <button type="button" className="btn btn-outline-primary exitBtn">Salir</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LogInSpecialist