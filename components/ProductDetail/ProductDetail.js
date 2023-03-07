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
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import Head from "next/head";
import CatalogGrid from "@reactioncommerce/components/CatalogGrid/v1";
// import { Carousel } from 'react-responsive-carousel';
// import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import Collection from "../../components/Collection";
import Link from "components/Link";
import GridFourCard from "../CustomCatalogGrid/TagGridFourCard";
import CustomSortBySelector from "../SortBySelector/CustomSortBySelector";
import SizeChartModal from "../SizeChart/SizeChartModal";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";
import Slider, { Range } from 'rc-slider';
SwiperCore.use([Navigation, Thumbs]);
const styles = (theme) => ({
  section: {
    padding: theme.spacing(2, 0),
    // marginBottom: theme.spacing(2)
  },
  sectionRightGrid: {
    padding: "16px 10px 16px 0px",
  },
  breadcrumbGrid: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  info: {
    marginBottom: theme.spacing(),
  },
  productDetail__HeadingContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "20px 0px",
  },
  productDetail__Heading: {
    color: "#000000",
    margin: "42px 0px 22px 8px",
    fontWeight: "normal",
    fontFamily: "Bebas Neue Pro",
    fontSize: "34px",
    lineHeight: "41px",
    textTransform: "uppercase",
    fontStyle: "normal",
    width:"100%",
    textAlign:"center"
  },
  productDetail__HeadingBtn: {
    border: "1px solid",
    height: "20px",
    padding: "15px 20px",
    borderRadius: "25px",
    marginRight: "11px !important",
    backgroundColor: "#FFFFFF",
    color: "#000000",
    "&:hover": {
      backgroundColor: "#D8213B",
      color: "#FFFFFF",
      border: "1px solid #D8213B",
    },
  },
});

/**
 * Product detail component
 * @name ProductDetail
 * @param {Object} props Component props
 * @returns {React.Component} React component node that represents a product detail view
 */
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbsSwiper: null,
      variantSwiper: null,
      mainSwiper: null,
      rangValue:0,
      showVariants: false,
      selectedVariantSize: 0,
      ukShoesSizes: [5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5],
      star: [1, 2, 3, 4, 5],
      sortVariants: "asc",
      value: "",
    };
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
    width: PropTypes.string.isRequired,
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

    Router.replace("/product/[...slugOrId]", `/product/${product.slug}/${selectOptionId || variantId}`);
  }

  /**
   * @name handleSelectVariant
   * @summary Called when a variant is selected in the variant list
   * @private
   * @ignore
   * @param {Object} variant The variant object that was selected
   * @returns {undefined} No return
   */
  handleSelectVariant = (variant) => {
    this.selectVariant(variant);
  };

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
      uiStore: { openCartWithTimeout, pdpSelectedOptionId, pdpSelectedVariantId },
      width,
    } = this.props;

    // Get selected variant or variant option
    const selectedVariant = variantById(product.variants, pdpSelectedVariantId);
    const selectedOption = variantById(selectedVariant.options, pdpSelectedOptionId);
    const selectedVariantOrOption = selectedOption || selectedVariant;

    if (selectedVariantOrOption) {
      // Get the price for the currently selected variant or variant option
      const price = priceByCurrencyCode(currencyCode, selectedVariantOrOption.pricing);

      // Call addItemsToCart with an object matching the GraphQL `CartItemInput` schema
      await addItemsToCart([
        {
          price: {
            amount: price.price,
            currencyCode,
          },
          productConfiguration: {
            productId: product.productId, // Pass the productId, not to be confused with _id
            productVariantId: selectedVariantOrOption.variantId, // Pass the variantId, not to be confused with _id
          },
          quantity,
        },
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
  handleSelectOption = (option) => {
    const { product, uiStore } = this.props;

    // If we are clicking an option, it must be for the current selected variant
    const variant = product.variants.find((vnt) => vnt._id === uiStore.pdpSelectedVariantId);

    this.selectVariant(variant, option._id);
  };

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
  handleVariantSizeSelection = (size) => {
    this.setState({
      showVariants: true,
      selectedVariantSize: size,
    });
  };
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  render() {
    const {
      classes,
      currencyCode,
      product,
      routingStore,
      uiStore: { pdpSelectedOptionId, pdpSelectedVariantId },
      width,
      catalogItems,
    } = this.props;
    const products = (catalogItems || []).map((item) => item.node.product);
    const filteredVariants = () => {
      const variantsToShow = product.variants
        ? product.variants.filter((item, i) => JSON.parse(item.optionTitle).size == this.state.selectedVariantSize)
        : [];
      return variantsToShow;
    };
    filteredVariants();
    const handleSliderChange = (value, index) => {
       this.setState({rangValue:value})
      this.state.mainSwiper.slideTo(value, 0, false);

    };
    const variantColor = () => {
      let colorway =product.metafields[2].value ? product.metafields[2].value : "NA" ;

      
      // let PV = product.variants;
      // if (PV) {
      //   if (PV.length < 5) {
      //     PV.map((item, i) => {
      //       if (i == PV.length - 1) {
      //         colorway = colorway + JSON.parse(item.optionTitle).color;
      //       } else {
      //         colorway = colorway + JSON.parse(item.optionTitle).color + ", ";
      //       }
      //     });
      //   } else {
      //     colorway = "Multi Color";
      //   }
      // }

      return colorway;
    };
    // variantColor();
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

    var sortedVariants = [];

    return (
      <Fragment>
        <Grid container className="productDetail__container">
          <Grid container className="ContainerContent__MainMaxWidth" spacing={0}>
            <Grid item className={classes.breadcrumbGrid} xs={12}>
              <Breadcrumbs isPDP tagId={routingStore.tagId} product={product} />
            </Grid>
            <Grid item xs={12} md={3}>
              <div className={classes.sectionRightGrid}>
                <div className="productDetail__brandBox">
                  <img src={`/brand/${product.vendor.toLowerCase()}.png`} />{" "}
                  <span className="productDetail__brandName">{product.vendor.toUpperCase()}</span>{" "}
                </div>
                <Typography variant="h6" className="productDetail__productTitle clr-0000">
                  {product.title}{" "}
                </Typography>
                <br />
                <Typography variant="h6" className="productDetail__brandNumber">
                  {" "}
                </Typography>
                <Grid container className="productDetail__infoCard">
                  <Grid item className="productDetail__infoTitle clr-4949">
                    Release Date:
                  </Grid>
                  <Grid item className="productDetail__infoData clr-2020">
                    {product.metafields[0].value ? product.metafields[0].value : "NA"}
                  </Grid>
                </Grid>
                <Grid container className="productDetail__infoCard">
                  <Grid item className="productDetail__infoTitle clr-4949">
                    Colorway:
                  </Grid>
                  <Grid item className="productDetail__infoData clr-2020">
                    {variantColor()}
                  </Grid>
                </Grid>
                {/* <Grid container className="productDetail__infoCard">
                  <Grid item className="productDetail__infoTitle">
                    Condition:
                  </Grid>
                  <Grid item className="productDetail__infoData">
                    Used,Discoloration,B Grade
                  </Grid>
                </Grid>
                <Grid container className="productDetail__infoCard">
                  <Grid item className="productDetail__infoTitle">
                    Box:
                  </Grid>
                  <Grid item className="productDetail__infoData">
                    No Orignal Box
                  </Grid>
                </Grid> */}
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="productDetail__slider">
                <Swiper
                  style={{ "--swiper-navigation-color": "#fff", "--swiper-pagination-color": "#fff" }}
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: this.state.thumbsSwiper }}
                  className="mySwiper2"
                  onSwiper={(swiper) => {
                    this.setState({ mainSwiper: swiper }, () => {
                    });
                  }}
                >
                  {product.media.map((imgItem, i) => {
                    if (imgItem.variantId == null && !imgItem.URLs.large.includes(".com/null")) {
                      return (
                        <SwiperSlide>
                          <div>
                            <img src={imgItem.URLs.large} />
                          </div>
                        </SwiperSlide>
                      );
                    }
                  })}
                </Swiper>
                {product.media.length > 30 && (
                <div className="flex-center">
                   
                <>
                <Slider 
                 min={0} max={36}
                 value={this.state.rangValue}
                   onChange={(value, index) => handleSliderChange(value, index)}
                />
    {/* <Range /> */}
                </>
                </div>
              )}
              </div>
             
            </Grid>
            <Grid item xs={12} md={3}>
              <div className={classes.section}>
                <div className="productDetail__sizeHeader">
                  <Typography className="productDetail__sizeTitle" variant="h6">
                    Size
                  </Typography>
                  <Typography variant="subtitle2" className="productDetail__sizeChart">
                    <SizeChartModal />
                  </Typography>
                </div>
                <div className="productDetail__sizes">
                  {this.state.ukShoesSizes.map((item, i) => {
                    const isAvailable = product.variants.some((shoes) => JSON.parse(shoes.optionTitle).size == item && shoes.inventoryAvailableToSell>0);

                    return (
                      <>
                        {isAvailable ? (
                          <ScrollLink to="section1" smooth={true} offset={-70} duration={500}>
                            <button
                              className={`productDetail__itemSize ${
                                isAvailable ? "productDetail__availableShoesSize" : "productDetail__ShoesSize"
                              } ${this.state.selectedVariantSize == item ? "productDetail__activeShoesSize" : ""} `}
                              onClick={() => this.handleVariantSizeSelection(item)}
                              disabled={isAvailable ? false : true}
                            >
                              <span>UK {item}</span>
                            </button>
                          </ScrollLink>
                        ) : (
                          <button
                            className={`productDetail__itemSize ${
                              isAvailable ? "productDetail__availableShoesSize" : "productDetail__ShoesSize"
                            } ${this.state.selectedVariantSize == item ? "productDetail__activeShoesSize" : ""} `}
                            onClick={() => this.handleVariantSizeSelection(item)}
                            disabled={isAvailable ? false : true}
                          >
                            <span>UK {item}</span>
                          </button>
                        )}
                      </>
                    );
                  })}
                </div>
                <Typography
                  variant="h2"
                  component="p"
                  className={`variantDetail__sizeSelection__status ${
                    this.state.selectedVariantSize == 0
                      ? "variantDetail__sizeSelection__showStatus"
                      : "variantDetail__sizeSelection__noStatus"
                  }`}
                >
                  {product.variants.length > 1 ? "select size" : "No stock available"}
                </Typography>
                <Grid>
                  {/* <Grid xs={12} className="productDetail__productmediaSlider">
                    <Swiper
                      onSwiper={
                        (e) =>  this.setState({ thumbsSwiper: e })
                      }
                      spaceBetween={10}
                      slidesPerView="auto"
                      freeMode={true}
                      watchSlidesVisibility={true}
                      watchSlidesProgress={true}
                      className="mySwiper"
                    >
                      {product.media.map((imgItem, i) => {
                        if (imgItem.variantId == null && !imgItem.URLs.large.includes(".com/null")) {
                          return (
                            <SwiperSlide>
                              <div>
                                <img src={imgItem.URLs.large} />
                              </div>
                            </SwiperSlide>
                          );
                        }
                      })}
                    </Swiper>
                  </Grid> */}
                </Grid>
              </div>
            </Grid>
            <br />
            {product.description !== null && product.description != "null" && product.description.length > 5 ? (
              <Grid className={`${"productDetail__showVariants-visible pt-20"}`} item xs={12} sm={12} md={12}>
                <Typography className="productDetail__variantListingTitle text-center clr-black" variant="h5">
                  PRODUCT DESCRIPTION
                </Typography>
                <br />

                <div className={classes.info + " text-center clr-black lrp-15p"}>
                  <ProductDetailDescription>{product.description.replace(/<br>/g,"")}</ProductDetailDescription>
                </div>
                {/*
       <ProductDetailTitle pageTitle={product.pageTitle} title={product.title} />
  <div className={classes.info}>
    <ProductDetailVendor>{product.vendor}</ProductDetailVendor>
  </div>
  <div className={classes.info}>
    <ProductDetailPrice className={classes.bottomMargin} compareAtPrice={compareAtDisplayPrice} price={productPrice.displayPrice} />
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
  />*/}
              </Grid>
            ) : (
              ""
            )}

            {/* <Grid > */}

            <Grid xs={12} className="productDetail__productVariantSlider">
              <div
                className={`${
                  this.state.showVariants !== true
                    ? "productDetail__showVariants"
                    : "productDetail__showVariants-visible"
                }`}
              >
                <hr />
                <br />
                <div className="productDetail__variantListingContainer" id="section1">
                  <Typography className="productDetail__variantListingTitle" variant="h5">
                    Listings
                  </Typography>
                  <div className="productDetail__variantListingFilterBox">
                    {/* <span className="productDetail__variantListingFilterText">Filter</span> */}
                    {/* <select onChange={(e)=>this.setState({sortVariants:e.target.value})}>
                      <option value="asc">price: Low to High</option>
                      <option value="dec">price: High to Low</option>
                    </select> */}
                    <CustomSortBySelector
                      sortBy={this.state.sortVariants}
                      onChange={(e) => this.setState({ sortVariants: e })}
                    />
                    {/* <img className="productDetail__variantListingFilterIcon" src="/icons/filter.svg" onClick={()=>this.setState({sortVariants:"dec"})}/> */}
                  </div>
                </div>
                <Grid container spacing={3}>
                  {
                    ((sortedVariants =
                      this.state.sortVariants === "asc"
                        ? product.variants.sort(function (a, b) {
                            return a.pricing[0].price - b.pricing[0].price;
                          })
                        : product.variants.sort(function (a, b) {
                            return b.pricing[0].price - a.pricing[0].price;
                          })),
                    sortedVariants.slice(0, 8).map((imgItem, i) => {
                      if (JSON.parse(imgItem.optionTitle).size == this.state.selectedVariantSize) {
                        return (
                         
                          <Grid item xs={12} sm={6} lg={3} xl={3}>
                            <Link
                              href={product.slug && "/variant/[...slugOrId]"}
                              as={product.slug && `/variant/${product.slug}?variantId=${imgItem._id}`}
                            >
                              <div
                                className="productDetail__variantCard"
                                // onClick={() => this.props.handleVariantPage(imgItem._id, this.state.selectedVariantSize)}
                                // onClick={() => Router.push(`/variant/${}`)}
                              >
                                <div className="productDetail__variantBgLayer">
                                  <div
                                    className="productDetail__variantImgBox contain__img"
                                    style={{
                                      backgroundImage: `URL("${
                                        imgItem?.media[0]?.URLs?.large
                                          ? imgItem?.media[0]?.URLs?.large
                                          : "/images/placeholder.gif"
                                      }")`,
                                    }}
                                  >
                                    {/* <img className="productDetail__variantImg" src={imgItem.primaryImage.URLs.small} /> */}
                                  </div>

                                  {/* <MediaGallery mediaItems={pdpMediaItems} /> */}
                                  <object data="" width="300" height="200">
                                
                                  <div className="productDetail__variantIconsContainer">
                                    
                                
                                    <Grid container>
                                      <Grid item xs={9} className="Review__info">
                                        <div
                                          className="Review__profileImg"
                                          style={{ backgroundImage: "url(/images/sellerProfile.jpg)" }}
                                        ></div>
                                        <div className="Review__profileInfo">
                                          <Typography
                                            xs={12}
                                            variant="h5"
                                            component="h2"
                                            className="Review__profileName"
                                          >
                                            {imgItem.uploadedBy ? imgItem.uploadedBy.name : "Land of Sneakers"}
                                          </Typography>
                                          <div className="Review__reviewStars">
                                            {this.state.star.map((item, i) => {
                                              return <span className="fa fa-star"></span>;
                                            })}
                                            {/* <span className="Review__rating">5.0</span> */}
                                          </div>
                                        </div>
                                      </Grid>
                                      <Grid item xs={3} className="Review__date">
                                        <span> {imgItem.pricing[0].displayPrice}</span>
                                      </Grid>
                                    </Grid>
                                   
                                    {/* <div className="productDetail__variantIconsLeft">
                                  <img className="productDetail__variantIcon" src="/icons/like.png" />
                                  <Typography className="productDetail__variantProductLikes">
                                    129 Likes
                                  </Typography>
                                </div>
                                <div className="productDetail__variantIconsRight">
                                  <img className="productDetail__variantIconShare" src="/icons/share.png" />
                                  <img className="productDetail__variantIcon" src="/icons/save.png" />
                                </div> */}
                                  </div>
                                  
                                  </object>
                                </div>
                                {/* <div className="productDetail__varianFooter">
                                
                                <span className="productDetail__varianFooterTitle">{imgItem.title}</span>
                                <span className="productDetail__varianFooterPrice">{imgItem.pricing[0].displayPrice}</span>
                              </div> */}
                              </div>
                            </Link>
                          </Grid>
                        );
                      }
                    }))
                  }
                </Grid>
                <Grid item xs={12}>
                  <div className="productDetail__price">
                    {/* <Button className="productDetail__priceBtn">Buy New - {productPrice.displayPrice}</Button> */}
                    {product.variants.length > 8 && <Button className="productDetail__priceBtn">See More</Button>}
                    {/* <ProductDetailAddToCart
              onClick={this.handleAddToCartClick}
              selectedOptionId={pdpSelectedOptionId}
              selectedVariantId={pdpSelectedVariantId}
              variants={product.variants}
            /> */}
                  </div>
                </Grid>
              </div>
            </Grid>
            {/* </Grid> */}
          </Grid>
        </Grid>
        <Grid className="productDetail__section2 ContainerContent__MainMaxWidth">
          {/* <Grid className="productDetail__recommendedSection" container spacing={3}>
            <div className={classes.productDetail__HeadingContainer}>
              <Typography variant="h6" className={classes.productDetail__Heading}>Recommended for you</Typography>
              <Hidden only="xs">
                <Button className={classes.productDetail__HeadingBtn}>See All</Button>
              </Hidden>
            </div>

            <GridFourCard
              products={products}
              placeholderImageURL="/images/placeholder.gif"
              {...this.props}
            />
          </Grid> */}
          <Grid className="productDetail__mayLikedSection" container spacing={3}>
            <div className={classes.productDetail__HeadingContainer}>
              <Typography variant="h6" className={classes.productDetail__Heading}>
                Recommended For You
              </Typography>
              {/*  <Hidden only="xs">
                <Button className={classes.productDetail__HeadingBtn}>See All</Button>
        </Hidden>*/}
            </div>

            <GridFourCard isFilter={false} pageInfo={this.props.pageInfo}   products={products} placeholderImageURL="/images/placeholder.gif" {...this.props} />
          </Grid>
          {/* <Grid className="productDetail__recommendedCollectionSection" container spacing={3}>
            <div className={classes.productDetail__HeadingContainer}>
              <Typography variant="h6" className={classes.productDetail__Heading}>Recommended Collections</Typography>
              <Hidden only="xs">
                <Button className={classes.productDetail__HeadingBtn}>See All</Button>
              </Hidden>
            </div>

          </Grid>
          <Collection /> */}
        </Grid>
      </Fragment>
    );
  }
}

export default withWidth({ initialWidth: "md" })(
  withStyles(styles, { withTheme: true })(inject("routingStore", "uiStore")(ProductDetail)),
);
