import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SymptomService from '../../services/SymptomService'

// Componente que añade un síntoma a un registro

const AddSymptomR = () => {
    const history = useHistory();
    const params = useParams();

    // Aqui se empiezan a definir las variables de estado
    const [idPatient] = useState(params.idPatient);
    const [idRecord] = useState(params.idRecord);
    const [symptoms, setSymptoms] = useState([]);

    // Aqui se empiezan a definir las funciones del componente

    // Función que añade un síntoma a un registro y redirige al usuario a la página de actualización del registro correspondiente.
    const addSymptomToRecord = (idSymptom, symptomName) => {
        let recordSymptom = { idSymptom: idSymptom, idRecord: idRecord, symptomName: symptomName };
        SymptomService.addSymptomToRecord(recordSymptom).then(() => {
        });
        history.push({
            pathname: `/update-record/${idPatient}/${idRecord}`,
            search: 'true'
        });
    }

    // Aqui empieza los useEffect
    useEffect(() => {
        // Volver a la página de actualización del registro si el usuario utiliza el botón de atrás del navegador
        window.onpopstate = () => {
            history.push(`/update-record/${idPatient}/${idRecord}`);
        }
        // Obtener los síntomas que no están asociados al registro
        SymptomService.getRestSymptomsRecord(idRecord).then((res) => {
            setSymptoms(res.data);
        });
    }, [history, idPatient, idRecord]);

    // Renderizar la lista de síntomas que no están asociados al medicamento
    return (
        <div>
            <h2 className="text-center">Lista de Síntomas</h2>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            symptoms.map(
                                symptom =>
                                    <tr key={symptom.idSymptom}>
                                        <td>{symptom.symptomName}</td>
                                        <td>{symptom.symptomDescription}</td>
                                        <td>
                                            <button style={{ marginLeft: "10px" }} onClick={() => addSymptomToRecord(symptom.idSymptom, symptom.symptomName)} className="btn btn-danger">Añadir</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )


}

// Exporta el componente utilizando React.memo para evitar la renderización innecesaria
export default React.memo(AddSymptomR);