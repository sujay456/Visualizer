import React,{useEffect,useState,useRef} from 'react';
import {motion} from 'framer-motion';
import './insertion.scss';
import {gsap} from 'gsap';
import Interaction from '../Interaction/interaction';
import PlayButton from '../playButton/playButton';
import Partition from './partition/parition';
import {connect} from 'react-redux';
import * as actionType from '../../../store/actions/actions';

const  InsertionSort=(props)=>
{
    // states
    const [arr,setArray]=useState([]);
    const [enabled,setEnable]=useState(false);
    const [paused,toggle]=useState(true);
    const [posPartition,setPosition]=useState(0);
    const [shouldmoveP,setMoveP]=useState(false);
    const [again,setAgain]=useState(1);
    let partitionRef=null;
   window.addEventListener('resize',()=>{
       
       console.log('resizing');
        setPos();
   })
   const tl=gsap.timeline();


   function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
    //function for setting the color red;
   function setColor(boxI,boxJ){

    gsap.set(boxI,{backgroundColor:'#FF3F3F'});
    gsap.set(boxJ,{backgroundColor:'#FF3F3F'});

   }
   function setGsap()
   {
       for(let x of document.querySelectorAll('.blocks'))
            gsap.set(x,{x:0,y:0});
   }
   function clearAttributes()
   {
       for(let x of document.querySelectorAll('.blocks'))
            x.style="transform: none;";
   }
//    for clearing the inilie styles 
   function clearColor()
   {
        for(let x of globalDomArray)
            x.style.backgroundColor="#41e16e";
   }
   function moveKey (boxI)
   {
       gsap.to(boxI,{y:60,delay:0.4});
   }
//    for moving the parition
   function moveParition(pRef)
   {    
        let prevPos=parseInt(pRef.current.style.left);

        pRef.current.style.left=prevPos+124+'px';
        
   }
   

   var keyDom;
   var key;
//    main function
   function check(boxI,boxJ,i,j,keyChange)
   {
    //    console.log(keyChange);
    console.log(boxI,boxJ);
       console.log('[check function]');
        console.log(globalArray);
        
        if(keyChange)
        {
            key=globalArray[i];
            keyDom=globalDomArray[i];
        }
       if(j>=0 && globalArray[j]>key)
        {
            if(keyChange)
                moveKey(boxI);
            globalArray[j+1]=globalArray[j];
            globalDomArray[j+1]=globalDomArray[j];
            

            if(j-1<0)
            {
                console.log('j became -ve');
                globalArray[j]=key;
                globalDomArray[j]=keyDom;
                
                console.log(tl);
                let tt=gsap.timeline();
                tt
                .to(boxJ,{x:'+=124',delay:1})
                .to(boxI,{x:-124*(i-j)})
                .to(boxI,{y:0})
                .then(()=>{
                    console.log(arr,'changes array',globalArray,globalDomArray);
                    clearColor();
                    setMoveP(true);
                    insertionsort(i+1,i,true);
                    
                })
            }   
            else
            {
                let tl2=gsap.timeline();
                tl2.to(boxJ,{x:'+=124',delay:0.7})
                .then(()=>{
                    insertionsort(i,j-1,false);                
                })
            }

        }
        else
        {
            console.log('right position');
            globalArray[j+1]=key;
            globalDomArray[j+1]=keyDom;

            let tl3=gsap.timeline();
            console.log(boxI);
            let X=-124*(i-(j+1));
            console.log(X);
            tl3.to(boxI,{x:X})
            .to(boxI,{y:0})
            .then(()=>{
                setMoveP(true);
                insertionsort(i+1,i,true);
            })
        }
        
   }    
   
    //here I fetch the required blocks    
   function insertionsort(i,j,keyChange)
   {
        setMoveP(false);
        props.setConsoleMessage(`i:${i}  j:${j}`,true);

        console.log('Insertion sort');
        console.log(i,j);
        
        let boxI;
        if(!keyChange)
        {
            boxI=keyDom;
        }
        else
            boxI=globalDomArray[i];
        
        let boxJ=globalDomArray[j];
        clearColor();
        if(i===arr.length)
        {
            props.setConsoleMessage('Completed! :)',true);
            toggle(true);

            return;
        }
        
        setColor(boxI,boxJ);
        
        console.log(globalArray,globalDomArray);
        
        check(boxI,boxJ,i,j,keyChange); 
   }

    //global array and global dom array    
   var globalArray=[];
   var globalDomArray=[];

    //this function is called when play button is hit    
   const startSorting=()=>
   {
       
       toggle(false);
       
       globalArray=[...arr];
    
        let domElementOfBlocks=document.querySelectorAll('.blocks');

        globalDomArray=[...domElementOfBlocks];
        console.log(globalArray,globalDomArray);
        insertionsort(1,0,true);
   } 
   
   
   const setPos=()=>{
       console.log('it ran');
        clearAttributes();
        if(arr.length){
            setEnable(true);
            console.log(document.querySelectorAll('.blocks'))
            let FirstblockElement=document.querySelectorAll('.blocks')[0].getClientRects();
            if(FirstblockElement[0].width===0)
            {
                setPosition(FirstblockElement[0].x-60); 
                return;    
            }
            console.log(FirstblockElement);
            setPosition(FirstblockElement[0].x);
            
            
        }

   }

 
   useEffect(()=>{
   setAgain(again+1);
   clearAttributes();
   globalArray=[];
   globalDomArray=[];
   setGsap();
    setPos();
   
   },[arr]);
   
  
    

       return(
           <motion.div className="InsertionSort" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}} >
               <p className="InsertionSort-header">Insertion Sort</p>
   
               <div className="InsertionSort-animation">
                   {
                    arr.map((ele,i)=>{
                        return(
                            <motion.div data-ele={ele} initial={{scale:0}} animate={{scale:1}}  className="blocks" key={i}>
                                {ele}
                            </motion.div>
                        )
                    })}
                   <Partition enabled={enabled} pos={posPartition} shouldmoveP={shouldmoveP} setAgain={again}  moveParition={(partitionRef)=>{ moveParition(partitionRef); }} />
               </div>
               <PlayButton enabled={enabled} paused={paused} toggle={()=>{  if(!paused) return;setAgain(again+1);
                    clearAttributes();
                    globalArray=[];
                    globalDomArray=[];
                    setGsap();
                    setPos(); 
                    startSorting()}}  
                />
               <Interaction setArray={(arr)=>setArray(arr)} toggle={toggle} />
               
           </motion.div>
       );
   

}
const mapStateToProps=(state)=>{
    return{
        consoleMessage:state.consoleMessage
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        setConsoleMessage:(mssg,type)=>{dispatch({type:actionType.SET_CONSOLEMESSAGE,mssg:mssg,mssgType:type})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(InsertionSort);


  