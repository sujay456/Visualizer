import React from 'react';
import {motion} from 'framer-motion';
import './pb.scss';
const PlayButton=(props)=>
{

    return(
        <React.Fragment>
            {props.enabled?<motion.div onClick={props.toggle } initial={{y:50,opacity:0,scale:0}} animate={{y:0,opacity:1,scale:1}} transition={{delay:0.3,duration:0.5}} className="Playbutton">
           {props.paused?<i className="fas fa-play fa-2x"></i>:<i className="fas fa-pause fa-2x"></i>} 
        </motion.div>:null}
        </React.Fragment>
    )
}

export default PlayButton;