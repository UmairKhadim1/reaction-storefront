import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { DialogContent, Typography, Container, Grid, IconButton, Icon,Button } from "@material-ui/core";
// import PhoneInput from 'react-phone-input-2';
import PhoneInput from 'react-phone-number-input';
import Head from "next/head";
const useStyles = makeStyles((theme) => ({

  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(0),
  },
  dialogBox: {
    padding: theme.spacing(0),
    border:"none",
    paddingTop: "0px",
    backgroundColor:"#D8213B",
    '&:first-child': {
      paddingTop: "0px",
      border:"none"
    }
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
    right: 0,
    top: 0
  },
  login__innerContainer: {
    marginTop: "100px",
    marginBottom:"100px",
    padding: "40px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color:"white"
  },
  login__logoBox: {
    padding: "20px 0px"
  },
  login__footer:{
    display:"flex",
    justifyContent:"space-between",
    padding:"10px 0px",
    alignItems: "center",
  },
  footer__loginBtn:{
    backgroundColor:"#D8213B",
    padding:"0px 22px",
    borderRadius:"86px",
    color:"white",
    // fontSize:"16px"
    "&:hover": {
      color:"#D8213B"
    }
},
congratulation__title:{
  textAlign:"center",
  lineHeight: "41px",
  fontWeight:"normal",
  fontSize:"30px"
},
login__subtitle:{
  fontSize:"12px",
  padding:"0px 0px",
  textAlign:"center",
  color:"white"
},
login__phoneInput:{
  border: "1px solid",
  padding: "10px",
  borderRadius: "25px"
},
closeIcon:{
  color:"white"
},

}));

export default function CongratulationModal(props) {
  const classes = useStyles();
  const [value, setValue] = useState()
  return (
    <div>
      <Fade in={open}>
        <div className={classes.paper}>
          <DialogContent className={classes.dialogBox} dividers >
            <Grid container className={classes.loginRow} justify="center">
              <Grid item md={6}   >
                <IconButton aria-label="close" className={classes.closeButton} onClick={props.onClose}>
                  <Icon className={classes.closeIcon}>
                    close
                   </Icon>
                </IconButton>
                <Container className={classes.login__innerContainer}>
                  <div className={classes.login__logoBox}>
                    <img src="/icons/congratulationLogo.png" />
                  </div>
                  <div>
                    <Typography variant="h6" className={classes.congratulation__title}>Congratulations</Typography>
                    <Typography variant="subtitle2" className={classes.login__subtitle}>Your account has been verified!</Typography>
                 
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