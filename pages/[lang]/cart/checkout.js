import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Router from "translations/i18nRouter";
import { useApolloClient } from "@apollo/client";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CartEmptyMessage from "@reactioncommerce/components/CartEmptyMessage/v1";
import { StripeProvider } from "react-stripe-elements";
import CheckoutActions from "components/CheckoutActions";
import CheckoutSummary from "components/CheckoutSummary";
import Layout from "components/Layout";
import PageLoading from "components/PageLoading";
import { withApollo } from "lib/apollo/withApollo";
import useCart from "hooks/cart/useCart";
import useStores from "hooks/useStores";
import useShop from "hooks/shop/useShop";
import useAvailablePaymentMethods from "hooks/availablePaymentMethods/useAvailablePaymentMethods";
// import useAddressValidation from "hooks/address/useAddressValidation";
import useTranslation from "hooks/useTranslation";
import definedPaymentMethods from "custom/paymentMethods";

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import CustomLoader from "../../../components/CustomLoader/index";
import { Typography ,Hidden} from "@material-ui/core";
import Entry from "components/Entry";
// import StickyBox from "react-sticky-box/dist/esnext";
import { StickyContainer, Sticky } from 'react-sticky';
import { identity } from "lodash";

const useStyles = makeStyles((theme) => ({
  checkoutActions: {
    width: "100%",
    maxWidth: "1440px",
    alignSelf: "center",
    // [theme.breakpoints.up("md")]: {
    //   paddingRight: "2rem"
    // }
  },
  cartSummary: {
    // maxWidth: "400px",
    alignSelf: "flex-start",
    [theme.breakpoints.up("md")]: {
      paddingRight: "2rem"
    }
  },
  checkoutContent: {
    flex: "1",
    maxWidth: theme.layout.mainContentMaxWidth,
    padding: "1rem",
    [theme.breakpoints.down("md")]: {
      maxWidth: "100%"
    }
  },
  checkoutContentContainer: {
    display: "flex",
    justifyContent: "center"
  },

  emptyCartContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  emptyCart: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 320,
    height: 320
  },
  logo: {
    color: theme.palette.reaction.reactionBlue,
    marginRight: theme.spacing(1),
    borderBottom: `solid 5px ${theme.palette.reaction.reactionBlue200}`
  },
  main: {
    flex: "1 1 auto",
    maxWidth: theme.layout.mainLoginMaxWidth,
    minHeight: "calc(100vh - 135px)",
    margin: "0 auto",
    padding: `${theme.spacing(3)}px ${theme.spacing(3)}px 0`,
    [theme.breakpoints.up("md")]: {
      padding: `${theme.spacing(10)}px ${theme.spacing(3)}px 0`
    }
  },
  root: {}
}));

const Checkout = ({ router }) => {
  const classes = useStyles();
  const { cartStore } = useStores();
  const shop = useShop();
  const { locale, t } = useTranslation("common"); // eslint-disable-line no-unused-vars, id-length
  const apolloClient = useApolloClient();
  // TODO: implement address validation
  // const [addressValidation, addressValidationResults] = useAddressValidation();
  const [stripe, setStripe] = useState();
  const [errors, setError] = useState();
  const [isPlaceOrderClicked, setIsPlaceOrderClicked] = useState(false);
  const [isOrderPlaced,setIsOrderPlaced] = useState(false);
  const [enablePlaceOrder, setEnablePlaceOrder] = useState(false);
  const [inventoryError,setInventoryError] = useState(null);
  const {
    cart,
    isLoadingCart,
    checkoutMutations,
    clearAuthenticatedUsersCart,
    hasMoreCartItems,
    loadMoreCartItems,
    onRemoveCartItems,
    onChangeCartItemsQuantity,
    setEmailOnAnonymousCart

  } = useCart();

  const [availablePaymentMethods = [], isLoadingAvailablePaymentMethods] = useAvailablePaymentMethods();

  const { asPath } = router;
  //LOSTest
  // !!((cart && cart.account !== null) || (cart && cart.email));
  // const hasIdentity = true;
  const hasIdentity = !!((cart && cart.account !== null) || (cart && cart.email));
  const pageTitle = hasIdentity ? `Checkout | ${shop && shop.name}` : `Login | ${shop && shop.name}`;

  useEffect(() => {
    // Skipping if the `cart` is not available
  
    //LOSTest
    if (!cart) return;
    // if (!hasIdentity) {
    //   Router.push("/cart/login");
    // }
  }), [cart, hasIdentity, asPath, Router]; // eslint-disable-line no-sequences

  useEffect(() => {
    if (!stripe && process.env.STRIPE_PUBLIC_API_KEY && window && window.Stripe) {
      setStripe(window.Stripe(process.env.STRIPE_PUBLIC_API_KEY));
    }
  }), [stripe]; // eslint-disable-line no-sequences

  const handlePlaceOrderClick = () => {
   setIsPlaceOrderClicked(true)
  // setIsOrderPlaced(true);
    
  }

// checkoutAction methods start here

const setEmailOnAnonymousCartHandler=(data)=>{

try{
  setEmailOnAnonymousCart(data).then(obj=>{
   
    setError("");

  }).catch(error=>{

    setError("Enter a valid email address");

  })
}
catch(e){

}
}

// checkoutAction method end here

  // eslint-disable-next-line react/no-multi-comp
  const renderCheckoutContent = () => {
    // sanity check that "tries" to render the correct /cart view if SSR doesn't provide the `cart`
  
    if (!hasIdentity) {
      return (
        <Grid container>
          <Grid item xs={12} md={7}>
            <div className="checkout__flexContainer checkout__flexContainerLeft">
              <Entry setEmailOnAnonymousCart={setEmailOnAnonymousCartHandler} hasIdentity={hasIdentity} errors={errors} />
            </div>
          </Grid>
          <Grid item xs={12} md={5}>
                  <div className="checkout__flexContainer checkout__flexContainerRight">
                    <div className={classes.cartSummary}>
                     
                      <CheckoutSummary
                        cart={cart}
                        hasMoreCartItems={hasMoreCartItems}
                        onRemoveCartItems={onRemoveCartItems}
                        onChangeCartItemsQuantity={onChangeCartItemsQuantity}
                        onLoadMoreCartItems={loadMoreCartItems}
                        enablePlaceOrder= {enablePlaceOrder}
                      />
                    </div>
                  </div>
                </Grid>
        </Grid>)
    }
    // if (!cart) {
    //   return (
    //     <div className={classes.emptyCartContainer}>
    //       <div className={classes.emptyCart}>
    //         <div>
    //           <CartEmptyMessage onClick={() => Router.push("/")} messageText="Your Cart is Empty" buttonText="Add product" />
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }

    if (hasIdentity && cart) {
      
     if (cart && Array.isArray(cart.items) && cart.items.length === 0) {
      if(isOrderPlaced == true){
        return (
          <div className={classes.emptyCartContainer}>
           
          </div>
        );
      }
        return (
          <div className={classes.emptyCartContainer}>
            <div className={classes.emptyCart}>
              <div>
                <CartEmptyMessage onClick={() => Router.push("/")} messageText="Your Cart is Empty" buttonText="Add Product" />
              </div>
            </div>
          </div>
        );
      }

      const orderEmailAddress = (cart && cart.account && Array.isArray(cart.account.emailRecords) &&
        cart.account.emailRecords[0].address) || (cart ? cart.email : null);

      // Filter the hard-coded definedPaymentMethods list from the client to remove any
      // payment methods that were not returned from the API as currently available.
      const paymentMethods = definedPaymentMethods.filter((method) =>
        !!availablePaymentMethods.find((availableMethod) => availableMethod.name === method.name));

      return (
        <StripeProvider stripe={stripe}>
          <div className={classes.checkoutContentContainer}>
            <div className={classes.checkoutContent +' Cart-mb-fix'}>
              <Typography variant="h5" component="h2" className="checkout__mainHeading">Checkout</Typography>
              <StickyContainer >
              <Grid container  className="checkout__containerBox">
                <Grid item xs={12} md={7}>
                  <div className="checkout__flexContainer checkout__flexContainerLeft">
                    {/* <CheckoutLogin /> */}
                    <Entry setEmailOnAnonymousCart={setEmailOnAnonymousCart} hasIdentity={hasIdentity} />
                    <div className={classes.checkoutActions}>

                      <CheckoutActions
                        apolloClient={apolloClient}
                        cart={cart}
                        cartStore={cartStore}
                        checkoutMutations={checkoutMutations}
                        clearAuthenticatedUsersCart={clearAuthenticatedUsersCart}
                        orderEmailAddress={orderEmailAddress}
                        paymentMethods={paymentMethods}
                        isPlaceOrderClicked = {isPlaceOrderClicked}
                        setIsPlaceOrderClicked = {()=>{setIsPlaceOrderClicked(false), setIsOrderPlaced(true)}}
                        setEnablePlaceOrder = {() => setEnablePlaceOrder(true)}
                        setInventoryError={(val)=>setInventoryError(val)}
                     />
                    </div>
                  </div>
                </Grid>
                <Hidden only={['xs','sm']}>
                <Grid item xs={12} md={5}>
               
                <Sticky  disableCompensation={false}>
                {({
            style,
            // the following are also available but unused in this example
            isSticky=true,
            distanceFromTop=0,
            calculatedHeight,
           
          }) => (
                  <div style={style} className="checkout__flexContainer checkout__flexContainerRight">
                    <div className={classes.cartSummary}>
                      <CheckoutSummary
                        cart={cart}
                        hasMoreCartItems={hasMoreCartItems}
                        onRemoveCartItems={onRemoveCartItems}
                        onChangeCartItemsQuantity={onChangeCartItemsQuantity}
                        onLoadMoreCartItems={loadMoreCartItems}
                        setIsPlaceOrderClicked = {()=>handlePlaceOrderClick()}
                        enablePlaceOrder= {enablePlaceOrder}
                        inventoryError={inventoryError}
                      />
                    </div>
                  </div>
                  )}
                  </Sticky>
                  
                </Grid>
                </Hidden>
                <Hidden smUp>
                <Grid item xs={12} className="mt-25">
               

                  <div className="checkout__flexContainer checkout__flexContainerRight">
                    <div className={classes.cartSummary}>
                      <CheckoutSummary
                        cart={cart}
                        hasMoreCartItems={hasMoreCartItems}
                        onRemoveCartItems={onRemoveCartItems}
                        onChangeCartItemsQuantity={onChangeCartItemsQuantity}
                        onLoadMoreCartItems={loadMoreCartItems}
                        setIsPlaceOrderClicked = {()=>handlePlaceOrderClick()}
                        enablePlaceOrder= {enablePlaceOrder}
                        inventoryError={inventoryError}
                      />
                    </div>
                  </div>
           
                  
                </Grid>
                </Hidden>
              </Grid>
              </StickyContainer>
            </div>
          </div>
        </StripeProvider>
      );
    }

    // Render nothing by default
    return null;
  };

  if (isLoadingCart || isLoadingAvailablePaymentMethods) {
    return (
      <Layout shop={shop}>
        {/* <PageLoading delay={0} /> */}
        <CustomLoader />
      </Layout>
    );
  }

  return (
    <Layout shop={shop}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={shop && shop.description} />
      </Head>
      <div className="checkout__container">
        <div className="ContainerContent__MainMaxWidth">
          <div className="ContainerPages__MainMaxWidth">
            {renderCheckoutContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

Checkout.propTypes = {
  router: PropTypes.object
};

/**
 *  Static props for the cart
 *
 * @returns {Object} the props
 */
export async function getStaticProps({ params: { lang } }) {
  return {
    props: {
      ...await fetchPrimaryShop(lang),
      ...await fetchTranslations(lang, ["common"])
    }
  };
}

/**
 *  Static paths for the cart
 *
 * @returns {Object} the paths
 */
export async function getStaticPaths() {
  return {
    paths: locales.map((locale) => ({ params: { lang: locale } })),
    fallback: false
  };
}

export default withApollo()(Checkout);
