import React from 'react';
import './WithLoader.css';

// HOC para añadir el spinner de carga sin desmontar el componente
const withLoader = (WrappedComponent) => {
  return function WithLoadingComponent({ isLoading, ...props }) {
    // Cambiado: El componente envuelve el WrappedComponent con el spinner
    return (
      <>
        {/* Cambiado: Añadir el spinner pero sin desmontar el WrappedComponent */}
        {isLoading && (
          <div className="overlay">
            <div className="spinner"></div>
          </div>
        )}
        {/* Cambiado: El componente de login sigue montado */}
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withLoader;