import React, { useState, Fragment } from "react";
import inject from "hocs/inject";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import AccountIcon from "mdi-material-ui/Account";
import Popover from "@material-ui/core/Popover";
import useViewer from "hooks/viewer/useViewer";
import Hidden from "@material-ui/core/Hidden";

import ViewerInfo from "@reactioncommerce/components/ViewerInfo/v1";
import Link from "components/Link";
import useAuthStore from "hooks/globalStores/useAuthStore";
const useStyles = makeStyles((theme) => ({
  accountDropdown: {
    width: 320,
    padding: theme.spacing(2)
  },
  marginBottom: {
    marginBottom: theme.spacing(2)
  },
  loginBtn:{
    backgroundColor:"#D8213B",
    padding:"10px 22px",
    borderRadius:"86px",
    color:"white",
    marginLeft:"24px",
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight:600,
    fontSize: "14px",
    lineHeight: "19px",
    width:"113px",
    "&:hover":{
      color:"#D8213B"
    }
},
userProfileIcon:{
  marginLeft:"24px",
  "& $ProfileImage__ViewerImageCircle-sc-1ez7h3d-0 buzxRF":{
    backgroundColor:"#D8213B"
  }
},
profileBtns:{
  color:"#D8213B"
},
signoutBtn:{
  backgroundColor:"#D8213B",
  color:"#FFFFFF",
  borderRadius:"25px",
  "&:hover":{
    backgroundColor:"#FFFFFF",
    color:"#D8213B",
  }
}
}));

const AccountDropdown = () => {
  const classes = useStyles();
  const [anchorElement, setAnchorElement] = useState(null);
  const [viewer] = useViewer();
  const { account } = useAuthStore();
  const isAuthenticated = viewer && viewer._id;
  
  const toggleOpen = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const onClose = () => {
    setAnchorElement(null);
  };

  return (
    <Fragment>
      { isAuthenticated ?
        <ButtonBase onClick={toggleOpen}>
          <ViewerInfo className={classes.userProfileIcon} viewer={viewer} />
        </ButtonBase>
        :
    <Hidden only="xs">

           <Button  color="inherit" className={classes.loginBtn}
        // onClick={this.handleOpen} 
         href="/signin"
        >
          {"Login"}
         {/* <Fragment>{this.state.isSubNavOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</Fragment> */}
        </Button>
      </Hidden>

      }

      <Popover
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={Boolean(anchorElement)}
        onClose={onClose}
      >
        <div className={classes.accountDropdown}>
          {isAuthenticated ?
            <Fragment>
              <div className={classes.marginBottom}>
                <Link href="/profile/address">
                  <Button className={classes.profileBtns} fullWidth>
                    Profile
                  </Button>
                </Link>
              </div>
              {account.name  ?<></>:
              <div className={classes.marginBottom}>
                <Button className={classes.profileBtns} fullWidth href={`/change-password?email=${encodeURIComponent(viewer.emailRecords[0].address)}`}>
                  Change Password
                </Button>
              </div>
}
              <Button className={classes.signoutBtn} fullWidth href="/logout" variant="contained">
                Sign Out
              </Button>
            </Fragment>
            :
            <Fragment>
              <div className={classes.authContent}>
                <Button color="primary" fullWidth href="/signin" variant="contained">
                  Sign In
                </Button>
              </div>
              <Button color="primary" fullWidth href="/signup">
                Create Account
              </Button>
            </Fragment>
          }
        </div>
      </Popover>
    </Fragment>
  );
};

export default inject("authStore")(AccountDropdown);
