import React from 'react';

import {connect} from 'react-redux';
import * as actionType from '../../../store/actions/actions';

import {NavLink} from 'react-router-dom';
import './subTask.scss';

const SubTask=(props)=>{
    

    return(
        <NavLink onClick={()=>{ props.setConsoleMessage(''); props.onclick() }} className="subTask" to={props.link}>{props.children}</NavLink>
    );
}
const mapStateToProps=(state)=>{
    return{
        consoleMessage:state.consoleMessage
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        setConsoleMessage:(mssg,type)=>{dispatch({type:actionType.SET_CONSOLEMESSAGE,mssg:mssg,mssgType:type})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SubTask);