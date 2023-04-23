import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SymptomService from '../../services/SymptomService'

// Componente que añade un síntoma a una enfermedad

const AddSymptom = () => {
    const history = useHistory();
    const params = useParams();

    // Aqui se empiezan a definir las variables de estado
    const [idDisease] = useState(params.id);
    const [symptoms, setSymptoms] = useState([]);

    // Aqui se empiezan a definir las funciones del componente

    // Función que añade un síntoma a una enfermedad y redirige al usuario a la página de actualización de la enfermedad correspondiente.
    const addSymptomToDisease = (idSymptom, symptomName) => {
        let diseaseSymptom = { idSymptom: idSymptom, idDisease: idDisease, symptomName: symptomName };
        SymptomService.addSymptomToDisease(diseaseSymptom).then(() => {
        });
        history.push({
            pathname: `/update-disease/${idDisease}`,
            search: 'true'
        });
    }

    // Aqui empieza los useEffect
    useEffect(() => {
        // Volver a la página de actualización de la enfermedad si el usuario utiliza el botón de atrás del navegador
        window.onpopstate = () => {
            history.push(`/update-disease/${idDisease}`);
        }
         // Obtener los síntomas que no están asociados a la enfermedad
        SymptomService.getRestSymptomsDisease(idDisease).then((res) => {
            setSymptoms(res.data);
        });
    }, [history, idDisease]);

    // Renderizar la lista de síntomas que no están asociados a la enfermedad
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
                                            <button style={{ marginLeft: "10px" }} onClick={() => addSymptomToDisease(symptom.idSymptom, symptom.symptomName)} className="btn btn-danger">Añadir</button>
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
export default  React.memo(AddSymptom);