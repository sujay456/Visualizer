import React from 'react';
import './button.scss';
const GRAbutton=(props)=>{

    return (
        <button type="button" className="GRAbutton" onClick={props.onclick} >Or generate Random Array</button>
    )

}

export default GRAbutton;