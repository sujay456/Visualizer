import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {motion} from 'framer-motion';
import './shellsort.scss';
import {gsap} from 'gsap';
import Interaction from '../Interaction/interaction';
import PlayButton from '../playButton/playButton';
import * as actionType from '../../../store/actions/actions';

const ShellSort=(props)=>{
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
    function moveKey (boxI)
    {
        gsap.to(boxI,{y:60,delay:0.4});
    }
    function helper(i,j,gap,isNewI,isNewJ)
    {
        console.log("helper",i,j);
        if(i<arr.length)
        {
            if(j>=gap && globalArray[j-gap]>key)
            {
                const tl1=gsap.timeline();
                if(isNewJ)
                    moveKey(keyEle);
                
                tl1
                .set(globalDomArray[j-gap],{backgroundColor:'#FF3F3F'})
                .to(globalDomArray[j-gap],{y:-60,delay:1})
                .to(globalDomArray[j-gap],{x:`+=${(gap)*124}`})
                .to(globalDomArray[j-gap],{y:0})
                .then(()=>{
                    globalArray[j]=globalArray[j-gap];
                    globalDomArray[j]=globalDomArray[j-gap];
                    shellSort(i,j-gap,gap,false,false);
                });
                
            }
            else
            {
                const tl2=gsap.timeline();

                tl2.to(keyEle,{x:`-=${(i-j)*124}`})
                .to(keyEle,{y:0})
                .then(()=>{
                    globalArray[j]=key;
                    globalDomArray[j]=keyEle;
                    shellSort(i+1,j,gap,false,true);

                });
                

            }
        }
        else
        {
            shellSort(i,j,parseInt(gap/2),true,true);
        }

        
    }
    let key,keyEle;
    function shellSort(i,j,gap,isnewI,isnewJ)
    {
        console.log('shell Sort ',i,j);
        props.setConsoleMessage(`i:${i}  j:${j} , GAP:${gap} `);

        clearColor();
        if(gap<=0)
        {
            console.log(globalArray);
            toggle(true);
            props.setConsoleMessage('Completed :)',true);
            return;
        }
        if(isnewI)
        {
            i=gap;
        }
        if(isnewJ)
        {
            key=globalArray[i];
            keyEle=globalDomArray[i];
            gsap.set(keyEle,{backgroundColor:'#FF7A00'})
            j=i;
        }
        // setColor(globalDomArray[i],globalDomArray[j]);
        helper(i,j,gap,isnewI,isnewJ);

    }
    let globalArray=[];
    let globalDomArray=[];
    const startSorting=()=>
    {
        toggle(false);
        globalArray=[...arr];
    
        let domElementOfBlocks=document.querySelectorAll('.blocks');

        globalDomArray=[...domElementOfBlocks];
        let gap= parseInt(arr.length/2);
        shellSort(0,0,gap,true,true);
    }
    useEffect(()=>{
        if(!arr.length)
            return;
        
        clearAttributes();
        setGsap();
        setEnable(true);
       },[arr]);
    return(
        <motion.div className="ShellSort" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}>
            <p className="ShellSort-header">Shell Sort</p>

            <div className="ShellSort-animation">
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
export default connect(mapStateToProps,mapDispatchToProps)(ShellSort);