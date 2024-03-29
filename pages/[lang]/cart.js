import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import inject from "hocs/inject";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CartEmptyMessage from "@reactioncommerce/components/CartEmptyMessage/v1";
// import CartSummary from "@reactioncommerce/components/CartSummary/v1";
import CartSummary from "../../providers/reaction-component-library/package/src/components/CartSummary/v1";

import withCart from "containers/cart/withCart";
import CartItems from "components/CartItems";
import CheckoutButtons from "components/CheckoutButtons";
import Link from "components/Link";
import Layout from "components/Layout";
import Router from "translations/i18nRouter";
import PageLoading from "components/PageLoading";
import { withApollo } from "lib/apollo/withApollo";

import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import CustomLoader from "../../components/CustomLoader/index";
import CustomCartItemList from "../../components/CustomCartItemList";
const styles = (theme) => ({
  cartEmptyMessageContainer: {
    margin: "80px 0"
  },
  checkoutButtonsContainer: {
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(2)
  },
  customerSupportCopy: {
    paddingLeft: `${theme.spacing(4)}px !important`
  },
  phoneNumber: {
    fontWeight: theme.typography.fontWeightBold
  },
  title: {
    fontWeight: theme.typography.fontWeightRegular,
    marginTop: "1.6rem",
    marginBottom: "3.1rem"
  },
  itemWrapper: {
    // borderTop: theme.palette.borders.default,
    // borderBottom: theme.palette.borders.default
  }
});

class CartPage extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      totalItems: PropTypes.number,
      items: PropTypes.arrayOf(PropTypes.object),
      checkout: PropTypes.shape({
        fulfillmentTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        }),
        itemTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        }),
        taxTotal: PropTypes.shape({
          displayAmount: PropTypes.string
        })
      })
    }),
    classes: PropTypes.object,
    hasMoreCartItems: PropTypes.bool,
    loadMoreCartItems: PropTypes.func,
    onChangeCartItemsQuantity: PropTypes.func,
    onRemoveCartItems: PropTypes.func,
    shop: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  };

  handleClick = () => Router.push("/");

  handleItemQuantityChange = (quantity, cartItemId) => {
    const { onChangeCartItemsQuantity } = this.props;
    
    onChangeCartItemsQuantity({ quantity, cartItemId });
  };

  handleRemoveItem = async (itemId) => {
    const { onRemoveCartItems } = this.props;

    await onRemoveCartItems(itemId);
  };

  renderCartItems() {
    const { cart, classes, hasMoreCartItems, loadMoreCartItems } = this.props;

    if (cart && Array.isArray(cart.items) && cart.items.length) {
      return (
        <Grid item xs={12} md={7} className="Cart-mb-fix">
          <div className="cartPage__items">
           
            {/* <CartItems
              hasMoreCartItems={hasMoreCartItems}
              onLoadMoreCartItems={loadMoreCartItems}
              items={cart.items}
              onChangeCartItemQuantity={this.handleItemQuantityChange}
              onRemoveItemFromCart={this.handleRemoveItem}
            /> */}
            <CustomCartItemList
              hasMoreCartItems={hasMoreCartItems}
              onLoadMoreCartItems={loadMoreCartItems}
              items={cart.items}
              onChangeCartItemQuantity={this.handleItemQuantityChange}
              onRemoveItemFromCart={this.handleRemoveItem}
            />
            
          </div>
        </Grid>
      );
    }

    return (
      <div className="cart__emptyMsgContainer">
      <Grid item xs={12} className={classes.cartEmptyMessageContainer}>
        <CartEmptyMessage  onClick={this.handleClick} />
      </Grid>
      </div>
    );
  }

  renderCartSummary() {
    const { cart, classes } = this.props;

    if (cart && cart.checkout && cart.checkout.summary && Array.isArray(cart.items) && cart.items.length) {
      const { fulfillmentTotal, itemTotal, surchargeTotal, taxTotal, total } = cart.checkout.summary;

      return (
        <Grid item xs={12} md={5} >
          <div className="cart__summary">
          <CartSummary
            displayShipping={fulfillmentTotal && fulfillmentTotal.displayAmount}
            displaySubtotal={itemTotal && itemTotal.displayAmount}
            displaySurcharge={surchargeTotal && surchargeTotal.displayAmount}
            displayTax={taxTotal && taxTotal.displayAmount}
            displayTotal={total && total.displayAmount}
            itemsQuantity={cart.totalItemQuantity}
          />
          <div className={classes.checkoutButtonsContainer}>
            <CheckoutButtons />
          </div>
          </div>
        </Grid>
      );
    }

    return null;
  }

  render() {
    const { cart, classes, shop } = this.props;
    // when a user has no item in cart in a new session, this.props.cart is null
    // when the app is still loading, this.props.cart is undefined
    if (typeof cart === "undefined") return <>
    {/* <PageLoading delay={0} />; */}
    <CustomLoader />
    </>

    return (
      <Layout shop={shop}>
        <Helmet
          title={`Cart | ${shop && shop.name}`}
          meta={[{ name: "description", content: shop && shop.description }]}
        />
        <div className="cart__container">
        <div className="ContainerContent__MainMaxWidth mobile-ContainerContent__MainMaxWidth">
        <div className="ContainerPages__MainMaxWidth">
        <section>
          <Typography className="cart__mainTitle" variant="h6">
            Shopping Cart
          </Typography>
          <Grid container spacing={3} className="box-shadow-light">
            {this.renderCartItems()}
            {this.renderCartSummary()}
            <Grid className={classes.customerSupportCopy} item>
              <Typography paragraph variant="caption">
                Have questions? call <span className={classes.phoneNumber}>1.800.555.5555</span>
              </Typography>
              <Typography paragraph variant="caption">
                <Link href="/help">Shipping information</Link>
              </Typography>
              <Typography paragraph variant="caption">
                <Link href="/purchaseReturns">Return policy</Link>
              </Typography>
            </Grid>
          </Grid>
        </section>
        </div>
        </div>
        </div>
      </Layout>
    );
  }
}

/**
 *  Server props for the cart route
 *
 * @param {String} lang - the shop's language
 * @returns {Object} props
 */
export async function getServerSideProps({ params: { lang } }) {
  return {
    props: {
      ...await fetchPrimaryShop(lang),
      ...await fetchTranslations(lang, ["common"])
    }
  };
}

export default withApollo()(withStyles(styles)(withCart(inject("uiStore")(CartPage))));
