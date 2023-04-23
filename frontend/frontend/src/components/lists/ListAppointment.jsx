import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import AppointmentService from '../../services/AppointmentService'
import BasicSnackBar from '../common/BasicSnackBar';

// Componente que permite enseñar la lista de citas que tiene un doctor

const ListAppointment = () => {
    const history = useHistory();
    const params = useParams();
    const idDoctor = localStorage.getItem('token');
    const location = useLocation();

    // Aqui se empiezan a definir las variables de estado
    const [appointments, setAppointments] = useState([]);
    const [open, setOpen] = useState(false);
    const [order, setOrder] = React.useState(useState(params.order));


    // Aqui se empiezan a definir las funciones del componente

    //Función para eliminar una cita. 
    const deleteAppointment = (idAppointment) => {
        AppointmentService.deleteAppointment(idAppointment).then(() => {
            //Filtrar las citas para actualizar el estado.
            const filteredAppointments = appointments.filter(appointment => appointment.id !== idAppointment);
            setAppointments(filteredAppointments);
        });
        history.push(`/list-appointments/${idDoctor}/id(increasing)`);
    }

    //Función para ver una cita
    const viewAppointment = (idAppointment) => {
        history.push(`/view-appointment/${idDoctor}/${idAppointment}`);
    }

    const handleAddAppointment = () => addAppointment()

    //Función para añadir una cita.
    const addAppointment = () => {
        history.push('/add-appointment');
    }

    //Función para manejar el cambio de orden.
    const handleChange = (event) => {
        setOrder(event.target.value);
        history.push(`/list-appointments/${idDoctor}/${event.target.value}`);
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    // Mensaje de confirmación a la hora de borrar una cita del sistema
    const handleDelete = (idA) => {
        const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta cita?');
        if (confirmed) {
            deleteAppointment(idA);
        }
    };

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push(`/list-patients/${idDoctor}`);
        }
        AppointmentService.getAppointmentsOfDoctor(idDoctor, order[0]).then((res) => {
            setAppointments(res.data);
        });
        if (location.search === '?true') {
            handleClick();
        }
    }, [location, history, idDoctor, order]);

 
    // Renderiza una lista de citas y algunos elementos UI para añadir, editar y ver una cita y seleccionar su orden de aparición
    return (
        <div>
            <h2 className="text-center">Lista de Citas</h2>
            <div className="row">
                <button className="btn btn-primary" style={{ marginRight: "57.4rem" }} onClick={handleAddAppointment}> Añadir cita</button>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Ordenar por</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={order}
                            label="Ordenar por"
                            onChange={handleChange}>
                            <MenuItem value={"id(increasing)"}>DNI Paciente (Más bajo primeros)</MenuItem>
                            <MenuItem value={"id(decreasing)"}>DNI Paciente (Más alto primeros)</MenuItem>
                            <MenuItem value={"date(increasing)"}>Fecha (Más tarde primeras)</MenuItem>
                            <MenuItem value={"date(decreasing)"}>Fecha (Más reciente primeras)</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Paciente</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map(
                                appointment =>
                                    <tr key={appointment.idAppointment}>
                                        <td>{appointment.idPatient}</td>
                                        <td>{appointment.dateAppointment}</td>
                                        <td>
                                            <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(appointment.idAppointment)} className="btn btn-danger">Borrar</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => viewAppointment(appointment.idAppointment)} className="btn btn-info">Ver cita</button>
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
                    message="Cita añadida correctamente"
                />
            </div>
        </div>
    )
}

export default React.memo(ListAppointment);