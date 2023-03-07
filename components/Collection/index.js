import React from 'react';
import {Typography, Grid} from "@material-ui/core";

export default function index() {
    return (
        <Grid container className="collection" spacing={3}>
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} className="collectionItem" >
               <div className="collectionCard">
               <img className="collection__img" src="/images/collection1.png" />
               <Typography variant="h6" className="collection__tagline">JUST DROPED</Typography>
               </div>  
            </Grid>
            <Grid item  xs={12} sm={6} md={4} lg={4} xl={4} className="collectionItem" >
               <img className="collection__img" src="/images/collection2.png" />
               <Typography variant="h6" className="collection__tagline">Air jordan 1</Typography>  
            </Grid>
            <Grid item  xs={12} sm={6} md={4} lg={4} xl={4} className="collectionItem" >
               <img className="collection__img" src="/images/collection3.png" />
               <Typography variant="h6" className="collection__tagline">Adidas yeezy</Typography>  
            </Grid>
        </Grid>
    )
}
