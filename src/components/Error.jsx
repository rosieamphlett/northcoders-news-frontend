import React from 'react';

    const Error = (props) => {
        let {state} = props.location 
        if (!state) state = {status: 404, msg: "Page not found"};
        return <div className="error">
            <h1>Oops! Something went wrong...</h1>
            <h2>{state.status}</h2>
            <h3>{state.msg}</h3>
            <img src="http://www.stickpng.com/assets/images/5897a8c3cba9841eabab6156.png" alt= "emosh" className="error-pic"></img>
        </div>
    }

export default Error;