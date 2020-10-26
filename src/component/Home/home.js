import React from 'react';
import Background from './background/background';
import Header from './header/header';

const Home=(props)=>{

 
    return(
        <React.Fragment>
            {props.loadedHeader?<Background />:null}
            <Header headerAnimationDone={props.headerAnimationDone} />
        </React.Fragment>
    );

}
export default Home;