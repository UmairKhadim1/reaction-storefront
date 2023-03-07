import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withComponents } from "@reactioncommerce/components-context";
import { addTypographyStyles, applyTheme, CustomPropTypes } from "@reactioncommerce/components/utils";
import { priceByCurrencyCode } from "@reactioncommerce/components/CatalogGridItem/v1/utils";
import Link from "components/Link";
import {Typography,IconButton } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
const styles = (theme) => ({
    icon:{
        width:"15px",
        height:"15px",
        marginRight: "5px",
        cursor: "pointer",
        zIndex:"1000"
    },
    shareIcon:{
      width:"15px",
      height:"15px",
      marginRight: "15px",
      cursor:"pointer",
      zIndex:"1000"
    },
    productLikes:{
       fontSize:"12px",
       fontWeight:500,
       color: "#000000",
       textTransform: "capitalize"
    },
    product__priceStyle:{
      fontSize:"14px",
      fontWeight:"bold",
      color: "#000000",
      textTransform: "capitalize",
      minWidth: "50px !important",
      fontStyle:"normal",
      fontFamily:"karla"
    },
    product__thumbnail:{
      width: "100%",
    height: "165px",
    objectFit: "cover",
    borderTopLeftRadius: "5px",
    borderTopRightRadius:" 5px",
    },
    media__container:{
      backgroundColor: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // height:"180px",
    borderRadius:"10px"
    },
    product__brandLogo:{
      position:"absolute",
      left:"10px",
      top:"20px"
    },
    product__title:{
      fontWeight:"normal",
      fontStyle:"normal",
      fontFamily:"karla",
      color: "#000000",
      textTransform: "capitalize",
      fontSize:"16px",
      height: "2em",
      lineHeight:"1em",
      overflow: "hidden",
      marginBottom:"15px",
      
      maxWidth: "100%",
    // paddingRight: "20px",
    color: "#000000 !important",
    textAlign:"center"
    
    },
    product__brandImg:{
      width:"30px",
      objectFit:"contain"
    }
});


const ProductMediaWrapper = styled.div`
  background-color: ${applyTheme("CatalogGridItem.mediaBackgroundColor")};
  position: relative;
`;
const ProductInfoSection1 = styled.div`
  display: flex;
  align-items:center;
`;
const ProductInfo = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: ${applyTheme("CatalogGridItem.verticalSpacingBetweenImageAndInfo")};
  width:100%
`;
const ProductInfoBottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0;
  padding-left: 10px;
  padding-right: 14px;
  padding-top: ${applyTheme("CatalogGridItem.verticalSpacingBetweenImageAndInfo")};
  width:100%;
  
`;

const ProductTitle = styled.aside`
  ${addTypographyStyles("CatalogGridItemProductTitle", "headingTextBold")}
  line-height: 1.125;
  font-size:16px;
  font-weight:600;
`;

const ProductVendor = styled.span`
  ${addTypographyStyles("CatalogGridItemProductVendor", "labelText")}
`;

const PriceContainer = styled.div`
  text-align: center;
`;

class CatalogGridItem extends Component {
  static propTypes = {
    /**
     * Labels to use for the various badges. Refer to `BadgeOverlay`'s prop documentation.
     */
    badgeLabels: PropTypes.shape({
      BACKORDER: PropTypes.string,
      BESTSELLER: PropTypes.string,
      LOW_QUANTITY: PropTypes.string,
      SOLD_OUT: PropTypes.string,
      SALE: PropTypes.string
    }),
    /**
     * You can provide a `className` prop that will be applied to the outermost DOM element
     * rendered by this component. We do not recommend using this for styling purposes, but
     * it can be useful as a selector in some situations.
     */
    className: PropTypes.string,
    /**
     * If you've set up a components context using
     * [@reactioncommerce/components-context](https://github.com/reactioncommerce/components-context)
     * (recommended), then this prop will come from there automatically. If you have not
     * set up a components context or you want to override one of the components in a
     * single spot, you can pass in the components prop directly.
     */
    components: PropTypes.shape({
      BadgeOverlay: CustomPropTypes.component.isRequired,
      Link: CustomPropTypes.component.isRequired,
      Price: CustomPropTypes.component.isRequired,
      ProgressiveImage: CustomPropTypes.component.isRequired
    }),
    /**
     * Currency code to display the price for. Product must include a pricing object with the code in `product.pricing`
     */
    currencyCode: PropTypes.string.isRequired,
    /**
     * Item click handler
     */
    onClick: PropTypes.func,
    /**
     * Image to display when product doesn't have a primary image
     */
    placeholderImageURL: PropTypes.string,
    /**
     * Product to display
     */
    product: PropTypes.shape({
      title: PropTypes.string,
      slug: PropTypes.string,
      vendor: PropTypes.string,
      primaryImage: PropTypes.shape({
        URLs: PropTypes.shape({
          large: PropTypes.string,
          medium: PropTypes.string,
          small: PropTypes.string,
          thumbnail: PropTypes.string
        })
      }),
      pricing: PropTypes.arrayOf(PropTypes.shape({
        currency: PropTypes.shape({
          code: PropTypes.string
        }),
        displayPrice: PropTypes.string
      })),
      isSoldOut: PropTypes.bool,
      isBackorder: PropTypes.bool,
      isOnSale: PropTypes.bool,
      isLowQuantity: PropTypes.bool,
      isBestseller: PropTypes.bool
    })
  };

  static defaultProps = {
    badgeLabels: null,
    onClick() {},
    placeholderImageURL: ""
  };

  state = {
    fit: "cover"
  };

 



  componentWillUnmount() {
    this._mounted = false;
  }

 

  get primaryImage() {
    const {  placeholderImageURL } = this.props;
  
  }

  renderProductMedia() {
    const {classes, components: { ProgressiveImage }, imageURLs } = this.props;
    const { fit } = this.state;
    return (
      <div className={`${classes.media__container} buyer__wishListMediaContainer`}>
        
          <img className={classes.product__thumbnail} src={Object.keys(imageURLs).length>0?imageURLs.large:"/images/placeholder.gif"} />
        {/*  <ProductInfo>
           <ProductTitle><img src="/icons/like.png"/>129 Likes</ProductTitle> */}
         {/*  <ProductInfoSection1>
            <img className={classes.icon}   src="/icons/like.svg"/>
            <Typography className={classes.productLikes}>
                  129 Likes
              </Typography> 
          </ProductInfoSection1>
          <PriceContainer>
             <Price displayPrice={productPrice.displayPrice} /> 
             <img className={classes.shareIcon} src="/icons/share.svg"/>
            <img className={classes.icon} src="/icons/save.svg"/> 
          </PriceContainer>
        </ProductInfo>*/}
        <span className="buyer__wishListRemoveOuter" onClick={()=>this.props.onRemove(this.props._id)}>
           <img className="buyer__wishListRemoveIcon" src="/icons/deleteIcon.png" />
        </span>
      </div>
    
      //  <ProductMediaWrapper>
      //    <ProgressiveImage
      //     fit={fit}
      //     altText={description}
      //     presrc={this.primaryImage.URLs.thumbnail}
      //     srcs={this.primaryImage.URLs}
      //   /> 
        
      // </ProductMediaWrapper> 
      
    );
  }

  renderProductInfo() {
    const {
      components: { Price },
      currencyCode,
     title,
     price
    } = this.props;
    // const productPrice = priceByCurrencyCode(currencyCode, pricing) || {};
    // productPrice.displayPrice
    const {classes} = this.props;
    return (
      <div>
        <ProductInfoBottom className="ptb-10 ProductInfoBottom">
          {/* <ProductTitle>{title}</ProductTitle> */}
          <Typography variant="h6" className={`${classes.product__title} product__titleExtension`}>{title}</Typography>
          <PriceContainer >
             <Typography className={classes.product__priceStyle} variant="h6">{price && price?.displayAmount}</Typography>
            {/* <Price  displayPrice={productPrice.displayPrice} /> */}
          </PriceContainer>
        </ProductInfoBottom>
        {/* <div>
          <ProductVendor>{vendor}</ProductVendor>
        </div> */}
      </div>
    );
  }

  render() {
    const { className, badgeLabels, components: { BadgeOverlay }, product } = this.props;
    
    // const { slug } = product;
    // const badgeProps = { product };

    // if (badgeLabels) {
    //   badgeProps.badgeLabels = badgeLabels;
    // }

    return (
      <div className={className}>
       
         
          {/* <Link
          href={slug && "/product/[...slugOrId]"}
          as={slug && `/product/${slug}`}
        > */}
            {this.renderProductMedia()}
        
            {this.renderProductInfo()}
            {/* </Link> */}
       
        
      </div>
    );
  }
}

export default withStyles(styles)(withComponents(CatalogGridItem));
