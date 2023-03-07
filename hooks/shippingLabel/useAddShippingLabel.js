import { useMutation } from "@apollo/client";
import { addShippingLabelMutation } from "./mutations.gql";
import useViewer from "hooks/viewer/useViewer";
/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useAddShippingLabel() {
  const [viewer, , refetchViewer] = useViewer();
 
  const [addShippingLabelEntryFunc] = useMutation(addShippingLabelMutation, {
    onCompleted() {
      refetchViewer();
    }
  });

  const addShippingLabelEntry = async (orderId,orderFulfillmentGroupId,trackingUrl,userId) => {
  
    const data = await addShippingLabelEntryFunc({
      variables: {
        input: {
           orderId:orderId,
           orderFulfillmentGroupId:orderFulfillmentGroupId,
           trackingUrl,
           clientMutationId:userId
        }
      }
    });

    return data;
  };

  return [
    addShippingLabelEntry,
    
  ];
}
