import React, { useEffect, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import RecordService from '../../services/RecordService'
import SearchRecord from '../SearchRecord';
import BasicSnackBar from '../common/BasicSnackBar';

// Componente que permite enseñar la lista de registros correspondientes a un paciente

const ListRecord = () => {
    const params = useParams();
    const history = useHistory();
    const idDoctor = localStorage.getItem('token');
    const location = useLocation();

    // Aqui se empiezan a definir las variables de estado
    const [idP] = useState(params.idPatient);
    const [records, setRecords] = useState([]);
    const [open, setOpen] = useState(false);


    // Aqui se empiezan a definir las funciones del componente

    //Función para eliminar un registro
    const deleteRecord = (idRecord) => {
        RecordService.deleteRecord(idRecord).then(() => {
            const filteredRecords = records.filter(record => record.id !== idRecord);
            setRecords(filteredRecords);
        });
        history.push(`/list-records/${idDoctor}/${idP}`);
    }

    //Función para ver un registro
    const viewRecord = (idRecord) => {
        history.push(`/view-record/${idDoctor}/${idP}/${idRecord}`);
    }

    //Función para editar un registro
    const editRecord = (idRecord) => {
        history.push(`/update-record/${idP}/${idRecord}`);
    }

    const handleAddRecord = () => addRecord()

    //Función para añadir un registro
    const addRecord = () => {
        history.push(`/add-record/${idP}`);
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

    // Mensaje de confirmación a la hora de borrar un registro del sistema
    const handleDelete = (idR) => {
        const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este registro?');
        if (confirmed) {
            deleteRecord(idR);
        }
    };

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push(`/view-patient/${idDoctor}/${idP}`);
        }
        RecordService.getRecordsOfPatient(idP).then((res) => {
            setRecords(res.data);
        });
        if (location.search === '?true') {
            handleClick();
        }
    }, [location, history, idDoctor, idP]);

    // Renderiza una lista de registros de un paciente y algunos elementos UI para añadir, editar y ver un registro
    return (
        <div>
            <h2 className="text-center">Lista de Registros</h2>
            <div className="row">
                <button className="btn btn-primary add-record-button" onClick={handleAddRecord}> Añadir registro</button>
                <SearchRecord records={records} />
            </div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            records.map(
                                record =>
                                    <tr key={record.idDoctor}>
                                        <td>{record.dateRecord}</td>
                                        <td>
                                            <button style={{ marginLeft: "10px" }} onClick={() => editRecord(record.idRecord)} className="btn btn-info">Modificar</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => handleDelete(record.idRecord)} className="btn btn-danger">Borrar</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => viewRecord(record.idRecord)} className="btn btn-info">Ver registro</button>
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
                    message="Registro añadido correctamente"
                />
            </div>
        </div>
    )
}

export default React.memo(ListRecord);