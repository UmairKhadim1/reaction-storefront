import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import inject from "hocs/inject";
import Router from "translations/i18nRouter";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import MenuList from "@material-ui/core/MenuList";
import ListItem from "@material-ui/core/ListItem";
import ChevronRightIcon from "mdi-material-ui/ChevronRight";
import ChevronDownIcon from "mdi-material-ui/ChevronDown";
import ChevronUpIcon from "mdi-material-ui/ChevronUp";
import { withStyles } from "@material-ui/core/styles";
import Link from "components/Link";
import {Dialog,Grid} from "@material-ui/core";
import LoginModal from "../CustomLogin/LoginModal";
import SignupModal from "../CustomLogin/SignupModal";
import ForgotPasswordModal from "../CustomLogin/ForgotPassword";
import ResetPasswordModal from "../CustomLogin/ResetPassword";
import PhoneVerificationModal from "../CustomLogin/PhoneVerificationModal";
import CongratulationModal from "../CustomLogin/CongratulationModal";
import Lottie from "lottie-react";
import animationData from '../Animation/data.json';
import Head from "next/head";
const styles = (theme) => ({
  subNav: {
    marginBottom: theme.spacing(2)
  },
  listItemRoot: {
    paddingTop: 16,
    paddingBottom: 16
  },
  listItemDense: {
    paddingTop: 4,
    paddingBottom: 4
  },
  listItemTextDense: {
    fontWeight: 400
  },
  listItemGutters: {
    paddingRight: 0
  },
  subMenuList: {
    paddingBottom: theme.spacing(2)
  },
  loaderStyle:{
    // backgroundColor:"#D8213B",
    backgroundColor:"white",
  },
  loaderStyle__animation:{
    height: "200px",
    width: "200px",
    /* padding: 20px 0px; */
    margin: "150px 0px",
    overflow: "hidden"
  }
});

class CustomNavigationItemMobile extends Component {
    constructor(props){
        super(props);
        this.state={
          open:false,
          loader: false,
          showLogin:false,
          showSignup:false,
          showForgotPassword:false,
          openLoginModal: false,
          openSignupModal:false,
          openForgotModal:false,
          openResetModal:false,
          openVerificationModal: false,
      
        }
      }
  static propTypes = {
    classes: PropTypes.object,
    isTopLevel: PropTypes.bool,
    navItem: PropTypes.object,
    onClick: PropTypes.func,
    routingStore: PropTypes.object,
    shouldShowDivider: PropTypes.bool,
    uiStore: PropTypes.shape({
      closeMenuDrawer: PropTypes.func.isRequired
    })
  };

  static defaultProps = {
    classes: {},
    isTopLevel: false,
    navItem: {},
    onClick() {},
    routingStore: {},
    shouldShowDivider: true
  };

  state = { isSubNavOpen: false };

  get linkPath() {
    const { navItem, routingStore } = this.props;
    return routingStore.queryString !== ""
      ? `${navItem.navigationItem.data.url}?${routingStore.queryString}`
      : `${navItem.navigationItem.data.url}`;
  }

  get hasSubNavItems() {
    const { navItem: { items } } = this.props;
    return Array.isArray(items) && items.length > 0;
  }

  onClick = () => {
    const { navItem, uiStore, isTopLevel } = this.props;

    // if (isTopLevel && this.hasSubNavItems) {
    //   this.props.onClick(navItem);
    // } else if (this.hasSubNavItems) {
    //   this.setState({ isSubNavOpen: !this.state.isSubNavOpen });
    // } else {
    //   const path = this.linkPath;
    //   Router.push(path, { slug: navItem.slug });
    //   uiStore.closeMenuDrawer();
    // }
    Router.push("/explore");
      uiStore.closeMenuDrawer();
  };

  onClose = () => {
    this.setState({ isSubNavOpen: false });
  };

  renderSubNav() {
    const { classes, isTopLevel, navItem: { items }, uiStore, routingStore } = this.props;

    if (this.hasSubNavItems && !isTopLevel) {
      return (
        <Collapse in={this.state.isSubNavOpen} timeout="auto" unmountOnExit>
          <MenuList className={classes.subMenuList} component="div" disablePadding>
            {items.map((item, index) => {
              const { navigationItem: { data: { classNames: navigationItemClassNames, isUrlRelative, shouldOpenInNewWindow } } } = item;

              return (
                <Link
                  className={navigationItemClassNames}
                  href={this.linkPath}
                  isUrlAbsolute={!isUrlRelative}
                  onClick={this.onClick}
                  shouldOpenInNewWindow={shouldOpenInNewWindow}
                >
                  <NavigationItemMobile
                    key={index}
                    classes={classes}
                    navItem={item}
                    routingStore={routingStore}
                    shouldShowDivider={false}
                    uiStore={uiStore}
                  />
                </Link>
              );
            })}
          </MenuList>
        </Collapse>
      );
    }

    return null;
  }

  renderIcon() {
    const { classes, isTopLevel } = this.props;
    const { isSubNavOpen } = this.state;
    let icon = null;

    if (this.hasSubNavItems) {
      if (isTopLevel) {
        icon = <ChevronRightIcon />;
      } else if (isSubNavOpen) {
        icon = <ChevronUpIcon />;
      } else {
        icon = <ChevronDownIcon />;
      }
    }

    if (icon) {
      return <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>;
    }

    return null;
  }
  handleSignout = () => {
    window.location.href="/logout";
  }
  handleOpen = () => {
    window.location.href="/signin";
        // this.setState({
    //   open:true,
    //   showSignup:false,
    //   showForgotPassword:false,
    //   showLogin:true,
    //   openLoginModal:true,
     
    // })
    // this.setState({
    //   loader:true
    // })
    //  setTimeout(()=>{
    //   this.setState({
    //     loader:false
    //   })
    //  },2000)
   
    
  };

  handleClose = () => {
    this.setState({
      open:false,
      openLoginModal:false,
      openVerificationModal:false,
    })
    
  };
  handleSignupOpen = () => {

    this.setState({
      open:true,
      showLogin:false,
      showForgotPassword:false,
      showSignup:true,
      openSignupModal:true,
    })
    this.setState({
      loader:true
    })
     setTimeout(()=>{
      this.setState({
        loader:false
      })
     },2000)
   
    
  };

  handleSignupClose = () => {
    this.setState({
      open:false,
      openSignupModal:false,
      openVerificationModal:false,
    })
    
  };
  handleForgotPasswordOpen = () => {

    this.setState({
      open:true,
      showLogin:false,
      showSignup:false,
      showForgotPassword:true,
      openForgotModal:true,
    })
    this.setState({
      loader:true
    })
     setTimeout(()=>{
      this.setState({
        loader:false
      })
     },2000)
   
    
  };
  handleForgotPasswordClose = () => {
    this.setState({
      open:false,
      openForgotModal:false,
      openVerificationModal:false,
    })
    
  };
  handleBack = () => {
    this.setState({
      openVerificationModal:false,
      openLoginModal:true
    })
  }
  handleSignupBack = () => {
    this.setState({
      openVerificationModal:false,
      openSignupModal:true
    })
  }
  handleForgotPasswordBack = () => {
    this.setState({
      openVerificationModal:false,
      openForgotModal:true
    })
  }
  handleLogin = () => {
    this.setState({
      openLoginModal:false,
      openVerificationModal:true,
      
    })
  }
  handleForgotPassword = () => {
    this.setState({
      openForgotModal:false,
      openVerificationModal:true,
      
    })
  }
  handleSignupForm = () => {
    this.setState({
      openSignupModal:false,
      openVerificationModal:true,
      
    })
  }
  
  handleOTP = () => {
    this.setState({
      openLoginModal:false,
      openVerificationModal:false,
      
    })
  }
  otpVerificationForgotPassword = () =>{
    this.setState({
      openForgotModal:false,
      openVerificationModal:false,
      openResetModal:true
      
    })
  }
  render() {
    const { classes, shouldShowDivider, uiStore,authStore:{account} } = this.props;

    const listItemClasses = classNames(
      {
        root: classes.listItemRoot,
        dense: classes.listItemDense,
        gutters: classes.listItemGutters
      }
    );

    return (
      <Fragment>
        <ListItem
          button
          classes={listItemClasses}
          color="inherit"
          dense={!shouldShowDivider}
          onClick={()=>{ 
            Router.push("/");
            uiStore.closeMenuDrawer();
        }}
         
        >
          <ListItemText
            classes={{
              textDense: classes.listItemTextDense
            }}
            primary={"Explore"}
          />
          {/* {this.renderIcon()} */} 
        </ListItem>
        <ListItem
          button
          classes={listItemClasses}
          color="inherit"
          dense={!shouldShowDivider}
          onClick={()=>{ 
            Router.push("/shopAll");
            uiStore.closeMenuDrawer();
        }}
        >
          <ListItemText
            classes={{
              textDense: classes.listItemTextDense
            }}
            primary={"Shop All"}
          />
          {/* {this.renderIcon()} */} 
        </ListItem>
     
        <ListItem
          button
          classes={listItemClasses}
          color="inherit"
          dense={!shouldShowDivider}
          onClick={()=>{ 
            Router.push("/about");
            uiStore.closeMenuDrawer();
        }}
        >
          <ListItemText
            classes={{
              textDense: classes.listItemTextDense
            }}
            primary={"About Us"}
          />
          {/* {this.renderIcon()} */} 
        </ListItem>
        {/*<ListItem
          button
          classes={listItemClasses}
          color="inherit"
          dense={!shouldShowDivider}
          onClick={()=>{ 
            Router.push("/startVerification");
            uiStore.closeMenuDrawer();
        }}
        >
          <ListItemText
            classes={{
              textDense: classes.listItemTextDense
            }}
            primary={"Sell Now"}
          />
           {this.renderIcon()} 
        </ListItem>
        */} 
        {account.userId &&
        <ListItem
        button
        classes={listItemClasses}
        color="inherit"
        dense={!shouldShowDivider}
        onClick={()=>{ 
          Router.push("/chat");
          uiStore.closeMenuDrawer();
      }}
      >
        
        <ListItemText
          classes={{
            textDense: classes.listItemTextDense
          }}
          primary={"My Bids"}
        />
        
      </ListItem>}
      {account.userId ?
        <ListItem
          button
          classes={listItemClasses}
          color="inherit"
          dense={!shouldShowDivider}
          onClick={()=>{ 
            // uiStore.closeMenuDrawer();
            this.handleSignout();
            
        }}
        >
          <ListItemText
            classes={{
              textDense: classes.listItemTextDense
            }}
            primary={"Logout"}
          />
          {/* {this.renderIcon()} */} 
        </ListItem>:<ListItem
          button
          classes={listItemClasses}
          color="inherit"
          dense={!shouldShowDivider}
          onClick={()=>{ 
            // uiStore.closeMenuDrawer();
            this.handleOpen();
            
        }}
        >
          <ListItemText
            classes={{
              textDense: classes.listItemTextDense
            }}
            primary={"Login"}
          />
          {/* {this.renderIcon()} */} 
        </ListItem>}
        {/* <ListItem
          button
          classes={listItemClasses}
          color="inherit"
          dense={!shouldShowDivider}
          onClick={()=>{ 
            // uiStore.closeMenuDrawer();
            this.handleSignupOpen();
            
        }}
        >
          <ListItemText
            classes={{
              textDense: classes.listItemTextDense
            }}
            primary={"Sign up"}
          /> */}
          {/* {this.renderIcon()} */} 
        {/* </ListItem> */}
        {/* {this.renderSubNav()}
        {shouldShowDivider && <Divider />} */}
        <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={this.state.openVerificationModal ==true||this.state.openLoginModal==true ||this.state.openSignupModal==true ?"md":"sm"}
        fullWidth={true}
        disableBackdropClick={true}
        className={"login__dialog"}
      >  
       { this.state.loader !== true ?
          this.state.showLogin ===true ?<>{
            (this.state.openLoginModal == true )?
   
           <LoginModal onClose={()=>this.handleClose()} handleLogin={this.handleLogin} switchSignup={this.handleSignupOpen} switchForgotPassword={this.handleForgotPasswordOpen} open={this.state.open}/>
           :
            (this.state.openVerificationModal ==true) ?
          <PhoneVerificationModal onBack={()=>this.handleBack()} handleOTP={this.handleOTP}/> :
           <CongratulationModal onClose={()=>this.handleClose()}/>}
           </>
       :this.state.showSignup === true ?<>{
         
           (this.state.openSignupModal == true )?
           <SignupModal onClose={()=>this.handleSignupClose()} handleLogin={this.handleSignupForm} switchLogin={this.handleOpen}/>
           :
            (this.state.openVerificationModal ==true) ?
          <PhoneVerificationModal onBack={()=>this.handleSignupBack()} handleOTP={this.handleOTP}/> :
           <CongratulationModal onClose={()=>this.handleSignupClose()}/>
           }</>
           :this.state.showForgotPassword === true &&<>{
         
            (this.state.openForgotModal == true )?
            <ForgotPasswordModal onClose={()=>this.handleForgotPasswordClose()} handleForgotPassword={this.handleForgotPassword} switchLogin={this.handleOpen}/>
            :
             (this.state.openVerificationModal ==true) ?
           <PhoneVerificationModal onBack={()=>this.handleForgotPasswordBack()} handleOTP={this.otpVerificationForgotPassword}/> 
           :
           (this.state.openResetModal ==true) ?
             <ResetPasswordModal onClose={()=>this.handleForgotPasswordClose()} handleForgotPassword={this.handleForgotPassword} switchLogin={this.handleOpen}/>
           :
           <CongratulationModal onClose={()=>this.handleSignupClose()}/>
            }</>
             :
              <Grid container justify="center" alignItems="center" className={classes.loaderStyle}>
                <Grid className={classes.loaderStyle__animation}>
                    <Lottie animationData={animationData} />
                </Grid>
             </Grid>
      
       }
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(inject("routingStore", "uiStore")(CustomNavigationItemMobile));
