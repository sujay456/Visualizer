import React,{useRef} from 'react';
import './interaction.scss';
import Button from '../RunButton/run';
import {connect} from 'react-redux';
import * as actionType from '../../../store/actions/actions';

const Interaction =(props)=>{
    const inputRef=useRef(null);

    const getInput=()=>{
        if(!props.paused)
            return;
        let StringArray=inputRef.current.innerText.split(',');
        // console.log(StringArray);

        let arr=[];
        for(let x of StringArray)
        {
            
            if(parseInt(x))
                arr.push(parseInt(x));
            else
            {
                console.log('Invalid Format');
                props.setConsoleMessage('Invalid Format!!',false);
                return;
            }
        }
        if(arr.length>10)
        {
            props.setConsoleMessage('Elements Exceeded,Please Enter 10 elements only !',false); return;
        }
        
        props.setConsoleMessage('Running...',true); 
        // console.log(arr);

        props.setArray(arr);
        props.toggle(true);
    }

    return(
        <div className="Interaction">
            <div className="input tab">
                <p className="input-header Interaction-header">Input  </p>
                <div ref={inputRef} contentEditable data-placeholder="Enter array in format 10,1,12,69 ....  Only 10 elements!!!"></div>
                <Button onclick={getInput} />    
            </div>
            <div className="console tab">
                <p className="code-header Interaction-header">Console</p>
                <p  style={props.consoleMessage.type?{color:'green'}:{color:'red'}} >{props.consoleMessage.mssg}</p>
            </div>
            
        </div>
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
export default connect(mapStateToProps,mapDispatchToProps)(Interaction);