import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import RecordService from '../../services/RecordService'
import MedicineService from '../../services/MedicineService'
import DiseaseService from '../../services/DiseaseService'
import BasicSnackBar from '../common/BasicSnackBar'

// Componente que permite enseñar un registro

const ViewRecord = () => {
    const params = useParams();
    const history = useHistory();
    const location = useLocation();
    const idDoctor = localStorage.getItem('token');

    // Aqui se empiezan a definir las variables de estado
    const [idP] = useState(params.idPatient);
    const [idR] = useState(params.idRecord);
    const [record, setRecord] = useState({})
    const [symptoms, setSymptoms] = useState([])
    const [medicines, setMedicines] = useState([])
    const [diseases, setDiseases] = useState([])
    const [open, setOpen] = useState(false);

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
            history.push(`/list-records/${idDoctor}/${idP}`);
        }
        RecordService.getRecordById(idP, idR).then((res) => {
            setRecord(res.data);
        })
        //Busco los sintomas del registro con idD
        RecordService.getSymptomsOfRecord(idR).then((res) => {
            setSymptoms(res.data);
            //Aquí hago la recomendación con los síntomas que he obtenido arriba
            MedicineService.getRecommendationForSymptoms(idR).then((res) => {
                setMedicines(res.data);
            });
            DiseaseService.getRecommendationForSymptoms(idR).then((res) => {
                setDiseases(res.data);
            });
        });
        if (location.search === '?true') {
            handleClick();
        }
    }, [location, history, idDoctor, idP, idR]);


    // Renderiza la vista de un registro
    return (
        <div>
            <br></br>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center"> Detalles del registro</h3>
                <div className="card-body">
                    <div className="row">
                        <label> Fecha: {record.dateRecord}</label>
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
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Posibles enfermedades</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    diseases.map(
                                        disease =>
                                            <tr key={disease.idDisease}>
                                                <td>{disease.diseaseName}</td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Recomendaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    medicines.map(
                                        medicine =>
                                            <tr key={medicine.idMedicine}>
                                                <td>{medicine.medicineName}</td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <BasicSnackBar
                        open={open}
                        onClose={handleClose}
                        severity="success"
                        message="Síntoma añadido correctamente al registro"
                    />
                </div>
            </div>
        </div>
    )
}

export default React.memo(ViewRecord);