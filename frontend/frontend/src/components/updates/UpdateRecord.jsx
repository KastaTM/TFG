import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecordService from '../../services/RecordService';

// Componente que permite actualizar los datos sobre un registro

const UpdateRecord = () => {
    const params = useParams();
    const history = useHistory();
    const idDoctor = localStorage.getItem('token');


    // Aqui se empiezan a definir las variables de estado
    const [idP] = useState(params.idPatient);
    const [idR] = useState(params.idRecord);
    const [symptoms, setSymptoms] = useState([])
    const [dateRecord, setDateRecord] = useState('');

    // Aqui se empiezan a definir las funciones del componente

    //Función para actualizar un registro
    const updateRecord = (event) => {
        event.preventDefault();
        let record = { idRecord: idR, idPatient: idP, dateRecord: dateRecord };

        RecordService.updateRecord(idR, record).then(() => {
            history.push(`/list-records/${idDoctor}/${idP}`);
        });
    }

    //Manejador de una función para añadir un síntoma a un registro
    const handleAddSymptomToRecord = () => addSymptomToRecord()

    const addSymptomToRecord = () => {
        history.push(`/add-symptom-to-record/${idP}/${idR}`);
    }

    //Función para borrar un síntoma de un registro 
    const deleteSymptom = (idDS) => {
        RecordService.deleteSymptomOfRecord(idR, idDS).then(() => {
            const filteredSymptoms = symptoms.filter(symptom => symptom.id !== idDS);
            setSymptoms(filteredSymptoms);
        });
        history.push(`/update-record/${idP}/${idR}`);
    }

    // Maneja el cambio de fecha del registro en el formulario
    const changeDateHandler = (event) => {
        setDateRecord(event.target.value);
    }

    // Maneja la cancelación del formulario
    const cancelForm = () => cancel()

    const cancel = () => {
        history.push(`/list-records/${idDoctor}/${idP}`);
    }

    const handleDelete = (idDS) => {
        const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este síntoma?');
        if (confirmed) {
            deleteSymptom(idDS);
        }
    };

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push(`/list-records/${idDoctor}/${idP}`);
        }
        //Busco los sintomas del registro con idD
        RecordService.getSymptomsOfRecord(idR).then((res) => {
            setSymptoms(res.data);
        });
        //Busco el registro con idD
        RecordService.getRecordById(idP, idR).then((res) => {
            setDateRecord(res.data.dateRecord);
        });
    }, [history, idDoctor, idR, idP]);


    // Renderiza un formulario para poder actualizar los datos de un registro
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Modificar Registro</h3>
                        <div className="card-body">
                            <form onSubmit={(event) => updateRecord(event)}>
                                <div className="form-group">
                                    <label> Fecha: </label>
                                    <input type="date" placeholder="Fecha" name="dateRecord" className="form-control" value={dateRecord} onChange={(event) => changeDateHandler(event)} />
                                </div>
                                <div className="row">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Sintomas</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                symptoms.map(
                                                    symptom =>
                                                        <tr key={symptom.idRS}>
                                                            <td>{symptom.symptomName}</td>
                                                            <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(symptom.idSymptom)} className="btn btn-danger">Borrar</button>
                                                        </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <button className="btn btn-primary" onClick={handleAddSymptomToRecord}> Añadir síntomas</button>
                                <div className="row">
                                    <button type="submit" className="btn btn-success">Guardar</button>
                                    <button type="button" className="btn btn-danger" onClick={cancelForm} style={{ marginLeft: "10px" }}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(UpdateRecord);