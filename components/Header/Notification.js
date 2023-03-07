import * as React from 'react';
// import Popover from '@mui/material/Popover';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import { useRouter } from 'next/router'
import { Popover, Typography, Button, Grid } from "@material-ui/core";
import {Badge} from '@material-ui/core';
import {GQL_URL} from "../../apiConfig"
export default function BasicPopover(props) {
    const {notificationData } = props
    const [anchorEl, setAnchorEl] = React.useState(null);
    const router = useRouter();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleBidClick = (bid) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", props.accessToken);
        var graphql = JSON.stringify({
          query:`mutation MarkAsRead($notificationId: ID!) {
            markAsRead(notificationId: $notificationId) {
                _id
                details
                hasDetails
                message
                status
                timeSent
                to
                from
                sender {
                  name
                  image
                }
                type
                url
                  }
                }`,
                    variables: {
                        notificationId:bid._id
                      }
                
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: graphql,
          redirect: "follow",
        };
        fetch(GQL_URL, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                if(bid.type == "offer" || bid.type == "bid"||bid.type =="newOrder"){
                    router.push(`${bid.url}&from=${bid?.from}&to=${bid?.to}`)
                }
               
                handleClose();
              // resolve(JSON.parse(result).data);
            })
            .catch((error) => {
             
              // reject(error);
            });
        
    }
    const checkReadNotification = (notifications) => {
            const isUnReadExist = notifications.some((val,i)=> val.status == "unread");
            return isUnReadExist;
    }
    return (
        <div>
            {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button> */}
            <div aria-describedby={id} variant="contained" onClick={handleClick} className="nav__Notification">
            <Badge color="secondary" overlap="circular" variant="dot" className={`${checkReadNotification(notificationData)? "cursor-pointer addNotificationDot":"cursor-pointer noNotificatonDot"}`}>
              <img className="Notification__icon" src="/icons/bell.svg" />
              </Badge>
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}

                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                className="notification__popOver"
            > <div className="Notifications">
                <div className="Notification__headingContainer">
                <Typography variant="h6" className=" Notification__heading">Notifications</Typography>
                    </div>
                {notificationData.length>0 ?notificationData.map((bid, i) => {
                    return (
                        <div className={`chatdropdown__products ${bid.status == "read"? "chatdropdown__read" : "chatdropdown__unread"}`} onClick={() => handleBidClick(bid)}>
                        <div className="chatdropdown__productsItem" >
                            <div variant="contained" className="nav__Notification">
                          
                                <img className="CB__MH__productImg" src={bid.sender.image ? bid.sender.image:"/images/sellerProfile.jpg"} />
                              
                                <div className="CB__MH__infoContainer">
                                    <Grid container>
                                        <Grid item xs={12} lg={10}>
                                            <Typography className="CB__MH__PTitle" variant="h2">{bid.sender.name}</Typography>
                                            <Typography className="CB__MH__PPrice" variant="h2">{bid.message}</Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                        
                        {bid.isNewOffer && <div className="CB__MH__offerFlag"></div>}
                    </div>
                        // <div className="Notification"  onClick={() => handleBidClick(bid)}>
                        //     {bid}
                        // </div>
                    )
                }):<Typography variant="h6" className=" Notification noNotification">No notification</Typography>}
                </div>
            </Popover>
        </div>
    );
}
