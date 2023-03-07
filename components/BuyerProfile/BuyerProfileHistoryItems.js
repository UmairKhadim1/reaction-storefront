import React from 'react'
import BuyerProfileHistoryItem from './BuyerProfileHistoryItem';
import {Grid} from "@material-ui/core";
export default function SellerProfileItems() {
    return (
        <div>
            <Grid container spacing={3}>
            { [1].map((item,i)=>{
                       return(
                <Grid item xs={12} >
                  
                        <BuyerProfileHistoryItem/>

                </Grid>
                  )
                })}
             </Grid>
        </div>
    )
}
