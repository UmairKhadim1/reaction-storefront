import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { DialogContent, Typography, Container, Grid, IconButton, Icon,Button,TextField, Hidden  } from "@material-ui/core";
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
      border:"none"
    }
  },
  login:{
    // overFlow:"hidden"
    // minHight:"400px"
  },
  loginRow: {
    padding: theme.spacing(0),
  },
  loginImg: {
    width: "100%",
    height: "100%"
  },
  closeButton: {
    position: "absolute",
    right: 25,
    top: 22,
    backgroundColor:"#F0F0F0",
    height:"44px",
    width:"44px"
    
  },
  login__innerContainer: {
    marginTop: "30px",
    padding: "0px 80px"
  },
  login__logoBox: {
    padding: "20px 0px",
    border:"none",
    paddingLeft:"15px"
  },
  // resetPassword__footer:{
  //   display:"flex",
  //   padding:"10px 0px",
  //   alignItems: "center",
  // },
  footer__signupBtn:{
    backgroundColor:"#D8213B",
    padding:"5px 16px",
    borderRadius:"86px",
    color:"white",
    // fontSize:"16px"
    "&:hover": {
      color:"#D8213B"
    },
    marginRight:"20px"
},
login__subtitle:{
  fontSize:"12px",
  padding:"14px 0px 22px 0px"
},
login__phoneInput:{
  border: "1px solid #DEDEDE",
  padding: "10px",
  borderRadius: "25px"
},
login__googleBtn:{
  backgroundColor:"white",
  boxShadow: "5.29963px 5.29963px 13.2491px rgba(0, 0, 0, 0.13)",
  marginLeft:"20px"
},
// resetPassword__headerTitle:{
//    paddingLeft:"15px"
// },


passwordInput:{
  width:"100%",
  border:"none"
}
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [value, setValue] = useState();
  return (
    <div className={classes.login}>
      <Fade in={open}>
        <div className={classes.paper}>
          <DialogContent className={classes.dialogBox} dividers >
            <Grid container className={classes.loginRow}>
              <Hidden only="xs">
              <Grid item sm={6} md={6} className="resetPassword__leftCol">
                <img className={classes.loginImg} src="/images/loginImg.png" />
                <img className="resetPasswordImgShoesLogo" src="/icons/loginImgShoesLogo.png" />
              </Grid>
              </Hidden>
              <Grid item xs={12} sm={6} md={6}>
                <IconButton aria-label="close" className="resetPassword__closeButton" onClick={props.onClose}>
                  <Icon>
                    close
                   </Icon>
                </IconButton>
                <Container className="resetPassword__innerContainer">
                  <div className="resetPassword__logoBox">
                    <img src="/icons/logo.png" />
                  </div>
                  <div>
                    <Typography variant="h6" className="resetPassword__headerTitle">Lets get you sorted!</Typography>
                    {/* <Typography variant="subtitle2" className={classes.login__subtitle}>Enter your phone number to continue</Typography> */}


                      <div className={"signup__formRow"}>
                        <Typography variant="h6" className="resetPassword__inputLabel">New Password</Typography>
                        <TextField
                            id="standard-password-input"
                            // label="Password"
                            type="password"
                            autoComplete="current-password"
                            className={classes.passwordInput}
                          />
                      </div>
                      <div className={"signup__formRow"}>
                        <Typography variant="h6" className="resetPassword__inputLabel">confirm Password</Typography>
                        <TextField
                            id="standard-password-input"
                            // label="Password"
                            type="password"
                            autoComplete="current-password"
                            className={classes.passwordInput}
                          />
                      </div>
                  </div>
                  <div className="login__footerContainer">
                  <div className="resetPassword__footer">
                      <Button className={classes.footer__signupBtn} onClick={props.handleLogin}>Reset</Button>
                  </div>
                  {/* <Typography variant="subtitle2" className="login__footerText">Already have an account? <span onClick={props.switchLogin}> Login</span></Typography> */}
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