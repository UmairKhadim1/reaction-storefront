import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CartItems from "components/CartItems";
import CustomOrderItemList from "components/CustomOrderItemList";
import FetchVariantCartItemImg from "../FetchVariantCartItemImg/index";
const styles = (theme) => ({
  fulfillmentGroup: {},
  fulfillmentGroupDetails: {
    padding: theme.spacing(2,0,0,0),
  },
  fulfillmentGroupCount: theme.typography.subtitle2,
  fulfillmentGroupHeader: {
    borderBottom: theme.palette.borders.default,
    borderTop: theme.palette.borders.default,
    padding: theme.spacing(1, 2),
  },
  fulfillmentGroupHeaderRightColumn: {
    textAlign: "right",
  },
  trackShipmentButton: {
    textTransform: "none",
  },
});

class OrderCardFulfillmentGroup extends Component {
  static propTypes = {
    classes: PropTypes.object,
    currentGroupCount: PropTypes.number,
    fulfillmentGroup: PropTypes.shape({
      items: PropTypes.shape({
        nodes: PropTypes.arrayOf(PropTypes.object),
      }),
      data: PropTypes.shape({
        shippingAddress: PropTypes.object,
      }),
    }),
    hasMoreCartItems: PropTypes.bool,
    loadMoreCartItems: PropTypes.func,
    onChangeCartItemsQuantity: PropTypes.func,
    onRemoveCartItems: PropTypes.func,
    payments: PropTypes.arrayOf(PropTypes.object),
    totalGroupsCount: PropTypes.number,
  };

  static defaultProps = {
    hasMoreCartItems: false,
    loadMoreCartItems() {},
    onChangeCartItemsQuantity() {},
    onRemoveCartItems() {},
  };

  handleItemQuantityChange = (quantity, cartItemId) => {
    const { onChangeCartItemsQuantity } = this.props;

    onChangeCartItemsQuantity({ quantity, cartItemId });
  };

  handleRemoveItem = (_id) => {
    const { onRemoveCartItems } = this.props;

    onRemoveCartItems(_id);
  };

  renderItems() {
    const { classes, fulfillmentGroup } = this.props;

    if (fulfillmentGroup && Array.isArray(fulfillmentGroup.items.nodes)) {
      let items = fulfillmentGroup.items.nodes.map((item) => ({
        ...item,
        // Backwards compatibility until all component library components are updated
        // to accept `inventoryAvailableToSell`.
        currentQuantity: item.currentQuantity || item.inventoryAvailableToSell,
      }));
      
      // if (items.length > 0) {
      //   items.map((item) => {
      //     let pp = JSON.parse(item.optionTitle);
      //     item.optionTitle = "Size: " + pp.size + ", Color: " + pp.color;
      //     item.attributes = [{ label: "color", value: "Size: " + pp.size + "\n" + " Color: " + pp.color }];
      //   });
      // }

      return (
        <Grid className={classes.fulfillmentGroupDetails} item xs={12} md={12}>
          <CustomOrderItemList items={items} shippingMethod={fulfillmentGroup ? fulfillmentGroup.selectedFulfillmentOption.fulfillmentMethod.displayName:""}
          trackingUrl={fulfillmentGroup ? fulfillmentGroup.trackingUrl:null}
          tracking={fulfillmentGroup ? fulfillmentGroup.tracking:null}
          />
          {/* <CartItems isMiniCart isReadOnly items={items} /> */}
          {/* {
            items.map((cartItem, i)=>{
            const res=  FetchVariantCartItemImg(cartItem.productConfiguration.productId,cartItem.productConfiguration.productVariantId);
           
            })
          } */}
        </Grid>
      );
    }

    return null;
  }

  onTrackShipmentButtonClick() {
    // TODO: What do we do to track a shipment? Link to a specific provider website?
  }

  render() {
    const { classes, currentGroupCount, fulfillmentGroup, totalGroupsCount } = this.props;

    return (
      <Fragment>
        <section className={classes.fulfillmentGroup}>
          {/* <header className={classes.fulfillmentGroupHeader}>
            <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
              <Grid item xs={6}>
                <Typography className={classes.fulfillmentGroupCount} variant="subtitle1">
                  Shipment {currentGroupCount} of {totalGroupsCount}
                </Typography>
              </Grid>
              <Grid item xs={6} className={classes.fulfillmentGroupHeaderRightColumn}>
                {fulfillmentGroup.tracking ? (
                  <Button
                    className={classes.trackShipmentButton}
                    onClick={this.onTrackShipmentButtonClick}
                    size="small"
                    variant="outlined"
                  >
                    Track shipment
                  </Button>
                ) : (
                  <Button className={classes.trackShipmentButton} disabled size="small" variant="outlined">
                    No tracking available
                  </Button>
                )}
              </Grid>
            </Grid>
          </header> */}
          {this.renderItems()}
        </section>
      </Fragment>
    );
  }
}

export default withStyles(styles)(OrderCardFulfillmentGroup);
