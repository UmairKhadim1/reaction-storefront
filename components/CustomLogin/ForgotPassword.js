import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { DialogContent, Typography, Container, Grid, IconButton, Icon,Button,TextField,Hidden  } from "@material-ui/core";
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

  login__logoBox: {
    padding: "20px 0px",
    border:"none",
    paddingLeft:"15px"
  },
  // login__footer:{
  //   display:"flex",
  //   padding:"16px 0px",
  //   alignItems: "center",
  // },
  footer__loginBtn:{
    backgroundColor:"#D8213B",
    padding:"10px 30px",
    borderRadius:"86px",
    color:"white",
    // fontSize:"16px"
    "&:hover": {
      color:"#D8213B"
    },
    marginRight:"0px"
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
login__headerTitle:{
   paddingLeft:"15px"
},

login__inputLabel:{
  fontSize:"12px",
  fontWeight:500,
  padding:"5px 15px",
  color: "#000000 !important"
},
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
              <Grid item sm={6} md={6} className="forgotPassword__leftCol">
              
                <img className={classes.loginImg} src="/images/loginImg.png" />
                <img className="forgotPasswordImgShoesLogo" src="/icons/loginImgShoesLogo.png" />
              </Grid>
              </Hidden>
             
              <Grid item xs={12} sm={6} md={6}>
                <IconButton aria-label="close" className="forgotPassword__closeButton" onClick={props.onClose}>
                  <Icon>
                    close
                   </Icon>
                </IconButton>
                <Container className="forgotPassword__innerContainer">
                  <div className="forgotPassword__logoBox">
                    <img src="/icons/logo.png" />
                  </div>
                  <div>
                    <Typography variant="h6" className="forgotPassword__headerTitle">WELCOME!</Typography>
                    {/* <Typography variant="subtitle2" className={classes.login__subtitle}>Enter your phone number to continue</Typography> */}
                   <div className={"formRow"}>
                     <Typography variant="h6" className="forgotPassword__inputLabel">Phone number</Typography>
                    <PhoneInput
                    international
                      placeholder="Enter phone number"
                      country={'US'}
                      value={value}
                      onChange={setValue}
                      className={classes.login__phoneInput} 
                      defaultCountry="US"
                      />
                      </div>

                  </div>
                  <div className="login__footerContainer">
                  <div className="forgotPassword__footer">
                      <Button className={classes.footer__loginBtn} onClick={props.handleForgotPassword}>Next</Button>
                  </div>
                  <Typography variant="subtitle2" className="forgotPassword__footerText">Don’t have an account? <span onClick={props.switchSignup}>Sign up.</span></Typography>
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