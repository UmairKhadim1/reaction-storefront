import { useMutation } from "@apollo/client";
// import { updateProfileMutation } from "./mutations.gql";
import cancelOrderItemMutation from "./cancelOrderItem";
/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function handleCancelOrderItem() {
    const [useCancelOrderItem, { loading }] = useMutation(cancelOrderItemMutation);

  const entryCancelOrderItem = async (order,userId) => {
      const data =  await useCancelOrderItem({
        variables: {
            cancelQuantity: order.fulfillmentGroups[0].items.nodes[0].quantity,
                itemId: order.fulfillmentGroups[0].items.nodes[0]._id,
                orderId: order._id,
                reason: "Fulfillment group cancelled via Catalyst",
                clientMutationId:userId
          }
    });
   
    return data;
  };

  return [
    entryCancelOrderItem,
    loading
  ];
}
