import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SymptomService from '../../services/SymptomService'
import BasicSnackBar from '../common/BasicSnackBar';

// Componente que permite enseñar la lista de síntomas registrados en el sistema

const ListSymptom = () => {
    const history = useHistory();
    const idDoctor = localStorage.getItem('token');
    const location = useLocation();

    // Aqui se empiezan a definir las variables de estado
    const [symptoms, setSymptoms] = useState([]);
    const [open, setOpen] = useState(false);

    // Aqui se empiezan a definir las funciones del componente

    //Función para eliminar un síntoma
    const deleteSymptom = (idSymptom) => {
        SymptomService.deleteSymptom(idSymptom).then(() => {
            const filteredSymptoms = symptoms.filter(symptom => symptom.id !== idSymptom);
            setSymptoms(filteredSymptoms);
        });
        history.push('/list-symptoms/');
    }

    //Función para ver un síntoma
    const viewSymptom = (idSymptom) => {
        history.push(`/view-symptom/${idSymptom}`);
    }

    const handleAddSymptom = () => addSymptom()

    //Función para añadir un síntoma
    const addSymptom = () => {
        history.push('/add-symptom');
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

    // Mensaje de confirmación a la hora de borrar un síntoma del sistema
    const handleDelete = (idS) => {
        const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este síntoma?');
        if (confirmed) {
            deleteSymptom(idS);
        }
    };

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push(`/admin-view/${idDoctor}`);
        }
        SymptomService.getSymptoms().then((res) => {
            setSymptoms(res.data);
        });
        if (location.search === '?true') {
            handleClick();
        }
    }, [location, history, idDoctor]);

    // Renderiza una lista de síntomas y algunos elementos UI para añadir, editar y ver un registro
    return (
        <div>
            <h2 className="text-center">Lista de Síntomas</h2>
            <div className="row">
                <button className="btn btn-primary" onClick={handleAddSymptom}> Añadir Síntomas</button>
            </div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            symptoms.map(
                                symptom =>
                                    <tr key={symptom.idSymptom}>
                                        <td>{symptom.symptomName}</td>
                                        <td>
                                            <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(symptom.idSymptom)} className="btn btn-danger">Borrar</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => viewSymptom(symptom.idSymptom)} className="btn btn-info">Información</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
                <BasicSnackBar
                    open={open}
                    onClose={handleClose}
                    severity="success"
                    message="Síntoma añadido correctamente"
                />
            </div>
        </div>
    )
}

export default React.memo(ListSymptom);