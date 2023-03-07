import React from 'react'
import { Grid, Typography } from "@material-ui/core";
export default function WalletCard(props) {
    return (
        <Grid container className="walletCard" style={{position:"relative"}}>
            
            <Grid item xs={12}>
            <Typography variant="h2" className="walletCard__title">Account No</Typography>
                <Typography variant="h2" className="walletCard__num">{props.item.AccountNo}</Typography>
            </Grid>
            <Grid item xs={12} className="walletCard__row">
                <Grid item xs={12}>
                    <Typography variant="h2" className="walletCard__title">Account Name</Typography>
                    <Typography variant="h2" className="walletCard__value">{props.item.AccountTitle}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h2" className="walletCard__title">Sort Code</Typography>
                    <Typography variant="h2" className="walletCard__value">{props.item.swiftCode}</Typography>
                </Grid>
            </Grid>
            <h2 className="walletCard__editBtn"  onClick={()=>props.setEditCardData(props.item)}>Edit</h2>
           {props.item.isActive  && <h2 className="walletCard__activeStatus"  ><div className="walletCard__activeStatusIcon"></div>Active</h2>}
        </Grid>
    )
}
