import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import ChevronDownIcon from "mdi-material-ui/ChevronDown";
import ChevronRight from "mdi-material-ui/ChevronRight";
import ChevronUpIcon from "mdi-material-ui/ChevronUp";
import { fade, withStyles } from "@material-ui/core/styles";
import Router from "translations/i18nRouter";
import Link from "components/Link";
import { InputBase, Icon, Modal, Backdrop, Dialog, Typography } from "@material-ui/core";
import LoginModal from "../CustomLogin/LoginModal";
import SignupModal from "../CustomLogin/SignupModal";
import ForgotPasswordModal from "../CustomLogin/ForgotPassword";
import ResetPasswordModal from "../CustomLogin/ResetPassword";
import PhoneVerificationModal from "../CustomLogin/PhoneVerificationModal";
import CongratulationModal from "../CustomLogin/CongratulationModal";
import Lottie from "lottie-react";
import animationData from "../Animation/data.json";
import navAnimation from "../Animation/navAnimation.json";
import { useRouter } from "next/router";
import withCatalogItems from "containers/catalog/withCatalogItems";
import FourCardGrid from "../CustomCatalogGrid/GridFourCard";
import { GQL_URL } from "../../apiConfig.js";

// import SearchIcon from '@material-ui/icons/Search';
import Head from "next/head";
const styles = (theme) => ({
  popover: {
    left: "0!important",
    maxWidth: "100vw",
    padding: theme.spacing(2),
    width: "100vw",
  },
  grid: {
    width: "100vw",
  },
  navigationShopAllLink: {
    display: "flex",
    textDecoration: "underline",
    fontSize: "14px",
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),
    fontFamily: theme.typography.fontFamily,
  },
  navigationShopAllLinkIcon: {
    fontSize: "12px",
  },
  primaryNavItem: {
    textTransform: "capitalize",
    fontFamily: "Karla",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "16px",
    color: "#626262",

    "&:hover": {
      color: "#D8213B",
      backgroundColor: "#FFFFFF !important",
      "& $navigationHangingShoes": {
        visibility: "visible",
      },
    },
  },
  navigationHangingShoes: {
    position: "absolute",
    right: "10px",
    bottom: "-9px;",
    visibility: "hidden",
    width: "20px",
    height: "20px",
  },

  loginBtn: {
    backgroundColor: "#D8213B",
    padding: "3px 22px",
    borderRadius: "86px",
    color: "white",
    marginLeft: "24px",
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
    // borderRadius:"22px",
    // backgroundColor:"red",
  },
  loaderStyle: {
    // backgroundColor:"#D8213B",
    backgroundColor: "#D8213B",
  },
  loaderStyle__animation: {
    height: "200px",
    width: "200px",
    /* padding: 20px 0px; */
    margin: "150px 0px",
    overflow: "hidden",
  },
  activeNav: {
    color: "#D8213B",
    "& $navigationHangingShoes": {
      visibility: "visible",
    },
  },
});

class CustomNavigationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loader: false,
      isSearching: false,
      showLogin: false,
      showSignup: false,
      showForgotPassword: false,
      openLoginModal: false,
      openSignupModal: false,
      openForgotModal: false,
      openResetModal: false,
      openVerificationModal: false,
      // signupOpen:false,
      searchProduct: "",
      filterProducts: [],
      searchPopup: false,
    };
    this.wrapperRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setPopoverAnchorEl = (element) => {
      this.anchorElement = element;
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  handleClickOutside(event) {
    try {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        this.setState({ searchPopup: false, searchProduct: "" });
      }
    } catch (err) {
      
    }
  }
  static propTypes = {
    routingStore: PropTypes.object,
  };

  static defaultProps = {
    classes: {},
    navItem: {},
    routingStore: {},
  };

  state = { isSubNavOpen: false };

  linkPath = (providedNavItem) => {
    const { navItem, routingStore } = this.props;
    const currentRoute = routingStore.pathname.substr(routingStore.pathname.indexOf("[lang]/") + 7);

    const currentNavItem = (providedNavItem && providedNavItem.navigationItem) || navItem.navigationItem;

    return routingStore.queryString !== ""
      ? `${currentNavItem?.data?.url}?${routingStore.queryString}`
      : `${currentNavItem?.data?.url}`;
  };

  get hasSubNavItems() {
    const {
      navItem: { items },
    } = this.props;
    return Array.isArray(items) && items.length > 0;
  }

  onClick = (event) => {
    event.preventDefault();

    // if (this.hasSubNavItems) {
    //   this.setState({ isSubNavOpen: !this.state.isSubNavOpen });
    // } else {
    //   const path = this.linkPath();
    //   Router.push(path);
    // }
  };

  onClose = () => {
    this.setState({ isSubNavOpen: false });
  };

  renderSubNav(navItemGroup) {
    const menuItems = navItemGroup.items.map((item, index) => {
      const {
        navigationItem: {
          data: { contentForLanguage, classNames: navigationItemClassNames, isUrlRelative, shouldOpenInNewWindow },
        },
      } = item;
      return (
        <MenuItem dense key={index}>
          <Link
            className={navigationItemClassNames}
            onClick={this.onClose}
            route={this.linkPath(item)}
            href={this.linkPath(item)}
            isUrlAbsolute={!isUrlRelative}
            shouldOpenInNewWindow={shouldOpenInNewWindow}
          >
            <ListItemText primary={contentForLanguage} />
          </Link>
        </MenuItem>
      );
    });

    menuItems.unshift(<Divider key="divider" />);

    return menuItems;
  }

  renderPopover() {
    const {
      classes,
      navItem,
      navItem: { items, navigationItem },
    } = this.props;
    return (
      this.state.filterProducts.length > 0 && (
        <div
          ref={this.setWrapperRef}
          className={`searchProduct__wrapper ${this.state.searchPopup ? "" : "searchProduct__hideWrapper"}`}
        >
          <div className="lrp-15">
            {" "}
            <Typography variant="h6" className={classes.productGrid__Heading}>
              <span className="clr-grey">Search results for :</span> {this.state.searchProduct}
            </Typography>
          </div>
          <br />
          {<FourCardGrid products={this.state.filterProducts} />}
        </div>
      )
    );
  }
  handleOpen = () => {
    this.setState({
      open: true,
      showSignup: false,
      showForgotPassword: false,
      showLogin: true,
      openLoginModal: true,
    });
    this.setState({
      loader: true,
    });
    setTimeout(() => {
      this.setState({
        loader: false,
      });
    }, 2000);
  };

  handleClose = () => {
    this.setState({
      open: false,
      openLoginModal: false,
      openVerificationModal: false,
    });
  };
  handleSignupOpen = () => {
    this.setState({
      open: true,
      showLogin: false,
      showForgotPassword: false,
      showSignup: true,
      openSignupModal: true,
    });
    this.setState({
      loader: true,
    });
    setTimeout(() => {
      this.setState({
        loader: false,
      });
    }, 2000);
  };

  handleSignupClose = () => {
    this.setState({
      open: false,
      openSignupModal: false,
      openVerificationModal: false,
    });
  };
  handleForgotPasswordOpen = () => {
    this.setState({
      open: true,
      showLogin: false,
      showSignup: false,
      showForgotPassword: true,
      openForgotModal: true,
    });
    this.setState({
      loader: true,
    });
    setTimeout(() => {
      this.setState({
        loader: false,
      });
    }, 2000);
  };
  handleForgotPasswordClose = () => {
    this.setState({
      open: false,
      openForgotModal: false,
      openVerificationModal: false,
    });
  };
  handleBack = () => {
    this.setState({
      openVerificationModal: false,
      openLoginModal: true,
    });
  };
  handleSignupBack = () => {
    this.setState({
      openVerificationModal: false,
      openSignupModal: true,
    });
  };
  handleForgotPasswordBack = () => {
    this.setState({
      openVerificationModal: false,
      openForgotModal: true,
    });
  };
  handleLogin = () => {
    this.setState({
      openLoginModal: false,
      openVerificationModal: true,
    });
  };
  handleForgotPassword = () => {
    this.setState({
      openForgotModal: false,
      openVerificationModal: true,
    });
  };
  handleSignupForm = () => {
    this.setState({
      openSignupModal: false,
      openVerificationModal: true,
    });
  };

  handleOTP = () => {
    this.setState({
      openLoginModal: false,
      openVerificationModal: false,
    });
  };
  otpVerificationForgotPassword = () => {
    this.setState({
      openForgotModal: false,
      openVerificationModal: false,
      openResetModal: true,
    });
  };
  fetchbrandproduct = (term) => {
    return new Promise((resolve, reject) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var graphql = JSON.stringify({
        query: `query catalogItemsQuery(
          $shopId: ID!
          $searchQuery: String
          $tagIds: [ID]
          $first: ConnectionLimitInt
          $last: ConnectionLimitInt
          $before: ConnectionCursor
          $after: ConnectionCursor
          $sortBy: CatalogItemSortByField
          $sortByPriceCurrencyCode: String
          $sortOrder: SortOrder
        ) {
          catalogItems(
            shopIds: [$shopId]
            tagIds: $tagIds
            searchQuery: $searchQuery
            first: $first
            last: $last
            before: $before
            after: $after
            sortBy: $sortBy
            sortByPriceCurrencyCode: $sortByPriceCurrencyCode
            sortOrder: $sortOrder
          ) {
            edges {
              node {
                _id
                ... on CatalogItemProduct {
                  product {
                    _id
                    productId
                    title
                    slug
                    vendor
                    productId
                    metafields {
                      description
                      key
                      namespace
                      scope
                      value
                      valueType
                      __typename
                    }
                    shop {
                      currency {
                        code
                      }
                    }
                    pricing {
                      compareAtPrice {
                        displayAmount
                      }
                      currency {
                        code
                      }
                      displayPrice
                      minPrice
                      maxPrice
                    }
                    primaryImage {
                      URLs {
                        thumbnail
                        small
                        medium
                        large
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
        }`,
        variables: { shopId: this.props.primaryShopId, searchQuery: term, first: 80 },
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
        redirect: "follow",
      };

      fetch(GQL_URL, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          resolve(JSON.parse(result).data);
        })
        .catch((error) => {
          
          reject(error);
        });
    });
  };
  searchdebounc = null;
  handleProductSearch = (products, value) => {
    //     clearTimeout(this.searchdebounc);
    //     let _self=this;
    this.setState({
      searchProduct: value,
      // filterProducts:filteredProducts,
    });

  }
  handleSearchSubmit = (e) =>{
    if (e.key === 'Enter') {
    
    window.location.href= `/en/search2/${encodeURIComponent(this.state.searchProduct)}`;

    //  window.location.href= `/en/search/${this.state.searchProduct}?productTitle=${this.state.searchProduct}`;
    }
  };
  render() {
    const {
      classes: {
        primaryNavItem,
        activeNav,
        navigationHangingShoes,
        loaderStyle,
        loaderStyle__animation,
        loginBtn,
        search,
        searchBtn,
        dialog,
        searchIcon,
        inputRoot,
        inputInput,
      },
      navItem,
      navItem: { navigationItem },
    } = this.props;
    const { routingStore, catalogItems, authStore:{account} } = this.props;
    const currentRoute = routingStore.pathname.substr(routingStore.pathname.indexOf("[lang]/") + 7);
    const products = (catalogItems || []).map((item) => item.node.product);
    
    return (
      <Fragment>
        <Button
          className={classNames(
            primaryNavItem,
            currentRoute == "explore" ? activeNav : "",
            navigationItem?.data?.classNames,
          )}
          color="inherit"
          href="/en"
        >
          {"Explore"}
          {/* <img className={navigationHangingShoes}  src="/icons/redHangingShoes.png" /> */}
          <Lottie className={navigationHangingShoes} animationData={navAnimation} />

          {/* <Fragment>{this.state.isSubNavOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</Fragment> */}
        </Button>
        <Button
          className={classNames(
            primaryNavItem,
            currentRoute == "shopAll" ? activeNav : "",
            navigationItem?.data?.classNames,
          )}
          color="inherit"
          href="/en/shopAll"
        >
          {"Shop All"}
          <Lottie className={navigationHangingShoes} animationData={navAnimation} />
          {/* <Fragment>{this.state.isSubNavOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</Fragment> */}
        </Button>
        {/* <Button className={classNames(primaryNavItem,currentRoute=="news"?activeNav:"", navigationItem?.data?.classNames)} color="inherit"  href="/en/news">
          {"News"}
          <Lottie className={navigationHangingShoes}  animationData={navAnimation} />
        
        </Button> */}
        <Button
          className={classNames(
            primaryNavItem,
            currentRoute == "about" ? activeNav : "",
            navigationItem?.data?.classNames,
          )}
          color="inherit"
          href="/en/about"
        >
          {"About Us"}
          <Lottie className={navigationHangingShoes} animationData={navAnimation} />
          {/* <Fragment>{this.state.isSubNavOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</Fragment> */}
        </Button>
      
       {account.userId && <Button
          className={classNames(
            primaryNavItem,
            currentRoute == "chat" ? activeNav : "",
            navigationItem?.data?.classNames,
          )}
          color="inherit"
          href="/en/chat"
        >
          {"My Bids"}
          <Lottie className={navigationHangingShoes} animationData={navAnimation} />
        </Button>}

        <Button
          className={classNames(primaryNavItem, "search__Nav", searchBtn, navigationItem?.data?.classNames)}
          color="inherit"
          onClick={this.onClick}
          href={this.linkPath(navItem)}
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
                onChange={(e) => this.handleProductSearch(products, e.target.value)}
                onKeyDown={this.handleSearchSubmit}
              />
              <div class="icon-container">{this.state.isSearching && <i class="loader"></i>}</div>
            </div>
          </div>
        </Button>

        {/* <Button className={classNames(loginBtn,primaryNavItem, navigationItem?.data?.classNames)} color="inherit" 
        // onClick={this.handleOpen} 
         href="/signin"
        >
          {"Login"}
        
         </Button>  */}
        {/* <Button  className={classNames(loginBtn,primaryNavItem, navigationItem?.data?.classNames)} color="inherit" onClick={this.handleSignupOpen} >
          {"Signup"} */}
        {/* <Fragment>{this.state.isSubNavOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}</Fragment> */}
        {/* </Button> */}
        {this.renderPopover()}
        {/* {this.state.searchPopup && this.renderPopover()} */}
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
          disableBackdropClick={true}
          className={"login__dialog"}
        >
          {this.state.loader !== true ? (
            this.state.showLogin === true ? (
              <>
                {this.state.openLoginModal == true ? (
                  <LoginModal
                    onClose={() => this.handleClose()}
                    handleLogin={this.handleLogin}
                    switchSignup={this.handleSignupOpen}
                    switchForgotPassword={this.handleForgotPasswordOpen}
                    open={this.state.open}
                  />
                ) : this.state.openVerificationModal == true ? (
                  <PhoneVerificationModal onBack={() => this.handleBack()} handleOTP={this.handleOTP} />
                ) : (
                  <CongratulationModal onClose={() => this.handleClose()} />
                )}
              </>
            ) : this.state.showSignup === true ? (
              <>
                {this.state.openSignupModal == true ? (
                  <SignupModal
                    onClose={() => this.handleSignupClose()}
                    handleLogin={this.handleSignupForm}
                    switchLogin={this.handleOpen}
                  />
                ) : this.state.openVerificationModal == true ? (
                  <PhoneVerificationModal onBack={() => this.handleSignupBack()} handleOTP={this.handleOTP} />
                ) : (
                  <CongratulationModal onClose={() => this.handleSignupClose()} />
                )}
              </>
            ) : (
              this.state.showForgotPassword === true && (
                <>
                  {this.state.openForgotModal == true ? (
                    <ForgotPasswordModal
                      onClose={() => this.handleForgotPasswordClose()}
                      handleForgotPassword={this.handleForgotPassword}
                      switchLogin={this.handleOpen}
                    />
                  ) : this.state.openVerificationModal == true ? (
                    <PhoneVerificationModal
                      onBack={() => this.handleForgotPasswordBack()}
                      handleOTP={this.otpVerificationForgotPassword}
                    />
                  ) : this.state.openResetModal == true ? (
                    <ResetPasswordModal
                      onClose={() => this.handleForgotPasswordClose()}
                      handleForgotPassword={this.handleForgotPassword}
                      switchLogin={this.handleOpen}
                    />
                  ) : (
                    <CongratulationModal onClose={() => this.handleSignupClose()} />
                  )}
                </>
              )
            )
          ) : (
            <Grid container justify="center" alignItems="center" className={loaderStyle}>
              <Grid className={loaderStyle__animation}>
                <Lottie animationData={animationData} />
              </Grid>
            </Grid>
          )}
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(withCatalogItems(inject("routingStore")(CustomNavigationItem)));
