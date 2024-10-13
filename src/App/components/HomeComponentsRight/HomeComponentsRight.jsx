import React, { useEffect, useState } from "react";
import './HomeComponentsRight.css'
import Title from "../Title";
import logo from '../../../asset/img/portfolio.svg';
import anime from 'animejs/lib/anime.es.js';
import { element } from "prop-types";
import NextPageButtom from "../NextPageButtom";

const HomeComponentsRight = () => {



    useEffect(() => {

        const objectSVG = document.getElementById('objectSVG');

        if (objectSVG) {
            objectSVG.addEventListener('load', () => {
                const svgDocument = objectSVG.contentDocument; // Accede al documento SVG
                const text = svgDocument.getElementById('text2');
                if (text) {
                    anime({
                        targets: text,
                        strokeDashoffset: [anime.setDashoffset, 0],
                        easing: 'easeInOutSine',
                        duration: 7000,
                        delay: (el, i) => i * 50,
                        direction: 'alternate',
                        loop: true,
                    });


                }
            })
        }


    }, []);

    return (
        <div className="container-home-right" >
            <object
                id="objectSVG"
                className="container-home-right-title"
                type="image/svg+xml"
                data={logo}
            ></object>

            <p className="container-home-right-text"><strong>¡Bienvenido a mi portfolio!</strong> Explora los proyectos que he desarrollado para conocer más sobre mis habilidades y experiencia. Cada sección está pensada para mostrar cómo enfrento retos técnicos y aplico soluciones creativas. ¡Interactúa con el contenido y descubre más sobre mí!</p>
            <NextPageButtom
                style={{
                    marginLeft: "10%",
                    border: "none",
                    height: "50px",
                    width: "150px"
                }}
                url={"/introduction"}
            >
                Explora ahora
            </NextPageButtom>
        </div >)
}

export default HomeComponentsRight;