import React from 'react'
import {Grid, Typography} from "@material-ui/core";
export default function MessageContact(props) {
    
    return (
        <div className="chatBox__contacts" onClick={()=>props.onclick(props.contact)}>
        <img className="CB__contacts_ProfileImg" src={props.account.userId == props.contact.soldBy ? 
            props.contact.createdByinfo.image?props.contact.createdByinfo.image:"/images/sellerProfile.jpg":
            props.contact.soldByInfo.image?props.contact.soldByInfo.image:"/images/sellerProfile.jpg"} 
            />
        <div className="CB__contacts_infoContainer">
            <Grid container>
                <Grid item xs={12} lg={12}>
                    <div className="CB__contacts_infoRow">
                        <Typography className="CB__contacts_userName" variant="h2">{props.account.userId == props.contact.soldBy ?props.contact.createdByinfo.name:props.contact.soldByInfo.name} 
                        </Typography>
                        <Typography className="CB__contacts_infoTime" variant="h2">{new Date(props.contact.createdAt).toLocaleTimeString()}
                        </Typography>
                        {props.account.userId == props.contact.soldBy ? <img 
                            className='seller-icon' src="/icons/seller.svg"/>: <img 
                            className='seller-icon' src="/icons/buyer.svg"/>}
                       

                    </div>
                    <Typography className="CB__contacts_userDesc" variant="h2">{props.contact.activeOffer.text}</Typography>
                </Grid>
            </Grid>
        </div>
       {props.contact.isNewOffer && <div className="CB__contacts_notifyFlag"></div>}
    </div>
    )
}
