import React from "react";
import './Text.css';

const Text = ({ children }) => {
    return (
        <div className="container-text">
            {children}
        </div>
    )
}

export default Text;