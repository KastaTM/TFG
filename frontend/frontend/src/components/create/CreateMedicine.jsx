import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MedicineService from '../../services/MedicineService';

const CreateMedicine = () => {
    const history = useHistory();


    // Aqui se empiezan a definir las variables de estado
    const [medicineName, setMedicineName] = useState('');
    const [medicineDescription, setMedicineDescription] = useState('');
    const [medicinePicture, setMedicinePicture] = useState('');
    const [medicineList, setMedicineList] = useState('');
    let isWrong = false;


    // Aqui se empiezan a definir las funciones del componente

    // Guarda el medicamento
    const saveMedicine = (event) => {
        event.preventDefault();
        let medicine = { medicineName: medicineName, medicineDescription: medicineDescription, medicinePicture: medicinePicture };
        checkFormValues(medicine);

        if (!isWrong) {
            MedicineService.createMedicine(medicine).then(() => {
                history.push({
                    pathname: '/list-medicines/',
                    search: 'true'
                });
            });
        }
    }

    // Comprueba que los valores sean validos
    const checkFormValues = (medicine) => {
        if (medicineList.includes(medicine.medicineName)) {
            alert('Esta medicina ya ha sido añadida');
            isWrong = true;
        }
        else if (medicine.medicineName === '') {
            alert('El nombre del medicamento no puede estar vacío');
            isWrong = true;
        }
        else if (!isNaN(medicine.medicineName)) {
            alert('El nombre del medicamento no puede ser un número');
            isWrong = true;
        }
        else if (medicine.medicineDescription === '') {
            alert('La descripción del medicamento no puede estar vacío');
            isWrong = true;
        }
        else if (!isNaN(medicine.medicineDescription)) {
            alert('La descripción del medicamento no puede ser un número');
            isWrong = true;
        }
        else if (medicine.medicinePicture === '') {
            alert('La medicina debe tener una foto');
            isWrong = true;
        }
    }

    // Maneja el cambio del nombre del medicamento en el formulario
    const changeNameHandler = (event) => {
        setMedicineName(event.target.value);
    }

    // Maneja el cambio de la descripción del medicamento en el formulario
    const changeDescriptionHandler = (event) => {
        setMedicineDescription(event.target.value);
    }

    // Maneja el cambio de la imagen del medicamento en el formulario
    const changeMedicinePictureHandler = (event) => {
        setMedicinePicture(event.target.value);
    }

    // Maneja la cancelación del formulario
    const cancelForm = () => cancel()

    const cancel = () => {
        history.push('/list-medicines/');
    }

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push('/list-medicines/');
        }
        MedicineService.getMedicinesNames().then((res) => {
            setMedicineList(res.data);
        });
    }, [history]);

    // Renderiza el formulario para añadir un medicamento
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Añadir Medicamento</h3>
                        <div className="card-body">
                            <form onSubmit={(event) => saveMedicine(event)}>
                                <div className="form-group">
                                    <label>Nombre: </label>
                                    <input placeholder="Nombre" name="medicineName" className="form-control" value={medicineName} onChange={(event) => changeNameHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label>Descripción: </label>
                                    <input placeholder="Descripción" name="medicineDescription" className="form-control" value={medicineDescription} onChange={(event) => changeDescriptionHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label>Foto(link): </label>
                                    <input placeholder="Foto" name="medicinePicture" className="form-control" value={medicinePicture} onChange={(event) => changeMedicinePictureHandler(event)} />
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

export default React.memo(CreateMedicine);