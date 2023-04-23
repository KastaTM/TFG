import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import UserService from '../services/UserService';
import BasicSnackBar from './common/BasicSnackBar';

// Componente que adminsitrá el login de la aplicación

const UserLogin = () => {
    const history = useHistory();
    const location = useLocation();

    // Aqui se empiezan a definir las variables de estado
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [setUser] = useState({});
    const [message, setMessage] = useState('');

    // Aqui se empiezan a definir las funciones del componente

    //Función que realiza el login comprobando los datos introducidos en la base de datos
    const queryUser = (event) => {
        event.preventDefault();
        let user = { id: id, password: password };
        checkFormValues(user);

        //Comprobar que la infomacion de login es correcta
        UserService.getUserById(id).then((res) => {
            const secretKey = 'miClaveSecreta';
            const decryptedString = decryptString(res.data.password, secretKey);
            console.log(decryptedString);
            console.log(user.password);
            console.log(res.data.password);
            if (decryptedString === user.password) {
                UserService.queryUser(user.id, res.data.password).then((res) => {
                    localStorage.setItem('token', user.id);
                    if (user.id == 0) {
                        history.push(`admin-view/${user.id}`);
                    }
                    else {
                        history.push(`/list-patients/${user.id}`);
                    }
                }, error => {
                    console.log(error);
                    console.log("Estamos en el error");
                });
            }
            else {
                alert('Datos incorrectos');
                history.push('/');
            }
        });
    }

    //Función que desencripta la contraseña obtenida de la base de datos
    const decryptString = (encryptedStr, secret) => {
        const decrypted = CryptoJS.AES.decrypt(encryptedStr, secret);
        return decrypted.toString(CryptoJS.enc.Utf8);
    };

    // Comprueba que los valores sean validos
    const checkFormValues = (user) => {
        if (user.id === '') {
            alert('El id no puede estar vacío');
        }
        else if (user.id < 0) {
            alert('El id no puede ser negativo');
        }
        else if (isNaN(user.id)) {
            alert('El id debe ser un número');
        }
        else if (user.password === '') {
            alert('La contraseña no puede estar vacía');
        }
    }

    // Maneja el cambio del id insertado en el formulario
    const changeIdHandler = (event) => {
        setId(event.target.value);
    }

    // Maneja el cambio de la contraseña insertada en el formulario
    const changePasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    // Maneja la cancelación del formulario
    const cancelForm = () => cancel()

    const cancel = () => {
        history.push('/');
    }

    // Manejador de la función que permite registrar un usuario
    const handleRegistrateUser = () => registrateUser()

    const registrateUser = () => {
        history.push('/add-user');
    }

    const newMessage = () => {
        setMessage("Usuario añadido correctamente")
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push('/');
        }
        if (location.search === '?true') {
            newMessage();
            handleClick();
        }
    }, [location, history, setUser]);


    // Renderiza la vista de el login
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h2>Inicio de sesión</h2>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Número de colegiado: </label>
                                    <input placeholder="Id" name="id" className="form-control" value={id} onChange={(event) => changeIdHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label> Contraseña: </label>
                                    <input type="password" placeholder="Contraseña" name="password" className="form-control" value={password} onChange={(event) => changePasswordHandler(event)} />
                                </div>
                                <button className="btn btn-success" onClick={(event) => queryUser(event)}>Iniciar</button>
                                <button type="button" className="btn btn-danger" onClick={cancelForm} style={{ marginLeft: "10px" }}>Cancelar</button>
                            </form>
                        </div>
                        <button className="btn btn-primary" onClick={handleRegistrateUser} style={{ marginLeft: "10px" }}>Registrate</button>
                    </div>
                </div>
                <BasicSnackBar
                    open={open}
                    onClose={handleClose}
                    severity="success"
                    message={message}
                />
            </div>
        </div>
    )

}

export default React.memo(UserLogin);