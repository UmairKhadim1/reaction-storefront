import { useMutation } from "@apollo/client";
import useViewer from "hooks/viewer/useViewer";
import { productVisibilityMutation } from "./mutations.gql";
import usePublishToCatalog from "../Publish/usePublishToCatalog";
/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function productVisibility() {
  const [publishEntry] = usePublishToCatalog();
  const [productVisibilityEntryFunc, { loading }] = useMutation(productVisibilityMutation);

  const productVisibilityEntry = async (isVisible,shopId,productId) => {
  
    const data = await productVisibilityEntryFunc({
      variables: {
        input: {
            productId,
            shopId,
            isVisible
        }
      }
    });
       // if(data){
     
    //   let r=[];
    //   r.push(productId)
    //  const res = await publishEntry(r);
    
    //  return res;
    // }
    return data;
  };

  return [
    productVisibilityEntry,
    loading
  ];
}
