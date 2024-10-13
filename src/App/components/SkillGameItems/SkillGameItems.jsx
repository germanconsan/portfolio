import React from "react";
import './SkillGameItems.css'

const SkillGameItems = React.forwardRef(({ skill, skillPosition }, ref) => {

    const positionSkillItem = () => {
        switch (skillPosition) {
            case -1: return { alignSelf: "start" }; // Izquierda
            case 0: return { alignSelf: "center" }; // Centro
            case 1: return { alignSelf: "end" }; // Derecha
        }
    }

    const style = {
         height: "50px"
    }

    return (<div className="container-skill-game-items" ref={ref} >
        <div style={positionSkillItem()} >
            <object
                type="image/svg+xml"
                data={skill.img}
                style={style}
            ></object>
        </div>
    </div>)
});

export default SkillGameItems;