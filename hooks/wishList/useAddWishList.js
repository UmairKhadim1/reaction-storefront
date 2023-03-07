import { useMutation } from "@apollo/client";
import { addWishListMutation } from "./mutations.gql";
/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useAddWishList() {
 
  const [addWishListEntryFunc,{loading}] = useMutation(addWishListMutation);

  const addWishListEntry = async (AccountNo,AccountTitle,swiftCode,AccountId,AccountBookId,isCardActive) => {
  
    const data = await addWishListEntryFunc({
      variables: {
        input: {
          AccountNo,
          AccountTitle,
          swiftCode,
          AccountId,
          AccountBookId,
          isActive:isCardActive
        }
      }
    });

    return data;
  };

  return [
    addWishListEntry,
    loading
  ];
}
