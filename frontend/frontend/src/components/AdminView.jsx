import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Componente que permite muestra la vista del administrador

const AdminView = () => {
    const history = useHistory();

    //Manejador de la función que permite mostrar la lista de síntomas registrados en el sistema
    const handleListSymptom = () => listSymptom()

    const listSymptom = () => {
        history.push('/list-symptoms');
    }

    //Manejador de la función que permite mostrar la lista de enfermedades registradas en el sistema
    const handleListDisease = () => listDisease()

    const listDisease = () => {
        history.push('/list-diseases');
    }

    //Manejador de la función que permite mostrar la lista de medicamentos registrados en el sistema
    const handleListMedicine = () => listMedicine()

    const listMedicine = () => {
        history.push('/list-medicines');
    }

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            localStorage.removeItem('token');
            history.push('/');
        }
    }, [history]);

    // Renderiza la vista del administrador
    return (
        <div>
            <h2 className="text-center">Bienvenido Administrador</h2>
             <div className="buttons-container">
                    <button className="btn btn-primary admin-button" onClick={handleListSymptom}> Lista Síntomas</button>
                    <button className="btn btn-primary admin-button" onClick={handleListDisease}> Lista Enfermedades</button>
                    <button className="btn btn-primary admin-button" onClick={handleListMedicine}> Lista Medicamentos</button>
            </div>
        </div>
    )
}

export default React.memo(AdminView);