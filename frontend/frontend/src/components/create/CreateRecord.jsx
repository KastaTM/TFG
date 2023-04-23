import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RecordService from '../../services/RecordService';

const CreateRecord = () => {
    const params = useParams();
    const history = useHistory();
    const idDoctor = localStorage.getItem('token');


    // Aqui se empiezan a definir las variables de estado
    const [idP] = useState(params.idPatient);
    const [dateRecord, setDateRecord] = useState('');


    // Aqui se empiezan a definir las funciones del componente

    // Guarda el registro
    const saveRecord = (event) => {
        event.preventDefault();
        let record = { dateRecord: dateRecord, idPatient: idP };
        checkFormValues(record);
        RecordService.createRecord(record).then(() => {
            history.push({
                pathname: `/list-records/${idDoctor}/${idP}`,
                search: 'true'
            });
        });
    }

    // Comprueba que los valores sean validos
    const checkFormValues = (record) => {
        if (record.dateRecord === '') {
            alert('La fecha no puede estar vacía');
            history.push(`/add-record/add/${idP}`);
        }

    }

    // Maneja el cambio de la fecha del registro en el formulario
    const changeDateHandler = (event) => {
        setDateRecord(event.target.value);
    }

    // Maneja la cancelación del formulario
    const cancelForm = () => cancel()

    const cancel = () => {
        history.push(`/list-records/${idDoctor}/${idP}`);
    }

    useEffect(() => {
        window.onpopstate = () => {
            history.push(`/list-records/${idDoctor}/${idP}`);
        }
    }, [history, idDoctor, idP]);

    // Renderiza el formulario para añadir un registro
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Añadir Registro</h3>
                        <div className="card-body">
                            <form onSubmit={(event) => saveRecord(event)}>
                                <div className="form-group">
                                    <label> Fecha: </label>
                                    <input type="date" placeholder="Fecha" name="dateRecord" className="form-control" value={dateRecord} onChange={(event) => changeDateHandler(event)} />
                                </div>
                                <button type="submit" className="btn btn-success">Añadir</button>
                                <button type="button" className="btn btn-danger" onClick={cancelForm} style={{ marginLeft: "10px" }}>Cancelar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default React.memo(CreateRecord);