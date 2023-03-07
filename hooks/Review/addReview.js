import { useMutation } from "@apollo/client";
import { addReviewMutation } from "./mutations.gql";
/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useAddReview() {
  
 
  const [addReviewEntryFunc,{loading}] = useMutation(addReviewMutation);

  const addReviewEntry = async (accountId,productId,score,review) => {
  
    const data = await addReviewEntryFunc({
      variables: {
        input: {
          accountId,
          productId,
          review,
          score
        }
      }
    });

    return data;
  };

  return [
    addReviewEntry,
    loading
  ];
}
