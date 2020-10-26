import React from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import './overlay.scss';
import {connect} from 'react-redux';
import * as ActionType from '../../../store/actions/actions';

const Overlay=(props)=>{

    return (
        <React.Fragment>
            <AnimatePresence>
            {props.sideDrawer?<motion.div onClick={props.setSideDrawer} initial={{opacity:0}} exit={{opacity:0}} animate={{opacity:1}} transition={{type:'tween'}} className="Overlay"></motion.div>:null}
            </AnimatePresence>
        </React.Fragment>
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


export default connect(mapStateToProps,mapDispatchToProps)(Overlay);