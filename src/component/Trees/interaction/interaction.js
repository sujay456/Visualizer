import React,{useRef} from 'react';
import './interaction.scss';
import Button from '../RunButton/run';
const Interaction=(props)=>{

    const selectRef=useRef(null);
    const divRef=useRef(null);
    const getInput=()=>
    {
        // console.log(selectRef.current.value,divRef.current.innerText);
        let order=selectRef.current.value;
        let StringArray=divRef.current.innerText.split(',');
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

        props.setArray(arr,order);

    }

    return (
        <div className="treeInteraction">
            <div className="treeInteraction-header">
                <select ref={selectRef} name="type" className="orderType">
                    <option value="preorder">Preorder</option>
                    <option value="postorder">Postorder</option>
                </select>
            </div>
            <div ref={divRef} className="treeInteraction-input" contentEditable="true"></div>
            <Button onclick={getInput} />
        </div>
    );
}
export default Interaction;