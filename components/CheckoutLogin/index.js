import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Router from "translations/i18nRouter";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { DialogContent, Typography, Container, Grid, IconButton, Icon, Button, TextField, Hidden } from "@material-ui/core";
// import PhoneInput from 'react-phone-input-2';
import PhoneInput from 'react-phone-number-input';
import Head from "next/head";
const useStyles = makeStyles((theme) => ({

  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "none",
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(0),
  },
  dialogBox: {
    padding: theme.spacing(0),
    paddingTop: "0px",
    '&:first-child': {
      paddingTop: "0px",
      border: "none"
    }
  },
  checkoutLogin: {
    // overFlow:"hidden"
    // minHight:"400px"
  },
  checkoutLoginRow: {
    padding: theme.spacing(0),
  },
  checkoutLoginImg: {
    width: "100%",
    height: "100%"
  },


 


  checkoutLogin__subtitle: {
    fontSize: "12px",
    padding: "14px 0px 22px 0px"
  },
  checkoutLogin__phoneInput: {
    border: "1px solid #DEDEDE",
    padding: "10px",
    borderRadius: "25px"
  },
  checkoutLogin__googleBtn: {
    backgroundColor: "white",
    boxShadow: "5.29963px 5.29963px 13.2491px rgba(0, 0, 0, 0.13)",
    marginLeft: "20px"
  },

  passwordInput: {
    width: "100%",
    border: "none"
  }
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [value, setValue] = useState("+44");
  const switchSignup = () => {
    Router.push("/signup");
  }
  return (
    <div className={classes.checkoutLogin}>
        <div className={classes.paper}>
          <div className={classes.dialogBox} dividers >
            <Grid container className={classes.checkoutLoginRow}>
              <Grid item xs={12} sm={12} md={12}>
                <Container className="checkoutLogin__innerContainer">
                  {/* <div>
                    <Typography variant="h6" className="checkoutLogin__headerTitle">CHECK OUT WITH YOUR FLIGHT CLUB ACCOUNT</Typography>
                    <div className={"formRow"}>
                      <Typography variant="h6" className="checkoutLogin__inputLabel">Phone number</Typography>
                      
                      <PhoneInput
                         international
                        placeholder="Enter phone number"
                        country={'UK'}
                        value={value}
                        onChange={setValue}
                        className={classes.checkoutLogin__phoneInput}
                        defaultCountry="UK"
                      />
                    </div>
                    <div className={"formRow"}>
                      <Typography variant="h6" className="checkoutLogin__inputLabel">Password</Typography>
                      <TextField
                        id="standard-password-input"
                        // label="Password"
                        type="password"
                        autoComplete="current-password"
                        className={classes.passwordInput}
                      />
                    </div>

                  </div> */}
                  <div className="checkoutLogin__footerContainer">
                    <div className="checkoutLogin__footer">
                      <Button className="footer__checkoutLoginBtn" href="/signin">Login</Button>
                    
                      {  /*<Typography>or</Typography>
                      <IconButton className={classes.checkoutLogin__googleBtn}>
                        <img src="/icons/googleIcon.png" />
                    </IconButton>*/}

                    </div>
                    <Typography variant="subtitle2" className="checkoutLogin__footerText" >Don’t have an account? <a href="/signup" className="no-decoration red">Sign up.</a></Typography>
                    {/* <Typography variant="subtitle2" className="checkoutLogin__forgotPassword" onClick={props.switchForgotPassword}>Forgot Password?</Typography> */}
                  </div>
                </Container>


              </Grid>
            </Grid>
          </div>
        </div>
    </div>
  );
}