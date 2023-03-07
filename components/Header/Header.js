import React, { Component } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { NavigationDesktop } from "components/NavigationDesktop";
import CustomNavigation from "components/CustomNavigation/CustomNavigation";
import { NavigationMobile, NavigationToggleMobile } from "components/NavigationMobile";
import { CustomNavigationMobile, CustomNavigationToggleMobile } from "components/CustomMobileNavigation";
import LocaleDropdown from "components/LocaleDropdown";
import AccountDropdown from "components/AccountDropdown";
import ShopLogo from "@reactioncommerce/components/ShopLogo/v1";
import Link from "components/Link";
import MiniCart from "components/MiniCart";
import { Container, Button, InputBase, Dialog } from "@material-ui/core";
import Head from "next/head";
import Subscription from "./Subscription";
import ContactSubscription from "./contactSubscription";
import Notification from "./Notification";
import { Badge } from '@material-ui/core';
import { GQL_URL } from "../../apiConfig";
import { ToastContainer, toast } from 'react-toastify';
const styles = (theme) => ({
  appBar: {
    //white
    backgroundColor: theme.palette.reaction.white,
    // borderBottom: `solid 1px ${theme.palette.reaction.black05}`,
    //coolGrey500
    color: theme.palette.reaction.coolGrey500,
    // padding:"0px 60px"
  },
  controls: {
    alignItems: "inherit",
    display: "inherit",
    flex: 1
  },
  title: {
    color: theme.palette.reaction.reactionBlue,
    marginRight: theme.spacing(),
    borderBottom: `solid 5px ${theme.palette.reaction.reactionBlue200}`
  },
  toolbar: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    padding: "0px !important"
  },
  logoIcon: {
    padding: "10px 0px 0px 0px"
  },
  nav__ContainerMain: {
    padding: "0px 60px"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(240,240,240,1) !important",
    borderRadius: "25px",

    // backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      // backgroundColor: fade(theme.palette.common.white, 0.25),
    },

    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    // padding: theme.spacing(0, 2),
    paddingTop: "5px",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    left: "11px",
    top: "-2px",
  },
  inputRoot: {
    // color: 'inherit',
  },
  inputInput: {
    // padding: theme.spacing(1, 1, 1, 0),
    padding: "9px 22px 9px 22px",
    borderRadius: "50px",
    cursor: "pointer",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "0ch",
      "&:focus": {
        width: "17ch",
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      },
    },
  },
  searchBtn: {
    borderRadius: "25px",
    // marginRight: "5px",
    padding: "0px",
    "& $MuiTouchRipple-root": {
      display: "none !important",
    },
    cursor: "unset",
  },
  dialog: {
    position: 'absolute',
    left: 10,
    top: 50
  }

});

class Header extends Component {
  static propTypes = {
    classes: PropTypes.object,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    uiStore: PropTypes.shape({
      toggleMenuDrawerOpen: PropTypes.func.isRequired
    }).isRequired,
    viewer: PropTypes.object
  };

  static defaultProps = {
    classes: {}
  };
  state = {
    open: false,
    searchProduct: "",
    notificationData: [],
    isNotificationCalled: false
  }
  handleNavigationToggleClick = () => {
    this.props.uiStore.toggleMenuDrawerOpen();
  };
  notify = (msg) => toast(msg);

  handleProductSearch = (value) => {
    //     clearTimeout(this.searchdebounc);
    //     let _self=this;
    this.setState({
      searchProduct: value,
      // filterProducts:filteredProducts,
    });

  }
  handleSearchSubmit = (e) => {

    if (e.key === 'Enter') {
      this.setState({ open: false })

      window.location.href = `/en/search2/${encodeURIComponent(this.state.searchProduct)}`;

      //  window.location.href= `/en/search/${this.state.searchProduct}?productTitle=${this.state.searchProduct}`;
    }
  };
  handleSubscription = (data) => {

    let reStructData = [...this.state.notificationData]

    

    reStructData.unshift(data.notifications)
    this.setState({
      notificationData: reStructData
    },()=>{if (window.location.pathname != "/en/chat") {
      this.notify(data.notifications.sender.name != "LoS" ? data.notifications.sender.name + " " + data.notifications.message : "" + " " + data.notifications.message)
    }})


  }

  componentDidUpdate(prevProps) {

    if (this.props.authStore.accessToken) {
      if (this.state.isNotificationCalled) { } else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", this.props.authStore.accessToken);
        var graphql = JSON.stringify({
          query: `query{ myNotifications{
            _id
            details
            hasDetails
            message
            status
            timeSent
            to
            from
            sender {
              name
              image
            }
            type
            url
  
          }
        }`
        })
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: graphql,
          redirect: "follow",
        };
        fetch(GQL_URL, requestOptions)
          .then((response) => response.text())
          .then((result) => {
            this.setState({
              notificationData: JSON.parse(result).data.myNotifications,
              isNotificationCalled: true
            })

            // resolve(JSON.parse(result).data);
          })
          .catch((error) => {

            // reject(error);
          });
      }
    }
  }
  // componentDidMount(){

  // }
  render() {

    const { classes: { appBar, controls, toolbar, title, logoIcon, searchBtn, search, searchIcon, inputRoot, inputInput, dialog, nav__ContainerMain }, shop, authStore: { account } } = this.props;
    return (
      <>
        <AppBar position="static" elevation={0} className={appBar}>
          <Container maxWidth="xl" className="HeaderContainer__MainMaxWidth ContainerContent__MainMaxWidth" >
            <Toolbar className={toolbar}>
              <Hidden mdUp>
                {/* <NavigationToggleMobile onClick={this.handleNavigationToggleClick} /> */}
                <CustomNavigationToggleMobile onClick={this.handleNavigationToggleClick} />
              </Hidden>

              <div className={controls}>

                <Link route="/">
                  {
                    // shop ? <ShopLogo shopName={shop.name} /> : 
                    <img className={logoIcon + " mob-logo"} src="/icons/logo.svg" height="85" />}
                </Link>

                <Hidden smDown initialWidth={"md"}>
                  {/* <NavigationDesktop /> */}
                  <CustomNavigation />
                </Hidden>
              </div>

              {/* <LocaleDropdown /> */}
              <Hidden mdUp>
                <div onClick={() => this.setState({ open: true })} className="mobileSearchBtn">

                  {/* <SearchIcon /> */}

                  <img src="/icons/search.svg" />

                </div>
              </Hidden>

              {account.userId && <div>
                <Notification notificationData={this.state.notificationData} accessToken={this.props.authStore.accessToken} />
                <Subscription handleSubscription={(data) => this.handleSubscription(data)} account={account} />

              </div>}
              <AccountDropdown />
              <MiniCart />
            </Toolbar>
            {/* <NavigationMobile shop={shop}/> */}
            <CustomNavigationMobile shop={shop} />
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              maxWidth={
                this.state.openVerificationModal == true ||
                  this.state.openLoginModal == true ||
                  this.state.openSignupModal == true
                  ? "md"
                  : "sm"
              }
              fullWidth={true}
              onBackdropClick={() => this.setState({ open: false })}
              // disableBackdropClick={false}
              className={`mobile__dialog ${dialog}`}
            >
              <Button
                className={`search__Nav search__Nav_mob ${searchBtn}`}
                color="inherit"
                onClick={this.onClick}
              // href={this.linkPath(navItem)}
              >
                <div className={`${search}`}>
                  <div className={searchIcon}>
                    {/* <SearchIcon /> */}

                    <img src="/icons/search.svg" />
                  </div>
                  <div class="inputcontainer">
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: inputRoot,
                        input: inputInput,
                      }}
                      inputProps={{ "aria-label": "search" }}
                      value={this.state.searchProduct}
                      onChange={(e) => this.handleProductSearch(e.target.value)}
                      onKeyDown={this.handleSearchSubmit}
                    />
                    {/* <div class="icon-container">{this.state.isSearching && <i class="loader"></i>}</div> */}
                  </div>
                </div>

              </Button>
            </Dialog>
          </Container>
          <ToastContainer
            hideProgressBar={true}
          />
        </AppBar>
      </>
    );
  }
}

export default withStyles(styles)(inject("uiStore")(Header));
