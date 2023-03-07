import { useMutation } from "@apollo/client";
import useViewer from "hooks/viewer/useViewer";
import { publishMutation } from "./mutations.gql";

/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function usePublishToCatalog() {

  const [publishEntryFunc, { loading }] = useMutation(publishMutation);

  const publishEntry = async (productIds) => {
    // let productId = [productId1];
  
    const data = await publishEntryFunc({
      variables: {
        productIds
      }
    });
   
    return data;
  };

  return [
    publishEntry,
    loading
  ];
}
