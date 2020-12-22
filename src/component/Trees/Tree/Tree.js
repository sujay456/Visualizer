import React,{useState} from 'react';
import NodeDom from '../Node/Node';

const Tree=(props)=>{
    const [tree,setTree]=useState(null);
    const [done,setDone]=useState([]);
    class Node{
        constructor(data)
        {
            this.data=data;
            this.left=null;
            this.right=null;
        }
    }
    class BST{
        constructor()
        {
            this.root=null;
        }
        //some functions for the tree

        
        //this is like defining the functions 
        insert(data)
        {
            var newNode=new Node(data);
            if(this.root===null)
            {
                this.root=newNode;
                return ;
            }
            
            this.insertNode(this.root,newNode);
        }
        insertNode(node,newNode)
        {
            if(newNode.data < node.data) 
            { 
                
                if(node.left === null) 
                    node.left = newNode; 
                else
                    this.insertNode(node.left, newNode);  
            } 
            else
            { 
                
                if(node.right === null) 
                    node.right = newNode; 
                else
                    this.insertNode(node.right,newNode); 
            } 
        }
        
        inorder(node,direction,prevLeft,prevTop,i) 
        { 

            if(node !== null) 
            { 
                if(this.root===node)
                {
                    hello.push(<NodeDom left={prevLeft} top={prevTop} >{node.data}</NodeDom>)
                }
                if(direction==="left")
                {
                    prevLeft=prevLeft-(180-i);
                    prevTop=prevTop+50;
                    hello.push(<NodeDom left={prevLeft} top={prevTop} >{node.data}</NodeDom>)
                }
                else if(direction==="right")
                {
                    prevLeft=prevLeft+(180-i);
                    prevTop=prevTop+50;
                    hello.push(<NodeDom left={prevLeft} top={prevTop} >{node.data}</NodeDom>)
                }
                this.inorder(node.left,"left",prevLeft,prevTop,i+30); 
                this.inorder(node.right,"right",prevLeft,prevTop,i+30); 
            } 
        }
    }

    
    const start=()=>{
        let tree=new BST();
        // tree.insert(40);
        // tree.insert(30);
        // tree.insert(35);
        // tree.insert(80);
        // tree.insert(100);
        // tree.insert(10);
        // tree.insert(20);
        // tree.insert(101);
        // tree.insert(36);
        // tree.insert(50);
        tree.insert(4);
        tree.insert(3);
        tree.insert(2);
        // console.log(tree);
        tree.inorder(tree.root,"",window.innerWidth/2,80,0);
        setTree(tree);
        setDone(hello);

    }
    var hello=[];
    
    return (
        <React.Fragment>
            <p onClick={start}>Yo YO</p>
            {done}
            
        </React.Fragment>
    );
}

export default Tree;