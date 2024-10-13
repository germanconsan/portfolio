import React, { useEffect, useRef, useState } from "react";
import './SkillGame.css';
import ModelViewer from "../ModelViewer/ModelViewer";
import SkillGameItems from "../SkillGameItems";
import Modal from "../Modal";
import boom from '../../../asset/img/boom.svg'


import frontIcon from '../../../asset/img/frontend.svg'
import backIcon from '../../../asset/img/backend.svg'
import deployment from '../../../asset/img/deployment.svg'
import designIcon from '../../../asset/img/design.svg'
import dataFormats from '../../../asset/img/dataFormats.svg'


const SkillGame = ({ lives, backLives, collisionIn, reset, changedReset }) => {
    //Estado de inicalización del modal
    const [isModalOpen, setIsModalOpen] = useState(true); // Empieza cerrado
    const [isMounted, setIsMounted] = useState(false); // Para controlar si el componente está montado  

    const [reStartGame, setReStartGame] = useState(reset);
    const [initialGame, setInitialGame] = useState(false);
    const [pauseGame, setPauseGame] = useState(false);
    const [collision, setCollision] = useState(false);
    const [gameLives, setGameLives] = useState(lives);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isScreenMobile, setScreenMobile] = useState(false);

    const [styleBoomValue, setStyleBoomValue] = useState([]);

    // Estado de la exploción de la bomba
    const [isExplosion, setIsExplosion] = useState(false);

    // Posición del coche
    const [positionCar, setPositionCar] = useState(0);
    const positionCarRef = useRef(positionCar);

    const [openSection, setOpenSection] = useState("");

    const toggleDetails = (section) => {
        setOpenSection(prevSection => prevSection === section ? "" : section);
    };

    //Skill por defecto
    const skills = [
        { title: "Frontend", img: frontIcon },
        { title: "Backend", img: backIcon },
        { title: "DevOps", img: deployment },
        { title: "Design", img: designIcon },
        { title: "Data Formats", img: dataFormats }
    ];

    //variable que funciona las skills y sus posiciones aleatorias
    const [skillItems, setSkillItems] = useState([]);

    //asignar la altura de la carreteras segun el numero de SKILL
    const height = skills.length * 100

    //Actualizar la posición del coche.
    const onChange = (newPositionCar) => setPositionCar(newPositionCar);

    // Array de referencias de los elementos SKILL (nos ayudará a saber sus posición).
    const inputRefSkills = useRef([]);

    // Función para agregar referencia a cada elemento
    const addInputSkill = (el, index) => {
        inputRefSkills.current[index] = el;
    };

    useEffect(() => {
        positionCarRef.current = positionCar;
    }, [positionCar, gameLives]);



    useEffect(() => {
         backLives(gameLives);
    }, [gameLives]);

    useEffect(() => {
       if(lives === 3 && reset){
            setGameLives(lives);
            setInitialGame(true);
            changedReset(false);
        }
        console.log(lives);
        
        if (lives === 0) {
            setInitialGame(false);
            
        };
    }, [reset, lives]);





    // useEffect consilción skill
    useEffect(() => {

        inputRefSkills.current.forEach((element, index) => {
            if (element) {
                setInterval(() => {
                    let positionSkill = element.getBoundingClientRect().top
                    if (!collision && positionCarRef.current === skillItems[index].position && positionSkill > 280 && positionSkill < 400) {
                        setCollision(true);
                        setTimeout(() => {
                            setCollision(false);
                        }, 4000)
                        collisionIn(skillItems[index].skill.title);
                        deleteItem(skillItems[index].skill.title);
                    }
                }, 150);
                return () => clearInterval(interval);
            }
        });
    }, [positionCar, skillItems, isSmallScreen]);

    // useEffect consilción Bomba
    useEffect(() => {
        //Comprueba si hay colisión con la bomba
        const elements = document.getElementsByClassName("road-container-skill-boom");
        let firstValue = 300
        let secondValue = 400
        if (isSmallScreen) {
            firstValue = 450
            secondValue = 550
        }
        if (elements) {
            const interval = setInterval(() => {

                for (let i = 0; i < elements.length; i++) {
                    const element = elements[i];
                    const boomPosition = element.getBoundingClientRect();

                    if (positionCarRef.current === styleBoomValue[i][1] && boomPosition.top > firstValue && boomPosition.top < secondValue) {
                        setIsExplosion(true);
                        setPauseGame(true)
                        setGameLives(pre => pre - 1);
                        setTimeout(() => {
                            setIsExplosion(false);
                            setPauseGame(false)
                        }, 2000)
                    }
                }
            }, 110);
            // Limpia el intervalo cuando el componente se desmonte
            return () => clearInterval(interval);
        }
    }, [positionCar, skillItems, isSmallScreen]);


    useEffect(() => {
        // Al montar el componente, se monta el modal
        setIsMounted(true);

        // Agregar los manejadores de eventos
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: false });

        const items = skills.map(skill => {
            const positionItem = Math.floor(Math.random() * 3) - 1; // -1, 0, o 1
            return { skill, position: positionItem };
        });

        setSkillItems(items);

        const styleBoom = () => {
            let nRandom = Math.floor(Math.random() * 3) - 1
            switch (nRandom) {
                case -1: return [{ alignSelf: "start" }, nRandom]; // Izquierda
                case 0: return [{ alignSelf: "center" }, nRandom]; // Centro
                case 1: return [{ alignSelf: "end" }, nRandom]; // Derecha
            }
        }

        for (let i = 0; i < skills.length; i++) {
            setStyleBoomValue(pre => [...pre, styleBoom()])
        }


        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 900); // Cambia 900 por el ancho que deseas detectar
            setScreenMobile(window.innerWidth < 500); // Cambia 900 por el ancho que deseas detectar
        };

        // Llama a la función al montar el componente para obtener el tamaño inicial
        handleResize();

        // Escucha el evento resize
        window.addEventListener('resize', handleResize);

        // Limpiar los eventos al desmontar el componente
        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Solo se ejecuta al montar el componente


    //Funciones del modal
    const closeModal = () => {
        setIsModalOpen(false);
        setInitialGame(true);
    };

    // Función para eliminar una habilidad por título
    const deleteItem = (title) => {
        setSkillItems((prevItems) => {
            // Clona el array para evitar modificar el estado original
            const itemsCopy = [...prevItems];
            // Encuentra el índice del elemento a eliminar
            const index = itemsCopy.findIndex((item) => item.skill.title === title);
            // Si el índice existe, elimina el elemento
            if (index !== -1) {
                itemsCopy.splice(index, 1); // Elimina el elemento
            }
            return itemsCopy;
        });
    };


    //Bloquear el ZOOM
    const handleWheel = (event) => {
        event.preventDefault(); // Prevenir el zoom por la rueda del ratón
    };

    const handleTouchStart = (event) => {
        if (event.touches.length > 1) {
            event.preventDefault(); // Prevenir el zoom por gesto de pellizco
        }
    };


    const styleAnimationInitialPause = {
        animation: `${!initialGame || pauseGame ? "none" : ""}`
    }

    const styleAnimationInitialPause2 = {
        height: `${height}vh`,
        animation: `${!initialGame || pauseGame ? "none" : ""}`
    }


    return (
        <div className="road-container">
            <div className="road">
                <div className="road-pavement"></div>
                <div className="road-container-skill" style={!collision ? styleAnimationInitialPause2 : { animation: "none", height: `${height}vh` }}>
                    {skillItems.map((item, index) => (
                        <React.Fragment key={index} >
                            <SkillGameItems
                                ref={(el) => addInputSkill(el, index)}
                                skill={item.skill}
                                skillPosition={item.position}
                            />
                            <object
                                className="road-container-skill-boom"
                                type="image/svg+xml"
                                data={boom}
                                style={styleBoomValue[index][0]}
                            ></object>
                        </React.Fragment>
                    ))}
                </div>

                <div className="road-line-container">
                    <div className="road-line" style={!collision ? styleAnimationInitialPause : {}}></div>
                    <div className="road-line" style={!collision ? styleAnimationInitialPause : {}}></div>
                    <div className="road-line" style={!collision ? styleAnimationInitialPause : {}}></div>
                    <div className="road-line" style={!collision ? styleAnimationInitialPause : {}}></div>
                </div>
                <div className="road-line-initial" style={!collision ? styleAnimationInitialPause : {}}></div>
            </div>
            <ModelViewer changePositionCar={onChange} isExplosion={isExplosion} ></ModelViewer>
            {isMounted && (
                <Modal isOpen={isModalOpen} onClose={closeModal} buttomName={"Iniciar"} styleModal={{ width: "80%", height: "70%", textAlign: "start" }}>
                    <h1 style={{ textAlign: "center" }}>Jugar!</h1>

                    <div style={{ maxWidth: "80%", margin: "0 auto" }}>
                        <h3>Reglas:</h3>
                        <section>
                            <div className={`details ${openSection === 'objetivo' ? 'open' : ''}`} onClick={() => toggleDetails('objetivo')}>
                                <summary>Objetivo del Juego</summary>
                                <div className={`content ${openSection === 'objetivo' ? 'open' : ''}`}>
                                    <ul>
                                        <li>El objetivo es acumular la mayor cantidad de <strong>habilidades</strong> al esquivar obstáculos a lo largo de la carretera.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className={`details ${openSection === 'controles' ? 'open' : ''}`} onClick={() => toggleDetails('controles')}>
                                <summary>Controles</summary>
                                <div className={`content ${openSection === 'controles' ? 'open' : ''}`}>
                                    <ul>
                                        {!isScreenMobile ? <li><strong>Teclado:</strong> Utiliza las flechas izquierda y derecha para mover el vehículo en la carretera.</li> :
                                            <li><strong>Dispositivos Móviles:</strong> Desliza hacia la izquierda o derecha para mover el vehículo.</li>}
                                    </ul>
                                </div>
                            </div>
                            <div className={`details ${openSection === 'obstaculos' ? 'open' : ''}`} onClick={() => toggleDetails('obstaculos')}>
                                <summary>Obstáculos</summary>

                                <div className={`content ${openSection === 'obstaculos' ? 'open' : ''}`}>
                                    <ul>
                                        <li>Existen obstáculos en la carretera (<strong>bombas</strong>). Chocar con ellas resultará en la pérdida de una vida.</li>
                                        <li>El juego comienza con tres vidas. Cuando se pierden todas las vidas, el juego termina.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </div>




                </Modal>
            )}


        </div>
    );
}

export default SkillGame;
