import React, { useState, useEffect } from 'react'
import { Typography, Grid, Button, Hidden } from "@material-ui/core";
import PublicProfileItem from "./PublicProfileItem";
import FollowersModal from "./FollowersModal";
import FollowingModal from "./FollowingModal";
import useFollowUser from "hooks/publicProfile/useFollowUser";
import useUnFollowUser from "hooks/publicProfile/useUnFollowUser";
import PublicGidItem from "components/PublicProfileGridItem";
export default function Index(props) {
    // const {profile} = props;
    const [profile, setProfile] = useState([]);
    const [followUserEntry] = useFollowUser();
    const [unfollowUserEntry] = useUnFollowUser()
    const [FollowersModalShow, setFollowersModalShow] = useState(false);
    const [FollowingModalShow, setFollowingModalShow] = useState(false);

    useEffect(() => {
        if (props.profile) {
            setProfile(props.profile)
        }
    }, [props.profile])
    const onFollow = async () => {
        const res = await followUserEntry(profile.userName);
        if (res) {
            const reStructFollower = profile.follower ? [...profile.follower] : [];
            reStructFollower.push(res.data.followUser);
            setProfile({
                ...profile,
                follower: reStructFollower,
                canFollow: !profile.canFollow
            })
        }
    }
    const onUnFollow = async () => {
        const res = await unfollowUserEntry(profile.userName);
        if (profile.follower) {
            const filterFollower = profile.follower.filter(val => {
                if (val.userName != res.data.unfollowUser) {
                    return val;
                }
            });
            setProfile({
                ...profile,
                follower: filterFollower,
                canFollow: !profile.canFollow
            })
        }
    }
    return (
        <div className="sellerProfile">
            <Typography className="SELLERpROFILE__mainHeading" variant="h5">Profile</Typography>
            <Grid container className="publicProfile__profileInfoWrapper">
                <Grid xs={12} item className="publicProfile__profileInfoSection">
                    <div className="sellerProfile__img" style={{ backgroundImage: profile ? profile.profilePhoto ? "URL(" + profile.profilePhoto + ")" : "URL(" + "/images/sellerProfile.jpg" + ")" : "URL(" + "/images/sellerProfile.jpg" + ")" }}>
                        {/* <div className="sellerProfile__badge"> 
                          <img src={profile ? profile.profilePhoto?profile.profilePhoto:"/icons/medal.svg":"/icons/medal.svg"} />
                        </div> */}

                    </div>
                    <div className="publicProfile__infoContainer">
                        <div className="sellerProfile__infoRow publicProfile__infoRow">
                            <Typography className="publicProfile__name" variant="h5"><span>{profile && profile.name?profile.name:profile.userName}</span>{profile && profile.isVerified && <img src="/icons/tickIcon.png" />}</Typography>
                            {props.account.username && props.account.username != profile.userName ?
                                profile && !profile.canFollow ? <Button className="publicProfile__settingBtn" onClick={() => onUnFollow()}>
                                    unfollow
                                </Button> : <Button className="publicProfile__settingBtn" onClick={() => onFollow()}>
                                    Follow
                                </Button> : <></>}
                        </div>
                        <Hidden xsDown>
                           <>
                        {profile && profile.name && <Typography className="sellerProfile__status" variant="h5">{profile.userName}</Typography>}
                       </>
                        </Hidden>
                        <Hidden xsDown>
                            <Grid container>
                                <Grid item xs={12} md={8} lg={6} xl={4}>
                                    <div className="publicProfile__infoMeta">
                                        <div className="sellerProfile__infoMetaRow" >
                                            <Typography className="sellerProfile__infoMetaContent" variant="h5">{profile && profile.products ? profile.products.length : 0}</Typography>
                                            <Typography className="sellerProfile__infoMetaTitle" variant="h5"> Products</Typography>
                                        </div>
                                        <div className="sellerProfile__infoMetaRow" onClick={() => setFollowersModalShow(profile.follower ? profile.follower.length > 0 ? true : false : false)}>
                                            <Typography className="sellerProfile__infoMetaContent" variant="h5">{profile && profile.follower ? profile.follower.length : 0}</Typography>
                                            <Typography className="sellerProfile__infoMetaTitle" variant="h5"> Followers</Typography>
                                        </div>
                                        <div className="sellerProfile__infoMetaRow" onClick={() => setFollowingModalShow(profile.following ? profile.following.length > 0 ? true : false : false)}>
                                            <Typography className="sellerProfile__infoMetaContent" variant="h5">{profile && profile.following ? profile.following.length : 0}</Typography>
                                            <Typography className="sellerProfile__infoMetaTitle" variant="h5"> Following</Typography>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Hidden>
                    </div>

                </Grid>
                <Grid xs={12}>
                <Hidden smUp>
                        <Grid container>
                            <Grid item xs={12} md={8} lg={6} xl={4}>
                                <div className="publicProfile__infoMeta">
                                <div className="sellerProfile__infoMetaRow" >
                                        <Typography className="sellerProfile__infoMetaContent" variant="h5">{profile && profile.products?profile.products.length :0}</Typography>
                                        <Typography className="sellerProfile__infoMetaTitle" variant="h5"> Products</Typography>
                                    </div>
                                    <div className="sellerProfile__infoMetaRow" onClick={()=>setFollowersModalShow(profile.follower?profile.follower.length>0?true:false:false)}>
                                        <Typography className="sellerProfile__infoMetaContent" variant="h5">{profile && profile.follower?profile.follower.length :0}</Typography>
                                        <Typography className="sellerProfile__infoMetaTitle" variant="h5"> Followers</Typography>
                                    </div>
                                    <div className="sellerProfile__infoMetaRow" onClick={()=>setFollowingModalShow(profile.following?profile.following.length>0?true:false:false)}>
                                        <Typography className="sellerProfile__infoMetaContent" variant="h5">{profile && profile.following?profile.following.length :0}</Typography>
                                        <Typography className="sellerProfile__infoMetaTitle" variant="h5"> Following</Typography>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                        </Hidden>
                    </Grid>
            </Grid>
            <Grid container spacing={3}>

                {profile.products && profile.products.map((item, i) => {
                    return (
                        <Grid item xs={12} md={3}>
                            <PublicGidItem {...item}/>
                            {/* <PublicProfileItem item={item} {...props} /> */}
                        </Grid>
                    );
                })}

            </Grid>
            <FollowersModal open={FollowersModalShow} handleClose={() => setFollowersModalShow(false)} followers={profile && profile.follower ? profile.follower : []} />
            <FollowingModal open={FollowingModalShow} handleClose={() => setFollowingModalShow(false)} following={profile && profile.following ? profile.following : []} />
        </div>
    )
}
