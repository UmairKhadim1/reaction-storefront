import { useMutation } from "@apollo/client";
// import { updateProfileMutation } from "./mutations.gql";
import captureOrderPaymentsMutation from "./captureOrderPayments";
/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useCapturePayment() {
    const [captureOrderPayments, { loading }] = useMutation(captureOrderPaymentsMutation);

  const entryCapturePayment = async (order_id,paymentIdList, orderShopId,userId) => {
  
    const data = await captureOrderPayments({
        variables: {
            orderId: order_id,
            paymentIds: paymentIdList,
            shopId: orderShopId,
            clientMutationId:userId
          }
    });
   
    return data;
  };

  return [
    entryCapturePayment,
    loading
  ];
}
