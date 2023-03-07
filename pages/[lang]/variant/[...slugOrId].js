import React, { useMemo,useState, useEffect } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import withCart from "containers/cart/withCart";
import VariantDetail2 from "components/VariantDetail/VariantDetail2";
import PageLoading from "components/PageLoading";
import Layout from "components/Layout";
import { withApollo } from "lib/apollo/withApollo";

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchCatalogProduct from "staticUtils/catalog/fetchCatalogProduct";
import fetchAllTags from "staticUtils/tags/fetchAllTags";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import CustomLoader from "../../../components/CustomLoader";
import withCatalogItems from "containers/catalog/productDetailCatalogItem";
import inject from "hocs/inject";
import { ToastContainer, toast } from 'react-toastify';
import { useQuery,gql } from "@apollo/client";
import { GQL_URL } from "../../../apiConfig.js";
import useStores from "hooks/useStores";
/**
 *
 * @name buildJSONLd
 * @param {Object} product - The product
 * @param {Object} shop - The shop
 * @summary Builds a JSONLd object from product properties.
 * @return {String} Stringified product jsonld
 */
function buildJSONLd(product, shop) {
  if (!product || !shop) return "";

  const currencyCode = shop.currency.code || "USD";
  const priceData = product.pricing[0];
  const images = product.media.map((image) => image.URLs.original);

  let productAvailability = "http://schema.org/InStock";
  if (product.isLowQuantity) {
    productAvailability = "http://schema.org/LimitedAvailability";
  }
  if (product.isBackorder && product.isSoldOut) {
    productAvailability = "http://schema.org/PreOrder";
  }
  if (!product.isBackorder && product.isSoldOut) {
    productAvailability = "http://schema.org/SoldOut";
  }

  // Recommended data from https://developers.google.com/search/docs/data-types/product
  const productJSON = {
    "@context": "http://schema.org/",
    "@type": "Product",
    "brand": product.vendor,
    "description": product.description,
    "image": images,
    "name": product.title,
    "sku": product.sku,
    "offers": {
      "@type": "Offer",
      "priceCurrency": currencyCode,
      "price": priceData.minPrice,
      "availability": productAvailability,
      "seller": {
        "@type": "Organization",
        "name": shop.name
      }
    }
  };

  return JSON.stringify(productJSON);
}

/**
 * Layout for the product detail page
 *
 * @param {Function} addItemsToCart - function to call to add items to cart
 * @param {Object} product - the product
 * @param {Boolean} isLoadingProduct - loading indicator
 * @param {Object} shop - the shop this product belong to
 * @return {React.Component} The product detail page
 */
function VariantDetailPage(props) {
  
  const { addItemsToCart, product, isLoadingProduct, shop,cart } = props;
  const { authStore } = useStores();
  const { account, accessToken } = authStore;
  const router = useRouter();
  const {query : {variantId},} = router;
  const [queryValue, setQueryValue] = useState([])
  const [Reviews,setReviews] = useState([]);
  const [bidOffer,setBidOffer] = useState(null);
  const [wishLists,setWishLists] = useState(null);
  useEffect(()=>{
    const queryValue1 = router.query['variantId'] || router.asPath.match(new RegExp(`[&?]${'variantId'}=(.*)(&|$)`))
        setQueryValue(queryValue1);
  },[])
 
  // const { loading, data } =  useQuery(gql`
  // query productReviewsQuery($productId:ID!){
  //   productReviews(productId:$productId){
  //     _id
  //     review
  //     score
  //     createdBy {
  //       name
  //       image
  //     }
  //     }
  // }
  // `,{
      // variables: {
      //   productId:  router.query['variantId'] || router.asPath.match(new RegExp(`[&?]${'variantId'}=(.*)(&|$)`))[1]
      // }
  // })
  // if(data){
  //   setReviews(data.productReviews);
  //   
  // }
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", accessToken);
    var graphql = JSON.stringify({
      query:`query productReviewsQuery($productId:ID!){
        productReviews(productId:$productId){
          _id
          review
          score
          updatedAt
          createdBy {
            name
            image
          }
          }
      }`,
      variables: {
        productId:  router.query['variantId'] || router.asPath.match(new RegExp(`[&?]${'variantId'}=(.*)(&|$)`))[1]
      }
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
         
          setReviews(JSON.parse(result).data.productReviews);
          // resolve(JSON.parse(result).data);
        })
        .catch((error) => {
         
          // reject(error);
        });
        var queryActiveBidOnProduct = JSON.stringify({
          query:`query GetActiveBidOnProduct($input:activeBidInput!){
            getActiveBidOnProduct(input:$input){
              bidId
              isValid
              offer {
                amount {
                  amount
                  currency {
                    code
                  }
                  displayAmount
                }
              }
              }
          }`,
          variables: {
            input: {
              variantId:  router.query['variantId'] || router.asPath.match(new RegExp(`[&?]${'variantId'}=(.*)(&|$)`))[1],
              productId: props.product? props.product.productId : ""
            }
           
          }
        })
        var activeBidRequestOption = {
          method: "POST",
          headers: myHeaders,
          body: queryActiveBidOnProduct,
          redirect: "follow",
        };
        fetch(GQL_URL, activeBidRequestOption)
            .then((response) => response.text())
            .then((result) => {
              
              setBidOffer(JSON.parse(result).data.getActiveBidOnProduct);
              // setReviews(JSON.parse(result).data.productReviews);
              // resolve(JSON.parse(result).data);
            })
            .catch((error) => {
              
              // reject(error);
            });
  //  data && setReviews(data.productReviews);
 if(shop){
  var getWishListGraphql = JSON.stringify({
    query: `
    query WishlistByAccountId($accountId: ID!,$shopId:ID!) {
      wishlistByAccountId(accountId: $accountId,shopId:$shopId) {
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
          `,
    variables: {
      accountId:account.userId,
      shopId:shop._id,
    },
  });
  var wishListRequestOptions = {
    method: "POST",
    headers: myHeaders,
    body: getWishListGraphql,
    redirect: "follow",
  };
  fetch(GQL_URL, wishListRequestOptions)
    .then((response) => response.text())
    .then((result) => {
      const dataList = JSON.parse(result).data.wishlistByAccountId
      setWishLists(dataList)
      // resolve(JSON.parse(result).data);
    })
    .catch((error) => {
      // reject(error);
    });
  }
  }, [router,accessToken])
  
  const currencyCode = (shop && shop.currency.code) || "USD";
  const JSONLd = useMemo(() => {
    if (product && shop) {
      return buildJSONLd(product, shop);
    }
    return null;
  }, [product, shop]);
  // <PageLoading />
  if (isLoadingProduct || router.isFallback) return <CustomLoader/>;
  if (!product || !shop) return <Typography>Not Found</Typography>;
   const { catalogItems,catalogItemsPageInfo} = props;
  
  return (
    <Layout shop={shop}>
            <Helmet
        title={`${product && product.title} | ${shop && shop.name}`}
        meta={[{ name: "description", content: product && product.description }]}
        script={[{ type: "application/ld+json", innerHTML: JSONLd }]}
      />
             <VariantDetail2
        addItemsToCart={addItemsToCart}
        currencyCode={currencyCode}
        product={product}
        shop={shop}
        catalogItems={catalogItems}
        currentVariantId={Array.isArray(queryValue)?queryValue[1]:queryValue}
        cart={cart}
        pageInfo={catalogItemsPageInfo}
        account={account}
        userId={account.userId}
        Reviews={Reviews}
        bidOffer={bidOffer}
        accessToken={accessToken}
        wishLists={wishLists}
      />
      <ToastContainer  hideProgressBar={true}/>
    </Layout>
  );
}

VariantDetailPage.propTypes = {
  /**
   * Function to add items to a cart, usually using the addItemsToCart from @withCart decorator.
   *
   * @example addItemsToCart(CartItemInput)
   * @type function
   */
  addItemsToCart: PropTypes.func,
  isLoadingProduct: PropTypes.bool,
  /**
   * Catalog Product item
   */
  product: PropTypes.object,
  shop: PropTypes.shape({
    name: PropTypes.string.isRequired,
    currency: PropTypes.shape({
      code: PropTypes.string.isRequired
    })
  })
};

/**
 *  Static props for a product
 *
 * @returns {Object} the props
 */
export async function getStaticProps({ params: { slugOrId, lang } }) {
  const productSlug = slugOrId && slugOrId[0];
  const primaryShop = await fetchPrimaryShop(lang);
  if (!primaryShop?.shop) {
    return {
      props: {
        shop: null,
        translations: null,
        products: null,
        tags: null
      },
      // eslint-disable-next-line camelcase
      unstable_revalidate: 1 // Revalidate immediately
    };
  }

  return {
    props: {
      ...primaryShop,
      ...await fetchTranslations(lang, ["common", "productDetail"]),
      ...await fetchCatalogProduct(productSlug),
      ...await fetchAllTags(lang)
    },
    // eslint-disable-next-line camelcase
    unstable_revalidate: 120 // Revalidate each two minutes
  };
}

/**
 *  Static paths for a product
 *
 * @returns {Object} the paths
 */
export async function getStaticPaths() {
  return {
    paths: locales.map((locale) => ({ params: { lang: locale, slugOrId: ["-"] } })),
    fallback: true
  };
}

export default withApollo()(withCatalogItems(inject("routingStore", "uiStore")( withCart(VariantDetailPage))));
