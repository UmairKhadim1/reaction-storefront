import React, { Component } from 'react'
import { Mutation } from "react-apollo";
import cancelOrderItemMutation from "./cancelOrderItem";
export default class handleCancelOrderItem extends Component {
    constructor(props){
        super(props)
    }
    handleCancelFulfillmentGroup(mutation, fulfillmentGroup) {
          // Canceling each item will cancel the fulfillment group
          fulfillmentGroup.items.nodes.forEach(async (item) => {
            await mutation({
              variables: {
                cancelQuantity: item.quantity,
                itemId: item._id,
                orderId: order._id,
                reason: "Fulfillment group cancelled via Catalyst"
              }
            });
          });
        
      }
    render() {
        return (
            <Mutation mutation={cancelOrderItemMutation}>
            {(mutationFunc) => {
               return this.handleCancelFulfillmentGroup(mutationFunc, this.props.fulfillmentGroup)
            //   <ConfirmButton
            //     buttonColor="danger"
            //     buttonText={i18next.t("order.cancelGroupLabel", "Cancel group")}
            //     buttonVariant="outlined"
            //     cancelActionText={i18next.t("app.close")}
            //     confirmActionText={i18next.t("order.cancelGroupLabel", "Cancel group")}
            //     title={i18next.t("order.cancelGroupLabel")}
            //     message={i18next.t("order.cancelGroup")}
            //     onConfirm={() => this.handleCancelFulfillmentGroup(mutationFunc, fulfillmentGroup)}
            //   />
            }}
          </Mutation>
        )
    }
}
