import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/NewPatient.css';

const NewPatient = () => {
    const navigate = useNavigate();
    const { actions } = useContext(Context);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [clickedFirstName, setClickedFirstName] = useState(false);
    const [clickedLastName, setClickedLastName] = useState(false);
    const [clickedEmail, setClickedEmail] = useState(false);
    const [clickedPassword, setClickedPassword] = useState(false);

    const validateFields = () => {
        let isValid = true;

        if (!firstName.trim()) {
            setClickedFirstName(true);
            isValid = false;
        }

        if (!lastName.trim()) {
            setClickedLastName(true);
            isValid = false;
        }

        if (!email.trim() || !email.includes('@')) {
            setClickedEmail(true);
            isValid = false;
        }

        if (!password.trim()) {
            setClickedPassword(true);
            isValid = false;
        }

        return isValid;
    };

    const calculatePasswordStrength = () => {
        // La lógica para calcular la fuerza de la contraseña puede personalizarse según tus criterios.
        // En este ejemplo, evaluaré la longitud, la presencia de mayúsculas, minúsculas, números y caracteres especiales.

        let strength = 0;

        // Longitud mínima requerida (puedes ajustar este valor según tus necesidades)
        const minLength = 8;

        if (password.length >= minLength) {
            strength += 1;
        }

        // Verificar la presencia de mayúsculas
        if (/[A-Z]/.test(password)) {
            strength += 1;
        }

        // Verificar la presencia de minúsculas
        if (/[a-z]/.test(password)) {
            strength += 1;
        }

        // Verificar la presencia de números
        if (/\d/.test(password)) {
            strength += 1;
        }

        // Verificar la presencia de caracteres especiales
        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 1;
        }

        return strength;
    };

    const getSecurityLevelMessage = () => {
        const strength = calculatePasswordStrength();

        if (strength === 0) {
            return '';
        } else if (strength <= 2) {
            return 'Nivel bajo de seguridad';
        } else if (strength <= 4) {
            return 'Nivel medio de seguridad';
        } else {
            return 'Nivel alto de seguridad';
        }
    };

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
        if (!email.trim() || !email.includes('@')) {
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

    const handlerCreatePatient = async () => {
        try {
            if (!validateFields()) {
                return;
            }

            const newInputPatient = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
            };

            await actions.createNewPatient(newInputPatient);
            navigate('/'); // Cambiar a la ruta correspondiente después del registro
        } catch (error) {
            console.error('Error al intentar enviar la información', error);
        }
    };

    return (
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
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                />
                {clickedFirstName && <p className='errorMsg'>* El nombre es obligatorio *</p>}
            </div>

            <div className="mb-3">
                <input
                    onChange={(e) => setLastName(e.target.value)}
                    onClick={handlerClickLastName}
                    onBlur={handlerBlurLastName}
                    type="text"
                    className="form-control"
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
                    placeholder="Correo electrónico"
                />
                {clickedEmail && <p className='errorMsg'>* El correo electrónico es obligatorio y debe contener '@' *</p>}
            </div>

            <input
                onChange={(e) => setPassword(e.target.value)}
                onClick={handlerClickPassword}
                onBlur={handlerBlurPassword}
                type="password"
                className="form-control"
                placeholder='Contraseña'
            />
            {clickedPassword && <p className='errorMsg'>* La contraseña es obligatoria *</p>}
            
            {/* Mostrar nivel de seguridad */}
            {password && <div className='passwordStrength'>{getSecurityLevelMessage()}</div>}
            <br />

            <div className='createNewBtn'>
                <button onClick={handlerCreatePatient} type="button" className="btn btn-success saveBtn">Crear</button>
                <Link to={'/signup'}>
                    <button type="button" className="btn btn-outline-primary exitBtn">Salir</button>
                </Link>
            </div>
        </div>
    );
};

export default NewPatient;
