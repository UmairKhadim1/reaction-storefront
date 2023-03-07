import { useMutation } from "@apollo/client";
import { updateOrderStatusMutation } from "./mutations.gql";
/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useUpdateOrderStatus() {
  
 
  const [updateOrderStatusEntryFunc] = useMutation(updateOrderStatusMutation);

  const updateOrderStatusEntry = async (orderId,status,userId) => {
  
    const data = await updateOrderStatusEntryFunc({
      variables: {
        input: {
           orderId:orderId,
           status:status,
           clientMutationId:userId
        }
      }
    });

    return data;
  };

  return [
    updateOrderStatusEntry,
    
  ];
}
