import React,{useEffect,useRef} from 'react';
import './partition.scss';
// import gsap from 'gsap';
const Partition=(props)=>{
    const partitionRef=useRef(null);
    
    useEffect(()=>{

        
        if(props.pos===0)
            return;
        
        console.log('parition pos changed ran');
        // console.log(props.pos,partitionRef.current.getClientRects()[0].x);
        partitionRef.current.style.left=(props.pos-5)+'px';
        console.log(partitionRef.current.style.left);
        
    },[props.pos,props.setAgain]);
    
    
    // A function to store the previous name ,with help of useRef
    
    useEffect(()=>{
        if(!props.shouldmoveP)
            return ;
        
        props.moveParition(partitionRef);    
    },[props.shouldmoveP])
    return (
        <React.Fragment>
            {props.enabled?<div ref={partitionRef} className="Partition">
            <div className="left">Sorted Array</div>
            <div className="right">Unsorted Array</div>
        </div>:null}
        </React.Fragment>
    )
}

export default Partition;