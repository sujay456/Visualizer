import React,{useEffect, useState} from 'react';
import './quicksort.scss';
import {motion} from 'framer-motion';
import Interaction from '../Interaction/interaction';
import PlayButton from '../playButton/playButton';
import {gsap} from 'gsap';
import {connect} from 'react-redux';
import * as actionType from '../../../store/actions/actions';

const QuickSort=(props)=>{

    const [arr,setArray]=useState([]);
    const [enabled,setEnable]=useState(false);
    const [paused,toggle]=useState(true);
    

    var globalArray=[];
    var globalDomArray=[];

    // for clearing gsap properties
    function setGsap()
   {
       for(let x of document.querySelectorAll('.blocks'))
            gsap.set(x,{x:0,y:0});
   }
    // for clearing Aatributes    
   function clearAttributes()
   {
       for(let x of document.querySelectorAll('.blocks'))
            x.style="transform: none;";
   }
   function setDiviedArrayColor(low,high)
   {
       console.log('I ran divide array',low,high);
       for(let i=low;i<=high;++i)
       {
           gsap.set(globalDomArray[i],{backgroundColor:'#006E75'});
       }
       let s=String(globalArray.slice(low,high+1));
            props.setConsoleMessage(`Selected array=> ${s}`);
            
            partition(low,high);
   }
  
   function clearColor()
   {
        for(let i=0;i<arr.length;++i)
            gsap.set(globalDomArray[i],{backgroundColor:'#41E16E'}) //this is making the array green again (whole array to green again)
        console.log('I ran go green')
   }
  
   async function helper(i,j,low,high)
   {
       console.log('[Helper]',i,j,low,high,pivot,globalArray,globalDomArray);
       if(j>high-1)
       {
           let ithBlock=i+1;
           let boxHIGH=globalDomArray[high];
           let boxI=globalDomArray[ithBlock];
           let boxIMove=(124)*(high-(ithBlock));
           let boxHigh=(-124)*(high-ithBlock);
        //    console.log(howMuchToMove); 
           const tl2=gsap.timeline();

            
            tl2
            .set(boxI,{backgroundColor:'#FF6D3F'})  //now this is a different color beacuse this is some different operation
            .to(boxI,{y:(ithBlock===high)?0:60},0)
            .to(boxI,{x:`+=${boxIMove}`})
            .to(boxI,{y:0})
            .to(boxHIGH,{y:(ithBlock===high?0:-60)},0)
            .to(boxHIGH,{x:`+=${boxHigh}`})
            .to(boxHIGH,{y:0})
            .then(async ()=>{
                let temp=globalArray[i+1];
                let tempDom=globalDomArray[i+1];
                globalArray[i+1]=globalArray[high];
                globalDomArray[i+1]=globalDomArray[high];
                globalDomArray[high]=tempDom;
                globalArray[high]=temp;
                
                await quicksort(low,ithBlock-1);
                await quicksort(ithBlock+1,high);
            })
            
       }
       else
       {
        let boxJ=globalDomArray[j];
        gsap.set(boxJ,{backgroundColor:'#FF3F3F'});  //setting the current block to be red
        if(globalArray[j]<pivot)
        {
              

            i++;
            const tl1=gsap.timeline({defaults:{duration:0.3}});
            let boxI=globalDomArray[i];
            console.log("swapping normal ",globalArray[i],globalArray[j]);
            tl1
            .set(boxI,{backgroundColor:'#FF3F3F'})
            .to(boxJ,{y:(i===j)?0:60},0.5)
            .to(boxJ,{x:`+=${(-124*(j-i))}`})
            .to(boxJ,{y:0})
            .to(boxI,{y:(i===j)?0:-60},0.5)
            .to(boxI,{x:`+=${(124*(j-i))}`})
            .to(boxI,{y:0})
            // .set(boxI,{backgroundColor:'#006E75'})
            .set(boxJ,{backgroundColor:'#006E75'})
            .then(async ()=>{
                let temp=globalArray[i];
                let tempDom=globalDomArray[i];
                globalArray[i]=globalArray[j];
                globalDomArray[i]=globalDomArray[j];
                globalDomArray[j]=tempDom;
                globalArray[j]=temp;
                
                console.log(globalArray,globalDomArray);
                await helper(i,j+1,low,high);
            })
             
        }
        else
        {
            gsap.set(boxJ,{backgroundColor:'#006E75',onComplete:()=>{helper(i,j+1,low,high);}}) //and after a delay i am just reverting the changes of the selected block and calling to the next block
            
        }
       }

       return;
        
   }

   let pivot,pivotele,i,j;
   function partition(low,high)
   {
        console.log("[parition]",low,high);
   
        pivot=globalArray[high];
        pivotele=globalDomArray[high];
        i=low-1;
        j=low;
        
        gsap.set(pivotele,{backgroundColor:'#FF7A00',onComplete:()=>{helper(i,j,low,high);}})
  
   }
//    let s=0;
   function quicksort(low,high)
   {
       
       
        
       console.log("[Quick sort]",low,high);
       if(low<high)
       {
            
            clearColor();
            setDiviedArrayColor(low,high);
            
       }
       else
       {
            clearColor();
            console.log('Sorting Completed');   
            console.log(globalArray);     
            let flag=false;
            let temp=[...arr];
            temp.sort();
            for(let c=0;c<temp.length;++c)
            {
                flag=temp[i]^globalArray[i]?false:true;
            }
            if(flag)
            {
                console.log('Yo');
            //   props.setConsoleMessage('Completed! :)',true);
              toggle(true);
            }

             return;
       }
   }

   function startSorting()
   {
        toggle(false);
        
        globalArray=[...arr];
    
        let domElementOfBlocks=document.querySelectorAll('.blocks');

        globalDomArray=[...domElementOfBlocks];

        quicksort(0,globalArray.length-1);
   }
   useEffect(()=>{
    if(!arr.length)
        return;
    
    clearAttributes();
    setGsap();
    setEnable(true);
   },[arr]);
    return(
        <motion.div className="QuickSort" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}>
            <p className="QuickSort-header">Quick Sort</p>

            <div className="QuickSort-animation">
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
export default connect(mapStateToProps,mapDispatchToProps)(QuickSort);