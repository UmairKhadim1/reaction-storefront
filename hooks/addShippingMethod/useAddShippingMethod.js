import { useMutation } from "@apollo/client";
import { addShippingMethodMutation } from "./mutations.gql";
import useViewer from "hooks/viewer/useViewer";
/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useAddShippingMethod() {
  const [viewer, , refetchViewer] = useViewer();
 
  const [addShippingMethodEntryFunc,{loading}] = useMutation(addShippingMethodMutation, {
    onCompleted() {
      refetchViewer();
    }
  });

  const addShippingMethodEntry = async (AccountId,FulfillmentMethodId,status) => {
  
    const data = await addShippingMethodEntryFunc({
      variables: {
        input: {
          AccountId,
          FulfillmentMethodId,
          status
          
        }
      }
    });

    return data;
  };

  return [
    addShippingMethodEntry,
    loading
  ];
}
