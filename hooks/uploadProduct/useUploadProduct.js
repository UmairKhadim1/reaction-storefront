import { useMutation } from "@apollo/client";
import useViewer from "hooks/viewer/useViewer";
import { uploadProductMutation } from "./mutations.gql";

/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useUploadProduct() {
  
  const [uploadProductEntryFunc, { loading }] = useMutation(uploadProductMutation);

  const uploadProductEntry = async (variant,shopId,productId) => {
   
    const data = await uploadProductEntryFunc({
      variables: {
        input: {
            shopId,
            productId,
          variant,
        }
      }
    });
    
   

    return data;
  };

  return [
    uploadProductEntry,
    loading
  ];
}
