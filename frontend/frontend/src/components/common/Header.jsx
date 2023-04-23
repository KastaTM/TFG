import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar } from '@mui/material';
import UserService from '../../services/UserService'

// Componente que renderiza la cabecera de la página
const Header = () => {
    const history = useHistory(); // Hook para la navegación de la página

    // Aqui se empiezan a definir las variables de estado
    const [idUser, setIdUser] = useState(localStorage.getItem('token')); //Cambiar a ponerlo a un useEffect() al principio
    const [user, setUser] = useState({})

    // Aqui se empiezan a definir las funciones del componente
    const viewUser = (id) => {
        history.push(`/view-user/${id}`);
    }

    // Esta función renderiza el titulo de la cabecera solo si hay un usuario logeado
    const renderTitle = () => {
        if (idUser) {
            return <button onClick={handleGoToTitle} className="btn btn-info float-right">TFG</button>
        }
    }

    const handleGoToTitle = () => goToTitle()

    //Función para que el titulo nos permita ir a una vista u otra dependiendon del usuario logueado
    const goToTitle = () => {
        if (idUser) {
            if (idUser == 0) {
                history.push(`/admin-view/${idUser}`);
            }
            else {
                history.push(`/list-patients/${idUser}`);
            }
        }
    }

    //Función para renderizar el Avatar del usuario en la vista si hay un usuario logeado
    const renderUser = () => {
        if (idUser) {
            return <Avatar alt="User Picture"  src={user.userPicture} onClick={() => viewUser(idUser)}/>
        }
    }

    //Función para renderizar el botón de Logout en la vista si hay un usuario logeado
    const renderLogout = () => {
        if (idUser) {
            return <button className="btn btn-success" onClick={handleLogoutUser}>Cerrar sesión</button>
        }
    }

    const handleLogoutUser = () => logoutUser()

    //Función para realizar el logout del usuario
    const logoutUser = () => {
        localStorage.removeItem('token');
        setIdUser('')
        history.push('/');
    }

    useEffect(() => {
        window.onpopstate = () => {
            history.push('/');
        }
        //Comprobar que la infomacion de login es correcta
        UserService.getUserById(idUser).then((res) => {
            setUser(res.data);
        });
    }, [history, idUser]);

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="info-user">
                        <div className="info-user title">
                            {renderTitle()}
                        </div>
                        <div className="info-user rest">
                            {renderUser()}
                        <div className="info-user rest logout">
                            {renderLogout()} 
                        </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )

}

export default React.memo(Header);