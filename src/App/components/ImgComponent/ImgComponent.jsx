import React, { useEffect, useRef, useState } from "react";
import './ImgComponent.css';
import anime from "animejs";

const ImgComponent = ({  onClick, srcImg, alt, heightImg, widthImg, heightContainer, widthContainer }) => {

    const imgRef = useRef(null);
    const [styleContainer, setStyleContainer] = useState(
        {
            height: "",
            width: "",

        }
    );

    const [styleImg, setStyleImg] = useState(
        {
            height: "",
            width: ""
        }
    );

    useEffect(() => {
        setStyleContainer({
            height: heightContainer,
            width: widthContainer,

        })

        setStyleImg({
            height: heightImg,
            width: widthImg
        })

       
        
    }, []);



    const imgElement = imgRef.current;
    
    const handleMouseEnter = (event) => {
        const rect = imgElement.getBoundingClientRect(); // Obtener posición y tamaño del elemento
        const x = event.clientX - rect.left; // Posición X relativa al elemento
        const y = event.clientY - rect.top; // Posición Y relativa al elemento

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 50; // Rango de rotación Y basado en la posición del ratón
        const rotateX = ((y - centerY) / centerY) * 50;
       
    
        anime({
            targets: imgElement,
            scale: 1, // Volver a tamaño normal
            rotateY: rotateY, // Resetear rotación
            rotateX: rotateX,
            easing: 'easeOutQuad',
            duration: 500,
        });

    };
   
    const handleMouseLeave = () => {
        anime({
            targets: imgElement,
            scale: 1, // Volver a tamaño normal
            rotateY: 0, // Resetear rotación
            rotateX: 0,
            easing: 'easeOutQuad',
            duration: 500,
        });

    }


    return (
        <div    onClick={onClick}
                className="container-imgComponent"
                style={styleContainer}
                >
            <img    ref={imgRef}
                    style={styleImg} 
                    src={srcImg} 
                    alt={alt}
                    className="container-imgComponent-img"
                    onMouseMove={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    />
        </div>
    )
}

export default ImgComponent;