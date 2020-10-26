import React,{useEffect} from 'react';
import './hamburger.scss';
import {motion} from 'framer-motion';
import gsap from 'gsap';
import {connect} from 'react-redux';
import * as ActionType from '../../../store/actions/actions';
const Hamburger=(props)=>{

    const HamburgerVariant={
        hidden:{
            opacity:0,
            scale:0,
            x:-50
        },
        visible:
        {
            opacity:1,
            scale:1,
            x:0
        }
    }
    useEffect(()=>{

        if(props.sideDrawer)
        {
            gsap.to('#Rectangle_8',{rotate:132.5,x:26});
            gsap.to('#Rectangle_11',{rotate:44,y:-13,x:6});
            document.querySelector('.Outerstroke').style.strokeDashoffset=0;
        }
        // when it is open
        else
        {
            gsap.to('#Rectangle_8',{rotate:0,x:0});
            gsap.to('#Rectangle_11',{rotate:0,y:0,x:0});
            document.querySelector('.Outerstroke').style.strokeDashoffset=document.querySelector('.Outerstroke').getTotalLength();

        }

    },[props.sideDrawer])
    const toggle=()=>{
        // when sideDrawer is closed
        if(!props.sideDrawer)
        {
            gsap.to('#Rectangle_8',{rotate:132.5,x:26});
            gsap.to('#Rectangle_11',{rotate:44,y:-13,x:6});
            document.querySelector('.Outerstroke').style.strokeDashoffset=0;
        }
        // when it is open
        else
        {
            gsap.to('#Rectangle_8',{rotate:0,x:0});
            gsap.to('#Rectangle_11',{rotate:0,y:0,x:0});
            document.querySelector('.Outerstroke').style.strokeDashoffset=document.querySelector('.Outerstroke').getTotalLength();

        }
        props.setSideDrawer();
        
    }
    
    function onHover()
    {
        document.querySelector('.Outerstroke').style.strokeDashoffset=0;
    }
    function onHoverOut()
    {
        if(!props.sideDrawer)
        document.querySelector('.Outerstroke').style.strokeDashoffset=document.querySelector('.Outerstroke').getTotalLength();
    }
    return(
        <motion.div  onPointerEnter={onHover} onPointerLeave={onHoverOut} className="Hamburger"  onClick={toggle} variants={HamburgerVariant} initial="hidden" animate="visible" transition={{type:'spring',duration:0.7,stiffness:80,delay:0.2}} >
            
            {/* <svg className="icon" width="49" height="49" viewBox="0 0 49 49" fill="none" stroke="#4E596A" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
                <g id="open">
                <path id="Ellipse 8" d="M49 24.5C49 38.031 38.031 49 24.5 49C10.969 49 0 38.031 0 24.5C0 10.969 10.969 0 24.5 0C38.031 0 49 10.969 49 24.5Z" fill="#C4C4C4"  stroke="#4E596A" stroke-width="2"/>
                <g id="2">
                    <path id="Rectangle_8" d="M9.64709 19.1131C9.64709 18.1735 10.4088 17.4117 11.3485 17.4117H37.8901C38.8298 17.4117 39.5915 18.1735 39.5915 19.1131C39.5915 20.0528 38.8298 20.8145 37.8901 20.8145H11.3485C10.4088 20.8145 9.64709 20.0528 9.64709 19.1131Z" fill="black"/>
                    <path id="Rectangle_11" d="M9.64709 30.4465C9.64709 29.5068 10.4088 28.7451 11.3485 28.7451H37.8901C38.8298 28.7451 39.5915 29.5068 39.5915 30.4465C39.5915 31.3861 38.8298 32.1479 37.8901 32.1479H11.3485C10.4088 32.1479 9.64709 31.3861 9.64709 30.4465Z" fill="black"/>
                </g>
                </g>
            </svg> */}
            
            <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
<path  className="Outerstroke" d="M27.5 53.5C41.8594 53.5 53.5 41.8594 53.5 27.5C53.5 13.1406 41.8594 1.5 27.5 1.5C13.1406 1.5 1.5 13.1406 1.5 27.5C1.5 41.8594 13.1406 53.5 27.5 53.5Z" fill="#C4C4C4" stroke="#4E596A" strokeWidth="3"/>
<path id="Rectangle_8" d="M12.6471 22.1131C12.6471 21.1735 13.4088 20.4117 14.3485 20.4117H40.8901C41.8298 20.4117 42.5915 21.1735 42.5915 22.1131C42.5915 23.0528 41.8298 23.8145 40.8901 23.8145H14.3485C13.4088 23.8145 12.6471 23.0528 12.6471 22.1131Z" fill="black"/>
<path id="Rectangle_11" d="M12.6471 33.4465C12.6471 32.5068 13.4088 31.7451 14.3485 31.7451H40.8901C41.8298 31.7451 42.5915 32.5068 42.5915 33.4465C42.5915 34.3861 41.8298 35.1479 40.8901 35.1479H14.3485C13.4088 35.1479 12.6471 34.3861 12.6471 33.4465Z" fill="black"/>
</svg>



            
        </motion.div>
    );
}

const mapStateToProps=(state)=>{

    return {
        sideDrawer:state.sideDrawer
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        setSideDrawer:()=>{dispatch({type:ActionType.SET_SIDEDRAWER})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Hamburger);