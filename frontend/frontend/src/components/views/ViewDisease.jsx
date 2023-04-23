import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import DiseaseService from '../../services/DiseaseService'
import BasicSnackBar from '../common/BasicSnackBar'

// Componente que permite enseñar una enfermedad 

const ViewDisease = () => {
    const history = useHistory();
    const params = useParams();
    const location = useLocation();

    // Aqui se empiezan a definir las variables de estado
    const [idD] = useState(params.id);
    const [disease, setDisease] = useState({})
    const [symptoms, setSymptoms] = useState([])
    const [open, setOpen] = useState(false);
    const { diseaseName, diseaseDescription } = disease;

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
            history.push('/list-diseases/');
        }
        DiseaseService.getDiseaseById(idD).then((res) => {
            setDisease(res.data);
        });
        //Busco los sintomas de la enfermedad con idD
        DiseaseService.getSymptomsOfDisease(idD).then((res) => {
            setSymptoms(res.data);
        });
        if (location.search === '?true') {
            handleClick();
        }
    }, [location, history, idD]);

    // Renderiza la vista de una enfermedad
    return (
        <div>
            <br></br>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center"> Información de la enfermedad</h3>
                <div className="card-body">
                    <div className="row">
                        <label> Nombre: {diseaseName}</label>
                    </div>
                    <div className="row">
                        <label> Descripción: {diseaseDescription}</label>
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
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <BasicSnackBar
                    open={open}
                    onClose={handleClose}
                    severity="success"
                    message="Síntoma añadido correctamente a la enfermedad"
                />
            </div>
        </div>
    )
}

export default React.memo(ViewDisease);