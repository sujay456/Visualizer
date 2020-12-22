import React from 'react';
import './Node.scss';

const Node =(props)=>{

    return (
    <div className="Node" style={{left:`${props.left-20}px`,top:`${props.top}px`}} >{props.children}</div>
    );
    
}

export default Node;