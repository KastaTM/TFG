import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SymptomService from '../../services/SymptomService'


const CreateSymptom = () => {
    const history = useHistory();

    // // Aqui se empiezan a definir las variables de estado
    const [symptomName, setSymptomName] = useState('');
    const [symptomDescription, setSymptomDescription] = useState('');
    const [symptomList, setSymptomList] = useState('');
    let isWrong = false;

    // Aqui se empiezan a definir las funciones del componente
    const saveSymptom = (event) => {
        event.preventDefault();
        let symptom = { symptomName: symptomName, symptomDescription: symptomDescription };
        checkFormValues(symptom);

        if(!isWrong){
            SymptomService.createSymptom(symptom).then(() => {
                history.push({
                    pathname: '/list-symptoms/',
                    search: 'true'
                });
            });
        }
    }

    const checkFormValues = (symptom) => {
        if(symptomList.includes(symptom.symptomName)){
            alert('Este sintoma ya ha sido añadido');
            isWrong = true;
        }
        else if (symptom.symptomName === '') {
            alert('El nombre no puede estar vacío');
            isWrong = true
        }
        else if (!isNaN(symptom.symptomName)) {
            alert('El nombre no puede ser un número');
            isWrong = true
        }
    }

    const changeNameHandler = (event) => {
        setSymptomName(event.target.value);
    }

    const changeDescriptionHandler = (event) => {
        setSymptomDescription(event.target.value);
    }

    const cancelForm = () => cancel()

    const cancel = () => {
        history.push('/list-symptoms/');
    }

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push('/list-symptoms/');
        }
        SymptomService.getSymptomsNames().then((res) => {
            setSymptomList(res.data);
        });
    }, [history]);

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Añadir Síntoma</h3>
                        <div className="card-body">
                            <form onSubmit={(event) => saveSymptom(event)}>
                                <div className="form-group">
                                    <label>Nombre: </label>
                                    <input placeholder="Nombre" name="symptomName" className="form-control" value={symptomName} onChange={(event) => changeNameHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label>Descripcion: </label>
                                    <input type="text" placeholder="Descripción" name="symptomDescription" className="form-control" value={symptomDescription} onChange={(event) => changeDescriptionHandler(event)} />
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


export default React.memo(CreateSymptom);