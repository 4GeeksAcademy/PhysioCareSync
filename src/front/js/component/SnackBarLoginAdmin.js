import React, { useState, forwardRef, useImperativeHandle } from 'react'
import "../../styles/SnackBarLoginAdmin.css"


const SnackBarLoginAdmin = forwardRef((props, ref) => {
    const [showSnack, setShowSnack] = useState(false);
    useImperativeHandle(ref, () => ({
        show() {
            setShowSnack(true)
            setTimeout(() => {
                setShowSnack(false)
            }, 4000)
        },
    }))

    return (
        <div className='snackbarAdmin' id={showSnack ? "show" : "hidden"} style={{ backgroundColor: props.type == "success" ? '#00F593' : "#FF0033" }}>
            <div className='symbol'>{props.type == "success" ? <h1>&#x2713;</h1> : <h1>&#x2613;</h1>}</div>
            <div className='message'>{props.message}</div>


        </div>
    )
})

export default SnackBarLoginAdmin;
