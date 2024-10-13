import React from "react";
import './NextPageButtom.css'
import { useHistory } from "react-router-dom";
import anime from "animejs";


const NextPageButtom = ({ style, children, url }) => {
    const history = useHistory(); // Hook para acceder a history
    const nextPage = () => {
        if (url === '/skills') {
            anime({
                targets: '.container-introductionPage', // El contenedor del componente
                scale: 0.8, // Disminuir escala
                opacity: 0, // Disminuir opacidad
                translateX: [0, -1500],
                easing: 'easeInOutQuad',
                duration: 1000, // Duración de la animación
                complete: () => {
                    // Redirigir después de la animación
                    history.push(url);
                }
            });
        }
        if (url === '/skill-game') {
            anime({
                targets: '.container-preskill-page', // El contenedor del componente
                scale: 0.8, // Disminuir escala
                opacity: 0, // Disminuir opacidad
                easing: 'easeInOutQuad',
                duration: 1000, // Duración de la animación
                complete: () => {
                    // Redirigir después de la animación
                    history.push(url);
                }
            });
        }
        if (url === '/introduction') {
            anime({
                targets: '.home-container', // El contenedor del componente
                scale: 0.8, // Disminuir escala
                opacity: 0, // Disminuir opacidad
                easing: 'easeInOutQuad',
                duration: 1000, // Duración de la animación
                complete: () => {
                    // Redirigir después de la animación
                    history.push(url);
                }
            });
        }
        if (url === '/skills-list') {
            anime({
                targets: '.container-preskill-page', // El contenedor del componente
                scale: 0.8, // Disminuir escala
                opacity: 0, // Disminuir opacidad
                translateX: [0, -1500],
                easing: 'easeInOutQuad',
                duration: 1000, // Duración de la animación
                complete: () => {
                    // Redirigir después de la animación
                    history.push(url);
                }
            });
        }
    }


    return (
        <div style={style}>
            <button className="custom-button"
                onClick={nextPage}
            >{children}</button>
        </div>
    )
}

export default NextPageButtom;