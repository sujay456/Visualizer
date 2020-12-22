import React,{useEffect} from 'react';
import Task from './Task/Task';
import SubTask from './SubTask/subTask';
import './sdc.scss';
import Social from './social/social';
import gsap from 'gsap';
import {connect} from 'react-redux';
import * as actionType from '../../store/actions/actions';

const SideContent=(props)=>{
    useEffect(()=>{
       if(props.sideDrawer)
       {
            gsap.from('.SideDrawerContent div',{y:50,opacity:0,stagger:0.1,delay:0.4});
       }
    },[props.sideDrawer]);
    const SortingAlgos=[
        {name:'Insertion Sort',link:"/insertionSort" },
        {name:'Quick Sort',link:"/quickSort" },
        {name:'Bubble Sort',link:"/bubbleSort" },
        {name:'Shell Sort',link:'/shellsort'},
        
    ]
    const translateLoading=(name)=>{
        console.log('hello');
        props.setLoader(name);
        props.setDrawer();
    }
    return (
        <div className="SideDrawerContent">
            <div className="SideDrawerContent-header">
                <p >choose what you want to visualize <span role="img" aria-label="smiley">😊</span>!</p>
            </div>
            <Task color="#BD7045" taskname="Sorting Algorithms" >
                {SortingAlgos.map((algos,_)=>{
                    return <SubTask onclick={()=>{translateLoading(algos.name)}} key={algos.link+_} link={algos.link} >{algos.name}</SubTask>
                })}           
            </Task>
            <Task color="#359924" taskname="Trees" >
                <SubTask link="/bst" onclick={ ()=> translateLoading('Binary Search Tree')} >Binary Search Tree</SubTask>
                <SubTask link="/no" onclick={ ()=> translateLoading('Red Black Tree') } >Red Black Tree</SubTask>
            </Task>
            <Social />
        </div>
    );
}
const mapStateToProps=(state)=>{

    return {
        sideDrawer:state.sideDrawer,
        name:state.translateLoader
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        setLoader:(name)=>{dispatch({type:actionType.SET_TRANSLATINGlOADER,name:name})},
        setDrawer:()=>{dispatch({type:actionType.SET_SIDEDRAWER})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SideContent);
