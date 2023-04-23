import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DiseaseService from '../../services/DiseaseService';

const CreateDisease = () => {
    const history = useHistory();


    // Aqui se empiezan a definir las variables de estado
    const [diseaseName, setDiseaseName] = useState('');
    const [diseaseDescription, setDiseaseDescription] = useState('');
    const [diseaseList, setDiseaseList] = useState('');
    let isWrong = false;

    // Aqui se empiezan a definir las funciones del componente

    // Guarda la enfermedad
    const saveDisease = (event) => {
        event.preventDefault();
        let disease = { diseaseName: diseaseName, diseaseDescription: diseaseDescription };
        checkFormValues(disease);

        if (!isWrong) {
            DiseaseService.createDisease(disease).then(() => {
                window.location.reload();
                history.push({
                    pathname: '/list-diseases/',
                    search: 'true'
                });
            });
        }
    }

    // Comprueba que los valores sean validos
    const checkFormValues = (disease) => {
        if(diseaseList.includes(disease.diseaseName)){
            alert('Esta enfermedad ya ha sido añadida');
            isWrong = true;
        }
        else if (disease.diseaseName === '') {
            alert('El nombre de la enfermedad no puede estar vacío');
            isWrong = true;
        }
        else if (!isNaN(disease.diseaseName)) {
            alert('El nombre de la enfermedad no puede ser un número');
            isWrong = true;
        }
        else if (disease.diseaseDescription === '') {
            alert('La descripcion de la enfermedad no puede estar vacío');
            isWrong = true;
        }
        else if (!isNaN(disease.diseaseDescription)) {
            alert('La descripción de la enfermedad no puede ser un número');
            isWrong = true;
        }
    }

    // Maneja el cambio del nombre de la enfermedad en el formulario
    const changeNameHandler = (event) => {
        setDiseaseName(event.target.value);
    }

    // Maneja el cambio de la descripción de la enfermedad en el formulario
    const changeDescriptionHandler = (event) => {
        setDiseaseDescription(event.target.value);
    }

    // Maneja la cancelación del formulario
    const cancelForm = () => cancel()

    const cancel = () => {
        history.push('/list-diseases/');
    }

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push('/list-diseases/');
        }
        DiseaseService.getDiseasesNames().then((res) => {
            setDiseaseList(res.data);
        });
    }, [history]);

    // Renderiza el formulario para añadir una enfermedad
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Añadir Enfermedad</h3>
                        <div className="card-body">
                            <form onSubmit={(event) => saveDisease(event)}>
                                <div className="form-group">
                                    <label>Nombre: </label>
                                    <input placeholder="Nombre" name="diseaseName" className="form-control" value={diseaseName} onChange={(event) => changeNameHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label>Descripción: </label>
                                    <input placeholder="Descripción" name="diseaseDescription" className="form-control" value={diseaseDescription} onChange={(event) => changeDescriptionHandler(event)} />
                                </div>
                                <button variant="contained" type="submit" className="btn btn-success">Añadir</button>
                                <button type="button" className="btn btn-danger" onClick={cancelForm} style={{ marginLeft: "10px" }}>Cancelar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default React.memo(CreateDisease);