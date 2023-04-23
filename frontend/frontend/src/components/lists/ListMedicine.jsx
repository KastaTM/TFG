import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import MedicineService from '../../services/MedicineService'
import BasicSnackBar from '../common/BasicSnackBar';

// Componente que permite enseñar la lista de medicamentos registrados en el sistema

const ListMedicine = () => {
    const history = useHistory();
    const idDoctor = localStorage.getItem('token');
    const location = useLocation();


    // Aqui se empiezan a definir las variables de estado
    const [medicines, setMedicines] = useState([]);
    const [open, setOpen] = useState(false);


    // Aqui se empiezan a definir las funciones del componente

    //Función para eliminar un medicamento
    const deleteMedicine = (idMedicine) => {
        MedicineService.deleteMedicine(idMedicine).then(() => {
            const filteredMedicines = medicines.filter(medicine => medicine.id !== idMedicine);
            setMedicines(filteredMedicines);
        });
        history.push('/list-medicines/');
    }

    //Función para ver un medicamento
    const viewMedicine = (idMedicine) => {
        history.push(`/view-medicine/${idMedicine}`);
    }

    //Función para ir al formulario para editar un medicamento
    const editMedicine = (idMedicine) => {
        history.push(`/update-medicine/${idMedicine}`);
    }

    //Función para ir al formulario para añadir a un medicamento
    const addMedicine = () => {
        history.push('/add-medicine');
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

    // Mensaje de confirmación a la hora de borrar un medicamento del sistema
    const handleDelete = (idM) => {
        const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este medicamento?');
        if (confirmed) {
            deleteMedicine(idM);
        }
    };

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push(`/admin-view/${idDoctor}`);
        }
        MedicineService.getMedicines().then((res) => {
            setMedicines(res.data);
        });
        if (location.search === '?true') {
            handleClick();
        }
    }, [location, history, idDoctor]);

    // Renderiza una lista de medicamentos y algunos elementos UI para añadir, editar y ver un medicamento
    return (
        <div>
            <h2 className="text-center">Lista de Medicamentos</h2>
            <div className="row">
                <button className="btn btn-primary" onClick={() => addMedicine()}> Añadir Medicamento</button>
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
                            medicines.map(
                                medicine =>
                                    <tr key={medicine.idMedicine}>
                                        <td>{medicine.medicineName}</td>
                                        <td>
                                            <button style={{ marginLeft: "10px" }} onClick={() => editMedicine(medicine.idMedicine)} className="btn btn-info">Modificar</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(medicine.idMedicine)} className="btn btn-danger">Borrar</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => viewMedicine(medicine.idMedicine)} className="btn btn-info">Información</button>
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
                    message="Medicina añadida correctamente"
                />
            </div>
        </div>
    )

}

export default React.memo(ListMedicine);