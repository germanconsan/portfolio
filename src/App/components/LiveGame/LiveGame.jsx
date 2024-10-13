import React, { useEffect } from "react";
import './LiveGame.css'
import heartIcon from '../../../asset/img/heart.svg'
import anime from "animejs";
const LivesGame = ({ lives }) => {



    const hearts = [];

    useEffect(() => {
        // Animar el cambio de vidas
        for (let i = 0; i < 3; i++) {
            anime({
                targets: "#heart-" + i,
                filter: i < lives ? 'grayscale(0%)' : 'grayscale(100%)', // Restablecer filtro a 'none' si las vidas son suficientes
                easing: 'easeInOutQuad',
                duration: 800,
            });
        }
    }, [lives]);

    // Bucle para crear elementos
    for (let i = 0; i < 3; i++) {
        hearts.push(
            <object key={i}
                id={"heart-" + i}
                className="heart"
                type="image/svg+xml"
                data={heartIcon}
                style={{ filter: 'none' }} // Este filtro inicial no afecta la animación
            />
        );
    }

    return (
        <div className="container-lives">
            <p>Vidas:</p>
            {hearts}
        </div>
    );
}


export default LivesGame;