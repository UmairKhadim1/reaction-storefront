import React from 'react'
import { Typography, Grid, Button } from "@material-ui/core";
import SellerProfileTabs from "./SellerProfileTabs";
export default function Index() {
    return (
        <div className="sellerProfile">
            <Typography className="SELLERpROFILE__mainHeading" variant="h5">Profile</Typography>
            <Grid container>
                <Grid xs={12} item className="sellerProfile__profileInfoSection">
                    <div className="sellerProfile__img" style={{ backgroundImage: "URL(/images/sellerProfile.jpg)" }}>
                        <div className="sellerProfile__badge"> 
                          <img src="/icons/medal.svg" />
                        </div>
                      
                    </div>
                    <div className="sellerProfile__infoContainer">
                        <div className="sellerProfile__infoRow">
                            <Typography className="sellerProfile__name" variant="h5">Benjamin Nelson</Typography>
                            <Button className="sellerProfile__settingBtn">
                                <img className="sellerProfile__settingIcon" src="/icons/setting.svg" /> Settings
                            </Button>
                        </div>
                        <Typography className="sellerProfile__status" variant="h5">Verified Seller</Typography>
                        <Grid container>
                            <Grid item xs={12} md={8} lg={6} xl={4}>
                                <div className="sellerProfile__infoMeta">
                                    <div className="sellerProfile__infoMetaRow">
                                        <img className="sellerProfile__infoMetaIcon" src="/icons/star.svg" />
                                        <Typography className="sellerProfile__infoMetaTitle" variant="h5">5.0</Typography>
                                    </div>
                                    <div className="sellerProfile__infoMetaRow">
                                        <Typography className="sellerProfile__infoMetaContent" variant="h5">130K</Typography>
                                        <Typography className="sellerProfile__infoMetaTitle" variant="h5"> Followers</Typography>
                                    </div>
                                    <div className="sellerProfile__infoMetaRow">
                                        <Typography className="sellerProfile__infoMetaContent" variant="h5">4203</Typography>
                                        <Typography className="sellerProfile__infoMetaTitle" variant="h5"> Following</Typography>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <SellerProfileTabs />
                </Grid>
            </Grid>
        </div>
    )
}
