import React,{useEffect} from 'react';
import Task from './Task/Task';
import SubTask from './SubTask/subTask';
import './sdc.scss';
import Social from './social/social';
import gsap from 'gsap';
import {connect} from 'react-redux';

const SideContent=(props)=>{
    useEffect(()=>{
       if(props.sideDrawer)
       {
            gsap.from('.SideDrawerContent div',{y:50,opacity:0,stagger:0.1,delay:0.4});
       }
    },[props.sideDrawer]);
    return (
        <div className="SideDrawerContent">
            <Task color="#BD7045" taskname="Sorting Algorithms" >
                <SubTask link='/insertionSort' >Insertion Sort</SubTask>
                <SubTask link="/bubbleSort">Bubble Sort</SubTask>
                <SubTask link="/mergeSort" >Merge Sort</SubTask>
            </Task>
            <Task color="#359924" taskname="Trees" >
                <SubTask link="/bst" >Binary Search Tree</SubTask>
                <SubTask link="/rbt" >Red Black Tree</SubTask>
            </Task>
            <Social />
        </div>
    );
}
const mapStateToProps=(state)=>{

    return {
        sideDrawer:state.sideDrawer
    }
}
export default connect(mapStateToProps,null)(SideContent);
