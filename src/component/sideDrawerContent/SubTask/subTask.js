import React from 'react';
import {NavLink} from 'react-router-dom';
import './subTask.scss';

const SubTask=(props)=>{
    

    return(
        <NavLink onClick={props.onclick} className="subTask" to={props.link}>{props.children}</NavLink>
    );
}

export default SubTask;