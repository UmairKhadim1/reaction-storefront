import React from 'react'
import Review from "./Review";
import {Typography} from "@material-ui/core";
export default function index(props) {
    
    return (
        <div className="Reviews">
          
           
            {
                props.Reviews.map((item,i)=>{
                    return <Review item={item}/>
                })
            }
        </div>
    )
}
