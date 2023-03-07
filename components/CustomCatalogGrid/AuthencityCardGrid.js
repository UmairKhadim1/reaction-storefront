import React from 'react'
import {Grid} from "@material-ui/core";
import AuthencityCardItem from '../AuthencityCardItem';
export default function Index(props) {
    return (
        // className="productGrid__4cardContainer" className={`productGrid__4card${i}`}
         <Grid container spacing={3} className="productGrid__4cardContainer">
            {props.products.map((item, i)=>{
                return(
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} >
                       <AuthencityCardItem product={item} {...props}/>
                    </Grid>
                )
            })}
         </Grid>
    )
}
