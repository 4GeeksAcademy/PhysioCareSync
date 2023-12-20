import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom';


const PrivatePatient = () => {
  const { store, actions } = useContext(Context)
  const navigate = useNavigate();


  const checkAccess = async () => {

    await actions.accessConfirmationPatient();
    const token = sessionStorage.getItem('tokenPatient');


    if (!token) {
      alert("You do not have access to this page, please log in or create an account");
      navigate('/');

    }
  };


  checkAccess();


  const token = sessionStorage.getItem('tokenPatient');
  console.log(token)


  return (
    <div>
      {token ? (<h1>Hola mundo</h1>) : (<h1>No tienes acceso</h1>)}
    </div>
  )
}

export default PrivatePatient