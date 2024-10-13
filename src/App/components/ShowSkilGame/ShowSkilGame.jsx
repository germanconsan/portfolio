import React, { useEffect, useRef, useState } from "react";
import './ShowSkilGame.css';
import frontIcon from '../../../asset/img/frontend.svg'
import backIcon from '../../../asset/img/backend.svg'
import deployment from '../../../asset/img/deployment.svg'
import designIcon from '../../../asset/img/design.svg'
import dataFormats from '../../../asset/img/dataFormats.svg'
import interrogacion from '../../../asset/img/interrogacion.svg'
import anime from "animejs";

const ShowSkilGame = ({ newSkillsCollision }) => {

    //Skill por defecto
    const [skills, setSkills] = useState([
        { title: "Frontend", img: frontIcon, rotate: false },
        { title: "Backend", img: backIcon, rotate: false },
        { title: "DevOps", img: deployment, rotate: false },
        { title: "Design", img: designIcon, rotate: false },
        { title: "Data Formats", img: dataFormats, rotate: false }
    ]);

    const svgRefs = useRef([]); // Array de referencias
    let luzInterval; // Almacena el intervalo para poder limpiarlo después
    let animationInstances = []; // Para almacenar las instancias de animación
    const handleSVGLoad = (index) => {
        const svgDocument = svgRefs.current[index].contentDocument;

        if (svgDocument) {
                const text1 = svgDocument.querySelector('#text1');
                const text2 = svgDocument.querySelector('#text2');
                const text3 = svgDocument.querySelector('#text3');
                const bar1 = svgDocument.querySelector('#bar1');
                const bar2 = svgDocument.querySelector('#bar2');
                const bar3 = svgDocument.querySelector('#bar3');
                const bar4 = svgDocument.querySelector('#bar4');

                if (text1 && text2 && text3 && bar1 && bar2 && bar3 && bar4) {
                    animationInstances.push(anime({
                        targets: [text1, text2, text3],
                        width: "50px",
                        duration: 2000,
                        easing: 'easeInOutQuad',
                        loop: true,
                        direction: 'alternate',
                        endDelay: 1000
                    }));


                    animationInstances.push(anime({
                        targets: bar1,
                        width: "5px",
                        duration: 2000,
                        easing: 'easeInOutQuad',
                        loop: true,
                        direction: 'alternate',
                        endDelay: 500
                    }));

                    animationInstances.push(anime({
                        targets: bar2,
                        width: "20px",
                        duration: 2000,
                        easing: 'easeInOutQuad',
                        loop: true,
                        direction: 'alternate',
                        endDelay: 500
                    }));

                    animationInstances.push(anime({
                        targets: bar3,
                        width: "15px",
                        duration: 2000,
                        easing: 'easeInOutQuad',
                        loop: true,
                        direction: 'alternate',
                        endDelay: 100
                    }));

                    animationInstances.push(anime({
                        targets: bar4,
                        width: "25px",
                        duration: 2000,
                        easing: 'easeInOutQuad',
                        loop: true,
                        direction: 'alternate',
                        endDelay: 100
                    }));
                }

                const rueda = svgDocument.querySelector('#rueda');
                if (rueda) {
                    rueda.style.transformOrigin = "53% 42%"
                    rueda.style.boxSizing = "border-box"
                    rueda.style.padding = 0;
                    rueda.style.margin = 0;

                    animationInstances.push(anime({
                        targets: rueda,
                        rotate: '1turn',
                        duration: 5500,
                        easing: 'linear',
                        loop: true
                    }));
                }

                const luz = svgDocument.querySelector('#luz');
                const rayo1 = svgDocument.querySelector('#rayo1');
                const rayo2 = svgDocument.querySelector('#rayo2');
                const rayo3 = svgDocument.querySelector('#rayo3');
                const rayo4 = svgDocument.querySelector('#rayo4');
                const rayo5 = svgDocument.querySelector('#rayo5');
                if (luz && rayo1 && rayo2 && rayo3 && rayo4 && rayo5) {
                    luzInterval = setInterval(() => {
                        luz.removeAttribute('style');
                        luz.setAttribute('fill', '#ccccccff');
                        luz.setAttribute('fill-opacity', 1);
                        luz.setAttribute('stroke', '#000000');
                        luz.setAttribute('stroke-width', 0.607352);
                        luz.setAttribute('stroke-miterlimit', 14.4);
                        luz.setAttribute('stroke-dasharray', 'none');
                        luz.setAttribute('stroke-opacity', 1);
                        luz.setAttribute('paint-order', 'stroke markers fill');
                        luz.style.transition = "fill 0.5s ease, fill-opacity 1s ease, stroke 0.5s ease";
                        rayo1.style.transition = "fill 0.5s ease, fill-opacity 1s ease, stroke 0.5s ease";
                        rayo2.style.transition = "fill 0.5s ease, fill-opacity 1s ease, stroke 0.5s ease";
                        rayo3.style.transition = "fill 0.5s ease, fill-opacity 1s ease, stroke 0.5s ease";
                        rayo4.style.transition = "fill 0.5s ease, fill-opacity 1s ease, stroke 0.5s ease";
                        rayo5.style.transition = "fill 0.5s ease, fill-opacity 1s ease, stroke 0.5s ease";
                        rayo1.style.opacity = 0;
                        rayo2.style.opacity = 0;
                        rayo3.style.opacity = 0;
                        rayo4.style.opacity = 0;
                        rayo5.style.opacity = 0;
                        setTimeout(() => {
                            luz.setAttribute('fill', '#fcde8aff');
                            luz.setAttribute('fill-opacity', 1);
                            luz.setAttribute('stroke', '#000000');
                            luz.setAttribute('stroke-width', 0.607352);
                            luz.setAttribute('stroke-miterlimit', 14.4);
                            luz.setAttribute('stroke-dasharray', 'none');
                            luz.setAttribute('stroke-opacity', 1);
                            luz.setAttribute('paint-order', 'stroke markers fill');
                            rayo1.style.opacity = 1;
                            rayo2.style.opacity = 1;
                            rayo3.style.opacity = 1;
                            rayo4.style.opacity = 1;
                            rayo5.style.opacity = 1;
                        }, 700)
                    }, 3000)
                }
                const arrow1 = svgDocument.querySelector('#arrow1');
                const arrow2 = svgDocument.querySelector('#arrow2');
                if (arrow1 && arrow2) {

                    arrow1.style.transformOrigin = "61% 25%"
                    arrow2.style.transformOrigin = "-6% 38%"
                    animationInstances.push(anime({
                        targets: arrow1,
                        rotateX: '+=360', // Rota 360 grados en el eje X
                        duration: 3500, // Duración de la animación en milisegundos
                        easing: 'easeInOutSine', // Efecto de suavizado
                        loop: true, // Hacer que la animación se repita
                    }));
                    animationInstances.push(anime({
                        targets: arrow2,
                        rotateX: '-=360', // Rota 360 grados en el eje X
                        duration: 3500, // Duración de la animación en milisegundos
                        easing: 'easeInOutSine', // Efecto de suavizado
                        loop: true, // Hacer que la animación se repita
                    }));
                }
        }
    };



    useEffect(() => {
        setSkills(prevSkills =>
            prevSkills.map(skill =>
                newSkillsCollision.includes(skill.title)
                    ? { ...skill, rotate: true }
                    : { ...skill, rotate: false }
            )
        );
    }, [newSkillsCollision])



    return (<div>
        <div className="grid-container">
            {skills.map((skill, index) =>

                <div className={`grid-item item${index}`} key={index}>

                    <div className="flip-card">
                        <div className={skill.rotate ? "flip-card-inner-rotate" : "flip-card-inner"}>
                            <div className="flip-card-front">
                                <object
                                    type="image/svg+xml"
                                    data={interrogacion}
                                    className="flip-card-icon"
                                ></object>
                            </div>
                            <div className="flip-card-back">
                                <object
                                    ref={(el) => (svgRefs.current[index] = el)}
                                    type="image/svg+xml"
                                    data={skill.img}
                                    className="flip-card-icon"
                                    onLoad={() => handleSVGLoad(index)}
                                ></object>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>)

}

export default ShowSkilGame;