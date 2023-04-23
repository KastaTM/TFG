import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import NotificationService from '../../services/NotificationService'
import PatientService from '../../services/PatientService';

// Componente que permite enseñar una notificación 

const ViewNotification = () => {
    const params = useParams();
    const history = useHistory();
    const idDoctor = localStorage.getItem('token');

    // Aqui se empiezan a definir las variables de estado
    const [idN] = useState(params.idNotification);
    const [notification, setNotification] = useState({})
    const [patient, setPatient] = useState({})
    const { idPatient, dateNotification, notificationDescription } = notification;
    const { firstName, lastName } = patient;


    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push(`/list-notifications/${idDoctor}/id(increasing)`);
        }
        NotificationService.getNotificationById(idN).then((res) => {
            setNotification(res.data);
            PatientService.getPatientById(idDoctor, res.data.idPatient).then((res) => {
                setPatient(res.data);
            })
        })
    }, [history, idDoctor, idN]);


    // Renderiza la vista de una notificación
    return (
        <div>
            <br></br>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center"> Detalles de la notificación</h3>
                <div className="card-body">
                    <div className="row">
                        <label> Paciente: {idPatient}</label>
                    </div>
                    <div className="row">
                        <label> Nombre: {firstName}</label>
                    </div>
                    <div className="row">
                        <label> Apellidos: {lastName}</label>
                    </div>
                    <div className="row">
                        <label> Fecha: {dateNotification}</label>
                    </div>
                    <div className="row">
                        <label> Descripción: {notificationDescription}</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ViewNotification);