import React  from 'react';
import { Grid, Typography,Button, Icon,InputBase } from "@material-ui/core";
import { fade, makeStyles } from '@material-ui/core/styles';
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
export default function index() {
    const classes = useStyles();
    return (
        <div className="trackOrder">
            <Typography className="trackOrder__heading" variant="h5" component="h2">Track your Order</Typography>
            <Grid container className="trackOrder__container">
                <Grid className="trackOrder__containerItem" item xs={12} sm={8} lg={6} xl={4}>
                <Typography className="trackOrder__title" variant="h5" component="h2">Track your Order</Typography>
                <Typography  className="trackOrder__description" variant="h2" component="h2">Enter your shipping reference such as LoS tracking number, waybill number, container, numbers, VIN number or any reference provided by us in the area below.</Typography>
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
                <Button className="trackOrder__btn">Track Now</Button>
                </Grid>
            </Grid>
        </div>
    )
}
