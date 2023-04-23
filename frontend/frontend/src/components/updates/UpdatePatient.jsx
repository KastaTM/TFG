import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PatientService from '../../services/PatientService';

// Componente que permite actualizar los datos sobre un paciente

const UpdatePatient = () => {
    const params = useParams();
    const history = useHistory();
    const idDoctor = localStorage.getItem('token');


    // // Aqui se empiezan a definir las variables de estado
    const [id] = useState(params.id);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');


    // Aqui se empiezan a definir las funciones del componente

    //Función para actualizar un paciente 
    const updatePatient = (event) => {
        event.preventDefault();
        let patient = { idPatient: id, idDoctor: idDoctor, firstName: firstName, lastName: lastName, email: email, birthday: birthday };
        checkFormValues(patient);

        PatientService.updatePatient(id, patient).then(() => {
            history.push(`/list-patients/${idDoctor}`);
        });
    }

    // Comprueba que los valores sean validos
    const checkFormValues = (patient) => {
        if (patient.idPatient === '') {
            alert('Por favor, rellene todos los campos');
            history.push(`/update-patient/${id}`);
        }
        else if (isNaN(patient.idPatient)) {
            alert('El DNI debe ser un número');
            history.push(`/update-patient/${id}`);
        }
        else if (patient.firstName === '') {
            alert('El nombre no puede estar vacío');
            history.push(`/update-patient/${id}`);
        }
        else if (!isNaN(patient.firstName)) {
            alert('El nombre no puede ser un número');
            history.push(`/update-patient/${id}`);
        }
        else if (patient.lastName === '') {
            alert('El apellido no puede estar vacío');
            history.push(`/update-patient/${id}`);
        }
        else if (!isNaN(patient.lastName)) {
            alert('El apellido no puede ser un número');
            history.push(`/update-patient/${id}`);
        }
        else if (patient.email === '') {
            alert('El email no puede estar vacío');
            history.push(`/update-patient/${id}`);
        }
        else if (patient.birthday === '') {
            alert('La fecha de nacimiento no puede estar vacía');
            history.push(`/update-patient/${id}`);
        }
    }

    // Maneja el cambio de nombre del paciente en el formulario
    const changeFirstNameHandler = (event) => {
        setFirstName(event.target.value);
    }

    // Maneja el cambio de apellido del paciente en el formulario
    const changeLastNameHandler = (event) => {
        setLastName(event.target.value);
    }

    // Maneja el cambio de email del paciente en el formulario
    const changeEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    // Maneja el cambio de fecha de nacimiento del paciente en el formulario
    const changeBirthdayHandler = (event) => {
        setBirthday(event.target.value);
    }

    // Maneja la cancelación del formulario
    const cancelForm = () => cancel()

    const cancel = () => {
        history.push(`/list-patients/${idDoctor}`);
    }

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push(`/list-patients/${idDoctor}`);
        }
    });

    // Renderiza un formulario para poder actualizar los datos de un paciente
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Modificar Paciente</h3>
                        <div className="card-body">
                            <form onSubmit={(event) => updatePatient(event)}>
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
                                    <label> Cumpleaños: </label>
                                    <input type="date" placeholder="Cumpleaños" name="birthday" className="form-control" value={birthday} onChange={(event) => changeBirthdayHandler(event)} />
                                </div>
                                <button type="submit" className="btn btn-success">Guardar</button>
                                <button type="button" className="btn btn-danger" onClick={cancelForm} style={{ marginLeft: "10px" }}>Cancelar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default React.memo(UpdatePatient);