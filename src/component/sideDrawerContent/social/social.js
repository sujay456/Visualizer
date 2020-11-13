import React from 'react';
import './social.scss';
const Social =(props)=>{

    return(
        <div className="Social">
            <div className="icon github">
                <a href="https://github.com/sujay456/visualizer" target="__blank"><i className="fab fa-github fa-2x"></i></a>
            </div>
            <div className="icon linkedin">
                <a  href="https://www.linkedin.com/in/sujay-kumar-7382b61aa/" target="__blank" ><i className="fab fa-linkedin-in fa-2x"></i></a>
            </div>
        </div>
    );
}

export default Social;