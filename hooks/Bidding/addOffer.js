import { useMutation } from "@apollo/client";
import { addOfferMutation } from "./mutations.gql";

/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useAddOffer() {

 
  const [addOfferEntryFunc,{loading}] = useMutation(addOfferMutation);

  const addOfferEntry = async (bidId,offer,to,type) => {
  
    const data = await addOfferEntryFunc({
      variables: {
        input: {
          bidId,
          offer,
          to,
          type

        }
      }
    });

    return data;
  };

  return [
    addOfferEntry,
    loading
  ];
}
