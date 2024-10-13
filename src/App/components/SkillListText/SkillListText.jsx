import React, { useEffect, useState } from "react";
import './SkillListText.css'

const SkillListText = ({ skill }) => {

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [contador, setContador] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 800);
        };

        handleResize();

        // Escucha el evento resize
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [])

    const style = (index, length) => {
        if (contador >= length) setContador(index);
        if (contador < 0) setContador(0);
        return {
            left: (index === contador - 1) ? "-100%" : (index === contador) ? "0%" : (index === contador + 1) ? "100%" : "",
            transition: "1s"
        }
    }
    return (
        <>{isSmallScreen&&(<div style={{textAlign:"center", width: "100%"}}><h1 className="container-skill-list-text-title" style={{marginLeft: "0%"}}>{skill.title}</h1></div>)}
            {!isSmallScreen ?
                (<div className="container-skill-list-text">
                    <h1 className="container-skill-list-text-title">{skill.title}</h1>
                    <ul className="container-skill-list-flex">
                        {skill.skill.map((skillItem, index) =>
                            <li key={index} className="container-skill-list-text-content">
                                {Array.isArray(skillItem) ? (
                                    <>
                                        {/* Elemento principal */}
                                        {skillItem[0]}
                                        {/* Subitem */}
                                        <ul>
                                            {skillItem.slice(1).map((subItem, subIndex) => (
                                                <li key={subIndex} className="container-skill-list-subitem">
                                                    {subItem}
                                                </li>
                                            ))}</ul>
                                    </>
                                ) : (
                                    // Si no es un array, simplemente muestra el item
                                    skillItem
                                )}
                            </li>
                        )}
                    </ul>
                </div>) : (<div className="container-skill-list-viewer">
                    <div className="container-skill-list-viewer-buttom">
                        <button className="container-skill-list-viewer-buttom-b" onClick={() => { setContador(pre => pre - 1) }}>
                            <div className="container-skill-list-viewer-buttom-b-arrow1"></div>
                            <div className="container-skill-list-viewer-buttom-b-arrow2"></div>
                        </button>
                    </div>

                    <div className="container-skill-list-viewer-window">
                        {skill.skill.map((skillItem, index) => {
                            const length = skill.skill.length;

                            return (
                                <div className="container-skill-list-viewer-window-item" key={index} style={style(index, length)}>
                                    
                                    <div style={{ width: "100%", backgroundColor: "#2d2d2d", height: "90%" }}>
                                        <ul className="container-skill-list-viewer-item-title">
                                            <li className="container-skill-list-text-content">

                                                {Array.isArray(skillItem) ? (
                                                    <>
                                                        {/* Elemento principal */}
                                                        {skillItem[0]}
                                                        {/* Subitem */}
                                                        <ul>
                                                            {skillItem.slice(1).map((subItem, subIndex) => (
                                                                <li key={subIndex} className="container-skill-list-subitem">
                                                                    {subItem}
                                                                </li>
                                                            ))}</ul>
                                                    </>
                                                ) : (
                                                    // Si no es un array, simplemente muestra el item
                                                    skillItem
                                                )}
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            )
                        })}
                    </div>
                    <div className="container-skill-list-viewer-buttom">
                        <button className="container-skill-list-viewer-buttom-b-r" onClick={() => { setContador(pre => pre + 1) }}>
                            <div className="container-skill-list-viewer-buttom-b-arrow1"></div>
                            <div className="container-skill-list-viewer-buttom-b-arrow2"></div>
                        </button>
                    </div>
                </div>)}

        </>
    )
}

export default SkillListText;