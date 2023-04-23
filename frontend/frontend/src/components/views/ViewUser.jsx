import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import UserService from '../../services/UserService'
import BasicSnackBar from '../common/BasicSnackBar';

// Componente que permite enseñar un usuario 

const ViewUser = () => {
    const params = useParams();
    const history = useHistory();
    const location = useLocation();

    // Aqui se empiezan a definir las variables de estado
    const [id, setId] = useState(params.id);
    const [user, setUser] = useState({})
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const { firstName, lastName, email, city, workplace, specialty, userPicture } = user;

    //Manejador de la función que permite editar la información de un usuario
    const handleUpdateUser = () => updateUser()

    const updateUser = () => {
        history.push(`/update-user/${id}`);
    }

    //Manejador de la función que permite editar la contraseña de un usuario
    const handleUpdatePassword = () => updatePassword()

    const updatePassword = () => {
        history.push(`/update-password/${id}`);
    }

    //Manejador de la función que permite borrar un usuario
    const handleDeleteAlert = () => handleDelete()

    const handleDelete = () => {
        const confirmed = window.confirm('¿Estás seguro de que borrar esta cuenta del sistema?');
        if (confirmed) {
            deleteUser();
        }
    };

    const deleteUser = () => {
        UserService.deleteUser(id).then(() => { });
        localStorage.removeItem('token'); //Cuando se borre cerramos sesión
        setId('')
        history.push('/');
    }

    const newMessage = () => {
        setMessage("Usuario actualizado correctamente")
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

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push(`/list-patients/${id}`);
        }
        UserService.getUserById(id).then((res) => {
            setUser(res.data);
        })
        if (location.search === '?true') {
            UserService.getLastUser().then((res) => {
                setUser(res.data);
                console.log(res.data);
                newMessage();
                handleClick();
            })
        }
    }, [history, id, location]);


    // Renderiza la vista de un usuario
    return (
        <div>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center"> Detalles del usuario</h3>
                <div className="card-body">
                    <div class="image-with-text">
                        <img class="view-user-picture" src={userPicture} alt="User pic" />
                        <div class="text">
                            <label> Nº colegiado: {id}</label>
                            <br></br>
                            <label> Nombre: {firstName} {lastName}</label>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <label> Email: {email}</label>
                    </div>
                    <div className="row">
                        <label> Ciudad: {city}</label>
                    </div>
                    <div className="row">
                        <label> Lugar de trabajo: {workplace}</label>
                    </div>
                    <div className="row">
                        <label> Especialidad: {specialty}</label>
                    </div>
                </div>
                <div className="row">
                    <button className="btn btn-primary view-profile-space" onClick={handleUpdateUser}>Modificar datos</button>
                    <button className="btn btn-primary view-profile-space" onClick={handleUpdatePassword}>Cambiar contraseña</button>
                    <button className="btn btn-danger view-profile-space" onClick={handleDeleteAlert}>Eliminar usuario</button>
                </div>
            </div>
            <BasicSnackBar
                open={open}
                onClose={handleClose}
                severity="success"
                message={message}
            />
        </div>
    )
}

export default React.memo(ViewUser);