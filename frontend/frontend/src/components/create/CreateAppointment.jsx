import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppointmentService from '../../services/AppointmentService';
import PatientService from '../../services/PatientService';

const CreateAppointment = () => {
    const history = useHistory();
    const idDoctor = localStorage.getItem('token');


    // Aqui se empiezan a definir las variables de estado
    const [idPatient, setIdPatient] = useState('');
    const [patients, setPatients] = useState([])
    const [appointmentDescription, setAppointmentDescription] = useState('');
    const [dateAppointment, setDateAppointment] = useState('');
    let isWrong = false;

    // Aqui se empiezan a definir las funciones del componente

    // Guarda la cita
    const saveAppointment = (event) => {
        event.preventDefault();
        let appointment = { idDoctor: idDoctor, idPatient: idPatient, dateAppointment: dateAppointment, appointmentDescription: appointmentDescription };
        checkFormValues(appointment);

        if (!isWrong) {
            AppointmentService.createAppointment(appointment).then(() => {
                history.push({
                    pathname: `/list-appointments/${idDoctor}/id(increasing)`
                });
            });
        }
    }

    const checkFormValues = (appointment) => { // Comprueba que los valores sean validos
        if (appointment.idPatient === '') {
            alert('El DNI del paciente no puede estar vacío');
            isWrong = true;
        }
        else if (!patients.includes(+appointment.idPatient)) {
            alert('Este paciente no es de este doctor');
            isWrong = true;
        }
        else if (isNaN(appointment.idPatient)) {
            alert('El DNI debe ser un número');
            isWrong = true;
        }
        else if (appointment.dateAppointment === '') {
            alert('La fecha no puede estar vacía');
            isWrong = true;
        }
        else if (appointment.appointmentDescription === '') {
            alert('La descripción no puede estar vacía');
            isWrong = true;
        }
        else if (!isNaN(appointment.appointmentDescription)) {
            alert('La descripción no puede ser un número');
            isWrong = true;
        }
    }

    // Maneja el cambio del ID del paciente en el formulario
    const changeIdPatientHandler = (event) => {
        setIdPatient(event.target.value);
    }

    // Maneja el cambio de la descripción de la cita en el formulario
    const changeDescriptionHandler = (event) => {
        setAppointmentDescription(event.target.value);
    }

    // Maneja el cambio de la fecha de la cita en
    const changeDateHandler = (event) => {
        setDateAppointment(event.target.value);
    }

    // Maneja la cancelación del formulario
    const cancelForm = () => cancel()

    const cancel = () => {
        history.push(`/list-appointments/${idDoctor}/id(increasing)`);
    }

    useEffect(() => {
        window.onpopstate = () => {
            history.push(`/list-appointments/${idDoctor}/id(increasing)`);
        }
        PatientService.getIdPatientsOfDoctor(idDoctor).then((res) => {
            setPatients(res.data);
        });
    }, [history, idDoctor]);

    // Renderiza el formulario para añadir una cita
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Añadir Cita</h3>
                        <div className="card-body">
                            <form onSubmit={(event) => saveAppointment(event)}>
                                <div className="form-group">
                                    <label>DNI Paciente: </label>
                                    <input placeholder="Paciente" name="idPatient" className="form-control" value={idPatient} onChange={(event) => changeIdPatientHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label> Fecha: </label>
                                    <input type="date" placeholder="Fecha" name="dateAppointment" className="form-control" value={dateAppointment} onChange={(event) => changeDateHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label> Descripción: </label>
                                    <input placeholder="Descripción" name="appointmentDescription" className="form-control" value={appointmentDescription} onChange={(event) => changeDescriptionHandler(event)} />
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

export default React.memo(CreateAppointment);