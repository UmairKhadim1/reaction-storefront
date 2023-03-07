import React, { useState, useEffect, Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import withWidth, { isWidthUp, isWidthDown } from "@material-ui/core/withWidth";
import inject from "hocs/inject";
import Breadcrumbs from "components/Breadcrumbs";
import ProductDetailAddToCart from "components/ProductDetailAddToCart";
import ProductDetailTitle from "components/ProductDetailTitle";
import VariantList from "components/VariantList";
import ProductDetailVendor from "components/ProductDetailVendor";
import ProductDetailDescription from "components/ProductDetailDescription";
import ProductDetailPrice from "components/ProductDetailPrice";
import MediaGallery from "components/MediaGallery";
import Router from "translations/i18nRouter";
import priceByCurrencyCode from "lib/utils/priceByCurrencyCode";
import variantById from "lib/utils/variantById";
import { Typography, Button, Hidden } from "@material-ui/core";
import Head from "next/head";
import CatalogGrid from "@reactioncommerce/components/CatalogGrid/v1";
import GridFourCard from "../CustomCatalogGrid/GridFourCard";
// import { Carousel } from 'react-responsive-carousel';
// import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import Collection from "../../components/Collection";
import SwiperCore, {
    Navigation, Thumbs
} from 'swiper/core';
import Reviews from "../Reviews/index";
SwiperCore.use([Navigation, Thumbs]);
const styles = (theme) => ({
    section: {
        padding: theme.spacing(2, 0)
        // marginBottom: theme.spacing(2)
    },
    breadcrumbGrid: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    info: {
        marginBottom: theme.spacing()
    },
    variantDetail__HeadingContainer: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        padding: "20px 0px"
    },
    variantDetail__Heading: {
        color: "#000000",
        margin: "42px 0px 22px 8px",
        fontWeight: "normal",
     fontFamily: "Bebas Neue Pro",
        fontSize: "34px",
        lineHeight: "41px",
        textTransform: "uppercase",
        fontStyle: "normal"
    },
    variantDetail__HeadingBtn: {
        border: "1px solid",
        height: "20px",
        padding: "15px 20px",
        borderRadius: "25px",
        marginRight: "11px !important"
    }
});

/**
 * Product detail component
 * @name ProductDetail
 * @param {Object} props Component props
 * @returns {React.Component} React component node that represents a product detail view
 */
class VariantDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thumbsSwiper: null
        }
    }

    static propTypes = {
        /**
         * Function to add items to a cart.
         * Implementation may be provided by addItemsToCart function from the @withCart decorator
         *
         * @example addItemsToCart(CartItemInput)
         * @type Function
         */
        catalogItems: PropTypes.arrayOf(PropTypes.object),
        addItemsToCart: PropTypes.func,
        classes: PropTypes.object,
        currencyCode: PropTypes.string.isRequired,
        product: PropTypes.object,
        routingStore: PropTypes.object.isRequired,
        shop: PropTypes.object.isRequired,
        theme: PropTypes.object,
        uiStore: PropTypes.object.isRequired,
        width: PropTypes.string.isRequired
    };

    componentDidMount() {
        const { product } = this.props;

        // Select first variant by default
        this.selectVariant(product.variants[0]);
    }

    selectVariant(variant, optionId) {
        const { product, uiStore } = this.props;

        // Select the variant, and if it has options, the first option
        const variantId = variant._id;
        let selectOptionId = optionId;
        if (!selectOptionId && variant.options && variant.options.length) {
            selectOptionId = variant.options[0]._id;
        }

        uiStore.setPDPSelectedVariantId(variantId, selectOptionId);

        // Router.replace("/variant/[...slugOrId]", `/variant/${product.slug}/${selectOptionId || variantId}`);
    }

    /**
     * @name handleSelectVariant
     * @summary Called when a variant is selected in the variant list
     * @private
     * @ignore
     * @param {Object} variant The variant object that was selected
     * @returns {undefined} No return
     */
    // handleSelectVariant = (variant) => {
    //     this.selectVariant(variant);
    // };

    /**
     * @name handleAddToCartClick
     * @summary Called when the add to cart button is clicked
     * @private
     * @ignore
     * @param {Number} quantity - A positive integer from 0 to infinity, representing the quantity to add to cart
     * @returns {undefined} No return
     */
    handleAddToCartClick = async (quantity) => {
        const {
            addItemsToCart,
            currencyCode,
            product,
            currentVariantId,
            uiStore: { openCartWithTimeout, pdpSelectedOptionId, pdpSelectedVariantId },
            width
        } = this.props;

        // Get selected variant or variant option
        const selectedVariant = variantById(product.variants, pdpSelectedVariantId);
        const selectedOption = variantById(selectedVariant.options, pdpSelectedOptionId);
        const selectedVariantOrOption = selectedOption || selectedVariant;

        if (selectedVariantOrOption) {
            // Get the price for the currently selected variant or variant option
            const price = priceByCurrencyCode(currencyCode, selectedVariantOrOption.pricing);
            const CurrentVariant = product.variants.filter((variant)=>variant._id == currentVariantId);
              
            // Call addItemsToCart with an object matching the GraphQL `CartItemInput` schema
            await addItemsToCart([
                {
                    price: {
                        amount: price.price,
                        currencyCode
                    },
                    productConfiguration: {
                        productId: product.productId, // Pass the productId, not to be confused with _id
                        productVariantId: selectedVariantOrOption.variantId // Pass the variantId, not to be confused with _id
                    },
                    quantity,
                    
                    metafields:{
                        key:"primaryImage",
                        value:CurrentVariant[0].primaryImage.URLs.large
                    }
                }
            ]);
        }
        if (isWidthUp("md", width)) {
            // Open the cart, and close after a 3 second delay
            openCartWithTimeout(3000);
        }
    };

    /**
     * @name handleSelectOption
     * @summary Called when an option is selected in the option list
     * @private
     * @ignore
     * @param {Object} option The option object that was selected
     * @returns {undefined} No return
     */
    // handleSelectOption = (option) => {
    //     const { product, uiStore } = this.props;

    //     // If we are clicking an option, it must be for the current selected variant
    //     const variant = product.variants.find((vnt) => vnt._id === uiStore.pdpSelectedVariantId);

    //     this.selectVariant(variant, option._id);
    // };

    /**
     * @name determineProductPrice
     * @description Determines a product's price given the shop's currency code. It will
     * use the selected option if available, otherwise it will use the selected variant.
     * @returns {Object} An pricing object
     */
    determineProductPrice() {
        const { currencyCode, product } = this.props;
        const { pdpSelectedVariantId, pdpSelectedOptionId } = this.props.uiStore;
        const selectedVariant = variantById(product.variants, pdpSelectedVariantId);
        let productPrice = {};

        if (pdpSelectedOptionId && selectedVariant) {
            const selectedOption = variantById(selectedVariant.options, pdpSelectedOptionId);
            productPrice = priceByCurrencyCode(currencyCode, selectedOption.pricing);
        } else if (!pdpSelectedOptionId && selectedVariant) {
            productPrice = priceByCurrencyCode(currencyCode, selectedVariant.pricing);
        }

        return productPrice;
    }

    render() {
        const {
            classes,
            currencyCode,
            product,
            routingStore,
            uiStore: { pdpSelectedOptionId, pdpSelectedVariantId },
            width,
            catalogItems,
            currentVariantId
        } = this.props;
        const products = (catalogItems || []).map((item) => item.node.product);
        const CurrentVariant = product.variants.filter((variant)=>variant._id == currentVariantId);
        const availableSizesUnFiltered = product.variants.map((item)=>JSON.parse(item.optionTitle).size);
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
          }
          const availableSizes = availableSizesUnFiltered.filter(onlyUnique);
       
        // Set the default media as the top-level product's media
        // (all media on all variants and objects)
        let pdpMediaItems = product.media;

        // If we have a selected variant (we always should)
        // check to see if media is available, and use this media instead
        // Revert to original media if variant doesn't have specific media
        const selectedVariant = product.variants.find((variant) => variant._id === pdpSelectedVariantId);
        if (selectedVariant) {
            if (selectedVariant.media && selectedVariant.media.length) {
                pdpMediaItems = selectedVariant.media;
            }

            // If we have a selected option, do the same check
            // Will revert to variant check if no option media is available
            if (Array.isArray(selectedVariant.options) && selectedVariant.options.length) {
                const selectedOption = selectedVariant.options.find((option) => option._id === pdpSelectedOptionId);
                if (selectedOption) {
                    if (selectedOption.media && selectedOption.media.length) {
                        pdpMediaItems = selectedOption.media;
                    }
                }
            }
        }

        const productPrice = this.determineProductPrice();
        const compareAtDisplayPrice = (productPrice.compareAtPrice && productPrice.compareAtPrice.displayAmount) || null;


        // Phone size
        // if (isWidthDown("sm", width)) {
        //   return (
        //     <Fragment>
        //       <div className={classes.section}>
        //         <ProductDetailTitle pageTitle={product.pageTitle} title={product.title} />
        //         <div className={classes.info}>
        //           <ProductDetailVendor>{product.vendor}</ProductDetailVendor>
        //           <div className={classes.info}>
        //             <ProductDetailPrice className={classes.bottomMargin} compareAtPrice={compareAtDisplayPrice} price={productPrice.displayPrice} />
        //           </div>
        //         </div>
        //         <div className={classes.info}>
        //           <ProductDetailPrice compareAtPrice={compareAtDisplayPrice} isCompact price={productPrice.displayPrice} />
        //         </div>
        //       </div>

        //       <div className={classes.section}>
        //         <MediaGallery mediaItems={pdpMediaItems} />
        //       </div>

        //       <div className={classes.section}>
        //         <VariantList
        //           onSelectOption={this.handleSelectOption}
        //           onSelectVariant={this.handleSelectVariant}
        //           product={product}
        //           selectedOptionId={pdpSelectedOptionId}
        //           selectedVariantId={pdpSelectedVariantId}
        //           currencyCode={currencyCode}
        //           variants={product.variants}
        //         />
        //         <ProductDetailAddToCart
        //           onClick={this.handleAddToCartClick}
        //           selectedOptionId={pdpSelectedOptionId}
        //           selectedVariantId={pdpSelectedVariantId}
        //           variants={product.variants}
        //         />
        //       </div>

        //       <div className={classes.section}>
        //         <ProductDetailDescription>{product.description}</ProductDetailDescription>
        //       </div>
        //     </Fragment>
        //   );
        // }

        return (
            <Fragment>
                <Grid container className="variantDetail__container">
                    <Grid container className="ContainerContent__MainMaxWidth" >
                        <Grid item className={classes.breadcrumbGrid} xs={12}>
                            <Breadcrumbs isPDP tagId={routingStore.tagId} product={product} CurrentVariant={CurrentVariant}/>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div className={classes.section}>
                                <div className="variantDetail__brandBox"><img src="/brand/nike.png" /> <span className="variantDetail__brandName">Nike</span> </div>
                                <Typography variant="h6" className="variantDetail__productTitle">{product.title} </Typography>
                                <Typography variant="h6" className="variantDetail__brandNumber">         </Typography>
                                <Grid container className="variantDetail__infoCard">
                                    <Grid item className="variantDetail__infoTitle">
                                        Release Date:
                                    </Grid>
                                    <Grid item className="variantDetail__infoData">
                                        2016-09-03
                                    </Grid>
                                </Grid>
                                <Grid container className="variantDetail__infoCard">
                                    <Grid item className="variantDetail__infoTitle">
                                        Color:
                                    </Grid>
                                    <Grid item className="variantDetail__infoData">
                                       {JSON.parse(CurrentVariant[0].optionTitle).color}
                                    </Grid>
                                </Grid>
                                {/* <Grid container className="variantDetail__infoCard">
                                    <Grid item className="variantDetail__infoTitle">
                                        Condition:
                                    </Grid>
                                    <Grid item className="variantDetail__infoData">
                                        Used,Discoloration,B Grade
                                    </Grid>
                                </Grid>
                                <Grid container className="variantDetail__infoCard">
                                    <Grid item className="variantDetail__infoTitle">
                                        Box:
                                    </Grid>
                                    <Grid item className="variantDetail__infoData">
                                        No Orignal Box
                                    </Grid>
                                </Grid> */}
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className="variantDetail__slider">
                                <Swiper style={{ '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff' }} loop={true} spaceBetween={10} navigation={true}
                                    thumbs={{ swiper: this.state.thumbsSwiper }}
                                    className="mySwiper2">
                                    {
                                        CurrentVariant[0].media.map((imgItem, i) => {
                                            return <SwiperSlide>
                                                <div>
                                                    <img src={imgItem.URLs.large} />
                                                </div>
                                            </SwiperSlide>
                                        })

                                    }
                                </Swiper>

                            </div>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <div className={classes.section}>
                                <div className="variantDetail__sizeHeader">
                                    <Typography className="variantDetail__sizeTitle" variant="h6">Size</Typography>
                                    <Typography variant="subtitle2" className="variantDetail__sizeChart">Size Chart</Typography>
                                </div>
                                <div className="variantDetail__sizes">
                                    {/* [5.5, 6, 6.5, 7, 7.5, 8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5] */}
                                    {availableSizes.map((item, i) => {
                                        return <div className={`variantDetail__itemSize ${this.props.selectedVariantSize == item? "variantDetail__activeItemSize":"variantDetail__nonActiveItemSize"}`}><span>Us {item}</span></div>
                                    })

                                    }
                                </div>
                                <Grid item xs={12}>
                                    <div className="variantDetail__price">
                                        {/* <span className="variantDetail__priceBox">
                                        <Button className="variantDetail__priceBtn">Buy New - $430</Button>
                                        </span> */}
                                        <span className="variantDetail__priceBox">
                                        <ProductDetailAddToCart
                                            onClick={this.handleAddToCartClick}
                                            selectedOptionId={pdpSelectedOptionId}
                                            selectedVariantId={pdpSelectedVariantId}
                                            variants={product.variants}
                                        />
                                     </span>
                                    </div>
                                </Grid>
                            </div>
                        </Grid>


                        {/* <Grid item xs={12} sm={6}>
            <ProductDetailTitle pageTitle={product.pageTitle} title={product.title} />
            <div className={classes.info}>
              <ProductDetailVendor>{product.vendor}</ProductDetailVendor>
            </div>
            <div className={classes.info}>
              <ProductDetailPrice className={classes.bottomMargin} compareAtPrice={compareAtDisplayPrice} price={productPrice.displayPrice} />
            </div>
            <div className={classes.info}>
              <ProductDetailDescription>{product.description}</ProductDetailDescription>
            </div>
            <VariantList
              onSelectOption={this.handleSelectOption}
              onSelectVariant={this.handleSelectVariant}
              product={product}
              selectedOptionId={pdpSelectedOptionId}
              selectedVariantId={pdpSelectedVariantId}
              currencyCode={currencyCode}
              variants={product.variants}
            />
            <ProductDetailAddToCart
              onClick={this.handleAddToCartClick}
              selectedOptionId={pdpSelectedOptionId}
              selectedVariantId={pdpSelectedVariantId}
              variants={product.variants}
            />
          </Grid> */}
                        {/* <Grid > */}
                        <Grid xs={12} className="variantDetail__productVariantMediaSlider">
                            <Swiper onSwiper={(e) => this.setState({ thumbsSwiper: e })} loop={true} spaceBetween={10} slidesPerView={3} freeMode={true} watchSlidesVisibility={true} watchSlidesProgress={true} className="mySwiper">
                                {
                                    CurrentVariant[0].media.map((imgItem, i) => {
                                        return <SwiperSlide>
                                            <div>
                                                <img src={imgItem.URLs.large} />
                                                {/* <MediaGallery mediaItems={pdpMediaItems} /> */}
                                            </div>
                                        </SwiperSlide>
                                    })

                                }
                            </Swiper>
                        </Grid>
                        <Grid container className="variantDetail__discriptionContainer">
                            <Grid item lg={6} xl={6} className="variantDetail__discription">
                                <Typography variant="h6" className="variantDetail__discriptionTitle">Product DFescription</Typography>
                                <Typography variant="subtitle2" className="variantDetail__discriptionContent">Banned by the NBA in 1985, Michael Jordan was charged $5,000 per game for wearing the Air Jordan 1 ‘Black/Red' because they didn’t include the color white which was part of the Chicago Bulls’ official team colors. Used as a marketing tactic, Nike crafted the ‘Banned’ campaign around the sneakers to launch and promote the Air Jordan line. The sneaker was retroed in 1994, 2011, 2013 and 2016. The 2011 pair featured an ‘X’ on the heel paying homage to the 'Banned' nickname.</Typography>
                            </Grid>
                        </Grid>
                        {/* </Grid> */}
                    </Grid>
                
                <div className="ContainerContent__MainMaxWidth">
                    <Grid className="variantDetail__authencitySection" container spacing={3}>
                        <div className={classes.variantDetail__HeadingContainer}>
                            <Typography variant="h6" className={classes.variantDetail__Heading}>Authencity Assured</Typography>
                        </div>
                     </Grid>
                     <Grid onClick={this.props.handleProductPage} className="variantDetail__authencitySection" container spacing={3}>
                        <GridFourCard
                            products={products}
                            placeholderImageURL="/images/placeholder.gif"
                            {...this.props}
                        />
                    </Grid>
                    <Grid className="variantDetail__section2">
                        <Grid className="variantDetail__recommendedSection" container spacing={3}>
                            <div className={classes.variantDetail__HeadingContainer}>
                                <Typography variant="h6" className={classes.variantDetail__Heading}>Recommended for you</Typography>
                            </div>
                        </Grid>
                        <Grid className="variantDetail__recommendedSection" container spacing={3}>
                            <GridFourCard
                                products={products}
                                placeholderImageURL="/images/placeholder.gif"
                                {...this.props}
                            />
                        </Grid>

                    </Grid>
                    <Reviews/>
                </div>
                </Grid>
            </Fragment>
        );
    }
}

export default withWidth({ initialWidth: "md" })(withStyles(styles, { withTheme: true })(inject("routingStore", "uiStore")(VariantDetail)));
