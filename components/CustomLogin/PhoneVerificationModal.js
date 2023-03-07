import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { DialogContent, Typography, Container, Grid, IconButton, Icon, Button, Hidden } from "@material-ui/core";
import OtpInput from 'react-otp-input';
import Head from "next/head";

//  import OTPInput, { ResendOTP } from "otp-input-react";
const useStyles = makeStyles((theme) => ({

  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(0),
  },
  dialogBox: {
    padding: theme.spacing(0),
    border: "none",
    paddingTop: "0px",
    '&:first-child': {
      paddingTop: "0px",
      border: "none"
    }
  },
  loginRow: {
    padding: theme.spacing(0),
  },
  loginImg: {
    width: "100%",
    height: "100%"
  },

  login__footer: {
    display: "flex",
    justifyContent: "center",
    padding: "10px 0px",
    alignItems: "center",
  },
  footer__otpText: {
    fontSize: "12px",
    color: "#D8213B",
    fontWeight: 700,
    cursor:"pointer"
  },


  login__phoneInput: {
    border: "1px solid",
    padding: "10px",
    borderRadius: "25px"
  },
  verification__verifyBtn:{
    backgroundColor: "#D8213B",
    color: "white",
    padding: "3px 15px",
    borderRadius: "25px",
    margin:" 18px 0px 5px 0px",
    fontSize:"18px",
    '&:hover': {
      color: "#D8213B",
    }
  }
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [OTP, setOTP] = useState("");
  const handleChange = (otp) => setOTP(otp);
  return (
    <div>
      <Fade in={open}>
        <div className={classes.paper}>
          <DialogContent className={classes.dialogBox} dividers >
            <Grid container className={classes.loginRow}>
              <Hidden only="xs">
              <Grid item sm={6}  md={6} className="verification__leftCol">
                <img className={classes.loginImg} src="/images/loginImg.png" />
                <img className="verificationImgShoesLogo" src="/icons/loginImgShoesLogo.png" />
              </Grid>
              </Hidden>
              <Grid item xs={12} sm={6} md={6}>

                <Container className="otp__innerContainer">
                  <IconButton aria-label="close" className="otp__backBtn" onClick={props.onBack}>
                    <Icon>
                      <img src="/icons/arrowBack.png"/>
                   </Icon>
                  </IconButton>
                  <div className="otp__logoBox">
                    <img src="/icons/logo.png" />
                  </div>
                  <div>
                    <Typography variant="h6" className="verificationHeading" >Phone Verification</Typography>
                    <Typography variant="subtitle2" className="verification__subtitle">Please enter the 4-digit code send to you at</Typography>
                    <Typography variant="subtitle1" className="verification__subtitle2">+1  800-925-1234</Typography>
                    <div className="otpRow">
                      <OtpInput
                        value={OTP}
                        onChange={handleChange}
                        numInputs={4}
                        separator={<span></span>}
                        className="otp__input"
                      />
                    </div>

                  </div>
                  <Grid container justify="center">
                  <Button className={classes.verification__verifyBtn} onClick={props.handleOTP}>Verify</Button>
                    </Grid>
                  <div className={classes.login__footer}>
      
                    <Typography variation="h6" className={classes.footer__otpText}>Resend Code?</Typography>

                  </div>
                </Container>


              </Grid>
            </Grid>
          </DialogContent>
        </div>
      </Fade>
    </div>
  );
}