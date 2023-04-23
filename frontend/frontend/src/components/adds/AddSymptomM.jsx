import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SymptomService from '../../services/SymptomService'

// Componente que añade un síntoma a un medicamento

const AddSymptomM = () => {
    const history = useHistory();
    const params = useParams();

    // Aqui se empiezan a definir las variables de estado
    const [idMedicine] = useState(params.id);
    const [symptoms, setSymptoms] = useState([]);

    // Aqui se empiezan a definir las funciones del componente

    // Función que añade un síntoma a un medicamento y redirige al usuario a la página de actualización del medicamento correspondiente.
    const addSymptomToMedicine = (idSymptom, symptomName) => {
        let medicineSymptom = { idSymptom: idSymptom, idMedicine: idMedicine, symptomName: symptomName };
        SymptomService.addSymptomToMedicine(medicineSymptom).then(() => {
        });
        window.location.reload();
        history.push({
            pathname: `/update-medicine/${idMedicine}`,
            search: 'true'
        });
    }

    // Aqui empieza los useEffect
    useEffect(() => {
        // Volver a la página de actualización del medicamento si el usuario utiliza el botón de atrás del navegador
        window.onpopstate = () => {
            history.push(`/update-medicine/${idMedicine}`);
        }
        // Obtener los síntomas que no están asociados al medicamento
        SymptomService.getRestSymptomsMedicine(idMedicine).then((res) => {
            setSymptoms(res.data);
        });
    }, [history, idMedicine]);

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
                                            <button style={{ marginLeft: "10px" }} onClick={() => addSymptomToMedicine(symptom.idSymptom, symptom.symptomName)} className="btn btn-danger">Añadir</button>
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
export default React.memo(AddSymptomM);