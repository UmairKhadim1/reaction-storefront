import { useMutation } from "@apollo/client";
import { addBidMutation } from "./mutations.gql";

/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useAddBid() {

 
  const [addBidEntryFunc,{loading}] = useMutation(addBidMutation);

  const addBidEntry = async (shopId,variantId,offer,soldby,productId,offerType,productPrice) => {
  
    const data = await addBidEntryFunc({
      variables: {
        input: {
          shopId,
          productId,
          offer,
          variantId,
          soldby,
          offerType,
          productPrice
        }
      }
    });

    return data;
  };

  return [
    addBidEntry,
    loading
  ];
}
