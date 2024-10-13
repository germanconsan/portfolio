import React from "react";
import './ButtomComponent.css'
import { useHistory } from "react-router-dom";
import anime from "animejs";


const ButtomComponent = ({onClose, style, children, isFor, styleContainer }) => {
    const history = useHistory(); // Hook para acceder a history
    const closeAnimation = () => {
        if (isFor === 'modal' ) {
            anime({
                targets: '.modal-content', // El contenedor del componente
                scale: 0.8, // Disminuir escala
                opacity: 0, // Disminuir opacidad
                easing: 'easeInOutQuad',
                duration: 300, // Duración de la animación
                complete: () => {
                    onClose();
                }
            });
        }
    }


    return (
        <div style={style}>
            <button className="custom-button" onClick={closeAnimation}>{children}</button>
        </div>
    )
}

export default ButtomComponent;