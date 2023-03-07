import * as React from 'react';
// import Popover from '@mui/material/Popover';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import { Popover, Typography, Button, Grid } from "@material-ui/core";
export default function BasicPopover(props) {
    const { currentBid, contacts, handleChangeBid } = props
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleContactClick = (contact) => {
        props.onclick(contact);
         handleClose();
    }
    return (
        <div>
            {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button> */}
          {contacts.length>0 && Object.keys(props.selectedContact).length >0 &&
             <div className="chatBox__contacts" onClick={handleClick}>
             <img className="CB__contacts_ProfileImg" src={props.account.userId == props.selectedContact.soldBy ? 
                 props.selectedContact.createdByinfo.image?props.selectedContact.createdByinfo.image:"/images/sellerProfile.jpg":
                 props.selectedContact.soldByInfo.image?props.selectedContact.soldByInfo.image:"/images/sellerProfile.jpg"} 
                 />
             <div className="CB__contacts_infoContainer">
                 <Grid container>
                     <Grid item xs={12} lg={12}>
                         <div className="CB__contacts_infoRow">
                             <Typography className="CB__contacts_userName" variant="h2">{props.account.userId == props.selectedContact.soldBy ?props.selectedContact.createdByinfo.name:props.selectedContact.soldByInfo.name}</Typography>
                             <Typography className="CB__contacts_infoTime" variant="h2">{new Date(props.selectedContact.createdAt).toLocaleTimeString()}</Typography>
                         </div>
                         <Grid item xs={10}>
                         <Typography className="CB__contacts_userDesc" variant="h2">{props.selectedContact.activeOffer.text}</Typography>
                         </Grid>
                     </Grid>
                 </Grid>
             </div>
            {props.selectedContact.isNewOffer && <div className="CB__contacts_notifyFlag"></div>}
            {open ?<img className="CB__MH__dropdownIcon" src="/icons/arrowUp.png" /> :<img className="CB__MH__dropdownIcon" src="/icons/arrowDown.png" />}
         </div>}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}

                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {contacts.map((contact, i) => {
                    return (
                        <div className="chatBox__contacts" onClick={()=>handleContactClick(contact)}>
                        <img className="CB__contacts_ProfileImg" src={props.account.userId == contact.soldBy ? 
                            contact.createdByinfo.image?contact.createdByinfo.image:"/images/sellerProfile.jpg":
                            contact.soldByInfo.image?contact.soldByInfo.image:"/images/sellerProfile.jpg"} 
                            />
                        <div className="CB__contacts_infoContainer">
                            <Grid container>
                                <Grid item xs={12} lg={12}>
                                    <div className="CB__contacts_infoRow">
                                        <Typography className="CB__contacts_userName" variant="h2">{props.account.userId == contact.soldBy ?contact.createdByinfo.name:contact.soldByInfo.name}</Typography>
                                        <Typography className="CB__contacts_infoTime" variant="h2">{new Date(contact.createdAt).toLocaleTimeString()}</Typography>
                                    </div>
                                    <Typography className="CB__contacts_userDesc" variant="h2">{contact.activeOffer.text}</Typography>
                                </Grid>
                            </Grid>
                        </div>
                       {contact.isNewOffer && <div className="CB__contacts_notifyFlag"></div>}
                    </div>
                    )
                })}
            </Popover>
        </div>
    );
}
