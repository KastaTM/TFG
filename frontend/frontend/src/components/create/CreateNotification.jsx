import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NotificationService from '../../services/NotificationService';
import PatientService from '../../services/PatientService';

const CreateNofication = () => {
    const history = useHistory();
    const idDoctor = localStorage.getItem('token');


    // Aqui se empiezan a definir las variables de estado
    const [idPatient, setIdPatient] = useState('');
    const [patients, setPatients] = useState([])
    const [notificationDescription, setNotificationDescription] = useState('');
    const [dateNotification, setDateNotification] = useState('');
    let isWrong = false;

    // Aqui se empiezan a definir las funciones del componente

    // Guarda la notificación
    const saveNotification = (event) => {
        event.preventDefault();
        let notification = { idDoctor: idDoctor, idPatient: idPatient, dateNotification: dateNotification, notificationDescription: notificationDescription };
        checkFormValues(notification);

        if (!isWrong) {
            NotificationService.createNotification(notification).then(() => {
                history.push(`/list-notifications/${idDoctor}/id(increasing)`);
            });
        }
    }

    // Comprueba que los valores sean validos
    const checkFormValues = (notification) => { //Comprueba que los valores sean validos
        //Comprobar si el paciente está dentro de la base de datos
        if(!patients.includes(+notification.idPatient)){
            alert('Este paciente no es de este doctor');
            isWrong = true;
        }
        if (notification.idPatient === '') {
            alert('El DNI no puede estar vacío');
            isWrong = true;
        }
        else if (isNaN(notification.idPatient)) {
            alert('El DNI debe ser un número');
            isWrong = true;
        }
        else if (notification.dateNotification === '') {
            alert('La fecha no puede estar vacía');
            isWrong = true;
        }
        else if (notification.notificationDescription === '') {
            alert('La descripción no puede estar vacía');
            isWrong = true;
        }
        else if (!isNaN(notification.notificationDescription)) {
            alert('La descripción no puede ser un número');
            isWrong = true;
        }
    }

    // Maneja el cambio de id del paciente de la notificación en el formulario
    const changeIdPatientHandler = (event) => {
        setIdPatient(event.target.value);
    }

    // Maneja el cambio de la descripción de la notificación en el formulario
    const changeDescriptionHandler = (event) => {
        setNotificationDescription(event.target.value);
    }

    // Maneja el cambio de la fecha de la notificación en el formulario
    const changeDateHandler = (event) => {
        setDateNotification(event.target.value);
    }

    // Maneja la cancelación del formulario
    const cancelForm = () => cancel()

    const cancel = () => {
        history.push(`/list-notifications/${idDoctor}/id(increasing)`);
    }

    useEffect(() => {
        window.onpopstate = () => {
            history.push(`/list-notifications/${idDoctor}/id(increasing)`);
        }
        PatientService.getIdPatientsOfDoctor(idDoctor).then((res) => {
            setPatients(res.data);
        });
    }, [history, idDoctor]);

    // Renderiza el formulario para añadir una notificación
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Añadir Notificación</h3>
                        <div className="card-body">
                            <form onSubmit={(event) => saveNotification(event)}>
                                <div className="form-group">
                                    <label>Paciente: </label>
                                    <input placeholder="Paciente" name="idPatient" className="form-control" value={idPatient} onChange={(event) => changeIdPatientHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label> Fecha: </label>
                                    <input type="date" placeholder="Fecha" name="dateNotification" className="form-control" value={dateNotification} onChange={(event) => changeDateHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label> Descripción: </label>
                                    <input placeholder="Descripción" name="notificationDescription" className="form-control" value={notificationDescription} onChange={(event) => changeDescriptionHandler(event)} />
                                </div>
                                <button type="submit" className="btn btn-success">Añadir</button>
                                <button type="button" className="btn btn-danger" onClick={cancelForm} style={{ marginLeft: "10px" }}>Cancelar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default React.memo(CreateNofication);