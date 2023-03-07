import React from 'react'
import {Typography, Grid, Button} from "@material-ui/core";
export default function SellerProfileItem() {
    return (
        <div className="buyerProfile__productCard">
            <div className="BP__productCrd__ImgContainer">
                 <img src="/images/collection1.png"/>
                 <div className="BP__productCard__actions">
                     <Button className="BP__productCard__actionBtn">unPublish</Button>
                     <Button className="BP__productCard__actionBtn">Edit</Button>
                 </div>
            </div>
            <div className="BP__productCard__footerContainer">
                 <Typography className="BP__productCard__title" variant="h5">Epic Phantom React A.I.R. Cody Hudson</Typography>
                 <Typography className="BP__productCard__price" variant="h5">200</Typography>
            </div>
        </div>
    )
}
