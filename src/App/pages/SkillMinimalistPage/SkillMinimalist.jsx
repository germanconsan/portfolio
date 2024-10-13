import React from "react";
import './SkillMinimalist.css';
import SvgViewer from "../../components/SvgViewer";
import jsIcon from '../../../asset/img/javascript.svg'
import laravelIcon from '../../../asset/img/laravel.svg'
import devOpsIcon from '../../../asset/img/aws.svg'
import figmaIcon from '../../../asset/img/figma.svg'
import frontIcon from '../../../asset/img/frontend.svg'
import backIcon from '../../../asset/img/backend.svg'
import deployment from '../../../asset/img/deployment.svg'
import designIcon from '../../../asset/img/design.svg'
import dataFormats from '../../../asset/img/dataFormats.svg'
import SkillListText from "../../components/SkillListText";
import Title from "../../components/Title";


class SkillMinimalist extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            scrollPosition: 0,
            maxScroll: 0,
            position: [],
            animationText: false

        };
        this.skillRefs = [];
    }


    handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        this.setState({ scrollPosition: scrollTop });
    };

    updateMaxScroll = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        this.setState({ maxScroll: maxScroll });
        this.updatePositions();
        return (maxScroll);
    };


    updatePositions = () => {
        const element = [];
        let contador = 0
        for (let index = 0; index < 5; index++) {
            element[index] = (contador = contador + (this.state.maxScroll / 5))
        }
        this.setState({ position: element })
    };




    positions = (value) => {
        const element = [];
        for (let index = 0; index < this.skills.length; index++) {
            element.push(this.state.position = + this.state.position + (value / 5));
        }
        this.setState({ position: element })
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.updateMaxScroll);
        this.positions(this.updateMaxScroll());
        setTimeout(() => {
            this.setState({ animationText: true })
        }, 1000)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.updateMaxScroll);
    }

    skills = [
        { title: "Frontend", skill: [["HTML 5", "header, footer, article, section, y aside", "audio y video", "Formularios"], ["CSS 3", "Diseños minimalistas", "Animaciones", "Flex", "Grid", "Responsive"], ["JavaScript", "Consumo de APIs", "Anime.js", "Three.js", "Chart.js", "jQuery"], ["TypeScript", "Interfaces", "Estructuras APIs RESTful"], ["Npm", "Nvm", "Configuración de entorno"], ["React", "Estados", "Servicios", "Componentes"], ["Angular 16 y 17", "RxJS", "Servicios", "Componentes"]], img: frontIcon },
        { title: "Backend", skill: [["PHP", "Programación orientada a objetos", "MVC", "APIs", "CRUD", "Peticiones SQL", "Email"],["SQL", "Manejo de Datos", "Creación y Manipulación de Tablas", "Claves y Relaciones", "Procedimientos Almacenados y Funciones", "Consultas Avanzadas"], ["Laravel 10", "MCV", "APIs RESTful", "Email", "Plantillas", "Middleware de Autenticación", "Componentes"],["JAVA", "Programación orientada a objetos","APIs"] , ["MySQL", "Instalación", "Manejo de BBDD"]], img: backIcon },
        { title: "DevOps", skill: [["AWS", "Creación de Instancias EC2", "Configuración de Seguridad", "Gestión de Almacenamiento", "Acceso y Conexión", "Despliegue de Aplicaciones", "AWS CodeDeploy"], ["Docker", "Configuración de Contenedores", "Docker Compose", "Integración de Servicios"], ["Git", "Control de Versiones", "Comandos Básicos", "Gestión de Ramas", "Resolución de Conflictos", "Uso de .gitignore"], ["Git Flow", "Estrategia de Ramificación", "Creación de Ramas: Faeture, hitfix, release",  "Fusión de Ramas", "Publicación de Ramas", "Versionado",  "Colaboración en Equipo"], ["Git Hub", "Ramas", "Git Hub Actions", "Pull Requests"]], img: deployment },
        { title: "Design", skill: [["Figma", "Diseño de Interfaces", "Prototipado Interactivo", "Creación y Uso de Componentes", "Trabajo Colaborativo en Tiempo Real", "Diseño de Iconos y Vectorial"], ["Inkscape", "Creación de Gráficos Vectoriales", "Edición de Gráficos", "Texto y Tipografía", "Color y Estilo", "Exportación de Archivos", "Uso de Capas", "Dieño de Iconos y Gráficos Simples", " Interactividad y Animación"]], img: designIcon },
        { title: "Data Formats", skill: ["XML", "JSON", "YAML"], img: dataFormats }
    ];


    style2 = {
        height: "200vh"
    }


    style(index) {

        const transition = "1s";
        for (let i = 0; i < this.skills.length; i++) {
            if (index === 0 && this.state.position[index] >= this.state.scrollPosition) {
                return { opacity: 1 }
            } else {
                if (index === i && this.state.position[index] >= this.state.scrollPosition && this.state.position[index - 1] <= this.state.scrollPosition) {
                    return { opacity: 1 }
                }
            }
        }
        if (this.state.scrollPosition > this.state.position[index]) {
            return {
                transform: "scale(1.8)",
                transition: transition
            }
        } else if (this.state.scrollPosition < this.state.position[index]) {

            return {
                transform: "scale(0.8)",
                transition: transition
            }
        }

    }
    render() {
        return (
            <>

                <div style={{ position: "fixed", width: "100%", marginTop: "2%" }}>
                    <div className="container-skillminimalist-text">
                        <Title title={"Habilidades"} />
                        <p style={this.state.animationText ? { left: "0%" } : {}} className="container-skillminimalist-text-paragraph">
                            &#9888; Usa el <strong>scroll</strong> para ver las todas mis habilidades
                        </p>
                    </div>
                    {
                        this.skills.map((skill, index) =>
                            <div
                                style={this.style(index)}
                                className={"container-skillminimalist"}
                                key={index}>
                                <SvgViewer skillIcon={skill.img} />
                                <SkillListText skill={skill} />
                            </div>
                        )}
                </div>
                <div style={this.style2}></div>
            </>)

    }

}

export default SkillMinimalist;