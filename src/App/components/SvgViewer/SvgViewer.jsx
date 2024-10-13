import React, { useRef, useEffect } from "react";
import './SvgViewer.css'
import anime from "animejs";

const SvgViewer = ({ skillIcon }) => {

    const svgRef = useRef(null);

    useEffect(() => {

        let luzInterval; // Almacena el intervalo para poder limpiarlo después
        let animationInstances = []; // Para almacenar las instancias de animación

        if (svgRef.current) {
            svgRef.current.onload = () => {
                const svgDocument = svgRef.current.contentDocument;
                if (svgDocument) {
                    // Accede a elementos específicos del SVG usando sus IDs o clases

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

            }
            // Función de limpieza
            return () => {
                // Detener todas las animaciones
                animationInstances.forEach(anim => {
                    anim.pause(); // Pausar la animación
                });
                // Limpiar el intervalo
                clearInterval(luzInterval);
            };
        }

    }, []);


    return (
        <div
            className="container-svgviewer">
            <div className="container-svgviewer-div"></div>
            <object
                ref={svgRef}
                type="image/svg+xml"
                data={skillIcon}
                className="container-svgviewer-svg"
            ></object>


        </div>)
}

export default SvgViewer;