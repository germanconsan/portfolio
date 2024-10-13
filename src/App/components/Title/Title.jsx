import React, { useEffect, useState } from "react";
import './Title.css';

const Title = ({title, containerTitleSize}) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 900); // Cambia 900 por el ancho que deseas detectar
        };

        // Llama a la función al montar el componente para obtener el tamaño inicial
        handleResize();

        // Escucha el evento resize
        window.addEventListener('resize', handleResize);

        // Limpia el evento al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    
    const style = {
        fontSize: "2rem"
        
    };
    const style2 = () => {
        if(containerTitleSize!==null && isSmallScreen){
            
            
            return{height: containerTitleSize+"rem"}
        }
        return null
    }
    return(<div className="container-title" style={style2()}>
            <h1 className={"container-title-text"} style={isSmallScreen ? style : {}}>{title}</h1>
            <div className="container-title-bar"></div>
        </div>);
}

export default Title;