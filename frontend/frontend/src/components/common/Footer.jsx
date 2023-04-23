import React from 'react';

// Componente que renderiza el pie de la página

const Footer = () => {
    return (
        <div>
            <footer className = "footer">
                <span className="footer-text">Trabajo de Fin de Grado - Desarrollo de un sistema de ayuda a la gestión de pacientes de un médico - Universidad Complutense de Madrid</span>
            </footer>
        </div>
    )
}

export default React.memo(Footer);