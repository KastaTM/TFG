import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import AppointmentService from '../../services/AppointmentService';
import PatientService from '../../services/PatientService';

// Componente que permite enseñar una cita 

const ViewAppointment = () => {
    const params = useParams();
    const history = useHistory();
    const idDoctor = localStorage.getItem('token');
    

    // Aqui se empiezan a definir las variables de estado
    const [idA] = useState(params.idAppointment);
    const [appointment, setAppointment] = useState({})
    const [patient, setPatient] = useState({})
    const { idPatient, dateAppointment, appointmentDescription } = appointment;
    const { firstName, lastName } = patient;

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push(`/list-appointments/${idDoctor}/id(increasing)`);
        }
        AppointmentService.getAppointmentById(idA).then((res) => {
            setAppointment(res.data);
            PatientService.getPatientById(idDoctor, res.data.idPatient).then((res) => {
                setPatient(res.data);
            })
        })
    },[history, idA, idDoctor]);

    // Renderiza la vista de una cita
    return (
        <div>
            <br></br>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center"> Detalles de la cita</h3>
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
                        <label> Fecha: {dateAppointment}</label>
                    </div>
                    <div className="row">
                        <label> Descripción: {appointmentDescription}</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ViewAppointment);