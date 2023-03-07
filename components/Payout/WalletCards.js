import React from 'react'
import {Grid} from "@material-ui/core";
import WalletCard from "./WalletCard";
import PlaceholderCard from "./PlaceholderCard";

export default function WalletCards(props) {
    return (
        <Grid container spacing={3} style={{marginTop:"10px"}}>
             { props.AccountBook.map((data, i)=>{
              return(
                    <Grid   item xs={12} sm={6} md={4} lg={3}>
                        
                        <WalletCard {...props} item={data}/>
                        
                   </Grid> 
             )})}
        </Grid>
    )
}
