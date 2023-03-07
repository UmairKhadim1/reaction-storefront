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
import TagGridFourCard from "../CustomCatalogGrid/TagGridFourCard";
import GridThreeCard from "../CustomCatalogGrid/GridThreeCard";
import Head from "next/head";
import CustomLoader from "../CustomLoader";
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
        margin: "0px 0px 30px 0px",
        fontWeight: "normal",
        fontFamily: "Bebas Neue Pro",
        fontSize: "34px",
        lineHeight: "41px",
        textTransform: "uppercase",
        fontStyle: "normal",
        width:"100%"
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
        marginRight: "0px !important",
        backgroundColor: "#FFFFFF",
        color: "#000000",
        "&:hover": {
            backgroundColor: "#D8213B",
            color: "#FFFFFF",
            border: "1px solid #D8213B"
        }
    }
});

class AllProducts extends Component {
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
    // componentDidMount(){
    //     const { catalogItems, isLoadingCatalogItems, pageInfo,displayTitle,setPageSize } = this.props;
    //     const products = (catalogItems || []).map((item) => item.node.product);
    // }
    renderFilters() {
        const { classes, pageSize, setPageSize, setSortBy, sortBy,displayTitle } = this.props;

        return (
            <Grid container spacing={1} className={classes.filters}>
               {/* <Grid item>
                    <PageSizeSelector pageSize={pageSize} onChange={setPageSize} />
                </Grid>
               */}
                               <Grid item>
                    <SortBySelector sortBy={this.props.sortBy} onChange={this.props.onChangeSort} />
                </Grid>
            </Grid>
        );
    }


    renderMainArea() {
        const { catalogItems, isLoadingCatalogItems, pageInfo,displayTitle,setPageSize } = this.props;
        //  <PageLoading />
        if (isLoadingCatalogItems) return <CustomLoader />;
        // if (true) return <CustomLoader />;
        const products = (catalogItems || []).map((item) => item.node.product);
        if (products.length === 0) return <ProductGridEmptyMessage />;
         
        const { classes } = this.props;
        
        return (
            <Fragment>
                <div className={classes.productGrid__HeadingContainer}>
                    <Typography variant="h6" className={classes.productGrid__Heading}>{displayTitle}</Typography>
                    {this.renderFilters()} 

                </div>
                {/* <div className="allProducts__section3">
                    <Grid container
                        className={"allProducts__middleContainer"}
                    >
                        <Grid sm={12} md={8} lg={6} xl={3} className={"middleContainer__box"}>
                            <Typography variant="h2" fontWeight={700} className={"middleContainer__heading"}>
                                Run the
                            </Typography>
                            <Typography variant="h2" fontWeight={700} className={"middleContainer__heading"}>
                                Game!
                            </Typography>
                        </Grid>
                    </Grid>
                </div> */}
                <Grid className="allProducts__section1" container>
                    <TagGridFourCard
                        products={products}
                        placeholderImageURL="/images/placeholder.gif"
                        {...this.props}
                    />
                </Grid>
                {/* <div className="allProducts__section2">
                    <div className={classes.productGrid__HeadingContainer}>
                        <Typography variant="h6" className={classes.productGrid__Heading}>Nike HOt Right now!</Typography>
                    </div>
                    <Grid container spacing={0}>
                        <Grid sm={12} md={4} lg={3} className="allProductsSection2__leftBox">
                            <div className="allProductsSection2__left">
                                <Typography variant="h2" className="allProductsSection2__leftTitle allProductsSection2__leftTitle1">New</Typography>
                                <Typography variant="h2" className="allProductsSection2__leftTitle">Arrivals</Typography>
                                <img src="/images/newArrivalShoes.png" />
                                <Button className="allProductsSection2__leftBtn"> See All</Button>
                            </div>
                        </Grid>
                        <Grid sm={12} md={8} lg={9} spacing={3}>
                            <GridThreeCard
                                products={products}
                                placeholderImageURL="/images/placeholder.gif"
                                {...this.props}
                            />
                        </Grid>
                    </Grid>
                </div>

                <div className="allProducts__section4">
                    <Grid container spacing={0}>
                        <div className={classes.productGrid__HeadingContainer}>
                            <Typography variant="h6" className="section4__Heading">The Yeezy Collection</Typography>
                        </div>
                        <Grid sm={12} md={8} lg={9} spacing={3}>
                            <GridThreeCard
                                products={products}
                                placeholderImageURL="/images/placeholder.gif"
                                {...this.props}
                            />
                        </Grid>
                        <Grid sm={12} md={4} lg={3} className="allProductsSection2__leftBox">
                            <div className="allProductsSection2__left">
                                <Typography variant="h2" className="allProductsSection2__leftTitle allProductsSection2__leftTitle1">New</Typography>
                                <Typography variant="h2" className="allProductsSection2__leftTitle">Arrivals</Typography>
                                <img src="/images/newArrivalShoes.png" />
                                <Button className="allProductsSection2__leftBtn"> See All</Button>
                            </div>
                        </Grid>
                    </Grid>
                </div> */}

                {/* {pageInfo && <PageStepper pageInfo={pageInfo} />} */}
            </Fragment>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>

                <div className="productGrid__mainContainer">
              
                    {this.renderMainArea()}
                </div>
            </Fragment>
        );
    }
}

export default withStyles(styles)(AllProducts);
