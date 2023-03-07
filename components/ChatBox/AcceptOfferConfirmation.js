import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';

import { blue } from '@material-ui/core/colors';
import {Grid,Typography} from "@material-ui/core";
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },

});

function AcceptOfferConfirmation(props) {

    const handleClose = () => {
        props.onClose();
    };

    return (
        <Dialog className="writeReview__Wrapper" maxWidth="xs" fullWidth={true} onClose={handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
            <Grid container className="writeReview__modalContainer">
            <Grid xs={12} sm={12} >
                <Typography className="AcceptOffer__title" variant="h6">Are you sure to accept this offer?</Typography>
                </Grid>
                <Grid xs={12} sm={6} className="AcceptOffer__BtnWrapper">
                    <Button className="AcceptOffer__cancel" onClick={handleClose}>Cancel</Button>
                </Grid>
                <Grid xs={12} sm={6} className="AcceptOffer__BtnWrapper">
                    <Button className="AcceptOffer__accept" onClick={props.handleAcceptOffer}>Accept</Button>
                </Grid>
            </Grid>
        </Dialog>

    );
}

AcceptOfferConfirmation.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};
export default AcceptOfferConfirmation;


