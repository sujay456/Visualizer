import React from 'react';
import {motion} from 'framer-motion';
import Interaction from '../interaction/interaction';
import './BST.scss';
import NotFound from '../TreeNotFound/NotFound';
import Tree from '../Tree/Tree';

class BST extends React.Component
{
    state={
        arr:[],
        order:null,
        notFound:false
    }

    canRepresentBST(pre) 
    { 
        
        let s=[]; 
    
        
        let root = Number.MIN_VALUE; 
    
        // Traverse given array 
        for (let i=0; i<pre.length; i++) 
        { 
            
            if (pre[i] < root) 
                return false; 
    
            
            while (s.length!==0 && s[s.length-1]<pre[i]) 
            { 
                root = s[s.length-1]; 
                s.pop(); 
            } 
    
            
            s.push(pre[i]); 
        } 
        return true; 
    } 
    setArray=(arr,order)=>
    {
        this.setState({arr:arr,order:order});

        if(!this.canRepresentBST(arr))
        {
            this.setState({notFound:true});
        }
        else
        {
            this.setState({notFound:false});
        }
    }

    render()
    {

        return(
            <motion.div className="BST"  initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}>
                <p>Binary Search Tree</p>

                <div className="Tree">
                    {this.state.notFound?<NotFound/>:<Tree/>}
                </div>

                <Interaction setArray={this.setArray} />


            </motion.div>
        );
    }

}
export default BST;