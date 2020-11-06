import React,{useEffect,useRef} from 'react';
import gsap from 'gsap';
import {connect} from 'react-redux';
import './tloader.scss';
const TranslateLoader=(props)=>{

    const loaderRef=useRef(null);

    useEffect(()=>{
        gsap.set(loaderRef.current,{xPercent:-110})
    });
    useEffect(()=>{
        if(!props.name)
            return;
        
            
        
        const tl = gsap.timeline();
        tl.to(loaderRef.current,{xPercent:-5,ease:'Cubic.easeInOut'})
        .from('.Loader p',{y:50,opacity:0},'<0.6')
        // .to('.Loader p',{y:-50,duration:0.3,delay:0.2})
        .to(loaderRef.current,{xPercent:100},'>0.2')
        
        loaderRef.current.removeAttribute('style');
    },[props.name]);
    
    return (
        <div ref={loaderRef} className="Loader">
            <p>{props.name}</p>
        </div>
    );
}

const mapstateToProps=(state)=>{
    return{
        name:state.translateLoader
    }
}


export default connect(mapstateToProps,null)(TranslateLoader);