import React, { Component } from "react";
import HomeImg from "../../components/HomeImage";
import HomeComponentsRight from "../../components/HomeComponentsRight";
import './Home.css'
import imgPortada from "../../../asset/img/profile-d.jpg";

class Home extends React.Component {

    handleChildAction = () => {
       
    };
    
    render() {
        return (
            <div className="home-container">
                <HomeImg height={"calc(100vh - 70px)"} width={"40%"}  backgroundImage = {imgPortada} />
                <HomeComponentsRight/>
            </div>
        )
    }
}

export default Home;