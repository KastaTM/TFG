import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import MedicineService from '../../services/MedicineService'
import BasicSnackBar from '../common/BasicSnackBar'

// Componente que permite enseñar un medicamento 

const ViewMedicine = () => {
    const history = useHistory();
    const params = useParams();
    const location = useLocation();

    // Aqui se empiezan a definir las variables de estado
    const [idM] = useState(params.id);
    const [medicine, setMedicine] = useState({})
    const [symptoms, setSymptoms] = useState([])
    const [diseases, setDiseases] = useState([])
    const [open, setOpen] = useState(false);
    const { medicineName, medicineDescription, medicinePicture } = medicine;

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
            history.push('/list-medicines/');
        }
        MedicineService.getMedicineById(idM).then((res) => {
            setMedicine(res.data);
        });
        //Busco los sintomas del medicamento con idM
        MedicineService.getSymptomsOfMedicine(idM).then((res) => {
            setSymptoms(res.data);
        });
        //Busco las enfermedades del medicamento con idM
        MedicineService.getDiseasesOfMedicine(idM).then((res) => {
            setDiseases(res.data);
        });
        if (location.search === '?true') {
            handleClick();
        }
    }, [location, history, idM]);


    // Renderiza la vista de un medicamento
    return (
        <div>
            <br></br>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center"> Información del medicamento</h3>
                <div className="card-body">
                    <div class="image-with-text">
                        <img class="view-user-picture" src={medicinePicture} alt="medicine-pic" />
                        <div class="text">
                        <label> Nombre: {medicineName}</label>
                        </div>
                    </div>
                    <div className="row">
                        <label> Descripción: {medicineDescription}</label>
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
            </div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Enfermedades con las que no se puede recetar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            diseases.map(
                                disease =>
                                    <tr key={disease.idDP}>
                                        <td>{disease.diseaseName}</td>
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
                message="Información añadida correctamente al medicamento"
            />
        </div>
    )
}

export default React.memo(ViewMedicine);