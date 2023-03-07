import React from 'react'
import { Grid, Typography } from "@material-ui/core";
export default function WalletCard() {
    return (
        <Grid container className="walletCardPlaceholder">
            
            <Grid item xs={12}>
                <Typography variant="h2" className="walletCardPlaceholder__num"></Typography>
            </Grid>
            <Grid item xs={10}>
                <Typography variant="h2" className="walletCardPlaceholder__num" component="div">
                    <p>324</p>
                </Typography>
            </Grid>
           
        </Grid>
    )
}
