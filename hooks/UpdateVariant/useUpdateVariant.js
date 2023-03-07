import { useMutation } from "@apollo/client";
import useViewer from "hooks/viewer/useViewer";
import { updateVariantMutation } from "./mutations.gql";
import usePublishToCatalog from "../Publish/usePublishToCatalog";
/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useUpdateVariant() {
  const [publishEntry] = usePublishToCatalog();
  const [viewer, , refetchViewer] = useViewer();
  const [updateVariantEntryFunc, { loading }] = useMutation(updateVariantMutation, {
    onCompleted() {
      refetchViewer();
    }
  });

  const updateVariantEntry = async (variant,shopId,variantId) => {
  
    const data = await updateVariantEntryFunc({
      variables: {
        input: {
            shopId,
            variantId,
          variant,
        }
      }
    });
   
    // if(data){
    //  const res =  publishEntry(productId);
    //  return res;
    // }
    return data;
  };

  return [
    updateVariantEntry,
    loading
  ];
}
