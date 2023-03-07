import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import CatalogGrid from "@reactioncommerce/components/CatalogGrid/v1";
import PageLoading from "components/PageLoading";
import PageStepper from "components/PageStepper";
import PageSizeSelector from "components/PageSizeSelector";
import SortBySelector from "components/SortBySelector";
import ProductGridEmptyMessage from "./ProductGridEmptyMessage";
import { Typography, Button, Hidden } from "@material-ui/core";
import GridFourCard from "../CustomCatalogGrid/GridFourCard";
import GridThreeCard from "../CustomCatalogGrid/GridThreeCard";
import Head from "next/head";
import CustomLoader from "../CustomLoader";
var _ = require('lodash');
const styles = (theme) => ({
  filters: {
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2)
  },
  Home__mainContainer: {
    backgroundImage: "url('/images/HomeMain.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "10px"
  },
  mainContainer__box: {
    display: "flex",
    justifyContent: "center",
    // marginLeft:theme.spacing(16)
  },
  mainContainer__heading: {
    color: "white",
    padding: "102px 0px",
    // width:"60%"
  },
  productGrid__Heading: {
    color: "#000000",
    margin: "42px 0px 22px 0px",
    fontWeight: "normal",
   fontFamily: "Bebas Neue Pro",
    fontSize: "34px",
    lineHeight: "41px",
    textTransform: "uppercase",
    fontStyle: "normal"
  },
  // Home__section2: {
  //   padding: "80px 0px"
  // },
  // homeSection2__left: {
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#D8213B",
  //   height: "100%",
  //   borderRadius: "10px",
  //   padding: "70px 42px"
  // },
  // homeSection2__leftTitle: {
  //   color: "white",
  //   fontSize: " 50px",
  //   padding: "0px 0px",
  //   fontWeight: 500,
  //   lineHeight: "50px"
  // },
  // homeSection2__leftBtn: {
  //   border: "1px solid white",
  //   color: "white",
  //   borderRadius: "25px",
  //   padding: "7px 38px",
  //   marginTop: "15px",
  //   marginRight: "20px"
  // },
  productGrid__HeadingContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  productGrid__HeadingBtn: {
    border: "1px solid",
    height: "20px",
    padding: "15px 20px",
    borderRadius: "25px",
    marginRight:"0px !important",
    backgroundColor:"#FFFFFF",
    color:"#000000",
    "&:hover":{
      backgroundColor:"#D8213B",
    color:"#FFFFFF",
    border:"1px solid #D8213B"
    }
  }
});

class ProductGrid extends Component {
  static propTypes = {
    catalogItems: PropTypes.arrayOf(PropTypes.object),
    classes: PropTypes.object,
    currencyCode: PropTypes.string.isRequired,
    isLoadingCatalogItems: PropTypes.bool,
    pageInfo: PropTypes.shape({
      startCursor: PropTypes.string,
      endCursor: PropTypes.string,
      hasNextPage: PropTypes.bool,
      hasPreviousPage: PropTypes.bool,
      loadNextPage: PropTypes.func,
      loadPreviousPage: PropTypes.func
    }),
    pageSize: PropTypes.number.isRequired,
    setPageSize: PropTypes.func.isRequired,
    setSortBy: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired
  };

  renderFilters() {
    const { classes, pageSize, setPageSize, setSortBy, sortBy } = this.props;

    return (
      <Grid container spacing={1} className={classes.filters}>
        <Grid item>
          <PageSizeSelector pageSize={pageSize} onChange={setPageSize} />
        </Grid>
        <Grid item>
          <SortBySelector sortBy={sortBy} onChange={setSortBy} />
        </Grid>
      </Grid>
    );
  }


  renderMainArea() {
    const { catalogItems,tags, isLoadingCatalogItems, pageInfo } = this.props;
    //  <PageLoading />
       if (isLoadingCatalogItems) return <CustomLoader />;
      // if (true) return <CustomLoader />;
    const products = (catalogItems || []).map((item) => item.node.product);
    const newArrivalToShow = this.props.newArrivalProducts.map((item) => item.node.product)
    const hotNowToShow =this.props.hotNowProducts.map((item) => item.node.product)

  var OtherProductsToShow = this.props.remainingProducts;
 const limitEightProduct = (productsToLimit) => {
  return productsToLimit.filter((val,i)=>{
    if(i<8){
      return val;
    }
  })
 }
 const limitSixProduct = (productsToLimit) => {
  return productsToLimit.filter((val,i)=>{
    if(i<6){
      return val;
    }
  })
 }
    return (
      <Fragment>
                <div
          className={"Home__mainContainer"}
        >
          <Grid sm={12} md={8} lg={6} xl={4} className={"mainContainer__box"}>
            <Typography variant="h2" fontWeight={700} className={"mainContainer__heading"}>
              Get Your
            </Typography>
            <Typography variant="h2" fontWeight={700} className={"mainContainer__heading"}>
               Sneaker Fix!
            </Typography>
          </Grid>
        </div>
        {hotNowToShow.length>=1 &&
        <Grid className="Home__section1" container>

          <div className="productGrid__HeadingContainer">
            <Typography variant="h6" className="productGrid__Heading">Hot Right now!</Typography>
            <Hidden only="xs">
              <Button className="productGrid__HeadingBtn"  href="/en/tag/hot-now">See All</Button>
            </Hidden>
          </div>
          <GridFourCard
             products={limitEightProduct(hotNowToShow)}
             placeholderImageURL="/images/placeholder.gif"
             {...this.props}
            />
          {/* <CatalogGrid
            products={products}
            placeholderImageURL="/images/placeholder.gif"
            {...this.props}
          /> */}

          <div className="center-flex">
          <Hidden xsUp>
          <Button className="productGrid__HeadingBtn"  href="/en/tag/hot-now">See All</Button>
        </Hidden>
        </div>
        
        </Grid>}
        {newArrivalToShow.length>=1 &&
        <div className="Home__section2">
          <Grid container spacing={0}>
        <Hidden only="xs">

            <Grid sm={12} md={4} lg={3} className="homeSection2__leftBox">
              <div className="homeSection2__left">
                <Typography variant="h2" className="homeSection2__leftTitle homeSection2__leftTitle1">New</Typography>
                <Typography variant="h2" className="homeSection2__leftTitle homeSection2__leftTitle2">Arrivals</Typography>
                <img src="/images/newArrivalShoes.png" />
                <Button className="homeSection2__leftBtn" href="/en/tag/new-arrival"> See All</Button>
              </div>
            </Grid>
            </Hidden>
            
            <Hidden  xsUp>
            <div className="productGrid__HeadingContainer">
            <Typography variant="h6" className="productGrid__Heading">New Arrivals</Typography>
           
          </div>
            </Hidden>
            <Grid sm={12} md={8} lg={9} spacing={3}>
              {/* <CatalogGrid
                products={products}
                placeholderImageURL="/images/placeholder.gif"
                {...this.props}
              /> */}
                <GridThreeCard
             products={ limitSixProduct(newArrivalToShow) }
             placeholderImageURL="/images/placeholder.gif"
             {...this.props}
            />
            </Grid>
            <br/>

            <div className="center-flex">
            <Hidden xsUp>
            <Button className="productGrid__HeadingBtn"  href="/en/tag/new-arrival"> See All</Button>
          </Hidden>
          </div>
          </Grid>
        </div>}
        <div className="Home__section3">
          <Grid container
            className={"Home__middleContainer"}
          >
            <Grid xs={12} sm={12} md={8} lg={6} xl={3} className={"middleContainer__box"}>
              <Typography variant="h2" fontWeight={700} className={"middleContainer__heading"}>
                Run the
            </Typography>
            <Typography variant="h2" fontWeight={700} className={"middleContainer__heading"}>
                 Game!
            </Typography>
            </Grid>
          </Grid>
        </div>
        {OtherProductsToShow.map((item,index)=>{

      return(
        <div key={index} className="Home__section4">
          <Grid container spacing={0}>
            <div className="productGrid__HeadingContainer">
              <Typography variant="h6" className="section4__Heading">
                {/* The Yeezy Collection */}
                {item.key}
                </Typography>
              <Hidden only="xs">
                <Button className="productGrid__HeadingBtn" href={`/en/tag/${item.slug.includes('-brand-')?item.slug.split('featured-')[1]:item.slug}`}>See All</Button>
              </Hidden>
            </div>
            {/* <CatalogGrid
              products={products}
              placeholderImageURL="/images/placeholder.gif"
              {...this.props}
            /> */}
            <GridFourCard
             products={limitEightProduct(item.products) }
             placeholderImageURL="/images/placeholder.gif"
             {...this.props}
            />
          </Grid>
          <div className="center-flex">
          <Hidden xsUp>
          <Button className="productGrid__HeadingBtn" href={`/en/tag/${item.slug.includes('-brand-')?item.slug.split('featured-')[1]:item.slug}`}>See All</Button>
          </Hidden>
        </div>
        </div>
         ) })}
        {/* {pageInfo && <PageStepper pageInfo={pageInfo} />} */}
      </Fragment>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>

        {/* {this.renderFilters()} */}
       <div className="productGrid__mainContainer">
        {this.renderMainArea()}
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(ProductGrid);
