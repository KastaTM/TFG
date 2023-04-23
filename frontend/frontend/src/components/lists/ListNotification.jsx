import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import NotificationService from '../../services/NotificationService'
import BasicSnackBar from '../common/BasicSnackBar';

// Componente que permite enseñar la lista de notificaciones que tiene un doctor

const ListNotification = () => {
    const history = useHistory();
    const params = useParams();
    const idDoctor = localStorage.getItem('token');
    const location = useLocation();

    // Aqui se empiezan a definir las variables de estado
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const [order, setOrder] = React.useState(useState(params.order));

    // Aqui se empiezan a definir las funciones del componente

    //Función para eliminar una notificación.
    const deleteNotification = (idNotification) => {
        NotificationService.deleteNotification(idNotification).then(() => {
            const filteredNotifications = notifications.filter(notification => notification.id !== idNotification);
            setNotifications(filteredNotifications);
        });
        history.push(`/list-notifications/${idDoctor}/id(increasing)`);
    }

    //Función para ver una notificación
    const viewNotification = (idNotification) => {
        history.push(`/view-notification/${idDoctor}/${idNotification}`);
    }

    //Función para añadir una notificación
    const addNotification = () => {
        history.push('/add-notification');
    }

    //Función para manejar el cambio de orden.
    const handleChange = (event) => {
        setOrder(event.target.value);
        history.push(`/list-notifications/${idDoctor}/${event.target.value}`);
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

    // Mensaje de confirmación a la hora de borrar una notificación del sistema
    const handleDelete = (idN) => {
        const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta notificación?');
        if (confirmed) {
            deleteNotification(idN);
        }
    };

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push(`/list-patients/${idDoctor}`);
        }
        NotificationService.getNotificationsOfDoctor(idDoctor, order[0]).then((res) => {
            setNotifications(res.data);
        });
        if (location.search === '?true') {
            handleClick();
        }
    }, [location, history, idDoctor, order]);

    // Renderiza una lista de notificaciones y algunos elementos UI para añadir, editar y ver una notificación y seleccionar su orden de aparición
    return (
        <div>
            <h2 className="text-center">Lista de Notificaciones</h2>
            <div className="row">
                <button className="btn btn-primary" style={{ marginRight: "53.7rem" }} onClick={() => addNotification()}> Añadir notificación</button>
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
                            notifications.map(
                                notification =>
                                    <tr key={notification.idNotification}>
                                        <td>{notification.idPatient}</td>
                                        <td>{notification.dateNotification}</td>
                                        <td>
                                            <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(notification.idNotification)} className="btn btn-danger">Borrar</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => viewNotification(notification.idNotification)} className="btn btn-info">Ver notificación</button>
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
                    message="Notificación añadida correctamente"
                />
            </div>
        </div>
    )
}

export default React.memo(ListNotification);