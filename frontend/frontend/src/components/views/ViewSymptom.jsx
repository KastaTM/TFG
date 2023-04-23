import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SymptomService from '../../services/SymptomService'

// Componente que permite enseñar un síntoma 

const ViewSymptom = () => {
    const history = useHistory();
    const params = useParams();

    // Aqui se empiezan a definir las variables de estado
    const [idS] = useState(params.id);
    const [symptom, setSymptom] = useState({})
    const { symptomName, symptomDescription } = symptom;

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push('/list-symptoms/');
        }
        SymptomService.getSymptomById(idS).then((res) => {
            setSymptom(res.data);
        })
    }, [history, idS]);

    // Renderiza la vista de un síntoma
    return (
        <div>
            <br></br>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center"> Información del síntoma</h3>
                <div className="card-body">
                    <div className="row">
                        <label> Nombre: {symptomName}</label>
                    </div>
                    <div className="row">
                        <label> Descripcion: {symptomDescription}</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ViewSymptom);