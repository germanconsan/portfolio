import React from "react";
import SkillGame from "../../components/SkillGame";
import './SkillGamePage.css'
import Title from "../../components/Title";
import LivesGame from "../../components/LiveGame";
import ShowSkilGame from "../../components/ShowSkilGame";
import Modal from "../../components/Modal";
class SkillGamePage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            lives: 3, // Valor inicial de lives
            skillsCollision: [],
            score: 0,
            isModalOpen: false,
            isMounted: false,
            reset: false
        };

        // Vincular el método updateLives
        this.updateLives = this.updateLives.bind(this);
        this.updateCollisionIn = this.updateCollisionIn.bind(this);
    }

    // Método para actualizar el valor de lives
    updateLives(newLives) {
        this.setState({ lives: newLives });
        if (newLives === 0) {
            this.openModal();
        }
    };

    updateCollisionIn(newSkillsCollision) {
        this.setState((prevState) => {
            // Verifica si el valor de `skillsCollision` ha cambiado
            const hasChanged = !prevState.skillsCollision.includes(newSkillsCollision);
            if (hasChanged) {
                return {
                    skillsCollision: [...prevState.skillsCollision, newSkillsCollision],
                    score: prevState.score + 20
                };
            }
            return null; // Si no ha cambiado, no hace nada
        });


    };


    setIsModalOpen = (state) => {
        this.setState({
            isModalOpen: state
        });
    }

    setIsMounted = (state) => {
        this.setState({
            isMounted: state
        });
    }



    closeModal = () => this.setIsModalOpen(false);
    openModal = () => this.setIsModalOpen(true);

    playAgain = () => {
        this.closeModal();
        this.updateLives(3);
        this.setState({ reset: true });
        this.setState({skillsCollision: this.state.skillsCollision=[]})
    }

    componentDidMount() {
        this.setIsMounted(true);
    }

    changedReset = (value) => {
        this.setState({ reset: value });
    };

    render() {
        return (<div className="container-skillPage">

            <div className="container-skillPage-title">
                <Title title={"Habilidades"} containerTitleSize={3} />
                <div className="container-skillPage-data">
                    <LivesGame lives={this.state.lives} />
                    <div className="container-skillPage-score">
                        <div className="container-skillPage-score-text">
                            <div><p className="container-skillPage-score-text-size">Puntuación: {this.state.score}%</p></div>
                        </div>
                        <div
                            style={{ width: this.state.score + "%" }}
                            className="container-skillPage-score-bar"></div>
                    </div>
                </div>
                <ShowSkilGame newSkillsCollision={this.state.skillsCollision} />
            </div>
            <SkillGame lives={this.state.lives} backLives={this.updateLives} collisionIn={this.updateCollisionIn} reset={this.state.reset} changedReset={this.changedReset} />
            {this.state.isMounted && (
                <Modal isOpen={this.state.isModalOpen} onClose={this.closeModal}
                    buttomName={"Saltar juego"}
                    styleModal={{
                        width: "81%",
                        height: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly"
                    }}
                    secondButton={true}
                    secondButtomName={"Jugar de nuevo"}
                    onFunction={this.playAgain} >
                    <h1>!Partida termina!</h1>
                    <h2>Para poder ver mis habilidades debes acumular todas</h2>
                    <p>Si saltas en juego iras directamente a la experiencia minimalista</p>
                </Modal>
            )}
        </div>);
    }

}


export default SkillGamePage;