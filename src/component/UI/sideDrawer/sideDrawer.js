import React,{useEffect,useRef} from 'react';
import './sideDrawer.scss';
import gsap from 'gsap';
import {connect} from 'react-redux';

const SideDrawer=(props)=>{

    const sideDrawerRef=useRef(null);
    useEffect(()=>{
        gsap.set(sideDrawerRef.current,{xPercent:100});

    },[])
    useEffect(()=>{
        
        if(props.sideDrawer)
        {
            gsap.to(sideDrawerRef.current,{xPercent:0,ease:'Power4.easeInOut',delay:0.3});
        }
        else
        {
            gsap.to(sideDrawerRef.current,{xPercent:100,delay:0.1,ease:'Power4.easeInOut',duration:0.5});
        }
    },[props.sideDrawer]);
    return(
        <div ref={sideDrawerRef} className="SideDrawer">
            
            {props.children}
        </div>
    );
}
const mapStateToProps=(state)=>{

    return {
        sideDrawer:state.sideDrawer
    }
}
export default connect(mapStateToProps,null)(SideDrawer);