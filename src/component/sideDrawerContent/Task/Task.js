import React from 'react';


import './task.scss';
const Task =(props)=>{
    return(
        <div style={{color:props.color}} className="Task">
            <p className="TaskName">{props.taskname}</p>
            {props.children}
        </div>
    );
}

export default Task;