import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import UserService from '../../services/UserService';

// Componente que permite actualizas los datos sobre una contraseña

const UpdatePassword = () => {
    const params = useParams();
    const history = useHistory();

    // Aqui se empiezan a definir las variables de estado
    const [id, setId] = useState(params.id);
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    let isWrong = false;


    // Aqui se empiezan a definir las funciones del componente

    //Función para actualizar una contraseña
    const UpdateUser = (event) => {
        event.preventDefault();

        let user = { password: password };
        checkFormValues();

        if (!isWrong) {
            UserService.updatePassword(user, id).then(() => {
                //Aqui tengo que cerrar la sesion
                localStorage.removeItem('token');
                setId('')
                history.push('/');
            });
        }
    }

    // Comprueba que los valores sean validos
    const checkFormValues = () => {
        console.log(password);
        console.log(repeatedPassword);
        if (password === '') {
            alert('La contraseña no puede ser vacía');
            isWrong = true;
        }
        else if (repeatedPassword === '') {
            alert('Por favor escribe la contraseña repetida');
            isWrong = true;
        }
        else if (password !== repeatedPassword) {
            alert('Las dos contraseñas no coinciden');
            isWrong = true;
        }
    }

    // Maneja el cambio de contraseña en el formulario
    const changePasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    // Maneja el cambio de contraseña repetida en el formulario
    const changeRepeatedPasswordHandler = (event) => {
        setRepeatedPassword(event.target.value);
    }

    // Maneja la cancelación del formulario
    const cancelForm = () => cancel()

    const cancel = () => {
        history.push(`/view-user/${id}`);
    }

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push(`/view-user/${id}`);
        }
    });

    // Renderiza un formulario para poder actualizar los datos de una contraseña de un paciente
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Modificar Usuario</h3>
                        <div className="card-body">
                            <form onSubmit={(event) => UpdateUser(event)}>
                                <div className="form-group">
                                    <label>Nueva contraseña: </label>
                                    <input placeholder="Inserte nueva contraseña" name="password" className="form-control" value={password} onChange={(event) => changePasswordHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label> Inserte de nuevo la contraseña: </label>
                                    <input placeholder="Inserte de nuevo la contraseña" name="repeatedPassword" className="form-control" value={repeatedPassword} onChange={(event) => changeRepeatedPasswordHandler(event)} />
                                </div>
                                <button type="submit" className="btn btn-success">Guardar</button>
                                <button type="button" className="btn btn-danger" onClick={cancelForm} style={{ marginLeft: "10px" }}>Cancelar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default React.memo(UpdatePassword);