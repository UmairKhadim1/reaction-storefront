import React, {useState,useEffect} from 'react';
import { Grid, Typography,Button, Icon,InputBase } from "@material-ui/core";
import { fade, makeStyles } from '@material-ui/core/styles';
import Timeline from "./Timeline";
import {CopyToClipboard} from 'react-copy-to-clipboard';
const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        background: "#F0F0F0 !important",
        borderRadius: "25px !important",
        marginBottom:"30px !important",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        color: "#626262 !important",
        fontFamily: "Karla !important",
        fontStyle: "normal !important",
        fontWeight: "normal important",
        fontSize: "14px !important",
        lineHeight: "16px !important",
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}))
export default function TrakingDetail(props) {
    const classes = useStyles();
    const [copiedValue,setCopiedValue] = useState("");
    const [copied,setCopied] = useState(false);
    useEffect(() => {
       setCopiedValue(props.labelInfo.tracking_codes)
    }, [props.labelInfo])
    return (
        <div className="trackingDetail">
            <div className="trackingDetail__headingContainer">
            <Typography className="trackingDetail__heading" variant="h5" component="h2">Tracking Details</Typography>
            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <Icon>search</Icon>
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
            </div>
            
            <Grid className="trackingDetail__container">
               <Grid item xs={12}>
                    <Grid container className="trackingDetail__header">
                          <Grid xs={12} sm={4} xl={4} className="trackingDetail__headerItem" item>
                             <Typography className="trackingDetail__headerItemHeading" variant="h5" component="h2">Tracking ID</Typography>
                             <Typography className="trackingDetail__headerItemValue trackingDetail__headerTrackingIdContainer" variant="h5" component="h2"><span>{props.labelInfo.tracking_codes}</span>
                             <CopyToClipboard text={copiedValue}
          onCopy={() => setCopied(true)}>
                             <img className={`${copied && "trackingDetail__afterCopy"}`} src="/icons/copy.png"/>
                             </CopyToClipboard>
                             </Typography>
                          </Grid>
                          <Grid xs={12} sm={4} xl={4} className="trackingDetail__headerItem" item>
                             <Typography className="trackingDetail__headerItemHeading" variant="h5" component="h2">Serivce Provider</Typography>
                             <Typography className="trackingDetail__headerItemValue" variant="h5" component="h2">{props.labelInfo.courier}</Typography>
                          </Grid>
                          <Grid xs={12} sm={4} xl={4} className="trackingDetail__headerItem" item>
                             <Typography className="trackingDetail__headerItemHeading" variant="h5" component="h2">Date</Typography>
                             <Typography className="trackingDetail__headerItemValue" variant="h5" component="h2">12 may 2021</Typography>
                          </Grid>
                    </Grid>
                </Grid> 
                <Grid item xs={12}>
                    <Timeline/>
                    </Grid> 
            </Grid>
        </div>
    )
}
