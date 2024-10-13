import React from "react";
import "./IntroductionPage.css";
import Title from "../../components/Title";
import srcImg from '../../../asset/img/IntroducctionImg.jpg';
import ImgComponent from "../../components/ImgComponent/ImgComponent";
import NextPageButtom from "../../components/NextPageButtom";
import Text from "../../components/Text";
import Modal from "../../components/Modal";


class IntroductionPage extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            isMounted: false
        }

    }

    setIsModalOpen = (state) => {
        this.setState(
            {
                isModalOpen: state
            },
            () => {
                console.log('Modal Open: ', this.state.isModalOpen); // Ahora muestra el estado actualizado
            }
        );
    }

    setIsMounted = (state) => {
        this.setState(
            {
                isMounted: state
            },
            () => {
                console.log('Modal Montado: ', this.state.isMounted); // Ahora muestra el estado actualizado
            }
        );
    }


    closeModal = () => this.setIsModalOpen(false);
    openModal = () => this.setIsModalOpen(true);


    componentDidMount() {
        this.setIsMounted(true);
    }

    render() {
        return (<div className="container-introductionPage">
            <NextPageButtom style={{
                height: "8%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                margin: "50px 50px 0px 0px"
            }}
                url={"/skills"}
            >
                Siguiente
            </NextPageButtom>
            <Title title={"Introducción"}></Title>
            <div className="container-introductionPage__flex">
                <Text>
                    <p>Este es mi portfolio, un espacio donde quiero compartir mi experiencia y habilidades como desarrollador full-stack. He construido este sitio con React, no solo porque es una herramienta potente y flexible, sino porque me permite crear experiencias interactivas y dinámicas, algo que considero fundamental en el desarrollo moderno.</p>
                    <p>A lo largo de esta página, verás ejemplos de mi trabajo, desde interfaces limpias hasta funcionalidades bien diseñadas. Mi enfoque en el detalle y la interacción es algo que me apasiona, y espero que puedas apreciar la creatividad detrás de cada elemento visual. Si te fijas en la imagen junto a este texto, hay un pequeño detalle que cobra vida cuando pasas el mouse sobre ella; es una forma de invitarte a explorar lo que puedo ofrecerte a través de mis proyectos.</p>
                </Text>
                <ImgComponent onClick={this.openModal} srcImg={srcImg} alt={"Imagen de introducción"} heightImg={"444px"} widthImg={"444px"} heightContainer={"100%"} widthContainer={"30%"} />
                {this.state.isMounted && (
                    <Modal isOpen={this.state.isModalOpen} onClose={this.closeModal} buttomName={"Close"}>
                        <h2>Explora la animación interactiva</h2>

                        <p><strong>Rotación en 3D:</strong></p>
                        <p>
                            La posición del ratón sobre la imagen determina cómo se rota en los ejes <strong>X</strong> e <strong>Y</strong>.
                            Al mover el ratón, la imagen parece inclinarse hacia diferentes ángulos.
                        </p>

                        <p><strong>Escalado al tamaño normal:</strong></p>
                        <p>
                            Cuando el ratón se desplaza sobre la imagen, esta mantiene su escala <strong>(1x)</strong>, sin ampliarse ni reducirse,
                            y solo rota en 3D.
                        </p>

                        <p><strong>Restauración suave:</strong></p>
                        <p>
                            Al sacar el ratón de la imagen, esta regresa suavemente a su posición inicial con rotación 0 en ambos ejes,
                            creando un efecto de retorno fluido.
                        </p>

                        <p><strong>Anime.js:</strong></p>
                        <p>
                            La librería <strong>anime.js</strong> es la encargada de animar la rotación y el movimiento de la imagen.
                            Es muy eficiente para realizar este tipo de animaciones complejas de manera sencilla.
                        </p>
                    </Modal>
                )}
            </div>
        </div>)
    }
}

export default IntroductionPage;