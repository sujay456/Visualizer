import React from 'react';

const NotFound=(props)=>{

    return (
        <div className="NotFound" style={{textAlign:'center'}}>
            <lottie-player src="https://assets6.lottiefiles.com/temp/lf20_B7BO04.json"  background="transparent"  speed="1"  style={{width:'300px',height:'300px',left:'50%',transform:'translateX(-50%)',position:'relative'}}  loop  autoplay></lottie-player>
            <p>Tree Not found</p>
        </div>
    );
}

export default NotFound;