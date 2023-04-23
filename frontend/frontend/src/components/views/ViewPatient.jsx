import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import PatientService from '../../services/PatientService'
import DiseaseService from '../../services/DiseaseService'
import BasicSnackBar from '../common/BasicSnackBar'

// Componente que permite enseñar un paciente 

const ViewPatient = () => {
    const params = useParams();
    const history = useHistory();
    const idDoctor = localStorage.getItem('token');
    const location = useLocation();

    // Aqui se empiezan a definir las variables de estado
    const [idP] = useState(params.idPatient);
    const [patient, setPatient] = useState({})
    const [diseases, setDiseases] = useState([])
    const [open, setOpen] = useState(false);
    const { idPatient, firstName, lastName, email, birthday, patientPicture } = patient;

    //Manejador de la función que permite añadir una enfermedad a un paciente
    const handleAddDiseaseToPatient = () => addDiseaseToPatient()

    const addDiseaseToPatient = () => {
        history.push(`/add-disease-to-patient/${idP}`);
    }

    //Función que permite borrar la enfermedad de un paciente
    const deleteDisease = (idDP) => {
        PatientService.deleteDiseaseOfPatient(idP, idDP).then(() => {
            const filteredDiseases = diseases.filter(disease => disease.id !== idDP);
            setDiseases(filteredDiseases);
        });
        history.push(`/view-patient/${idDoctor}/${idP}`);
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

    // Mensaje de confirmación a la hora de borrar una enfermedad del paciente
    const handleDelete = (idDP) => {
        const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este paciente?');
        if (confirmed) {
            deleteDisease(idDP);
        }
    };

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push(`/list-patients/${idDoctor}`);
        }
        PatientService.getPatientById(idDoctor, idP).then((res) => {
            setPatient(res.data);
        })
        //Busco los sintomas de la enfermedad con idD
        DiseaseService.getDiseasesOfPatient(idP).then((res) => {
            setDiseases(res.data);
        });
        if (location.search === '?true') {
            handleClick();
        }
    }, [location, history, idDoctor, idP]);


    //Manejador de la función que nos lleva a la lista de registros de un paciente
    const handleListRecord = () => listRecords()

    const listRecords = () => {
        history.push(`/list-records/${idDoctor}/${idP}`);
    }

    // Renderiza la vista de un paciente
    return (
        <div>
            <br></br>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center"> Detalles del paciente</h3>
                <div className="card-body">
                    <div class="image-with-text">
                        <img class="view-user-picture" src={patientPicture} alt="patient-pic" />
                        <div class="text">
                            <label> DNI: {idPatient}</label>
                            <br></br>
                            <label> Nombre: {firstName} {lastName}</label>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <label> Email: {email}</label>
                    </div>
                    <div className="row">
                        <label> Fecha de nacimiento: {birthday}</label>
                    </div>
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Enfermedades</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    diseases.map(
                                        disease =>
                                            <tr key={disease.idDP}>
                                                <td>{disease.diseaseName}</td>
                                                <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(disease.idDisease)} className="btn btn-danger">Borrar</button>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <button className="btn btn-primary" onClick={handleAddDiseaseToPatient}> Añadir enfermedad</button>
                        <button className="btn btn-primary see-records-button" onClick={handleListRecord}> Ver historial clínico</button>
                    </div>
                </div>
            </div>
            <BasicSnackBar
                open={open}
                onClose={handleClose}
                severity="success"
                message="Enfermedad añadida correctamente al paciente"
            />
        </div>
    )
}

export default React.memo(ViewPatient);