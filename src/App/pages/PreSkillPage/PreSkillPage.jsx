import React from "react";
import './PreSkillPage.css'
import NextPageButtom from "../../components/NextPageButtom";
import img from '../../../asset/img/captura-game.jpg'

class PreSkillPage extends React.Component {

    render() {
        return (

            <div className="container-preskill-page">
                <div className="container-preskill-page-box">
                    <div className="container-preskill-page-title">
                        <h1 className="container-preskill-page-option-title">Elige la experiencia para conocer mis habilidades:</h1>
                    </div>
                    <div className="container-preskill-page-options">

                        <div className="container-preskill-page-option">
                            <h2 className="container-preskill-page-option-title">
                                Minimalista:
                            </h2>
                            <p className="container-preskill-page-option-text">Para quienes prefieran un enfoque más simple y directo.</p>
                            <NextPageButtom style={{
                                height: "50px",
                                width: "100%",
                                display: "flex",
                                justifyContent: "center"
                            }}
                                url={"/skills-list"}

                            >Ir a</NextPageButtom>
                        </div>

                        <div className="separator"></div>
                        <div className="container-preskill-page-option">
                            <h2 className="container-preskill-page-option-title">
                                Interactivo (juego):
                            </h2>
                            <p className="container-preskill-page-option-text">Para los que quieran probar algo más dinámico y divertido.</p>

                            <NextPageButtom
                                style={{
                                    height: "50px",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center"
                                }}
                                url={"/skill-game"}
                            >Jugar</NextPageButtom>
                            <div className="container-preskill-page-option-img" >
                                <img src={img}
                                    alt="imagen probando juego..."
                                />
                            </div>


                        </div>
                    </div>
                </div>
            </div >


        )
    }
}
export default PreSkillPage;