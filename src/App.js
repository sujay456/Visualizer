import React,{useState} from 'react';
import './App.scss';
import Home from './component/Home/home';
import HomeButton from './component/homePageRedirectButton/redirectButton';
import Hamburger from './component/UI/hamburgerIcon/hamburger';
import Overlay from './component/UI/Overlay/overlay';
import SideDrawer from './component/UI/sideDrawer/sideDrawer';

function App() {

 
  const [loadedHeader,setLoaded]=useState(false);
  const[showOverlay,setOverlay]=useState(false);

  const headerAnimationDone=()=>{
    console.log('Header animation done');
    setLoaded(true);
  }

  return (
   <React.Fragment>
     {loadedHeader?<Hamburger setOverlay={setOverlay} />:null}
     {loadedHeader?<HomeButton/>:null}
     <Overlay show={showOverlay} />
     <Home loadedHeader={loadedHeader} headerAnimationDone={headerAnimationDone} />
    <SideDrawer />
   </React.Fragment>


  );
}

export default App;
