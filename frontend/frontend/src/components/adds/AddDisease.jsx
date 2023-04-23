import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DiseaseService from '../../services/DiseaseService'

// Componente que permite añadir enfermedades a un paciente
const AddDisease = () => {
    const history = useHistory(); // Hook para la navegación de la página
    const params = useParams(); // Hook para obtener los parámetros de la URL
    const idDoctor = localStorage.getItem('token'); // ID del doctor autenticado

    // Aqui se empiezan a definir las variables de estado
    const [idPatient] = useState(params.id); // ID del paciente actual
    const [diseases, setDiseases] = useState([]); // Lista de enfermedades disponibles

    // Aqui se empiezan a definir las funciones del componente

    // Esta función añade una enfermedad a un paciente y redirige al usuario a la página de visualización del paciente correspondiente.
    const addDiseaseToPatient = (idDisease, diseaseName) => {
        let diseasePatient = { idDisease: idDisease, idPatient: idPatient, diseaseName: diseaseName };
        DiseaseService.addDiseaseToPatient(diseasePatient).then(() => { //Hacer
        });
        history.push({
            pathname: `/view-patient/${idDoctor}/${idPatient}`,
            search: 'true'
        });
    }

    // Este hook de efecto se ejecuta cuando el componente se monta, actualiza o desmonta.
    useEffect(() => {
        // Se define una función que se ejecuta cuando el usuario utiliza el botón atrás en su navegador
        window.onpopstate = () => {
            history.push(`/view-patient/${idDoctor}/${idPatient}`);
        }
        // Se obtiene la lista de enfermedades disponibles del paciente actual y se almacena en la variable de estado 'diseases'
        DiseaseService.getRestDiseasesPatient(idPatient).then((res) => {
            setDiseases(res.data);
        });
    }, [history, idDoctor, idPatient]);

    // Renderiza la lista de enfermedades disponibles y un botón para añadir cada una a la lista del paciente
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
                                            <button style={{ marginLeft: "10px" }} onClick={() => addDiseaseToPatient(disease.idDisease, disease.diseaseName)} className="btn btn-danger">Añadir</button>
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
export default  React.memo(AddDisease);