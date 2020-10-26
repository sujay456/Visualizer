import React,{useState,useRef,useEffect} from 'react';
import {Canvas,useFrame} from 'react-three-fiber';
import {useSpring,a} from 'react-spring/three';
import {motion} from 'framer-motion';

import {softShadows} from 'drei';
import gsap from 'gsap';
softShadows();


const Box=(props)=>{
    const MeshRef=useRef(null);

    // states of the boxes
    const [domLoaded,setDom]=useState(false);
    const [loaded,setLoaded]=useState(false);
    const [animationStart,setAnimation] =useState(false);

    // state related to the direction of the boxed


    const spring=useSpring({
        color:props.color,
        position:loaded?props.position:[0,-1.5,0],
        args:domLoaded?props.args:[2,2,2]
    });
    
    useEffect(()=>{   
        setDom(true);
        setTimeout(()=>{
            setLoaded(true);
        },1000);
        // these are the delays
        setTimeout(()=>{
            setAnimation(true);
        },2000)
    },[]);

    useFrame(()=>{
        
        if(loaded)
        {
            
            MeshRef.current.rotation.y+=0.02;   
        }
        else
        {
            gsap.to(MeshRef.current.rotation,{y:2,ease:'power1.out',duration:1});  

        }
    });
    
    if(animationStart)
    {
        const t2 = gsap.timeline({defaults:{
            duration:0.7,
            
        }});
        const t1 = gsap.timeline({defaults:{
            duration:0.7,
            
        }});
        const t3 = gsap.timeline({defaults:{
            duration:0.7,
            
        }});

        if(props.type===1)
        {
            t2.to(MeshRef.current.position,{y:-1})
            .to(MeshRef.current.position,{x:2})
            .to(MeshRef.current.position,{y:-3})
            .then( props.onComplete );

        }
        if(props.type===0)
        {
            t1
            .to(MeshRef.current.position,{y:-3.5})
            .to(MeshRef.current.position,{x:-2})
            .to(MeshRef.current.position,{y:-3})
            
            ;
        }

        if(props.type===2)
        {
            t3.to(MeshRef.current.position,{x:0},1);
        }
    
    }
    return (
        <React.Fragment>
        
        
        <a.mesh ref={MeshRef}  position={spring.position}>
            <a.boxBufferGeometry attach="geometry" args={spring.args} />
            <a.meshStandardMaterial color={spring.color} />
        </a.mesh>
        </React.Fragment>
    );
}


const Background=(props)=>{
    
    const [j,setJ]=useState(0);
    
    function onComplete(){
        setJ((j+1)%3);
    }
    
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} >
            <Canvas   style={{position:"absolute",background:"white"}} colorManagement camera={{position:[-5,2,10],fov:55}} >
            {/* <pointLight position={[10,10,10]}  /> */}
            
            <ambientLight intensity={0.1} />
            {/* this is the sun */}
            <directionalLight  position={[-5,2,10]} intensity={1.2} 
                shadow-mapSize-width={1024} 
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}

                shadow-camera-top={10}

                shadow-camera-bottom={-10}


            />
            <pointLight position={[-10,0,0]} intensity={0.5} />
            <pointLight position={[0,-10,0]} intensity={1.2} />
            <Box type={(j)%3} onComplete={onComplete} initial={{opacity:0}} animate={{opacity:1}}  args={[1,1,1]} position={[0,-3,0]} color="#2DA8D8FF" />
            <Box type={(j+1)%3} onComplete={onComplete} args={[1,1,1]} position={[-2,-3,0]} color="#2A2BDFF" />
            <Box type={(j+2)%3} onComplete={onComplete} args={[1,1,1]} position={[2,-3,0]} color="#D9514EFF" />

        </Canvas>
        </motion.div>
    );

}

export default Background;
