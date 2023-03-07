import { useMutation } from "@apollo/client";
import useViewer from "hooks/viewer/useViewer";
import { archiveVariantMutation } from "./mutations.gql";

/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useArchiveVariant() {
  const [viewer, , refetchViewer] = useViewer();
  const [archiveVariantEntryFunc, { loading }] = useMutation(archiveVariantMutation, {
    onCompleted() {
      refetchViewer();
    }
  });

  const archiveVariantEntry = async (shopId,variantId) => {
    const variantIds = [variantId];
    
    const data = await archiveVariantEntryFunc({
      variables: {
        input: {
            shopId,
            variantIds,
        }
      }
    });
    return data;
  };

  return [
    archiveVariantEntry,
    loading
  ];
}
