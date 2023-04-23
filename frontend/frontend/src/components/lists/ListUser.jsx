import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserService from '../../services/UserService'

const ListUser = () => {
    const history = useHistory();

    // Aqui se empiezan a definir las variables de estado
    const [users, setUsers] = useState([]);


    // Aqui se empiezan a definir las funciones del componente
    const deleteUser = (id) => {
        UserService.deleteUser(id).then(() => {
            const filteredUsers = users.filter(user => user.id !== id);
            setUsers(filteredUsers);
        });
    }

    const viewUser = (id) => {
        history.push(`/view-user/${id}`);
    }

    const editUser = (id) => {
        history.push(`/add-user/${id}`);
    }

    const addUser = () => {
        history.push('/add-user');
    }

    // Aqui empieza los useEffect
    useEffect(() => {
        window.onpopstate = () => {
            history.push('/users');
        }
        UserService.getUsers().then((res) => {
            setUsers(res.data);
        });
    }, [history]);

    return (
        <div>
            <h2 className="text-center">Lista de Usuarios</h2>
            <div className="row">
                <button className="btn btn-primary" onClick={() => addUser()}> Añadir usuario</button>
            </div>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(
                                user =>
                                    <tr key={user.id}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <button onClick={() => editUser(user.id)} className="btn btn-info">Update</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => deleteUser(user.id)} className="btn btn-danger">Borrar</button>
                                            <button style={{ marginLeft: "10px" }} onClick={() => viewUser(user.id)} className="btn btn-info">Ver perfil </button>
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

export default React.memo(ListUser);