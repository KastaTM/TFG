import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import DiseaseService from '../../services/DiseaseService'
import BasicSnackBar from '../common/BasicSnackBar';

// Componente que permite enseñar la lista de enfermedades registradas en el sistema

const ListDisease = () => {
    const history = useHistory();
    const idDoctor = localStorage.getItem('token');
    const location = useLocation();

    // Aqui se empiezan a definir las variables de estado
    const [diseases, setDiseases] = useState([]);
    const [open, setOpen] = useState(false);


    // Aqui se empiezan a definir las funciones del componente

    //Función para eliminar una enfermedad 
    const deleteDisease = (idDisease) => {
        DiseaseService.deleteDisease(idDisease).then(() => {
            const filteredDiseases = diseases.filter(disease => disease.id !== idDisease);
            setDiseases(filteredDiseases);
        });
        history.push('/list-diseases/');
    }

    //Función para ver una enfermedad
    const viewDisease = (idDisease) => {
        history.push(`/view-disease/${idDisease}`);
    }

    //Función para ir al formulario para editar una enfermedad
    const editDisease = (idDisease) => {
        history.push(`/update-disease/${idDisease}`);
    }

    //Función para ir al formulario para añadir a una enfermedad
    const addDisease = () => {
        history.push('/add-disease');
        handleClick();
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

    // Mensaje de confirmación a la hora de borrar una enfermedad del sistema
    const handleDelete = (idD) => {
        const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta enfermedad?');
        if (confirmed) {
            deleteDisease(idD);
        }
    };

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push(`/admin-view/${idDoctor}`);
        }
        DiseaseService.getDiseases().then((res) => {
            setDiseases(res.data);
        });
        if (location.search === '?true') {
            handleClick();
        }
    }, [location, history, idDoctor]);

    // Renderiza una lista de enfermedades y algunos elementos UI para añadir, editar y ver una enfemedad 
    return (
        <div>
            <h2 className="text-center">Lista de Enfermedades</h2>
            <div className="row">
                <button className="btn btn-primary" onClick={() => addDisease()}> Añadir Enfermedad</button>
            </div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            diseases.map(
                                disease =>
                                    <tr key={disease.idDisease}>
                                        <td>{disease.diseaseName}</td>
                                        <td>
                                            <button style={{ marginLeft: "10px" }} onClick={() => editDisease(disease.idDisease)} className="btn btn-info">Modificar</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(disease.idDisease)} className="btn btn-danger">Borrar</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => viewDisease(disease.idDisease)} className="btn btn-info">Información</button>
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
                    message="Enfermedad añadida correctamente"
                />
            </div>
        </div>
    )

}

export default React.memo(ListDisease);