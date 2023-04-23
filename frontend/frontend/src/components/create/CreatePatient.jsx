import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PatientService from '../../services/PatientService';

const CreatePatient = () => {
    const history = useHistory();
    const idDoctor = localStorage.getItem('token');


    // Aqui se empiezan a definir las variables de estado
    const [idPatient, setIdPatient] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [patientPicture, setPatientPicture] = useState('');
    const [idList, setIdList] = useState([]);
    const [emailList, setEmailList] = useState([]);

    let isWrong = false;


    // Aqui se empiezan a definir las funciones del componente

    // Guarda el paciente
    const savePatient = (event) => {
        event.preventDefault();
        let patient = { idPatient: idPatient, idDoctor: idDoctor, firstName: firstName, lastName: lastName, email: email, birthday: birthday, patientPicture: patientPicture };
        checkFormValues(patient);

        if (!isWrong) {
            PatientService.createPatient(patient).then(() => {
                history.push({
                    pathname: `/list-patients/${idDoctor}`,
                    search: 'true'
                });
            });
        }
    }

    // Comprueba que los valores sean validos
    const checkFormValues = (patient) => {
        if(idList.includes(+patient.idPatient) || emailList.includes(patient.email)){
            alert('Este paciente ya existe');
            isWrong = true;
        }
        else if(patient.idPatient.length !== 8){
            alert('Formato invalido de DNI');
            isWrong = true;
        }
        else if (patient.idPatient === '') {
            alert('Por favor, rellene todos los campos');
            isWrong = true;
        }
        else if (isNaN(patient.idPatient)) {
            alert('El DNI debe ser un número');
            isWrong = true;
        }
        else if (patient.firstName === '') {
            alert('El nombre no puede estar vacío');
            isWrong = true;
        }
        else if (!isNaN(patient.firstName)) {
            alert('El nombre no puede ser un número');
            isWrong = true;
        }
        else if (patient.lastName === '') {
            alert('El apellido no puede estar vacío');
            isWrong = true;
        }
        else if (!isNaN(patient.lastName)) {
            alert('El apellido no puede ser un número');
            isWrong = true;
        }
        else if (patient.email === '') {
            alert('El email no puede estar vacío');
            isWrong = true;
        }
        else if (patient.birthday === '') {
            alert('La fecha de nacimiento no puede estar vacía');
            isWrong = true;
        }
        else if (patient.patientPicture === '') {
            alert('El paciente debe tener una foto');
            isWrong = true;
        }
    }

    // Maneja el cambio de id del paciente en el formulario
    const changeIdPatientHandler = (event) => {
        setIdPatient(event.target.value);
    }

    // Maneja el cambio de nombre del paciente en el formulario
    const changeFirstNameHandler = (event) => {
        setFirstName(event.target.value);
    }

    // Maneja el cambio de apellidos del paciente en el formulario
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

    // Maneja el cambio de la foto de perfil del paciente en el formulario
    const changePatientPictureHandler = (event) => {
        setPatientPicture(event.target.value);
    }

    // Maneja la cancelación del formulario
    const cancelForm = () => cancel()

    const cancel = () => {
        history.push(`/list-patients/${idDoctor}`);
    }

    useEffect(() => {
        window.onpopstate = () => {
            history.push(`/list-patients/${idDoctor}`);
        }
        PatientService.getIdPatients().then((res) => {
            setIdList(res.data);
        });
        PatientService.getEmailPatients().then((res) => {
            setEmailList(res.data);
        });
    }, [history, idDoctor]);

    // Renderiza el formulario para añadir un paciente
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h3 className="text-center">Añadir Paciente</h3>
                        <div className="card-body">
                            <form onSubmit={(event) => savePatient(event)}>
                                <div className="form-group">
                                    <label>DNI(Sin letra): </label>
                                    <input placeholder="DNI (Sin letra)" name="idPatient" className="form-control" value={idPatient} onChange={(event) => changeIdPatientHandler(event)} />
                                </div>
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
                                <div className="form-group">
                                    <label> Foto(Link): </label>
                                    <input placeholder="Foto" name="patientPicture" className="form-control" value={patientPicture} onChange={(event) => changePatientPictureHandler(event)} />
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

export default React.memo(CreatePatient);