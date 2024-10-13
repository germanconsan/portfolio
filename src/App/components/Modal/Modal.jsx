import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import ButtomComponent from '../ButtomComponent';

const Modal = ({ isOpen, onClose, children, buttomName, styleModal, secondButton, secondButtomName, onFunction }) => {
    if (!isOpen) return null;


    return ReactDOM.createPortal(
        <div className='modal'>
            <div className='modal-content' style={styleModal}>
                {children}


                {secondButton ?
                    <div className='container-two-button'>
                        <ButtomComponent onClose={onClose} style={{ display: "flex", justifyContent: "center" }} isFor={'modal'}> {buttomName}</ButtomComponent>
                        <ButtomComponent onClose={onFunction} style={{ display: "flex", justifyContent: "center" }} isFor={'modal'}> {secondButtomName}</ButtomComponent>
                    </div> :
                        <ButtomComponent onClose={onClose} style={{ display: "flex", justifyContent: "center" }} isFor={'modal'}> {buttomName}</ButtomComponent>
                }
            </div>
        </div>,
        document.getElementById('modal-root')
    )
}
export default Modal;