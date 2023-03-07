import { useMutation } from "@apollo/client";
// import { updateProfileMutation } from "./mutations.gql";
import approveOrderPaymentsMutation from "./approveOrderPayments";
import useCapturePayment from "./handleCapturePayment";
/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useApproveOrderPayment() {
    const [entryCapturePayment] = useCapturePayment()
    const [approveOrderPayments, { loading }] = useMutation(approveOrderPaymentsMutation);

  const entryApproveOrderPayment = async (order_id,paymentIdList, orderShopId,userId) => {
    
  
    const data = await approveOrderPayments({
        variables: {
            orderId: order_id,
            paymentIds: paymentIdList,
            shopId: orderShopId,
            clientMutationId:userId,
          }
    });
    
    if(data){
       const res = await  entryCapturePayment(order_id,paymentIdList, orderShopId,userId);
       
       return res
    }
    return data;
  };

  return [
    entryApproveOrderPayment,
    loading
  ];
}
