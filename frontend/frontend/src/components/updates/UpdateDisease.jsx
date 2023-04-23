import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DiseaseService from '../../services/DiseaseService';

// Componente que permite actualizar los datos sobre una enfermedad

const UpdateDisease = () => {
    const params = useParams();
    const history = useHistory();


    // Aqui se empiezan a definir las variables de estado
    const [id] = useState(params.id);
    const [diseaseName, setDiseaseName] = useState('');
    const [symptoms, setSymptoms] = useState([])
    const [diseaseDescription, setDiseaseDescription] = useState('');


    // Aqui se empiezan a definir las funciones del componente

    //Función para actualizar una enfermedad 
    const updateDisease = (event) => {
        event.preventDefault();
        let disease = { idDisease: id, diseaseName: diseaseName, diseaseDescription: diseaseDescription };

        DiseaseService.updateDisease(id, disease).then(() => {
            history.push('/list-diseases/');
        });
    }

    //Manejador de una función para añadir un síntoma a una enfermedad
    const handleAddSymptomToDisease = () => addSymptomToDisease()

    const addSymptomToDisease = () => {
        history.push(`/add-symptom-to-disease/${id}`);
    }

    //Función para borrar un síntoma de una enfermedad 
    const deleteSymptom = (idDS) => {
        DiseaseService.deleteSymptomOfDisease(id, idDS).then(() => {
            const filteredSymptoms = symptoms.filter(symptom => symptom.id !== idDS);
            setSymptoms(filteredSymptoms);
        });
        history.push(`/update-disease/${id}`);
    }

    // Maneja el cambio de nombre de la enfermedad en el formulario
    const changeNameHandler = (event) => {
        setDiseaseName(event.target.value);
    }

    // Maneja el cambio de descripcion de la enfermedad en el formulario
    const changeDescriptionHandler = (event) => {
        setDiseaseDescription(event.target.value);
    }

    // Maneja la cancelación del formulario
    const cancelForm = () => cancel()

    const cancel = () => {
        history.push('/list-diseases/');
    }

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push('/list-diseases/');
        }
        DiseaseService.getDiseaseById(id).then((res) => {
            setDiseaseName(res.data.diseaseName);
            setDiseaseDescription(res.data.diseaseDescription);
        });
        //Busco los sintomas de la enfermedad con idD
        DiseaseService.getSymptomsOfDisease(id).then((res) => {
            setSymptoms(res.data);
        });
    },[id, history]);

    // Renderiza un formulario para poder actualizar los datos de una enfermedad
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Modificar Enfermedad</h3>
                        <div className="card-body">
                            <form onSubmit={(event) => updateDisease(event)}>
                                <div className="form-group">
                                    <label>Nombre: </label>
                                    <input placeholder="Nombre" name="diseaseName" className="form-control" value={diseaseName} onChange={(event) => changeNameHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label> Descripción: </label>
                                    <input placeholder="Descripción" name="diseaseDescription" className="form-control" value={diseaseDescription} onChange={(event) => changeDescriptionHandler(event)} />
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
                                                        <tr key={symptom.idDS}>
                                                            <td>{symptom.symptomName}</td>
                                                            <button style={{ marginLeft: "10px" }} onClick={() => deleteSymptom(symptom.idSymptom)} className="btn btn-danger">Borrar</button>
                                                        </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row">
                                    <button className="btn btn-primary" onClick={handleAddSymptomToDisease}> Añadir síntomas</button>
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

export default React.memo(UpdateDisease);