import React from 'react'
import { Dialog,Typography,Grid } from '@material-ui/core';
import Link from "components/Link"
export default function FollowersModal(props) {
    return (
        <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"xs"}
        fullWidth={true}
        // disableBackdropClick={true}
        className={"login__dialog"}
      >
          <div className="followWrapper">
           <Typography variant="h2" className="followList_title">Following</Typography>
           {props.following.length>0 &&props.following.map((following, i) => {
                    return (
                        <Link
                        href={true && "/profile/[...slugOrId]"}
                        as={true && `/profile/${following.profile.username}`}
                      >
                        <div className={`follow__list `} onClick={props.handleClose}>
                        <div className="chatdropdown__productsItem" >
                            <div variant="contained" className="follow__row">
                          
                                <img className="followList__profileImage" src={following.profile.picture ? following.profile.picture:"/images/sellerProfile.jpg"} />
                              
                                <div className="follow__infoContainer">
                                    <Grid container>
                                        <Grid item xs={12} lg={10}>
                                            <Typography className="followList__name" variant="h2">{following.profile.name}</Typography>
                                            <Typography className="followList__username" variant="h2">{following.profile.username}</Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Link>
                    )
                })}
                </div>
          </Dialog>
    )
}
