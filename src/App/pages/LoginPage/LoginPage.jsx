import React, { Component } from "react";
import Login from "../../components/Login";
import './LoginPage.css';
import Register from "../../components/Register";
import withLoader from "../../HOC/WithLoader";



class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
    };
    this.login = props.login;
  }

  
  

  handleChildAction = (data) => {
    
    const div2 = document.getElementById('otherDiv');
    const div1 = document.getElementById('loginContainer');
    const div1Rect = div1.getBoundingClientRect();
    if(data && div1 && div2){
        div2.style.left = `${div1Rect.left}px`;
        div2.style.transition = "0.6s";
        this.login = false;
    }else if(!data && div1 && div2){
        div2.style.left = `${div1Rect.right}px`;
        div2.style.transition = "0.6s";
        this.login = true;
    }
  };
  
  componentDidMount() {
    this.syncHeightsAndWidths();
    window.addEventListener('resize', this.syncHeightsAndWidths); // Re-sincroniza en caso de cambio de tamaño de ventana
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.syncHeightsAndWidths); // Limpia el evento al desmontar
  }

  componentDidUpdate(prevProps, prevState) {
    // Verifica cambios relevantes para evitar sincronización innecesaria
    if (prevProps.isLoading !== this.props.isLoading ||  
        prevState.width !== this.state.width) {
      // Usa un timeout para asegurar que el DOM esté actualizado
      setTimeout(this.syncHeightsAndWidths, 0);
    }
  }

  syncHeightsAndWidths = () => {
    
    const div1 = document.getElementById('loginContainer');
    const div2 = document.getElementById('otherDiv');

    
    if(div1 && div2 && !this.login){
        const div1Rect = div1.getBoundingClientRect();
      
        // Sincroniza altura y anchura
        div2.style.width = `${div1Rect.width}px`;
        // Alinear `otherDiv` al borde derecho de `loginContainer`
        div2.style.position = 'absolute';
        div2.style.top = `${div1Rect.top-120}px`;
        div2.style.left = `${div1Rect.left}px`;
        div2.style.transition = 'none';
  
        // Actualiza el estado para reflejar los valores actuales
        this.setState({  width: div1Rect.width });

    }else if(div1 && div2){

        const div1Rect = div1.getBoundingClientRect();
      
        // Sincroniza altura y anchura
        div2.style.width = `${div1Rect.width}px`;
        
        // Alinear `otherDiv` al borde derecho de `loginContainer`
        div2.style.position = 'absolute';
        div2.style.top = `${div1Rect.top-120}px`;
        div2.style.left = `${div1Rect.right}px`;

        div2.style.transition = 'none';
  
        // Actualiza el estado para reflejar los valores actuales
        this.setState({  width: div1Rect.width });

    }
  };

  render() {
    return (
      <div className="container-login-Register">
        <Login id="loginContainer"
               isLoading={this.props.isLoading} 
               setIsLoading={this.props.setIsLoading}
               onAction={this.handleChildAction} />
        <Register 
              isLoading={this.props.isLoading} 
              setIsLoading={this.props.setIsLoading}
              onAction={this.handleChildAction} />
        <div id="otherDiv" className="container-login-Register-hidden"></div>
      </div>
    );
  }
}

export default withLoader(LoginPage);
