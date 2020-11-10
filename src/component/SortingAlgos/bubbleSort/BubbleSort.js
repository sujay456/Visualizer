import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {motion} from 'framer-motion';
import './bubble.scss';
import {gsap} from 'gsap';
import Interaction from '../Interaction/interaction';
import PlayButton from '../playButton/playButton';
import * as actionType from '../../../store/actions/actions';

const BubbleSort=(props)=>{
    const [arr,setArray]=useState([]);
    const [enabled,setEnable]=useState(false);
    const [paused,toggle]=useState(true);

    function clearAttributes()
   {
       for(let x of document.querySelectorAll('.blocks'))
            x.style="transform: none;";
   }
    function setGsap()
    {
        for(let x of document.querySelectorAll('.blocks'))
             gsap.set(x,{x:0,y:0});
    }
    function setColor(boxI,boxJ){

        gsap.set(boxI,{backgroundColor:'#FF3F3F'});
        gsap.set(boxJ,{backgroundColor:'#FF3F3F'});

    }
    function clearColor()
    {
            for(let x of globalDomArray)
                x.style.backgroundColor="#41e16e";
    }
    function helper(i,j,boxJ1,boxJ)
    {
        console.log("Helper",i,j);
        if(j<arr.length-i-1)
        {
            if(globalArray[j]>globalArray[j+1])
            {
                const tl1=gsap.timeline({defaults:{delay:0.3,duration:0.4}});
                

                tl1
                .to(boxJ,{y:60},0)
                .to(boxJ1,{x:'-=124'})
                .to(boxJ,{x:'+=124'})
                .to(boxJ,{y:0})
                
                
                .then(()=>{
                    let temp=globalArray[j];
                    let tempEle=globalDomArray[j];
                    globalArray[j]=globalArray[j+1];
                    globalDomArray[j]=globalDomArray[j+1];
                    globalArray[j+1]=temp;
                    globalDomArray[j+1]=tempEle;


                    bubbleSort(i,j+1);
                })
                // swap
                
            }
            else
            {
                const tl2=gsap.timeline();

                tl2.set(boxJ,{backgroundColor:'#41e16e'},0.5)
                .set(boxJ1,{backgroundColor:'#41e16e'},'<')
                .then(()=>{
                bubbleSort(i,j+1);
                })
            }
        }
        else
        {
            const tl3=gsap.timeline();

            tl3.set(boxJ,{backgroundColor:'#41e16e'},0.5)
            .set(boxJ1,{backgroundColor:'#41e16e'},'<')
            .then(()=>{
                bubbleSort(i+1,0);
            })
            
        }

        
    }
    function bubbleSort(i,j)
    {
        console.log('Insertion Sort ',i,j);

        props.setConsoleMessage(`i:${i}  j:${j}`,false);

        clearColor();   
        if(i===arr.length-1)
        {
            console.log(globalArray,globalDomArray);
            console.log('Completed');
            props.setConsoleMessage('Completed! :)',true);
            
            toggle(true);
            return;
        }
        
        let boxJ1=globalDomArray[j+1];
        let boxJ=globalDomArray[j];
        setColor(boxJ1,boxJ);
        helper(i,j,boxJ1,boxJ);
    }
    let globalArray=[];
    let globalDomArray=[];
    const startSorting=()=>
    {
        toggle(false);
        globalArray=[...arr];
    
        let domElementOfBlocks=document.querySelectorAll('.blocks');

        globalDomArray=[...domElementOfBlocks];
        bubbleSort(0,0);
    }
    useEffect(()=>{
        if(!arr.length)
            return;
        
        clearAttributes();
        setGsap();
        setEnable(true);
       },[arr]);
    return(
        <motion.div className="BubbleSort" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}>
            <p className="BubbleSort-header">Bubble Sort</p>

            <div className="BubbleSort-animation">
            {
                arr.map((ele,i)=>{
                    return(
                        <motion.div data-ele={ele} initial={{scale:0}} animate={{scale:1}}  className="blocks" key={i}>
                            {ele}
                        </motion.div>
                    )
                })
            }
            </div>
            <PlayButton enabled={enabled} paused={paused} toggle={()=>{  if(!paused) return;
                    clearAttributes();
                    globalArray=[];
                    globalDomArray=[];
                    setGsap();
                    
                    startSorting()}
                }  
            />
            <Interaction setArray={(arr)=>setArray(arr)} toggle={toggle} paused={paused} />
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
export default connect(mapStateToProps,mapDispatchToProps)(BubbleSort);