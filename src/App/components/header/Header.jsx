import React, { Component } from "react";
import './Header.css'
import { NavLink } from 'react-router-dom';
import { Auth } from "../../../services/Auth";
import logoButton from '../../../asset/img/barras.svg';
import anime from "animejs";


class Header extends React.Component {

    constructor(props) {
        super(props);
        // Inicializamos el estado
        this.status = {
            status: false
        };
    }
    _auth = new Auth();

    runResposive() {
        this.setState(
            { status: this.status.status = !this.status.status }
        );

        let imgResposive = document.getElementById("imgResposive");
        let enlaces = document.getElementById("contendorEnlaces");
        
        
        if (!this.status.status) {
            if (imgResposive) {
                const svgImgDocument = imgResposive.contentDocument;
                const bar1 = svgImgDocument.getElementById('bar1')
                const bar2 = svgImgDocument.getElementById('bar2')
                const bar3 = svgImgDocument.getElementById('bar3')
                anime({
                    targets: [bar1, bar2, bar3],
                    translateY: 0,
                    translateX: 0,
                    rotate: 0,
                    easing: 'easeInOutQuad',
                    duration: 500,
                });
            }
            enlaces.style.opacity = 0;
            enlaces.style.transition = '0.5s';
            setTimeout(() => {
                enlaces.style.display = "none";
            }, 500)

        } else {
            if (imgResposive) {
                const svgImgDocument = imgResposive.contentDocument;
                const bar1 = svgImgDocument.getElementById('bar1')
                const bar2 = svgImgDocument.getElementById('bar2')
                const bar3 = svgImgDocument.getElementById('bar3')
    
                anime({
                    targets: bar2, // El contenedor del componente
                    translateX: [0, -52],
                    easing: 'easeInOutQuad',
                    duration: 500, // Duración de 
                });
                bar1.style.transformOrigin = "center center";
                bar3.style.transformOrigin = "center center";
                anime({
                    targets: bar1,
                    translateY: 11,
                    translateX: -11,
                    rotate: 45,
                    easing: 'easeInOutQuad',
                    duration: 500,
                });
    
                anime({
                    targets: bar3,
                    translateY: -12.5,
                    translateX: -18,
                    rotate: -45,
                    easing: 'easeInOutQuad',
                    duration: 500,
                });
            }

            enlaces.style.display = "flex";
            setTimeout(() => {
                enlaces.style.opacity = 1;
                enlaces.style.transition = '0.5s';
            }, 500)

        }
    }



    async logout() {

        try {
            const reponseServe = await this._auth.logout();

            console.log(reponseServe);

            if (!this._auth.getToken()) {
                window.location.href = '/login';
            }
        } catch (error) {

        }

    }

    render() {
        return (
            <header>
                <div id="contendor-name">
                    <p onClick={
                        () => {
                            window.location.href = '/';
                        }}
                        className="contendor-name-text"><strong>Germán Conde Sánchez</strong></p>
                    <div className="contenedor-header-button__reponsive">
                        <div
                            onClick={() => this.runResposive()}
                            className="contenedor-header-button__reponsive-div"
                        ></div>
                        <object
                            className="contenedor-header-button__reponsive-img"
                            id="imgResposive"
                            type="image/svg+xml"
                            data={logoButton}

                        ></object>
                    </div>

                </div>

                <div id="contendorEnlaces">


                    <NavLink to="/introduction"
                        exact
                        activeClassName="nav-active"
                    >

                        <div className="enlaces">
                            <div className="barraTop"></div>
                            <p><strong>Introducción</strong></p>
                            <div className="barraBottom"></div>
                        </div>

                    </NavLink>



                    <NavLink to="/skills"

                        activeClassName="nav-active"
                    >
                        <div className="enlaces">
                            <div className="barraTop"></div>
                            <p className="textList"><strong>Habilidades</strong></p>
                            <div className="barraBottom"></div>
                        </div>

                    </NavLink>


                    <NavLink to="/about-me"

                        activeClassName="nav-active"
                    >
                        <div className="enlaces">
                            <div className="barraTop"></div>

                            <p className="textList"><strong>Sobre mi</strong></p>

                            <div className="barraBottom"></div>
                        </div>

                    </NavLink>

                    <NavLink to="/contact"

                        activeClassName="nav-active"
                    >
                        <div className="enlaces">
                            <div className="barraTop"></div>

                            <p className="textList"><strong>Contacto</strong></p>

                            <div className="barraBottom"></div>
                        </div>

                    </NavLink>



                    {/* 

                    <div style={{ cursor: 'pointer' }}
                        onClick={
                            () => this.logout()
                        }>
                        <div className="enlaces">
                            <div className="barraTop"></div>

                            <p className="textList"><strong>Contact</strong></p>

                            <div className="barraBottom"></div>
                        </div>

                    </div> */}

                </div>
            </header >
        )

    }
}

export default Header;