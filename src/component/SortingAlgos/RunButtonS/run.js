import React from 'react';
import './run.scss';

const RunButton=(props)=>{
    return (
        <button type="button" onClick={props.onclick} className="RunButton" >Run</button>
    )

}

export default RunButton;