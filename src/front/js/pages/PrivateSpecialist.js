import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom';
import Product from '../component/Product.jsx';

const PrivateSpecialist = () => {
    const { actions } = useContext(Context)
    const navigate = useNavigate();


    const checkAccess = async () => {
        await actions.accessConfirmationSpecialist();
        const token = sessionStorage.getItem('tokenSpecialist');

        if (!token) {
            alert("You do not have access to this page, please log in or create an account");
            navigate('/');
        }
    };

    checkAccess();



    const token = sessionStorage.getItem('tokenSpecialist');

    return (
        <div>
            {token ? (<h1>Hola mundo</h1>) : (<h1>No tienes acceso</h1>)}
            <Product/>
        </div>
    )
}

export default PrivateSpecialist