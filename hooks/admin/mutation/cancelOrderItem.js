import gql from "graphql-tag";
import { orderCommonFragment } from "../fragments/orderCommon";

export default gql`
  mutation cancelOrderItemMutation($cancelQuantity: Int!, $itemId: ID!, $orderId: ID!, $reason: String,$clientMutationId:String, $language: String! = "en") {
    cancelOrderItem(input: {
      cancelQuantity: $cancelQuantity,
      itemId: $itemId,
      orderId: $orderId,
      reason: $reason,
      clientMutationId:$clientMutationId
    }) {
      order {
        ...OrderCommon
      }
    }
  }
  ${orderCommonFragment}
`;
