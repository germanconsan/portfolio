import React from 'react';
import { Redirect } from 'react-router-dom'; // Si usas react-router para navegación

// HOC para proteger rutas basadas en autenticación
const withAuth = (WrappedComponent) => {
    return (props) => {
        const isAuthenticated = !!localStorage.getItem('authToken'); // Ejemplo: comprobación de autenticación

        // Si no está autenticado, redirige a la página de inicio de sesión
        if (!isAuthenticated) {
            return <Redirect to="/login" />;
        }

        // Si está autenticado, renderiza el componente protegido
        return <WrappedComponent {...props} />;
    };
};

export default withAuth;