import React from "react";

// Componente que utiliza render props
class MouseTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
                        x:      0,
                        y:      0, 
                        name:   'Germán' 
                    };
    }

    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY,
            name: ''
        });
    };

    render() {
        return (

            <div style={{ width: '90vh', margin: '0 auto', height: '100vh', backgroundColor: 'gray' }} onMouseMove={this.handleMouseMove}>
                {/* Aquí se usa el render prop que viene como una función */}
                {this.props.render(this.state)}

            </div>
        );
    }
}




// Componente que usa el MouseTracker
const PruebaApp = () => (


    <MouseTracker
        render={({ x, y, name }) => (
            <>
                <h1>
                    El ratón está en ({x}, {y})
                </h1>
                <h3>My name is {name}</h3>
            </>
        )}
    />


);

export default PruebaApp;
