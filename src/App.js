import React,{useState,useEffect} from 'react';
import './App.scss';
import Home from './component/Home/home';
import HomeButton from './component/homePageRedirectButton/redirectButton';
import Hamburger from './component/UI/hamburgerIcon/hamburger';
import Overlay from './component/UI/Overlay/overlay';
import SideDrawer from './component/UI/sideDrawer/sideDrawer';
import SideDrawerContent from './component/sideDrawerContent/Sdcontent';
import {Switch,Route,withRouter} from 'react-router-dom';

function App(props) {

 
  const [loadedHeader,setLoaded]=useState(false);
  const[showOverlay,setOverlay]=useState(false);
  const headerAnimationDone=()=>{
    console.log('Header animation done');
    setLoaded(!loadedHeader);
  }
  
  useEffect(()=>{
    
    
    if(props.location.pathname!=='/')
      headerAnimationDone();
  },[]);
  return (
   <React.Fragment>
     {/* These things will always be there on the screen */}
     {loadedHeader?<Hamburger setOverlay={setOverlay} />:null}
     {loadedHeader?<HomeButton  />:null}
     <Overlay show={showOverlay} />
     <SideDrawer >
      <SideDrawerContent />
    </SideDrawer>
    {/* here we will be doing the switch */}
    <Switch>
      <Route path="/" exact render={()=><Home loadedHeader={loadedHeader} headerAnimationDone={headerAnimationDone} />} />
    </Switch>
     
    
   </React.Fragment>


  );
}

export default withRouter(App);
