import React, {useEffect, useState} from "react";


const MyComponent = () =>{
    useEffect(() => {
    
    });
    return <div>Hello world</div>
}

const FullName = ( {name,surname} ) =>{
    const [ fullName, setFullName ] = useState();
    useEffect(() => {
        setFullName(`${name} ${surname}`)
    }, [name, surname]); 
    //Se declaran qué se va a tener en cuenta a la hora de hacer un renderizado nuevo. Si no hay cambios con el render
    //anterior, esto no se renderiza, en cambio, si por ejemplo "name" cambia, se haria un render nuevo
    return <div>Hello {fullName}</div>
}

export const Counter = ()=> {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(
            () => setCounter(c => c + 1), 1000
        );
        return() => clearInterval(interval); //Cuando se destruye el componente.
    },[]);

    return <p>{counter}</p>
}


export default FullName;
