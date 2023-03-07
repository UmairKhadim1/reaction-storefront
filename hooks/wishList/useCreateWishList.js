import { useMutation } from "@apollo/client";
import { createWishListMutation } from "./mutations.gql";
/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useCreateWishList() {

 
  const [createWishEntryFunc,{loading}] = useMutation(createWishListMutation);

  const createWishEntry = async (clientMutationId,items,shopId) => {
  
    const data = await createWishEntryFunc({
      variables: {
        input: {
          clientMutationId,
          items,
          shopId
        }
      }
    });

    return data;
  };

  return [
    createWishEntry,
    loading
  ];
}
