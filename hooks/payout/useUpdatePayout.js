import { useMutation } from "@apollo/client";
import { updatePayoutMutation } from "./mutations.gql";
import useViewer from "hooks/viewer/useViewer";
/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useUpdatePayout() {
  const [viewer, , refetchViewer] = useViewer();
 
  const [updatePayoutEntryFunc,{loading}] = useMutation(updatePayoutMutation, {
    onCompleted() {
      refetchViewer();
    }
  });

  const updatePayoutEntry = async (AccountNo,AccountTitle,swiftCode,AccountId,AccountBookId,isCardActive) => {
  
    const data = await updatePayoutEntryFunc({
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
    updatePayoutEntry,
    loading
  ];
}
