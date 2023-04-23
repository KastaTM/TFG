import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PatientService from '../../services/PatientService'
import SearchPatient from '../SearchPatient';
import BasicSnackBar from '../common/BasicSnackBar';

// Componente que permite enseñar la lista de pacientes que tiene un doctor

const ListPatient = () => {
    const history = useHistory();
    const idDoctor = localStorage.getItem('token');
    const location = useLocation();

    // Aqui se empiezan a definir las variables de estado
    const [patients, setPatients] = useState([]);
    const [open, setOpen] = useState(false);


    // Aqui se empiezan a definir las funciones del componente

    //Función para eliminar un paciente
    const deletePatient = (idPatient) => {
        PatientService.deletePatient(idPatient).then(() => {
            const filteredPatients = patients.filter(patient => patient.id !== idPatient);
            setPatients(filteredPatients);
        });
        history.push(`/list-patients/${idDoctor}`);
    }

    //Función para ver un paciente
    const viewPatient = (idPatient) => {
        history.push(`/view-patient/${idDoctor}/${idPatient}`);
    }

    //Función para editar un paciente
    const editPatient = (idPatient) => {
        history.push(`/update-patient/${idPatient}`);
    }

    const handleAddPatient = () => addPatient()

    //Función para añadir un paciente
    const addPatient = () => {
        history.push('/add-patient');
    }

    const listAppointments = () => {
        history.push(`/list-appointments/${idDoctor}/id(increasing)`);
    }

    const listNotifications = () => {
        history.push(`/list-notifications/${idDoctor}/id(increasing)`);
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    // Mensaje de confirmación a la hora de borrar una notificación del sistema
    const handleDelete = (idP) => {
        const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este paciente?');
        if (confirmed) {
            deletePatient(idP);
        }
    };

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            localStorage.removeItem('token');
            history.push('/');
        }
        PatientService.getPatientsOfDoctor(idDoctor).then((res) => {
            setPatients(res.data);
        });
        //Compruebo si estoy en la url incial/si tengo parametro para indicarlo
        //Filtro 
        //if(props.mainV){

        if (location.search === '?true') {
            handleClick();
        }
    }, [location, history, idDoctor]);

    // Renderiza una lista de notificaciones y algunos elementos UI para añadir, editar y ver una cita y poder realizar una busqueda sobre estos
    return (
        <div>
            <h2 className="text-center">Lista de Pacientes</h2>
            <div className="row">
                <button className="btn btn-primary" style={{ marginRight: "9rem" }} onClick={handleAddPatient}> Añadir paciente</button>
                <button className="btn btn-primary" style={{ marginRight: "10rem" }} onClick={() => listAppointments()}> Lista citas</button>
                <button className="btn btn-primary" style={{ marginRight: "9rem" }} onClick={() => listNotifications()}> Lista notificaciones</button>
                <SearchPatient patients={patients} />
            </div>
            <div className="row">
                <table className="table table-striped table-hover table-bordered">
                    <thead class="thead-dark">
                        <tr>
                            <th>DNI</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Email</th>
                            <th>Fecha Nacimiento</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            patients.map(
                                patient =>
                                    <tr key={patient.idDoctor}>
                                        <td>{patient.idPatient}</td>
                                        <td>{patient.firstName}</td>
                                        <td>{patient.lastName}</td>
                                        <td>{patient.email}</td>
                                        <td>{patient.birthday}</td>
                                        <td>
                                            <button style={{ marginLeft: "10px" }} onClick={() => editPatient(patient.idPatient)} className="btn btn-info">Modificar</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(patient.idPatient)} className="btn btn-danger">Borrar</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => viewPatient(patient.idPatient)} className="btn btn-info">Ver perfil</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
                <BasicSnackBar
                    open={open}
                    onClose={handleClose}
                    severity="success"
                    message="Paciente añadido correctamente"
                />
            </div>
        </div>
    )
}

export default React.memo(ListPatient);