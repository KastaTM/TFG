import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DiseaseService from '../../services/DiseaseService'

// Componente que añade una enfermedad a un medicamento

const AddDiseaseM = () => {
    const history = useHistory();
    const params = useParams();

    // Aqui se empiezan a definir las variables de estado
    const [idMedicine] = useState(params.id);
    const [diseases, setDiseases] = useState([]);

    // Aqui se empiezan a definir las funciones del componente

    // Función que añade una enfermedad a un medicamento y redirige al usuario a la página de actualización del medicamento correspondiente.
    const addDiseaseToMedicine = (idDisease, diseaseName) => {
        let diseaseMedicine = { idDisease: idDisease, idMedicine: idMedicine, diseaseName: diseaseName };
        DiseaseService.addDiseaseToMedicine(diseaseMedicine).then(() => {});
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
        // Obtener las enfermedades que no están asociadas al medicamento
        DiseaseService.getRestDiseasesMedicine(idMedicine).then((res) => {
            setDiseases(res.data);
        });
    }, [history, idMedicine]);

    // Renderizar la lista de enfermedades que no están asociadas al medicamento
    return (
        <div>
            <h2 className="text-center">Lista de Enfermedades</h2>
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
                                        <td>{disease.diseaseDescription}</td>
                                        <td>
                                            <button style={{ marginLeft: "10px" }} onClick={() => addDiseaseToMedicine(disease.idDisease, disease.diseaseName)} className="btn btn-danger">Añadir</button>
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
export default  React.memo(AddDiseaseM);