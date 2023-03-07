import { useMutation } from "@apollo/client";
import useViewer from "hooks/viewer/useViewer";
import { createProductMutation } from "./mutations.gql";

/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useCreateNewProduct() {
  
  const [createProductEntryFunc, { loading }] = useMutation(createProductMutation);

  const createProductEntry = async (product,shopId) => {
   
    const data = await createProductEntryFunc({
      variables: {
        input: {
            shopId,
            product,
            shouldCreateFirstVariant:false
          
        }
      }
    });
    
   

    return data;
  };

  return [
    createProductEntry,
    loading
  ];
}
