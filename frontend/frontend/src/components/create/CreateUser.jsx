import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import UserService from '../../services/UserService';

const CreateUser = () => {
    const history = useHistory();

    // Aqui se empiezan a definir las variables de estado
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [workplace, setWorkplace] = useState('');
    const [password, setPassword] = useState('');
    const [userPicture, setUserPicture] = useState('');
    const [idList, setIdList] = useState([]);
    let isWrong = false;

    // Aqui se empiezan a definir las funciones del componente

    // Guarda el usuario
    const saveUser = (event) => {
        event.preventDefault();
        const secretKey = 'miClaveSecreta';
        const encryptedString = encryptString(password, secretKey);
        console.log(`Cadena cifrada: ${encryptedString}`);
        let user = { id: id, firstName: firstName, lastName: lastName, email: email, password: encryptedString, userPicture: userPicture, city: city, specialty: specialty, workplace: workplace };
        checkFormValues(user);
        if (!isWrong) {
            UserService.createUser(user).then(() => {
                history.push({
                    pathname: '/',
                    search: 'true'
                });
            });
        }
    }

    //Devuelve la contraseña cifrada utilizando el algoritmo AES
    const encryptString = (str, secret) => {
        const encrypted = CryptoJS.AES.encrypt(str, secret);
        return encrypted.toString();
    };

    // Comprueba que los valores sean validos
    const checkFormValues = (user) => {
        if (+idList.includes(+user.id)) {
            alert('Este usuario ya existe');
            isWrong = true;
        }
        else if (user.id.length !== 9) {
            alert('Número de colegiado incorrecto');
            isWrong = true
        }
        else if (+user.id < 0) {
            alert('El número de colegiado no puede ser negativo');
            isWrong = true;
        }
        else if (user.firstName === '') {
            alert('El nombre no puede estar vacío');
            isWrong = true;
        }
        else if (!isNaN(user.firstName)) {
            alert('El nombre no puede ser un número');
            isWrong = true;
        }
        else if (user.lastName === '') {
            alert('El apellido no puede estar vacío');
            isWrong = true;
        }
        else if (!isNaN(user.lastName)) {
            alert('El apellido no puede ser un número');
            isWrong = true;
        }
        else if (user.email === '') {
            alert('El email no puede estar vacío');
            isWrong = true;
        }
        else if (user.password === '') {
            alert('La contraseña no puede estar vacía');
            isWrong = true;
        }
        else if (user.userPicture === '') {
            alert('El usuario debe tener una foto');
            isWrong = true;
        }
        else if (user.specialty === '') {
            alert('El usuario debe tener una especialidad');
            isWrong = true;
        }
        else if (!isNaN(user.specialty)) {
            alert('La especialidad no puede ser un número');
            isWrong = true;
        }
        else if (user.city === '') {
            alert('El usuario debe tener asignada una ciudad');
            isWrong = true;
        }
        else if (!isNaN(user.city)) {
            alert('La ciudad no puede ser un número');
            isWrong = true;
        }
        else if (user.workplace === '') {
            alert('El usuario debe tener asignada un lugar de trabajo');
            isWrong = true;
        }
        else if (!isNaN(user.workplace)) {
            alert('El lugar de trabajo no puede ser un número');
            isWrong = true;
        }
    }

    // Maneja el cambio del número de colegiado del usuario en el formulario
    const changeIdDoctorHandler = (event) => {
        setId(event.target.value);
    }

    // Maneja el cambio del nombre del usuario en el formulario
    const changeFirstNameHandler = (event) => {
        setFirstName(event.target.value);
    }

    // Maneja el cambio de los apellidos del usuario en el formulario
    const changeLastNameHandler = (event) => {
        setLastName(event.target.value);
    }

    // Maneja el cambio del email del usuario en el formulario
    const changeEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    // Maneja el cambio de la ciudad de trabajo del usuario en el formulario
    const changeCityHandler = (event) => {
        setCity(event.target.value);
    }

    // Maneja el cambio de la especialidad del usuario en el formulario
    const changeSpecialtyHandler = (event) => {
        setSpecialty(event.target.value);
    }

    // Maneja el cambio del lugar de trabajo del usuario en el formulario
    const changeWorkplaceHandler = (event) => {
        setWorkplace(event.target.value);
    }

    // Maneja el cambio de contraseña del usuario en el formulario
    const changePasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    // Maneja el cambio de la foto del usuario en el formulario
    const changeUserPictureHandler = (event) => {
        setUserPicture(event.target.value);
    }

    // Maneja la cancelación del formulario
    const cancelForm = () => cancel()

    const cancel = () => {
        history.push('/');
    }

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push('/');
        }
        UserService.getUsersId().then((res) => {
            setIdList(res.data);
        });
    });

    // Renderiza el formulario para añadir un usuario
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Añadir Usuario</h3>
                        <div className="card-body">
                            <form onSubmit={(event) => saveUser(event)}>
                                <div className="form-group">
                                    <label>Número de colegiado: </label>
                                    <input placeholder="Número de colegiado" name="id" className="form-control" value={id} onChange={(event) => changeIdDoctorHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label>Nombre: </label>
                                    <input placeholder="Nombre" name="firstName" className="form-control" value={firstName} onChange={(event) => changeFirstNameHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label> Apellidos: </label>
                                    <input placeholder="Apellidos" name="lastName" className="form-control" value={lastName} onChange={(event) => changeLastNameHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label> Email: </label>
                                    <input placeholder="Email" name="email" className="form-control" value={email} onChange={(event) => changeEmailHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label> Ciudad: </label>
                                    <input placeholder="Ciudad" name="city" className="form-control" value={city} onChange={(event) => changeCityHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label> Especialidad: </label>
                                    <input placeholder="Especialidad" name="specialty" className="form-control" value={specialty} onChange={(event) => changeSpecialtyHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label> Lugar de trabajo: </label>
                                    <input placeholder="Lugar de trabajo" name="workplace" className="form-control" value={workplace} onChange={(event) => changeWorkplaceHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label> Contraseña: </label>
                                    <input type="password" placeholder="Contraseña" name="password" className="form-control" value={password} onChange={(event) => changePasswordHandler(event)} />
                                </div>
                                <div className="form-group">
                                    <label> Foto(Link): </label>
                                    <input placeholder="Foto" name="userPicture" className="form-control" value={userPicture} onChange={(event) => changeUserPictureHandler(event)} />
                                </div>
                                <button type="submit" className="btn btn-success">Registrar</button>
                                <button type="button" className="btn btn-danger" onClick={cancelForm} style={{ marginLeft: "10px" }}>Cancelar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default React.memo(CreateUser);