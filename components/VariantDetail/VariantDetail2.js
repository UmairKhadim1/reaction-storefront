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
import GridFourCard from "../CustomCatalogGrid/TagGridFourCard";
// import { Carousel } from 'react-responsive-carousel';
// import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import Collection from "../../components/Collection";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";
import Reviews from "../Reviews/index";
import WriteReviewModal from "./WriteReviewModal";
import { ToastContainer, toast } from 'react-toastify';
import useAddReview from "hooks/Review/addReview";
import AddBid from "./AddBid";
import {GQL_URL} from "../../apiConfig";
import Link from "components/Link"
SwiperCore.use([Navigation, Thumbs]);
const styles = (theme) => ({
  section: {
    padding: theme.spacing(2, 0),
    // marginBottom: theme.spacing(2)
  },
  breadcrumbGrid: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  info: {
    marginBottom: theme.spacing(),
  },
  variantDetail__HeadingContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "20px 0px",
  },
  variantDetail__Heading: {
    color: "#000000",
    margin: "42px 0px 22px 8px",
    fontWeight: "normal",
    fontFamily: "Bebas Neue Pro",
    fontSize: "34px",
    lineHeight: "41px",
    textTransform: "uppercase",
    fontStyle: "normal",
  },
  variantDetail__HeadingBtn: {
    border: "1px solid",
    height: "20px",
    padding: "15px 20px",
    borderRadius: "25px",
    marginRight: "11px !important",
  },
});

/**
 * Product detail component
 * @name ProductDetail
 * @param {Object} props Component props
 * @returns {React.Component} React component node that represents a product detail view
 */

// const funAddReview = () => {
//   const [addReviewEntry] = useAddReview()
// }
class VariantDetail2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbsSwiper: null,
      star: [1, 2, 3, 4, 5],
      openWriteReviewModal: false,
      Reviews: [],
      showBidModal: false,
      wishLists:{},
      isSave:false
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
  handleWriteReviewOpen = () => {
    this.setState({ openWriteReviewModal: true });
  };

  handleWriteReviewClose = (value) => {
    this.setState({ openWriteReviewModal: false });
  };
  onAddReview = (newReview) => {

    const structReview = [...this.state.Reviews];
    structReview.push(newReview);
    this.setState({
      Reviews: structReview,
      openWriteReviewModal: false
    })

  }
  componentDidMount() {
    const { product } = this.props;
    // this.setState({wishLists:this.props.wishLists?this.props.wishLists:{}})
    // if(this.props.wishLists){
    //   const CurrentVariant = product.variants.filter((variant) => variant._id == currentVariantId);
    //   this.props.wishLists.items.nodes.map(val=>{
    //     if(val.productConfiguration.productVariantId ==CurrentVariant[0].variantId ){
    //        this.setState({isSave:val._id})
    //     }
    //   })
    // }
    // Select first variant by default
    this.selectVariant(product.variants[0]);
    this.setState({ Reviews: this.props.Reviews });
  }

  componentDidUpdate(prevProps) {
    const { product,currentVariantId } = this.props;
    if (prevProps.Reviews !== this.props.Reviews) {
      this.setState({ Reviews: this.props.Reviews });
    }
    if(prevProps.wishLists != this.props.wishLists){
    this.setState({wishLists:this.props.wishLists?this.props.wishLists:{}})
    if(this.props.wishLists){
      const CurrentVariant = product.variants.filter((variant) => variant._id == currentVariantId);
      this.props.wishLists.items.nodes.map(val=>{
        if(val.productConfiguration.productVariantId ==CurrentVariant[0].variantId ){
           this.setState({isSave:val._id})
        }
      })
    }
  }
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
  handleAlert = (val) => {
    const notify = (val) => toast(val, {
      hideProgressBar: true
    });
    notify(val)
  }
  handleAddToCartClick = async (quantity) => {
    const {
      addItemsToCart,
      currencyCode,
      product,
      currentVariantId,
      uiStore: { openCartWithTimeout, pdpSelectedOptionId, pdpSelectedVariantId },
      width,
      cart
    } = this.props;

    // Get selected variant or variant option
    if (cart) {
      if (cart.items.length < 1) {
        const selectedVariant = variantById(product.variants, currentVariantId);
        const selectedOption = variantById(selectedVariant.options, pdpSelectedOptionId);
        const selectedVariantOrOption = selectedOption || selectedVariant;
        let res;
        if (selectedVariantOrOption) {
          // Get the price for the currently selected variant or variant option
          const price = priceByCurrencyCode(currencyCode, selectedVariantOrOption.pricing);

          const CurrentVariant = product.variants.filter((variant) => variant._id == currentVariantId);

          //currentVariantId[0].variantId
          // Call addItemsToCart with an object matching the GraphQL `CartItemInput` schema

          let sellerFullfillments = "";
          CurrentVariant[0]?.uploadedBy.FulfillmentMethods.forEach(element => {
            sellerFullfillments = sellerFullfillments + element + ",";
          });
          // const newAmount = this.props.bidOffer ? this.props.bidOffer.offer.amount.amount : CurrentVariant[0].pricing[0].price;
          const idBid = this.props.bidOffer ? this.props.bidOffer.bidId : null;
          res = await addItemsToCart([
            {
              price: {
                amount: CurrentVariant[0].pricing[0].price,
                currencyCode,
              },
              productConfiguration: {
                productId: product.productId, // Pass the productId, not to be confused with _id
                productVariantId: selectedVariantOrOption.variantId, // Pass the variantId, not to be confused with _id
              },
              quantity,

              metafields: [{
                key: "primaryImage",
                value: CurrentVariant[0]?.media[0]?.URLs.large,
              }, {
                key: "sellerFullfillments",
                value: sellerFullfillments,
              }],
            },
          ],idBid,this.props.accessToken);
          
         
          if (this.props.bidOffer) {
            
            // var myHeaders = new Headers();
            // myHeaders.append("Content-Type", "application/json");
            // myHeaders.append("Authorization", `${this.props.accessToken}`);
            // var graphqlUpdateCart = JSON.stringify({
            //   query: `
            //       mutation UpdateCartOfferPrice($cartId:ID!,$bidId:ID!){
            //         updateCartOfferPrice(cartId:$cartId,bidId:$bidId){
            //            _id
            //           }
            //       }
            //       `,
            //   variables: {
            //     cartId: res.data.addCartItems?res.data.addCartItems.cart._id:"cart Id not exist",
            //     bidId: this.props.bidOffer.bidId,
            //   }
            // })
            // var requestOptions = {
            //   method: "POST",
            //   headers: myHeaders,
            //   body: graphqlUpdateCart,
            //   redirect: "follow",
            // };
            // fetch(GQL_URL, requestOptions)
            //   .then((response) => response.text())
            //   .then((result) => {

                

            //     // resolve(JSON.parse(result).data);
            //   })
            //   .catch((error) => {

            //     // reject(error);
            //   });

          } else {
            if (isWidthUp("md", width)) {
              // Open the cart, and close after a 3 second delay 3000
              openCartWithTimeout(3000);
            }
          }
        }

      } else {
        this.handleAlert("you can add only one item in cart")
      }
    } else {
      const selectedVariant = variantById(product.variants, currentVariantId);
      const selectedOption = variantById(selectedVariant.options, pdpSelectedOptionId);
      const selectedVariantOrOption = selectedOption || selectedVariant;

      if (selectedVariantOrOption) {
        // Get the price for the currently selected variant or variant option
        const price = priceByCurrencyCode(currencyCode, selectedVariantOrOption.pricing);

        const CurrentVariant = product.variants.filter((variant) => variant._id == currentVariantId);

        //currentVariantId[0].variantId
        // Call addItemsToCart with an object matching the GraphQL `CartItemInput` schema

        let sellerFullfillments = "";
        CurrentVariant[0]?.uploadedBy.FulfillmentMethods.forEach(element => {
          sellerFullfillments = sellerFullfillments + element + ",";
        });
        // const newAmount = this.props.bidOffer?this.props.bidOffer.offer.amount.amount: CurrentVariant[0].pricing[0].price;
        const newPrice = CurrentVariant[0].pricing[0].price;
        const idBid = this.props.bidOffer ? this.props.bidOffer.bidId : null;
        const res = await addItemsToCart([
          {
            price: {
              amount: newPrice,
              currencyCode,
            },
            productConfiguration: {
              productId: product.productId, // Pass the productId, not to be confused with _id
              productVariantId: selectedVariantOrOption.variantId, // Pass the variantId, not to be confused with _id
            },
            quantity,

            metafields: [{
              key: "primaryImage",
              value: CurrentVariant[0]?.media[0]?.URLs.large,
            }, {
              key: "sellerFullfillments",
              value: sellerFullfillments,
            }],
          },
        ],idBid,this.props.accessToken);
        
        if (this.props.bidOffer) {
          
          // var myHeaders = new Headers();
          // myHeaders.append("Content-Type", "application/json");
          // myHeaders.append("Authorization", `${this.props.accessToken}`);
          // var graphqlUpdateCart = JSON.stringify({
          //   query: `
          //         mutation UpdateCartOfferPrice($cartId:ID!,$bidId:ID!){
          //           updateCartOfferPrice(cartId:$cartId,bidId:$bidId){
          //              _id
          //             }
          //         }
          //         `,
          //   variables: {
          //     cartId:  res.data.addCartItems?res.data.addCartItems.cart._id:"cart Id not exist",
          //     bidId: this.props.bidOffer.bidId,
          //   }
          // })
          // var requestOptions = {
          //   method: "POST",
          //   headers: myHeaders,
          //   body: graphqlUpdateCart,
          //   redirect: "follow",
          // };
          // fetch(GQL_URL, requestOptions)
          //   .then((response) => response.text())
          //   .then((result) => {

              

          //     // resolve(JSON.parse(result).data);
          //   })
          //   .catch((error) => {

          //     // reject(error);
          //   });

        } else {
          if (isWidthUp("md", width)) {
            // Open the cart, and close after a 3 second delay 3000
            openCartWithTimeout(3000);
          }
        }
      }


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
  handleCreateWistList = (amount,variantIdProp,ancestorId) => {
    const configWishItem = [{
      price: {
        amount:amount,
        currencyCode:this.props.shop.currency.code
      },
      productConfiguration : {
        productId:ancestorId,
        productVariantId:variantIdProp
      }
    }]
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `${this.props.accessToken}`);
    if(Object.keys(this.state.wishLists).length>0){
      var addWishListGraphql = JSON.stringify({
        query: `
        mutation addWishListMutation($input: AddWishlistItemsInput!) {
          addWishlistItems(input: $input) {
            wishlist {
              _id
           account {
             userId
           }
           items{
             nodes {
                _id
                productConfiguration{
                  productVariantId
                }
             }
           }
            }
          }
        }
              `,
        variables: {
          input:{
          items:configWishItem,
          clientMutationId:this.props.account.userId,
          wishlistId:this.state.wishLists._id}
        },
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: addWishListGraphql,
        redirect: "follow",
      };
      fetch(GQL_URL, requestOptions)
        .then((response) => response.text())
        .then((result) => {
           const res =   JSON.parse(result).data.addWishlistItems.wishlist;
              this.setState({
                wishLists: res,
                isSave:res.items.nodes[res.items.nodes.length-1]._id
              })
          // resolve(JSON.parse(result).data);
        })
        .catch((error) => {
          // reject(error);
        });
    }else{
    var createWishListGraphql = JSON.stringify({
      query: `
      mutation CreateWishlist($input: CreateWishlistInput!) {
        createWishlist(input: $input) {
          wishlist {
            _id
            account {
              userId
            }
            items{
              nodes {
                 _id
                 productConfiguration{
                  productVariantId
                }
              }
            }
          }
        }
      }
            `,
      variables: {
        input:{
        items:configWishItem,
        clientMutationId:this.props.account.userId,
        shopId:this.props.shop._id}
      },
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: createWishListGraphql,
      redirect: "follow",
    };
    fetch(GQL_URL, requestOptions)
      .then((response) => response.text())
      .then((result) => {
         const res = JSON.parse(result).data.createWishlist.wishlist;
         this.setState({
          wishLists: res,
          isSave:res.items.nodes[res.items.nodes.length-1]._id
        })
        // resolve(JSON.parse(result).data);
      })
      .catch((error) => {
        // reject(error);
      });
    }
  }


  handleRemoveWishList = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `${this.props.accessToken}`);
    var removeWishListGraphql = JSON.stringify({
      query: `
      mutation RemoveWishlistItems($input: RemoveWishlistItemsInput!) {
        removeWishlistItems(input: $input) {
          wishlist {
            _id
         account {
           userId
         }
         items{
           nodes {
              _id
           }
         }
          }
        }
      }
            `,
      variables: {
        input:{
          wishlistItemIds:[this.state.isSave],
        clientMutationId:this.props.account.userId,
        wishlistId:this.state.wishLists._id}
      },
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: removeWishListGraphql,
      redirect: "follow",
    };
    fetch(GQL_URL, requestOptions)
      .then((response) => response.text())
      .then((result) => {
         const res =   JSON.parse(result).data.removeWishlistItems.wishlist;
            this.setState({
              wishLists: res,
              isSave:false
            })
        // resolve(JSON.parse(result).data);
      })
      .catch((error) => {
        // reject(error);
      });

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
      currentVariantId,
    } = this.props;
    const products = (catalogItems || []).map((item) => item.node.product);
    const CurrentVariant = product.variants.filter((variant) => variant._id == currentVariantId);
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
    const showAmount = this.props.bidOffer && this.props.bidOffer.offer ? this.props.bidOffer.offer.amount.displayAmount : CurrentVariant[0]?.pricing[0]?.displayPrice;
    const ammountToAdd = this.props.bidOffer && this.props.bidOffer.offer ? this.props.bidOffer.offer.amount.amount : CurrentVariant[0]?.pricing[0]?.price;
    return (
      <Fragment>
        <Grid container className="variantDetail__container">
          <Grid container className="ContainerContent__MainMaxWidth variantDetail__sectionCustomization">
            <Grid item className={classes.breadcrumbGrid} xs={12}>
                            <Breadcrumbs isPDP tagId={routingStore.tagId} product={product} CurrentVariant={CurrentVariant} currentVariantId={currentVariantId}/>
                        </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <div className="variantDetail__slider">

                <Swiper
                  style={{ "--swiper-navigation-color": "#fff", "--swiper-pagination-color": "#fff" }}
                  loop={true}
                  spaceBetween={10}
                  navigation={false}
                  navigation={true}
                  thumbs={{ swiper: this.state.thumbsSwiper }}
                  className="mySwiper2"
                >
                  {CurrentVariant[0]?.media &&
                    CurrentVariant[0].media.map((imgItem, i) => {
                      if (!imgItem.URLs.large.includes(".com/null")) {
                        return (
                          <SwiperSlide>
                            <div style={{ height: "100%", width: "100%" }}>
                              <img src={imgItem.URLs.large} />
                            </div>
                          </SwiperSlide>
                        );
                      }
                    })}
                </Swiper>
              </div>
              <Grid container>
                <Grid xs={12} className="variantDetail__productVariantMediaSlider">
                  <Swiper
                    onSwiper={(e) => this.setState({ thumbsSwiper: e })}
                    loop={false}
                    spaceBetween={10}
                    slidesPerView={3.5}
                    freeMode={true}
                    watchSlidesVisibility={true}
                    watchSlidesProgress={true}
                    className="mySwiper"
                  >
                    {CurrentVariant[0]?.media &&
                      CurrentVariant[0].media.map((imgItem, i) => {
                        if (!imgItem.URLs.large.includes(".com/null")) {
                          return (
                            <SwiperSlide>
                              <div style={{ height: "100%" }}>
                                <img src={imgItem.URLs.large} />
                              </div>
                            </SwiperSlide>
                          );
                        }
                      })}
                  </Swiper>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={12} md={1}>
                        </Grid> */}
            <Grid className="variantDetail__rightContainer" item xs={12} sm={6} md={5} lg={5} xl={4}>
              <div className={classes.section}>
                {/*<Hidden >
                <Grid container>
                  <Grid item xs={12} className="variantDetail__info">
                    <div
                      className="variantDetail__profileImg"
                      style={{ backgroundImage: "url(/images/sellerProfile.jpg)" }}
                    ></div>
                    <div className="variantDetail__profileInfo">
                      <Typography xs={12} variant="" component="" className="variantDetail__profileName">
                        landOfSneakers
                      </Typography>
                       <Typography xs={12} variant="h5" component="h2" className="variantDetail__profileStatus">Verified Seller</Typography> 
                      <div className="variantDetail__reviewStars">
                        {this.state.star.map((item, i) => {
                          return <span class="fa fa-star"></span>;
                        })}
                        <span className="variantDetail__rating">5.0</span>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Hidden>*/}
                <div className="variantDetail__brandBox">
                  <img src={`/brand/${product.vendor.toLowerCase()}.png`} />
                  <span className="productDetail__brandName">{product.vendor.toUpperCase()}</span>{" "}
                </div>
                <Typography variant="h6" className="variantDetail__productTitle clr-0000">
                  {product.title}{" "}
                </Typography>

                <Hidden>
                <Link
                          href={true && "/profile/[...slugOrId]"}
                          as={true && `/profile/${CurrentVariant[0]?.uploadedBy?.name}`}
                        >
                  <span>
                    Sold by <span className="clr-red fw-400 variantDetail__soldBy">
                      {CurrentVariant[0]?.uploadedBy?.name}
                    </span>
                  </span>
                  </Link>
                </Hidden>
                <br />

                <Typography variant="h6" className="variantDetail__brandNumber">
                  {" "}
                </Typography>
                <Grid container className="variantDetail__infoCard">
                  <Grid item className="variantDetail__infoTitle clr-4949">
                    Release Date:
                  </Grid>
                  <Grid item className="variantDetail__infoData clr-2020">
                    2016-09-03
                  </Grid>
                </Grid>
                <Grid container className="variantDetail__infoCard">
                  <Grid item className="variantDetail__infoTitle clr-4949">
                    Colorway:
                  </Grid>
                  <Grid item className="variantDetail__infoData clr-2020">
                    {CurrentVariant[0]?.optionTitle && JSON.parse(CurrentVariant[0]?.optionTitle).color}
                  </Grid>
                </Grid>
                <Grid container className="variantDetail__infoCard">
                  <Grid item className="variantDetail__infoTitle clr-4949">
                    Size:
                  </Grid>
                  <Grid item className="variantDetail__infoData clr-2020">
                    {CurrentVariant[0]?.optionTitle && JSON.parse(CurrentVariant[0]?.optionTitle).size}
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid sx={12} item className="variantDetail__action">
                    <div className="variantDetail__actionLeft">
                      <div className="variantDetail__actionLeftBox">

                    {this.props.userId && this.state.isSave ?
                    <img onClick={()=>this.handleRemoveWishList()}  className={`${classes.icon} cursor-pointer`} src="/icons/favourite.svg"/>
                     : <img onClick={()=>this.handleCreateWistList(ammountToAdd,CurrentVariant[0].variantId,CurrentVariant[0].ancestorId)}  className={`${classes.icon} cursor-pointer`} src="/icons/save.svg"/> }
                        {/*                                             <img src="/icons/share.svg" />
                                                <span>Share</span>
                                        */}
                      </div>
                      <div className="variantDetail__actionLeftBox">
                        {/*                                                <img src="/icons/heart.svg" />
                                            <span>Save</span>
                                        */}
                      </div>
                    </div>
                    <div className="variantDetail__actionRight clr-0000">
                      <span>{this.props.bidOffer && this.props.bidOffer.offer ? this.props.bidOffer.offer.amount.displayAmount : CurrentVariant[0]?.pricing[0]?.displayPrice}</span>
                    </div>
                  </Grid>
                </Grid>
                <Grid container>
                
                 {CurrentVariant[0]?.inventoryAvailableToSell >0 && <Grid xs={12} item className="variantFooter__Btn">
                    <ProductDetailAddToCart
                      onClick={this.handleAddToCartClick}
                      selectedOptionId={pdpSelectedOptionId}
                      selectedVariantId={pdpSelectedVariantId}
                      variants={product.variants}
                    />
                   { this.props.bidOffer == null ?
                    <Button className="variantFooter__bidBtn" onClick={() => this.setState({ showBidModal: true })}>Bid</Button>:
                     ""}
                  </Grid>}
                </Grid>
              </div>
            </Grid>
        
          </Grid>

          <div className="ContainerContent__MainMaxWidth" style={{ width: "100%" }}>
            {/* <Typography variant="h6" className={classes.variantDetail__Heading}>REVIEWS </Typography><br/>
            <Reviews Reviews={this.state.Reviews} />
           */}
            <Grid className="variantDetail__section2">
              <Grid className="variantDetail__recommendedSection" container spacing={3}>
                <div className={classes.variantDetail__HeadingContainer}>
                  <Typography variant="h6" className={classes.variantDetail__Heading}>
                    You May also like
                  </Typography>
                  {/*  <Hidden only="xs">
                <Button className={classes.productDetail__HeadingBtn}>See All</Button>
        </Hidden>*/}
                </div>
              </Grid>
              <Grid className="variantDetail__recommendedSection" container spacing={3}>
                <GridFourCard isFilter={false} pageInfo={this.props.pageInfo} products={products} placeholderImageURL="/images/placeholder.gif" {...this.props} />
              </Grid>
            </Grid>
          </div>
        </Grid>
        {/* write review modal 
          <WriteReviewModal userId={this.props.userId} productId={CurrentVariant[0]?._id} open={this.state.openWriteReviewModal} onAddReview={this.onAddReview} onClose={this.handleWriteReviewClose} />
        */}
        <AddBid {...this.props} open={this.state.showBidModal} onClose={() => this.setState({ showBidModal: false })} />
      </Fragment>
    );
  }
}

export default withWidth({ initialWidth: "md" })(
  withStyles(styles, { withTheme: true })(inject("routingStore", "uiStore")(VariantDetail2)),
);
