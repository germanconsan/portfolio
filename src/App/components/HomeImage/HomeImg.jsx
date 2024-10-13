import React, { useEffect, useState } from "react";
import './HomeImg.css'

const HomeImg = ({height, width, backgroundImage}) => {

    const [style, setStyle] = useState({
        height: "",
        width: "",
        backgroundImage : "",
       
    });
    useEffect(() => {
        setStyle({
            height: height,
            width: width,
            backgroundImage: `url("${backgroundImage}")`,
        })
    }, [])


    return (<div style={style}
        className="container-home-img"></div>
    )
}

export default HomeImg