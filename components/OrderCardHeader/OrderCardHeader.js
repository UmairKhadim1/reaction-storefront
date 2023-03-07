import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { format } from "date-fns";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ChevronDownIcon from "mdi-material-ui/ChevronDown";
import ChevronUpIcon from "mdi-material-ui/ChevronUp";
import Address from "@reactioncommerce/components/Address/v1";
import OrderCardStatusBadge from "components/OrderCardStatusBadge";
import OrderCardFulfillmentGroup from "components/OrderCardFulfillmentGroup";
import OrderCardSummary from "components/OrderCardSummary";
const styles = (theme) => ({
  orderCardHeader: {
    background: theme.palette.reaction.black02,
    padding: theme.spacing(2)
  },
  orderCardInfoText: {
    color: theme.palette.reaction.coolGrey500
  },
  orderCardInfoHeaderText: {
    marginBottom: theme.spacing(0.5)
  },
  orderCardInfoTextBold: {
    color: theme.palette.reaction.coolGrey500,
    fontWeight: theme.typography.fontWeightBold
  },
  orderCardInfoTextDetails: {
    color: theme.palette.reaction.coolGrey500,
    textAlign: "right"
  },
  orderCardInfoExpandIcon: {
    marginLeft: theme.spacing(),
    padding: 0
  },
  orderCardExpandedHeader: {
    borderTop: `solid 1px ${theme.palette.reaction.black10}`,
    marginTop: theme.spacing(2.5),
    paddingTop: theme.spacing(2.5)
  },
  orderCardExpandedInfoSection: {
    marginBottom: theme.spacing(3)
  },
  orderCardExpandedInfoHeaderText: {
    marginBottom: theme.spacing(1.5)
  },
  orderAddressText: {
    color: theme.palette.reaction.black65,
    fontSize: "14px"
  }
});

class OrderCardHeader extends Component {
  static propTypes = {
    classes: PropTypes.object,
    isExpanded: PropTypes.bool,
    order: PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      displayStatus: PropTypes.string.isRequired,
      fulfillmentGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
      payments: PropTypes.arrayOf(PropTypes.object),
      referenceId: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    })
  };

  static defaultProps = {
    isExpanded: false
  }

  state = {
    isExpanded: this.props.isExpanded
  }

  toggleHeader = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  renderOrderPayments() {
    const { order: { payments } } = this.props;

    // If more than one payment method, display amount for each
    if (Array.isArray(payments) && payments.length > 1) {
      return payments.map((payment, index) => <Typography key={index} variant="caption">{payment.displayName} {payment.amount.displayAmount}</Typography>);
    }

    // If only one payment method, do not display amount
    return payments.map((payment, index) => <Typography key={index} variant="caption">{payment.displayName}</Typography>);
  }

  renderOrderShipments() {
    const { order: { fulfillmentGroups } } = this.props;

    if (Array.isArray(fulfillmentGroups) && fulfillmentGroups.length) {
      return fulfillmentGroups.map((fulfillmentGroup, index) => <Typography key={index} variant="caption">{fulfillmentGroup.selectedFulfillmentOption.fulfillmentMethod.carrier} - {fulfillmentGroup.selectedFulfillmentOption.fulfillmentMethod.displayName}</Typography>); // eslint-disable-line
    }

    return null;
  }

  render() {
    const { classes, order: { createdAt, displayStatus, fulfillmentGroups, payments, referenceId, status, summary } } = this.props;
    const { shippingAddress } = fulfillmentGroups[0].data;
    const orderDate = format(
      createdAt,
      "MM/DD/YYYY"
    );
    const structStatus = (str) => {
     
             if(str == "coreOrderWorkflow/canceled" || str=="coreOrderWorkflow/processing"){
              let index = str.indexOf("/");
              let result = str.substr(index+1);
             
              return result;
             }
             return str;
    }
    return (
      <div className={classes.orderCardHeader}>
        <Grid container alignItems="center">
          <Grid item xs={4} md={3} className="firstCap orderHeader__row">
            <Typography variant="caption" className={classnames(classes.orderCardInfoText, classes.orderCardInfoHeaderText)}>Date:&nbsp;</Typography>
            <Typography variant="caption" className={classes.orderCardInfoTextBold}>{orderDate}</Typography>
          </Grid>
          <Grid item xs={4} md={3} className="firstCap orderHeader__row">
            <Typography variant="caption" className={classnames(classes.orderCardInfoText, classes.orderCardInfoHeaderText)}>Total:&nbsp;</Typography>
            <Typography variant="caption" className={classes.orderCardInfoTextBold}>{summary.total && summary.total.displayAmount}</Typography>
          </Grid>
          <Grid item xs={4} md={3} className="firstCap orderHeader__row">
            {/* <OrderCardStatusBadge displayStatus={displayStatus} status={status} /> */}
            {/* <Typography variant="caption" className={classnames(classes.orderCardInfoText, classes.orderCardInfoHeaderText)}>Order ID:&nbsp;</Typography>
            <Typography variant="caption" className={classes.orderCardInfoTextBold}>{referenceId}</Typography> */}
                        <Typography variant="caption" className={classnames(classes.orderCardInfoText, classes.orderCardInfoHeaderText)}>Order Status:&nbsp;</Typography>
                        <div style={{width:"100%",maxWidth:"150px"}}>
                        
                        <OrderCardStatusBadge displayStatus={structStatus(displayStatus)} status={status} />
                        </div>
          </Grid>

          <Grid item xs={8} md={3}>
            <Typography variant="caption" component="p" className={classes.orderCardInfoTextDetails}>
              Order details
              <IconButton className={classes.orderCardInfoExpandIcon} color="inherit" onClick={this.toggleHeader}>
                {this.state.isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </IconButton>
            </Typography>
          </Grid>

        </Grid>
        {this.state.isExpanded ?
          <section className={classes.orderCardExpandedHeader}>
            <Grid container>


              {/* <Grid item xs={12} md={6}>
                <Grid item xs={12} md={12} className={classes.orderCardExpandedInfoSection}>
                  <Typography variant="caption" className={classes.orderCardInfoTextBold}>Date:&nbsp;</Typography>
                  <Typography variant="caption" className={classnames(classes.orderCardInfoText, classes.orderCardInfoHeaderText)}>{orderDate}</Typography>
                </Grid>
                <Grid item className={classes.orderCardExpandedInfoSection} xs={12} md={12}>
                  <Typography
                    variant="caption"
                    className={classnames(classes.orderCardInfoTextBold, classes.orderCardExpandedInfoHeaderText)}
                  >
                    Payment Method{payments.length !== 1 ? "s" : null}:&nbsp;
                  </Typography>
                  {this.renderOrderPayments()}
                </Grid>
                <Grid item className={classes.orderCardExpandedInfoSection} xs={12} md={12}>
                  <Typography
                    variant="caption"
                    className={classnames(classes.orderCardInfoTextBold, classes.orderCardExpandedInfoHeaderText)}
                  >
                    Shipping Method{fulfillmentGroups.length !== 1 ? "s" : null}:&nbsp;
                  </Typography>
                  {this.renderOrderShipments()}
                </Grid>

              </Grid> */}
              <Grid item xs={12} md={12}>
                <Grid item xs={12} md={12} className=" order__shippingAddressContainer">
                  <Typography
                    variant="caption"
                    className={classnames(classes.orderCardInfoTextBold, classes.orderCardInfoHeader)}
                  >
                    Shipping Address:&nbsp;
                  </Typography>
                 
                  <Typography variant="h2" className="order__shippingAddress">{shippingAddress.address1+","+shippingAddress?.address2+","+shippingAddress.city+","+shippingAddress.region+","+shippingAddress.postal+","+shippingAddress.country}</Typography>
                  {/* <Address address={shippingAddress} className={classes.orderAddressText} /> */}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                
                {fulfillmentGroups.map((fulfillmentGroup, index) => (
                  <OrderCardFulfillmentGroup
                    key={`${fulfillmentGroup._id}`}
                    fulfillmentGroup={fulfillmentGroup}
                    currentGroupCount={index + 1}
                    totalGroupsCount={fulfillmentGroups.length}
                  />
                ))}
              </Grid>
              <Grid item xs={12}>
                {/* <OrderCardSummary summary={summary} /> */}
              </Grid>
            </Grid>
          </section>
          : null}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(OrderCardHeader);
