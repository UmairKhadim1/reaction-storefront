import { useMutation } from "@apollo/client";
import { addTrackingCodeMutation } from "./mutations.gql";
import useViewer from "hooks/viewer/useViewer";
/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useAddTrackingCode() {
  const [viewer, , refetchViewer] = useViewer();
 
  const [addTrackingCodeEntryFunc] = useMutation(addTrackingCodeMutation, {
    onCompleted() {
      refetchViewer();
    }
  });

  const addTrackingCodeEntry = async (orderId,orderFulfillmentGroupId,tracking,userId) => {
  
    const data = await addTrackingCodeEntryFunc({
      variables: {
        input: {
           orderId:orderId,
           orderFulfillmentGroupId:orderFulfillmentGroupId,
           tracking,
           clientMutationId:userId
        }
      }
    });

    return data;
  };

  return [
    addTrackingCodeEntry,
    
  ];
}
