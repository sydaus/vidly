import React, { Component } from 'react';

// input: liked: Boolean
// output: onClick

// class Like extends React.Component {
//     render() {
//         let classes = "fa fa-heart";
//         if (!this.props.liked) classes += "-o"; 
//         return (            
//             <i 
//             onClick={()=>this.props.onClick(this.props.movie)}          
//             style={{cursor: "pointer"}} 
//             className={classes} 
//             aria-hidden="true"></i>
           
//         );
//     }
// }
 
// export default Like;



// stateless functional component
const Like = (props) => {
        let classes = "fa fa-heart";
        if (!props.liked) classes += "-o"; 
        return (            
            <i 
            onClick={()=>props.onClick(props.movie)}          
            style={{cursor: "pointer"}} 
            className={classes} 
            aria-hidden="true"></i>           
        );
    };



export default Like;