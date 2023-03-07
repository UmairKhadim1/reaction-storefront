import React, { Component } from "react";
import PropTypes from "prop-types";
import Router from "translations/i18nRouter";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import GuestForm from "../../providers/reaction-component-library/package/src/components/GuestForm/v1";
// import GuestForm from "@reactioncommerce/components/GuestForm/v1";
import Button from "@reactioncommerce/components/Button/v1";
import CheckoutLogin from "../CheckoutLogin";
// flex wrapper jss mixin
const flexWrapper = () => ({
  alignItems: "stretch",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start"
});

const styles = (theme) => ({
  loginWrapper: {
    ...flexWrapper(),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.up("md")]: {
      minHeight: "400px",
      paddingBottom: 0,
      paddingRight: theme.spacing(8)
    }
  },
  loginButton: {
    marginTop: theme.spacing(3)
  },
  guestWrapper: {
    ...flexWrapper(),
    borderTop: `solid 1px ${theme.palette.reaction.black10}`,
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up("md")]: {
      borderBottom: `solid 1px ${theme.palette.reaction.black10}`,
      borderTop: "none",
     
      padding:"20px 0px"
    }
  },
  
});

class Entry extends Component {
  static propTypes = {
    classes: PropTypes.object,
    onLoginButtonClick: PropTypes.func,
    onRegisterButtonClick: PropTypes.func,
    setEmailOnAnonymousCart: PropTypes.func,
    theme: PropTypes.object
  };

  static defaultProps = {
    onLoginButtonClick() {
      Router.push("/signin");
    },
    onRegisterButtonClick() {
      Router.push("/signup");
    },
    setEmailOnAnonymousCart() {}
  };

  render() {
    const { classes, onLoginButtonClick, onRegisterButtonClick, setEmailOnAnonymousCart } = this.props;
    return (
      <Grid container className="checkout__loginEntry">
          {/* <div className={classes.loginWrapper}>
            <Typography variant="h6" gutterBottom>
              Returning Customer
            </Typography>
            <Button onClick={onLoginButtonClick} actionType="important" isFullWidth className={classes.loginButton}>
              Login
            </Button>
            <Button onClick={onRegisterButtonClick} actionType="secondary" isFullWidth className={classes.loginButton}>
              Create a new account
            </Button>
          </div> */}
           <Typography className="guestAccountTitle" variant="h6">
             <span>{this.props.hasIdentity !==true ?<img src="/icons/checkoutIcon.png" />:<img src="/icons/checkoutGreyIcon.png" />}</span> Account
            </Typography>
        {this.props.hasIdentity !==true ?
        <>
        <Grid item xs={12} md={12}>
          <div className={classes.guestWrapper}>
           
            <GuestForm className="guestcheckoutButton" onSubmit={setEmailOnAnonymousCart}  {...this.props} />
          </div>
        </Grid>
        <Grid item xs={12} md={12} >
             <CheckoutLogin />
        </Grid>
        </>:
        <div></div>
  }
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Entry);
