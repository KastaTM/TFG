import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import MedicineService from '../../services/MedicineService';

// Componente que permite actualizas los datos sobre un medicamento

const UpdateMedicine = () => {
    const params = useParams();
    const history = useHistory();


    // Aqui se empiezan a definir las variables de estado
    const [id] = useState(params.id);
    const [medicineName, setMedicineName] = useState('');
    const [medicineDescription, setMedicineDescription] = useState('');
    const [symptoms, setSymptoms] = useState([])
    const [diseases, setDiseases] = useState([])


    // Aqui se empiezan a definir las funciones del componente

    //Función para actualizar un medicamento
    const updateMedicine = (event) => {
        event.preventDefault();
        let medicine = { idMedicine: id, medicineName: medicineName, medicineDescription: medicineDescription };

        MedicineService.updateMedicine(id, medicine).then(() => {
            history.push('/list-medicines/');
        });
    }

    //Manejador de una función para añadir un síntoma a un medicamento
    const handleAddSymptomToMedicine = () => addSymptomToMedicine()

    const addSymptomToMedicine = () => {
        history.push(`/add-symptom-to-medicine/${id}`);
    }

    //Manejador de una función para añadir una enfermedad a un medicamento
    const handleAddDiseaseToMedicine = () => addDiseaseToMedicine()

    const addDiseaseToMedicine = () => {
        history.push(`/add-disease-to-medicine/${id}`);
    }

    //Función para borrar un síntoma de un medicamento 
    const deleteSymptom = (idDS) => {
        MedicineService.deleteSymptomOfMedicine(id, idDS).then(() => {
            const filteredSymptoms = symptoms.filter(symptom => symptom.id !== idDS);
            setSymptoms(filteredSymptoms);
        });
        history.push(`/update-medicine/${id}`);
    }

    //Función para borrar una enfermedad de un medicamento 
    const deleteDisease = (idDM) => {
        MedicineService.deleteDiseaseOfMedicine(id, idDM).then(() => {
            const filteredDiseases = diseases.filter(disease => disease.id !== idDM);
            setDiseases(filteredDiseases);
        });
        history.push(`/update-medicine/${id}`);
    }

    // Maneja el cambio de nombre del medicamento en el formulario
    const changeNameHandler = (event) => {
        setMedicineName(event.target.value);
    }

    // Maneja el cambio de descripción del medicamento en el formulario
    const changeDescriptionHandler = (event) => {
        setMedicineDescription(event.target.value);
    }

    // Maneja la cancelación del formulario
    const cancelForm = () => cancel()

    const cancel = () => {
        history.push('/list-medicines/');
    }

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push('/list-medicines/');
        }
        MedicineService.getMedicineById(id).then((res) => {
            setMedicineName(res.data.medicineName);
            setMedicineDescription(res.data.medicineDescription);
        });
        //Busco los sintomas del medicamento con idM
        MedicineService.getSymptomsOfMedicine(id).then((res) => {
            setSymptoms(res.data);
        });
        //Busco las enfermedades del medicamento con idM
        MedicineService.getDiseasesOfMedicine(id).then((res) => {
            setDiseases(res.data);
        });
    },[history, id]);

    // Renderiza una formulario para poder actualizar los datos de un medicamento
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Modificar Medicamento</h3>
                        <div className="card-body">
                            <form onSubmit={(event) => updateMedicine(event)}>
                                <div className="form-group">
                                    <label>Nombre: </label>
                                    <input placeholder="Nombre" name="medicineName" className="form-control" value={medicineName} onChange={(event) => changeNameHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label> Descripción: </label>
                                    <input placeholder="Descripción" name="medicineDescription" className="form-control" value={medicineDescription} onChange={(event) => changeDescriptionHandler(event)} />
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
                                <button className="btn btn-primary" onClick={handleAddSymptomToMedicine}> Añadir síntomas</button>
                                <div className="row">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Enfermedades con las que no se puede recomendar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                diseases.map(
                                                    disease =>
                                                        <tr key={disease.idDP}>
                                                            <td>{disease.diseaseName}</td>
                                                            <button style={{ marginLeft: "10px" }} onClick={() => deleteDisease(disease.idDisease)} className="btn btn-danger">Borrar</button>
                                                        </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <button className="btn btn-primary" onClick={handleAddDiseaseToMedicine}> Añadir enfermedad</button>
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

export default React.memo(UpdateMedicine);