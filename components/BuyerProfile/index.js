import React, { useState, useEffect } from 'react'
import { useQuery, gql } from "@apollo/client";
import { Typography, Grid, Button, Hidden } from "@material-ui/core";
import BuyerProfileTabs from "./BuyerProfileTabs";
import SellerProfileTabs from "../SellerProfile/SellerProfileTabs";
import SettingTabs from "../SellerProfile/SettingTabs";
import useAuthStore from "hooks/globalStores/useAuthStore";
import useViewer from "hooks/viewer/useViewer";
import { useRouter } from "next/router";

import CustomLoader from "../CustomLoader";
export default function Index(props) {
    const router=useRouter()
    const [showSetting, setShowSetting] = useState(false);
    const [showSellerProfile, setShowSellerProfile] = useState(false);
    const [Loader, setLoader] = useState(false);
    const [shippingMethods, setShippingMethods] = useState([]);
    let Account;
    const { account,accessToken } = useAuthStore();
    //  const account = props.account;
    Account = account;


    const { loading, data } = useQuery(gql`
    query FlatRateFulfillmentMethods($shopId:ID!){
        flatRateFulfillmentMethods(shopId:$shopId){
            nodes {
                _id
                name
                rate
                label
                
            }
        }
    }
    `, {
        variables: {
            shopId: props.shop._id
        }
    });
    useEffect(() => {

        // do some checking here to ensure data exist
        if (data) {
            // mutate data if you need to
            setShippingMethods(data.flatRateFulfillmentMethods.nodes)
        }

    }, [data]);
    useEffect(() => {
        if (router?.query?.activeProfile == "seller") {
            setShowSellerProfile(true)
        }
    }, [router?.query])
    useEffect(() => {
        if (sessionStorage.getItem("profileMode") == "seller") {
            setShowSellerProfile(true)
        }
    }, [])
    const handleSetting = () => {
        setLoader(true)
        setShowSetting(true);
        setShowSellerProfile(false);
        setTimeout(() => {
            setLoader(false);
        }, 1000);
    }
    const handleProfile = () => {
        setLoader(true)
        setShowSetting(false);
        if (sessionStorage.getItem("profileMode") == "seller") {
            setShowSellerProfile(true)
        }
        let time = setTimeout(() => {
            setLoader(false);
        }, 1000);

    }

    const onUpdateProfite = (val) => {
        // const { account } = useAuthStore();

        Account = {
            ...Account,
            name: val.name
        };


    }
    const handleSwitchProfile = () => {
        setLoader(true)
        sessionStorage.setItem("profileMode", showSellerProfile ? "buyer" : "seller");
        let time = setTimeout(() => {
            setLoader(false);
        }, 1000);
        //    clearTimeout(time);
        setShowSellerProfile(!showSellerProfile);
    }
    if (Loader) return <CustomLoader />
    return (
        <div className="buyerProfile">
            <Typography className="buyerProfile__mainHeading" variant="h5">{showSetting ? <> Settings</> : <><span>Profile</span><div className="profile__switchMode" onClick={handleSwitchProfile}>{showSellerProfile ? <>switch to Buyer</> : <>switch to Seller</>}</div></>}
            <Hidden smUp>
                            {showSetting ?
                                <Button className="buyerProfile__mobSettingBtn" onClick={() => handleProfile()}>
                                    <img className="buyerProfile__profileIcon" src="/icons/profileIcon.png" /> 
                                </Button> :
                                <Button className="buyerProfile__mobSettingBtn" onClick={() => handleSetting()}>
                                    <img className="buyerProfile__settingIcon" src="/icons/setting.svg" /> 
                                </Button>
                            }
                            </Hidden>
            </Typography>
            <Grid container>
                {/* <Grid item xs={12} className="buyerProfile__test">
                <Typography className="buyerProfile__name" variant="h5">{account?.name?account?.name:account?.username}</Typography>
                    </Grid> */}
                <Grid xs={12} item className="buyerProfile__profileInfoSection">


                    <div className="buyerProfile__img" style={{ backgroundImage: `URL(${account.picture ? account.picture : "/images/sellerProfile.jpg"})` }}>
                        {/* <div className="buyerProfile__badge"> 
                          <img src="/icons/medal.svg" />
                        </div> */}

                    </div>
                    <div className="buyerProfile__infoContainer">
                        <div className="buyerProfile__infoRow">
                            <Typography className="buyerProfile__name" variant="h5">{account?.name ? account?.name : account?.username}</Typography>
                            <Hidden xsDown>
                            {showSetting ?
                                <Button className="buyerProfile__settingBtn" onClick={() => handleProfile()}>
                                    Profile
                                </Button> :
                                <Button className="buyerProfile__settingBtn" onClick={() => handleSetting()}>
                                    <img className="buyerProfile__settingIcon" src="/icons/setting.svg" /> Settings
                                </Button>
                            }
                            </Hidden>
                        </div>
                        <Typography className="buyerProfile__status" variant="h5">{account?.primaryEmailAddress}</Typography>
                        <Typography className="buyerProfile__status" variant="h5">{account?.identityVerified && "Verified Seller"}</Typography>
                        {/* <Grid container>
                            <Grid item xs={12} md={8} lg={6} xl={4}>
                                <div className="buyerProfile__infoMeta">
                                    <div className="buyerProfile__infoMetaRow">
                                        <img className="buyerProfile__infoMetaIcon" src="/icons/star.svg" />
                                        <Typography className="buyerProfile__infoMetaTitle" variant="h5">5.0</Typography>
                                    </div>
                                    <div className="buyerProfile__infoMetaRow">
                                        <Typography className="buyerProfile__infoMetaContent" variant="h5">130K</Typography>
                                        <Typography className="buyerProfile__infoMetaTitle" variant="h5"> Followers</Typography>
                                    </div>
                                    <div className="buyerProfile__infoMetaRow">
                                        <Typography className="buyerProfile__infoMetaContent" variant="h5">4203</Typography>
                                        <Typography className="buyerProfile__infoMetaTitle" variant="h5"> Following</Typography>
                                    </div>
                                </div>
                            </Grid>
                        </Grid> */}
                    </div>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    {showSellerProfile ? <SellerProfileTabs shop={props.shop} items={Account.productVariants ? Account.productVariants : []} orderFulfillment={Account.orderFulfillment ? Account.orderFulfillment : []} currentUser={Account.userId} /> :
                        showSetting ? <SettingTabs shop={props.shop} isSeller={account?.identityVerified} AccountBook={Account.AccountBook ? Account.AccountBook : []} onUpdateProfite={(val) => onUpdateProfite(val)}
                            account={Account.userId}
                            userAccount={account} shippingMethods={shippingMethods} />
                            :

                            <BuyerProfileTabs  shop={props.shop} account={Account} accessToken={accessToken} items={Account.productVariants ? Account.productVariants : []} />
                    }
                </Grid>
            </Grid>
        </div>
    )
}
