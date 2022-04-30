import React, { useEffect } from 'react';
import alertifyjs from 'alertifyjs';

console.log(alertifyjs)


function Alert({ type, msg, removeAlert, list }) {

    useEffect(() => {
        const timeOut = setTimeout(() => {
            removeAlert()
        }, 2000)
        return () => clearTimeout(timeOut)
    }, [list])

    // koristi onaj alertify


    return (
        <p className={`alert alert-${type}`}>{msg}</p>
    )
}

export default Alert 