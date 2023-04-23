import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import UserService from '../../services/UserService';

// Componente que permite actualizar los datos sobre un usuario
const UpdateUser = () => {
    const params = useParams();
    const history = useHistory();

    // Aqui se empiezan a definir las variables de estado
    const [id] = useState(params.id);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [workplace, setWorkplace] = useState('');
    let isWrong = false;

    // Aqui se empiezan a definir las funciones del componente
    //Función para actualizar un usuario
    const UpdateUser = (event) => {
        event.preventDefault();
        let user = { firstName: firstName, lastName: lastName, email: email, city: city, specialty: specialty, workplace: workplace };
        checkFormValues(user);

        if (!isWrong) {
            UserService.updateUser(user, id).then(() => {
                history.push({
                    pathname: `/view-user/${id}`,
                    search: 'true'
                });
            });
        }
    }

    // Comprueba que los valores sean validos
    const checkFormValues = (user) => {
        if (user.firstName === '') {
            alert('El nombre no puede estar vacío');
            isWrong = true;
        }
        else if (!isNaN(user.firstName)) {
            alert('El nombre no puede ser un número');
            isWrong = true;
        }
        else if (user.lastName === '') {
            alert('El apellido no puede estar vacío');
            isWrong = true;
        }
        else if (!isNaN(user.lastName)) {
            alert('El apellido no puede ser un número');
            isWrong = true;
        }
        else if (user.email === '') {
            alert('El email no puede estar vacío');
            isWrong = true;
        }
        else if (user.specialty === '') {
            alert('El usuario debe tener una especialidad');
            isWrong = true;
        }
        else if (!isNaN(user.specialty)) {
            alert('La especialidad no puede ser un número');
            isWrong = true;
        }
        else if (user.city === '') {
            alert('El usuario debe tener asignada una ciudad');
            isWrong = true;
        }
        else if (!isNaN(user.city)) {
            alert('La ciudad no puede ser un número');
            isWrong = true;
        }
        else if (user.workplace === '') {
            alert('El usuario debe tener asignada un lugar de trabajo');
            isWrong = true;
        }
        else if (!isNaN(user.workplace)) {
            alert('El lugar de trabajo no puede ser un número');
            isWrong = true;
        }
    }

    // Maneja el cambio de nombre del usuario en el formulario
    const changeFirstNameHandler = (event) => {
        setFirstName(event.target.value);
    }

    // Maneja el cambio de los apellidos del usuario en el formulario
    const changeLastNameHandler = (event) => {
        setLastName(event.target.value);
    }

    // Maneja el cambio del email del usuario en el formulario
    const changeEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    // Maneja el cambio de la ciudad de trabajo del usuario en el formulario
    const changeCityHandler = (event) => {
        setCity(event.target.value);
    }

    // Maneja el cambio de la especialidad del usuario en el formulario
    const changeSpecialtyHandler = (event) => {
        setSpecialty(event.target.value);
    }

    // Maneja el cambio del lugar de trabajo del usuario en el formulario
    const changeWorkplaceHandler = (event) => {
        setWorkplace(event.target.value);
    }

    // Maneja la cancelación del formulario
    const cancelForm = () => cancel()

    const cancel = () => {
        history.push(`/view-user/${id}`);
    }

    const handleUpdate = (event) => {
        const confirmed = window.confirm('¿Estás seguro de que deseas realizar estos cambios?');
        if (confirmed) {
            UpdateUser(event);
        }
    };


    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push(`/view-user/${id}`);
        }
    });

    // Renderiza el formulario para editar los datos de un usuario
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Modificar Usuario</h3>
                        <div className="card-body">
                            <form onSubmit={(event) => handleUpdate(event)}>
                                <div className="form-group">
                                    <label>Nombre: </label>
                                    <input placeholder="Nombre" name="firstName" className="form-control" value={firstName} onChange={(event) => changeFirstNameHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label> Apellidos: </label>
                                    <input placeholder="Apellidos" name="lastName" className="form-control" value={lastName} onChange={(event) => changeLastNameHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label> Email: </label>
                                    <input placeholder="Email" name="email" className="form-control" value={email} onChange={(event) => changeEmailHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label> Ciudad: </label>
                                    <input placeholder="Ciudad" name="city" className="form-control" value={city} onChange={(event) => changeCityHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label> Especialidad: </label>
                                    <input placeholder="Especialidad" name="specialty" className="form-control" value={specialty} onChange={(event) => changeSpecialtyHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label> Lugar de trabajo: </label>
                                    <input placeholder="Lugar de trabajo" name="workplace" className="form-control" value={workplace} onChange={(event) => changeWorkplaceHandler(event)} />
                                </div>
                                <button type="submit" className="btn btn-success">Confirmar</button>
                                <button type="button" className="btn btn-danger" onClick={cancelForm} style={{ marginLeft: "10px" }}>Cancelar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default React.memo(UpdateUser);