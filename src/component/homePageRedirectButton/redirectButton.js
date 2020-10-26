import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import './redirect.scss';
const Button=(props)=>{

    
    const homeButtonVariant={
        hidden:{
            opacity:0,
            scale:0,
            x:50
        },
        visible:
        {
            opacity:1,
            scale:1,
            x:0
        }
    }

    return (
        <motion.div variants={homeButtonVariant} initial="hidden" animate="visible" transition={{type:'spring',duration:0.7,stiffness:80}} className="Redirect">
        <Link to="/" >
            <svg width="55" height="54" viewBox="0 0 55 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="link">
                <circle  id="Ellipse 7" cx="27.5" cy="27" r="27" fill="#26B4E0"/>
                <g id="v">
                <g id="Union">
                <path d="M19.9691 10.6035L15.0075 11.5407L23.9356 44.2024L26.6062 43.698L28.8175 44.1808L39.0525 11.785L34.1313 10.7107L26.5542 34.6936L19.9691 10.6035Z" fill="white"/>
                <path d="M19.9691 10.6035L15.0075 11.5407L23.9356 44.2024L26.6062 43.698L28.8175 44.1808L39.0525 11.785L34.1313 10.7107L26.5542 34.6936L19.9691 10.6035Z" stroke="#0066FF"/>
                </g>
                </g>
                </g>
            </svg>
        </Link>
        </motion.div>
        
    );
}

export default Button;